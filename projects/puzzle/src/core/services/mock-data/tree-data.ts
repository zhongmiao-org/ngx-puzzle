/**
 * Tree mock data: hierarchical structure
 */
export interface TreeNode { name: string; children?: TreeNode[] }

export const treeData: TreeNode[] = [
  {
    name: 'Root',
    children: [
      { name: 'Child A', children: [{ name: 'A1' }, { name: 'A2' }] },
      { name: 'Child B', children: [{ name: 'B1' }, { name: 'B2' }] }
    ]
  }
];
