import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

interface AssetPatternObject {
  glob: string;
  input: string;
  output: string;
}

interface AngularJson {
  projects: Record<string, any>;
  defaultProject?: string;
}

const ICON_ASSETS: AssetPatternObject[] = [
  {
    glob: '**/*',
    input: './node_modules/@tethys/icons',
    output: '/assets/icons/'
  },
  {
    glob: '**/*',
    input: './node_modules/@zhongmiao/ngx-puzzle/assets',
    output: '/assets/'
  }
];


function ensureAssetEntry(assets: any[]): any[] {
  const result = [...assets];

  for (const pattern of ICON_ASSETS) {
    const already = result.some((item) => {
      if (typeof item === 'string') return false;
      return (
        item &&
        typeof item === 'object' &&
        item.glob === pattern.glob &&
        item.input === pattern.input &&
        item.output === pattern.output
      );
    });
    if (!already) {
      result.push({ ...pattern });
    }
  }

  return result;
}

function updateProjectAssets(project: any, context: SchematicContext): boolean {
  let changed = false;
  const architect = project?.architect || project?.targets; // support older/newer workspaces
  if (!architect) return false;

  const build = architect['build'];
  if (!build?.options) return false;

  const assets = build.options.assets;
  if (!Array.isArray(assets)) {
    context.logger.warn('assets field is not an array. Skipped updating assets.');
    return false;
  }

  const nextAssets = ensureAssetEntry(assets);
  if (nextAssets.length !== assets.length) {
    build.options.assets = nextAssets;
    changed = true;
  }

  return changed;
}

export default function ngAdd(): Rule {
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

    return tree;
  };
}
