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
        } else if ((value = root = root)) {
          return root;
        } else {
          return "error";
        }
      }
      let searched = findRoot(this.root, value);
      //* /\ /\ /\ here we got searched
      function inorderSuccesor(root) {
        root = root.right;
        while (root.left != null) {
          root.left = root.left.left;
        }
        return root.root;
      }
      //* /\ /\ /\ here we got inorder Successor (least value from right branch)

      //? TODO. Now We have to handle 3 cases:[ 1. 0children | 2. 1children | 3. 2children ]

      //*[ 1. 0children ]
      function deleteNode(node, direction) {
        console.log(node.right);
        let successor = inorderSuccesor(node);

        if (direction === "left") {
          /* 0child _ left */
          if (node.left.left === null && node.left.right === null) {
            console.log("0 children");
            node.left = null;
            /* 2child _ left */
          } else if (node.left.right !== null && node.left.left !== null) {
            console.log("2 children");
            node.left = successor;

            /* 1child _ left */
          } else {
            if (node.left.right.root != null) {
              const temp = node.left.right.root;
              node.left.root = temp;
              node.left.right = null;
            } else {
              const temp = node.left.left.root;
              node.left.root = temp;
              node.left.left = null;
            }
            console.log("1 children");
          }
        } else {
          /* 0child _ right */
          if (node.right.left === null && node.right.right === null) {
            console.log("0 children");
            node.right = null;
            /* 2child _ left */
          } else if (node.right.right !== null && node.right.left !== null) {
            console.log("2 children");
            /* 1 | let successor=inorderSuccesor(value) */
            node.right = successor;
            /* 2 | swap the searched value (node) with inorderSuccesor */
            /* 3 | assign origin node to null */
            /* 1child _ left */
          } else {
            if (node.right.right.root != null) {
              const temp = node.right.right.root;
              node.right.root = temp;
              node.right.right = null;
            } else {
              const temp = node.right.left.root;
              node.right.root = temp;
              node.right.left = null;
            }
            console.log("1 children");
          }
        }
      } /* 
      } */

      /* returns */
      return JSON.stringify(searched);
    },
  };
}
