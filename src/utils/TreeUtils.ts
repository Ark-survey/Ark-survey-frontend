export type TreeNode<T> = T & {
  id: string;
  name: string;
  roadId?: string;
  road?: string;
  children?: TreeNode<T>[];
};

// 遍历所有的叶子节点
export function treeToArray<T>(
  tree?: TreeNode<T>[],
  levelLimit?: [number, number],
  roadRule?: (node: TreeNode<T>, parentRoad: string, level: number) => string,
) {
  let arr: TreeNode<T>[] = [];
  const expanded = (
    data?: TreeNode<T>[],
    nodeInfo: { road: string; roadId: string; level: number } = {
      road: '',
      roadId: '',
      level: 0,
    },
  ) => {
    if (data && data.length > 0) {
      data.forEach((e) => {
        const roadC = roadRule?.(e, nodeInfo.road, nodeInfo.level);
        if (
          !e.children &&
          (!levelLimit ||
            (levelLimit?.[0] && levelLimit[0] <= nodeInfo.level && levelLimit?.[1] && levelLimit[1] >= nodeInfo.level))
        ) {
          arr.push({ ...e, road: roadC });
        }
        expanded(e.children, {
          road: roadRule ? roadC ?? '' : nodeInfo.level === 0 ? e.name : nodeInfo.road + ' ' + e.name,
          roadId: nodeInfo.level === 0 ? e.name : nodeInfo.road + '-' + e.id,
          level: nodeInfo.level + 1,
        });
      });
    }
  };
  expanded(tree);
  return arr;
}
