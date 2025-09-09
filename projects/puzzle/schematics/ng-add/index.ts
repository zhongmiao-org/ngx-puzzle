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
      glob: '**/*',
      input: './node_modules/@tethys/icons/assets',
      output: '/assets/icons'
    },
    {
      glob: '**/*',
      input: './node_modules/ngx-puzzle/assets',
      output: '/assets/puzzle'
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
    '@date-fns/tz': '^1.2.0',
    '@tethys/icons': '1.4.50',
    '@webdatarocks/webdatarocks': '1.4.19',
    'date-fns': '^4.1.0',
    echarts: '6.0.0',
    lodash: '4.17.21',
    'ngx-tethys': '^18.2.17',
    rxjs: '~7.8.0',
    tslib: '^2.3.0',
    'zone.js': '~0.14.10'
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
    }

    // Also try to update all application projects to be safe
    for (const [name, project] of Object.entries(projects)) {
      if (project?.projectType === 'application') {
        modified = updateProjectAssets(project, context) || modified;
      }
    }

    if (modified) {
      tree.overwrite(path, JSON.stringify(json, null, 2) + '\n');
      context.logger.info('Updated assets configuration to include @tethys/icons and library assets.');
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
