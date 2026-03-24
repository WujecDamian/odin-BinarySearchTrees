import { buildTree } from "./buildTree.js";
import { node } from "./node.js";

export function tree(arr) {
  const uniqueSortedArray = [...new Set(arr.sort((a, b) => a - b))];
  return {
    root: buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1),
    includes(value) {
      let wasInside = false;
      uniqueSortedArray.forEach((element) => {
        if (element === value) {
          wasInside = true;
        }
      });
      return wasInside;
    },
    insert(root, value) {
      if (root === null) {
        return node(value);
      }

      if (value < root.root) {
        root.left = this.insert(root.left, value);
      } else {
        root.right = this.insert(root.right, value);
      }
      return root;
    },
    deleteItem(value) {
      function findRoot(root, value) {
        if (value > root.root) {
          //go right
          if (root.right === null && root.left === null) {
            return null;
          } else if (root.right.root === value) {
            deleteNode(root, "right");
            return root.right;
          } else {
            return findRoot(root.right, value);
          }
        } else if (value < root.root) {
          //go left
          if (root.right === null && root.left === null) {
            return null;
          } else if (root.left.root === value) {
            deleteNode(root, "left");
            return root.left;
          } else {
            return findRoot(root.left, value);
          }
        } else {
          return "error";
        }
      }
      let searched = findRoot(this.root, value);
      //* /\ /\ /\ here we got searched

      //? TODO. Now We have to handle 3 cases:[ 1. 0children | 2. 1children | 3. 2children ]

      //*[ 1. 0children ]
      function deleteNode(node, direction) {
        console.log(node.right);
        if (direction === "left") {
          if (node.root.left === null && node.root.right === null) {
            console.log(node);
            console.log("0 children");
          } else {
            if (node.root.left === null && node.root.right === null) {
              console.log(node);
              console.log("0 children");
            }
          }
        } else if (node.left !== null && node.right !== null) {
          console.log("2 children");
        } else {
          console.log("1 children");
        }
      }

      /* returns */
      return JSON.stringify(searched);
    },
  };
}
