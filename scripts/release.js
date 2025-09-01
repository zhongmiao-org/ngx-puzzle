#!/usr/bin/env node
/*
 Enhanced interactive release script for ngx-puzzle
 Flow:
 1) Create release branch release-vX.Y.Z
 2) Validate environment and ensure build succeeds (before bump)
 3) Bump version in root and library package.json
 4) Generate/Update CHANGELOG.md
 5) Overwrite dist output with updated version and changelog
 6) Publish package from dist/puzzle

 Usage:
   npm run release:select

 Flags (optional):
   --type <major|minor|patch>  Non-interactive bump type
   --yes                       Skip confirmation prompts
   --dry-run                   Print planned actions without changes
*/

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const ROOT_PKG = path.join(ROOT, 'package.json');
const LIB_PKG = path.join(ROOT, 'projects/puzzle/package.json');
const DIST_DIR = path.join(ROOT, 'dist', 'puzzle');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function bump(version, type) {
  const m = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-.+)?$/);
  if (!m) throw new Error(`Invalid semver version: ${version}`);
  let [major, minor, patch] = m.slice(1).map((n) => parseInt(n, 10));
  switch (type) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
    default:
      throw new Error(`Unknown bump type: ${type}`);
  }
  return `${major}.${minor}.${patch}`;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { yes: false, dryRun: false, type: undefined };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--yes' || a === '-y') opts.yes = true;
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--type') {
      opts.type = args[i + 1];
      i++;
    }
  }
  return opts;
}

function promptSelect(question, choices) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    console.log(question);
    choices.forEach((c, idx) => {
      console.log(`  ${idx + 1}. ${c.label}`);
      if (c.desc) console.log(`     - ${c.desc}`);
    });
    rl.question('Choose [1-3]: ', (answer) => {
      rl.close();
      const n = parseInt(answer, 10);
      if (!Number.isFinite(n) || n < 1 || n > choices.length) {
        console.error('Invalid selection. Aborting.');
        process.exit(1);
      }
      resolve(choices[n - 1].value);
    });
  });
}

function promptConfirm(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${question} [y/N]: `, (answer) => {
      rl.close();
      resolve(/^y(es)?$/i.test(answer.trim()));
    });
  });
}

function ensureCleanGit() {
  const out = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (out) {
    throw new Error('Git working tree is not clean. Please commit or stash your changes.');
  }
}

function ensureNpmLogin() {
  try {
    const who = execSync('npm whoami', { encoding: 'utf8' }).trim();
    if (!who) throw new Error('not logged in');
    return who;
  } catch {
    throw new Error('Not logged in to npm. Run "npm login" and try again.');
  }
}

// Helpers for fault tolerance and resume
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}
function isReleaseBranch(branch) {
  return /^release-v\d+\.\d+\.\d+$/.test(branch);
}
function hasUncommittedChangelogChanges() {
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).split('\n');
  return status.some((line) => /CHANGELOG\.md$/.test(line));
}
function distPrepared(nextVersion) {
  try {
    const distPkgPath = path.join(DIST_DIR, 'package.json');
    if (!fs.existsSync(distPkgPath)) return false;
    const distPkg = readJson(distPkgPath);
    return distPkg.version === nextVersion && distPkg.name === '@zhongmiao/ngx-puzzle';
  } catch {
    return false;
  }
}
function prepareDistMetadata(nextVersion) {
  if (fs.existsSync(DIST_DIR)) {
    const distPkgPath = path.join(DIST_DIR, 'package.json');
    if (fs.existsSync(distPkgPath)) {
      try {
        const distPkg = readJson(distPkgPath);
        if (distPkg.name !== '@zhongmiao/ngx-puzzle') {
          distPkg.name = '@zhongmiao/ngx-puzzle';
        }
        distPkg.version = nextVersion;
        distPkg.publishConfig = distPkg.publishConfig || {};
        distPkg.publishConfig.access = 'public';
        distPkg.publishConfig.registry = 'https://registry.npmjs.org/';
        writeJson(distPkgPath, distPkg);
      } catch {}
    }
    try {
      copyFile(path.join(ROOT, 'CHANGELOG.md'), path.join(DIST_DIR, 'CHANGELOG.md'));
    } catch {}
  }
}
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
function tryGitPush(branch, retries = 3) {
  let attempt = 0;
  let lastErr;
  // capture original remote URL
  let originalUrl = '';
  try {
    originalUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  } catch {}
  while (attempt < retries) {
    try {
      console.log(`Pushing branch (attempt ${attempt + 1}/${retries}) ...`);
      execSync(`git push -u origin ${branch}`, { stdio: 'inherit' });
      return; // success
    } catch (e) {
      lastErr = e;
      console.warn(`git push failed: ${e.message || e}`);
      // If looks like SSH/port 22 timeout, try HTTPS fallback once
      if (/port 22|ssh: connect to host/i.test(String(e))) {
        const httpsUrl = originalUrl.replace(/^git@github.com:/, 'https://github.com/');
        if (httpsUrl && httpsUrl !== originalUrl) {
          try {
            console.log('Trying HTTPS remote temporarily due to SSH error...');
            execSync(`git remote set-url origin ${httpsUrl}`, { stdio: 'inherit' });
            execSync(`git push -u origin ${branch}`, { stdio: 'inherit' });
            // restore original
            if (originalUrl) execSync(`git remote set-url origin ${originalUrl}`, { stdio: 'inherit' });
            return;
          } catch (e2) {
            console.warn(`HTTPS push also failed: ${e2.message || e2}`);
            // restore original before retrying
            if (originalUrl)
              try {
                execSync(`git remote set-url origin ${originalUrl}`, { stdio: 'inherit' });
              } catch {}
          }
        }
      }
      attempt++;
      if (attempt < retries) {
        console.log('Waiting 5s before retry...');
        sleep(5000);
      }
    }
  }
  throw lastErr || new Error('git push failed');
}

(async function main() {
  try {
    const opts = parseArgs();

    // Load package versions
    const rootPkg = readJson(ROOT_PKG);
    const libPkg = fs.existsSync(LIB_PKG) ? readJson(LIB_PKG) : null;

    const current = rootPkg.version;
    if (!current) {
      throw new Error('Root package.json missing version field');
    }

    const choices = [
      { value: 'major', label: 'major (e.g., 18.0.0 -> 19.0.0)', desc: 'Breaking changes; aligns with Angular major releases' },
      { value: 'minor', label: 'minor (e.g., 18.0.0 -> 18.1.0)', desc: 'New features, backward-compatible' },
      { value: 'patch', label: 'patch (e.g., 18.0.0 -> 18.0.1)', desc: 'Bug fixes, performance, docs; no breaking changes' }
    ];

    let type = opts.type;
    if (!type) {
      type = await promptSelect('Select version bump type (Semantic Versioning):', choices);
    }
    if (!['major', 'minor', 'patch'].includes(type)) {
      throw new Error(`Invalid --type value: ${type}`);
    }

    const nextVersion = bump(current, type);

    if (opts.dryRun) {
      console.log(`[dry-run] Will create branch: release-v${nextVersion}`);
      console.log('[dry-run] Will validate git status and npm login');
      console.log('[dry-run] Will run: npm run build (pre-bump)');
      console.log(`[dry-run] Will bump version: ${current} -> ${nextVersion} in root and library`);
      console.log('[dry-run] Will run: conventional-changelog -p conventionalcommits -r 1 -i CHANGELOG.md -s');
      console.log('[dry-run] Will overwrite dist/puzzle/package.json.version and copy CHANGELOG.md');
      console.log('[dry-run] Will commit changes and push branch (with retry and HTTPS fallback)');
      console.log('[dry-run] Will create and push git tag v' + nextVersion);
      console.log('[dry-run] Will publish from dist/puzzle');
      process.exit(0);
    }

    // Preconditions
    ensureCleanGit();
    const npmUser = ensureNpmLogin();

    console.log(`Environment OK. Node: ${process.version}, npm: ${execSync('npm -v', { encoding: 'utf8' }).trim()}, npm user: ${npmUser}`);

    // Determine branch and possibly resume
    let currentBranch = getCurrentBranch();
    let releaseBranch = `release-v${nextVersion}`;

    const onReleaseBranch = isReleaseBranch(currentBranch);
    const canResume = onReleaseBranch && !hasUncommittedChangelogChanges();

    if (canResume) {
      releaseBranch = currentBranch;
      console.log(`Detected existing release branch ${releaseBranch}. Will try to resume without bump if possible.`);
    } else {
      // Create release branch BEFORE build
      releaseBranch = `release-v${nextVersion}`;
      console.log(`Creating release branch ${releaseBranch} ...`);
      execSync(`git checkout -b ${releaseBranch}`, { stdio: 'inherit' });
      currentBranch = releaseBranch;
    }

    // Validate build BEFORE bump (only if not already built or we're freshly starting)
    console.log('Validating build (pre-bump)...');
    execSync('npm run build', { stdio: 'inherit' });

    if (!opts.yes) {
      const ok = await promptConfirm(`Proceed to bump version to ${nextVersion}, update changelog, and publish?`);
      if (!ok) {
        console.log('Aborted.');
        process.exit(0);
      }
    }

    // Bump versions unless resuming
    if (!canResume) {
      rootPkg.version = nextVersion;
      writeJson(ROOT_PKG, rootPkg);
      if (libPkg) {
        libPkg.version = nextVersion;
        writeJson(LIB_PKG, libPkg);
      }
      console.log(`Version updated to ${nextVersion}`);

      // Update changelog
      console.log('Updating changelog (latest release only)...');

      // Get the latest tag to determine if there are changes
      let latestTag = '';
      let hasChanges = false;

      try {
        const tags = execSync('git tag --sort=-version:refname', { encoding: 'utf8' }).trim().split('\n');
        // Filter out empty strings and find the latest tag that's not the current version we're releasing
        const validTags = tags.filter(tag => tag.trim() && tag.startsWith('v'));

        // Don't include the current version tag if it already exists
        const currentVersionTag = `v${nextVersion}`;
        latestTag = validTags.find(tag => tag !== currentVersionTag) || '';

        console.log(`Debug: All tags: ${validTags.slice(0, 5).join(', ')}`);
        console.log(`Debug: Current version tag: ${currentVersionTag}`);
        console.log(`Debug: Latest previous tag: ${latestTag}`);

        if (latestTag) {
          // Check if there are any commits since the last tag (excluding current version tag)
          const commitsSinceTag = execSync(`git log ${latestTag}..HEAD --oneline`, { encoding: 'utf8' }).trim();
          hasChanges = commitsSinceTag.length > 0;

          // Debug: Show commits since the last tag
          if (hasChanges) {
            console.log(`Found ${commitsSinceTag.split('\n').length} commit(s) since ${latestTag}:`);
            commitsSinceTag.split('\n').forEach((commit) => {
              console.log(`  - ${commit}`);
            });
          } else {
            console.log(`No commits found since ${latestTag}.`);
          }
        } else {
          // No tags found, assume we have changes
          hasChanges = true;
          console.log('No previous tags found, assuming changes exist.');
        }
      } catch (error) {
        console.warn('Warning: Could not determine latest tag, assuming changes exist.');
        console.warn(`Error details: ${error.message}`);
        hasChanges = true;
      }

      if (hasChanges) {
        console.log(`Generating changelog from ${latestTag} to HEAD...`);

        // 直接获取提交信息并手动生成 changelog
        const commits = execSync(`git log ${latestTag}..HEAD --pretty=format:"%h %s" --no-merges`, { encoding: 'utf8' })
          .trim()
          .split('\n')
          .filter(line => line.trim())
          .filter(line => !line.includes('release: v')); // 过滤掉 release 提交

        if (commits.length > 0) {
          const today = new Date().toISOString().split('T')[0];
          const versionHeader = `## <small>${nextVersion} (${today})</small>`;

          // 简单分组提交
          const changelogCommits = commits.map(commit => {
            const [hash, ...messageParts] = commit.split(' ');
            const message = messageParts.join(' ');
            return `* ${message} ([${hash}](https://github.com/zhongmiao-org/ngx-puzzle/commit/${hash}))`;
          });

          // 构建新的版本条目
          const newEntry = `${versionHeader}\n\n${changelogCommits.join('\n')}\n\n`;

          // 读取现有 changelog 并插入新条目
          const changelogPath = path.join(ROOT, 'CHANGELOG.md');
          const currentContent = fs.readFileSync(changelogPath, 'utf8');
          const lines = currentContent.split('\n');

          // 找到插入位置（第一个版本条目之前）
          let insertIndex = 0;
          for (let i = 0; i < lines.length; i++) {
            if ((lines[i].startsWith('## ') || lines[i].startsWith('# ')) && !lines[i].includes('Changelog')) {
              insertIndex = i;
              break;
            }
          }

          // 插入新条目
          lines.splice(insertIndex, 0, ...newEntry.split('\n'));

          // 写回文件
          fs.writeFileSync(changelogPath, lines.join('\n'));

          console.log(`✅ Added ${commits.length} commits to changelog (filtered out release commits)`);
        }
      }
    } else {
      console.log('Resume mode: Skipping version bump and changelog update because on release branch and changelog has no new changes.');
    }

    // Overwrite dist output with updated version and changelog
    if (fs.existsSync(DIST_DIR)) {
      const distPkgPath = path.join(DIST_DIR, 'package.json');
      if (fs.existsSync(distPkgPath)) {
        try {
          const distPkg = readJson(distPkgPath);
          // Ensure correct public package name and publish config in dist
          if (distPkg.name !== '@zhongmiao/ngx-puzzle') {
            distPkg.name = '@zhongmiao/ngx-puzzle';
          }
          distPkg.version = nextVersion;
          distPkg.publishConfig = distPkg.publishConfig || {};
          distPkg.publishConfig.access = 'public';
          distPkg.publishConfig.registry = 'https://registry.npmjs.org/';
          writeJson(distPkgPath, distPkg);
          console.log(`Updated dist package.json version -> ${nextVersion}`);
        } catch {
          console.warn('Warning: Failed to update dist package.json.');
        }
      } else {
        console.warn('Warning: dist/puzzle/package.json not found.');
      }
      try {
        copyFile(path.join(ROOT, 'CHANGELOG.md'), path.join(DIST_DIR, 'CHANGELOG.md'));
        console.log('Copied updated CHANGELOG.md to dist.');
      } catch {
        console.warn('Warning: Failed to copy CHANGELOG.md to dist.');
      }
    } else {
      console.warn('Warning: dist/puzzle does not exist. Did the build run?');
    }

    // Commit and push branch
    if (!canResume) {
      execSync('git add package.json projects/puzzle/package.json CHANGELOG.md', { stdio: 'inherit' });
      execSync(`git commit -m "release: v${nextVersion}"`, { stdio: 'inherit' });
    } else {
      console.log('Resume mode: No new changes to commit.');
    }
    tryGitPush(releaseBranch);

    // Tag the release and push tags
    try {
      const tagName = `v${nextVersion}`;
      const existingTags = execSync('git tag', { encoding: 'utf8' }).split('\n');
      if (!existingTags.includes(tagName)) {
        console.log(`Creating git tag ${tagName} ...`);
        execSync(`git tag -a ${tagName} -m "release: ${tagName}"`, { stdio: 'inherit' });
      } else {
        console.log(`Tag ${tagName} already exists. Skipping tag creation.`);
      }
      console.log('Pushing tags ...');
      // try to push tags with the same resilience as branch push
      try {
        execSync('git push --tags', { stdio: 'inherit' });
      } catch (e) {
        console.warn(`git push --tags failed: ${e.message || e}`);
        // Attempt HTTPS fallback if origin is SSH
        try {
          const originalUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
          const httpsUrl = originalUrl.replace(/^git@github.com:/, 'https://github.com/');
          if (httpsUrl && httpsUrl !== originalUrl) {
            console.log('Trying HTTPS remote temporarily for pushing tags...');
            execSync(`git remote set-url origin ${httpsUrl}`, { stdio: 'inherit' });
            execSync('git push --tags', { stdio: 'inherit' });
            if (originalUrl) execSync(`git remote set-url origin ${originalUrl}`, { stdio: 'inherit' });
          } else {
            throw e;
          }
        } catch (e2) {
          console.warn(`Failed to push tags via HTTPS fallback: ${e2.message || e2}`);
          throw e2;
        }
      }
    } catch (e) {
      console.warn(`Warning: Tagging or pushing tags failed: ${e.message || e}`);
    }

    // Ensure dist metadata is aligned before publish
    if (!distPrepared(nextVersion)) {
      console.log('Preparing dist metadata...');
      prepareDistMetadata(nextVersion);
    }

    // Publish from dist
    console.log('Publishing package from dist/puzzle ...');
    execSync('npm run publish:dist', { stdio: 'inherit' });

    console.log('\nRelease completed successfully.');
    console.log(`- Branch ${releaseBranch} pushed`);
    console.log(`- Version ${nextVersion} published`);
  } catch (err) {
    console.error('Release script failed:', err.message || err);
    process.exit(1);
  }
})();
