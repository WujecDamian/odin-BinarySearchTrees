import { node } from "./node.js";

export function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  let middle = start + Math.floor((end - start) / 2);
  let root = node(arr[middle]);

  root.left = buildTree(arr, start, middle - 1);
  root.right = buildTree(arr, middle + 1, end);
  return root;
}
