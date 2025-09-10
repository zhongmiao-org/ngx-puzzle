import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

interface AngularJson {
  projects?: { [key: string]: any };
  defaultProject?: string;
}

function updateProjectAssets(project: any, context: SchematicContext): boolean {
  if (!project.architect?.build?.options) {
    context.logger.warn('Build configuration not found in project');
    return false;
  }

  const buildOptions = project.architect.build.options;
  if (!buildOptions.assets) {
    buildOptions.assets = [];
  }

  // Assets to add
  const assetsToAdd = [
    {
      glob: "**/*",
      input: "./node_modules/@zhongmiao/ngx-puzzle/assets",
      output: "/assets"
    }
  ];

  let modified = false;

  for (const assetToAdd of assetsToAdd) {
    const exists = buildOptions.assets.some((asset: any) => {
      if (typeof asset === 'string') {
        return false;
      }
      return asset.input === assetToAdd.input && asset.output === assetToAdd.output;
    });

    if (!exists) {
      buildOptions.assets.push(assetToAdd);
      modified = true;
      context.logger.info(`Added asset mapping: ${assetToAdd.input} -> ${assetToAdd.output}`);
    }
  }

  return modified;
}

function addDependenciesToPackageJson(tree: Tree, context: SchematicContext): void {
  const packageJsonPath = '/package.json';

  if (!tree.exists(packageJsonPath)) {
    context.logger.error('package.json not found');
    return;
  }

  const packageJsonBuffer = tree.read(packageJsonPath);
  if (!packageJsonBuffer) {
    context.logger.error('Could not read package.json');
    return;
  }

  const packageJson = JSON.parse(packageJsonBuffer.toString('utf-8'));

  // 定义需要安装的依赖项
  const dependenciesToAdd = {
    "@angular/cdk": "^18.2.14",
    "@tethys/icons": "1.4.50",
    "@webdatarocks/webdatarocks": "1.4.19",
    "@zhongmiao/ngx-puzzle": "^18.4.13",
    "echarts": "6.0.0",
    "lodash": "4.17.21",
    "ngx-tethys": "^18.2.17",
  };

  // 确保 dependencies 对象存在
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }

  // 添加依赖项（如果尚未存在）
  let packagesAdded = false;
  for (const [packageName, version] of Object.entries(dependenciesToAdd)) {
    if (!packageJson.dependencies[packageName]) {
      packageJson.dependencies[packageName] = version;
      packagesAdded = true;
      context.logger.info(`Added ${packageName}@${version} to dependencies`);
    } else {
      context.logger.info(`${packageName} already exists in dependencies`);
    }
  }

  if (packagesAdded) {
    tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  }
}

function appendStylesImports(tree: Tree, context: SchematicContext, project: any): boolean {
  // Try to locate styles.scss under project source root
  const sourceRoot: string | undefined = project?.sourceRoot || project?.root && `${project.root}/src`;
  const stylesPaths = [
    `${sourceRoot ?? 'src'}/styles.scss`,
    `${sourceRoot ?? 'src'}/styles.sass`,
    `${sourceRoot ?? 'src'}/styles.css`
  ];
  const importLinesScss = [
    `@import "@zhongmiao/ngx-puzzle/styles/index.scss";`,
    `@import 'ngx-tethys/styles/index.scss';`
  ];
  let modified = false;
  for (const p of stylesPaths) {
    if (tree.exists(p)) {
      const buf = tree.read(p);
      if (!buf) continue;
      let content = buf.toString('utf-8');
      // Only handle scss/sass; for css we skip because scss imports may not work
      if (p.endsWith('.scss') || p.endsWith('.sass')) {
        for (const line of importLinesScss) {
          if (!content.includes(line)) {
            content = `${line}\n` + content;
            modified = true;
            context.logger.info(`Prepended style import to ${p}: ${line}`);
          }
        }
        tree.overwrite(p, content);
      } else {
        context.logger.warn(`Found ${p}, but skipping automatic SCSS import for CSS file. Please convert to SCSS or add imports manually.`);
      }
      break; // update only the first existing styles file
    }
  }
  if (!modified) {
    context.logger.warn('Did not find styles.scss/sass to update. Please add the following to your global styles:\n  @import "@zhongmiao/ngx-puzzle/styles/index.scss";\n  @import "ngx-tethys/styles/index.scss";');
  }
  return modified;
}

function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const path = '/angular.json';
    if (!tree.exists(path)) {
      context.logger.error('angular.json not found. Are you in an Angular workspace?');
      return tree;
    }

    const buffer = tree.read(path);
    if (!buffer) return tree;

    const content = buffer.toString('utf-8');
    let json: AngularJson;
    try {
      json = JSON.parse(content);
    } catch (e) {
      context.logger.error('Failed to parse angular.json');
      return tree;
    }

    // 添加依赖到 package.json
    addDependenciesToPackageJson(tree, context);

    const projects = json.projects || {};
    const defaultProject = json.defaultProject && projects[json.defaultProject] ? json.defaultProject : undefined;

    let modified = false;

    if (defaultProject) {
      modified = updateProjectAssets(projects[defaultProject], context) || modified;
      modified = appendStylesImports(tree, context, projects[defaultProject]) || modified;
    }

    // Also try to update all application projects to be safe
    for (const [name, project] of Object.entries(projects)) {
      if (project?.projectType === 'application') {
        modified = updateProjectAssets(project, context) || modified;
        modified = appendStylesImports(tree, context, project) || modified;
      }
    }

    if (modified) {
      tree.overwrite(path, JSON.stringify(json, null, 2) + '\n');
      context.logger.info('Updated assets configuration to include library assets.');
    } else {
      context.logger.info('No changes in assets. Required entries already present.');
    }

    context.logger.info('✅ Configuration updated successfully!');
    context.logger.info('📦 New dependencies have been added to package.json');
    context.logger.info('🚀 Please run the following command to install dependencies:');
    context.logger.info('   npm install');

    return tree;
  };
}

export default ngAdd;
