#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const cwd = path.resolve(__dirname, '..');
const projectDir = path.join(cwd, 'projects', 'puzzle');
const distLib = path.join(cwd, 'dist', 'puzzle');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', cwd: projectDir, shell: false });
}

// Ensure dist exists
fs.mkdirSync(distLib, { recursive: true });

// Compile schematics TS to JS into dist/schematics
run(`${path.join(cwd, 'node_modules', '.bin', 'tsc')} -p schematics/tsconfig.schematics.json`);

// Copy schema.json files and collection.json and any files/ blueprints
const { spawnSync } = require('child_process');
function copy(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

copy(path.join(projectDir, 'schematics', 'collection.json'), path.join(distLib, 'schematics', 'collection.json'));
copy(path.join(projectDir, 'schematics', 'ng-add', 'schema.json'), path.join(distLib, 'schematics', 'ng-add', 'schema.json'));

// If we ever add templates under files/, copy them as well (no-op if missing)
try {
  copy(path.join(projectDir, 'schematics', 'ng-add', 'files'), path.join(distLib, 'schematics', 'ng-add', 'files'));
} catch {}

// Patch dist package.json to include schematics field
const pkgPath = path.join(distLib, 'package.json');
try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.schematics = 'schematics/collection.json';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('Updated dist package.json with schematics field.');
} catch (e) {
  console.warn('Warning: failed to update dist package.json with schematics field:', e.message);
}

console.log('Schematics built and copied.');
