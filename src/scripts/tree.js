import { buildTree } from "./buildTree.js";
import { node } from "./node.js";

export function tree(arr) {
  const uniqueSortedArray = [...new Set(arr.sort((a, b) => a - b))];
  return {
    root: buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1),
    heightValue: 0,
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
    deleteItem(root, value) {
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
        } else if (value === root.root) {
          deleteNode(root, "highest");
        } else {
          return "error";
        }
      }
      let searched = findRoot(this.root, value);
      //* /\ /\ /\ here we got searched
      function inorderSuccesor(root) {
        root = root.right;
        let tempRoot = root.left;
        while (root.left.left !== null) {
          tempRoot = root.left.left;
        }
        console.log(`${tempRoot.root}`);

        return tempRoot;
      }
      //* /\ /\ /\ here we got inorder Successor (least value from right branch)

      //? TODO. Now We have to handle 3 cases:[ 1. 0children | 2. 1children | 3. 2children ]
      //*[ 1. 0children ]
      function deleteNode(node, direction) {
        //!testing ----------------- testing

        //!testing ----------------- testing

        let successor = inorderSuccesor(root);

        if (direction === "left") {
          /* 0child _ left */
          if (node.left.left === null && node.left.right === null) {
            node.left = null;
            /* 2child _ left */
          } else if (node.left.right !== null && node.left.left !== null) {
            node.left.root = successor.root;
            deleteNode(successor, "successor");

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
          }
        } else if (direction === "right") {
          /* 0child _ right */
          if (node.right.left === null && node.right.right === null) {
            node.right = null;
            console.log("0 child");

            /* 2child _ left */
          } else if (node.right.right !== null && node.right.left !== null) {
            /* 1 | let successor=inorderSuccesor(value) */
            node.right.root = successor.root;
            deleteNode(successor, "successor");

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
          }
        } else if (direction === "highest") {
          if (node.left === null && node.right === null) {
            node.root = null;
            /* 2child _ left */
          } else if (node.right !== null && node.left !== null) {
            /* 1 | let successor=inorderSuccesor(value) */
            node.root = successor.root;
            deleteNode(successor, "successor");

            /* 2 | swap the searched value (node) with inorderSuccesor */
            /* 3 | assign origin node to null */
            /* 1child _ left */
          } else {
            if (node.right.root != null) {
              const temp = node.right.root;
              node.right.root = temp;
              node.right.right = null;
            } else {
              const temp = node.right.left.root;
              node.right.root = temp;
              node.right.left = null;
            }
          }
        } else if (direction === "successor") {
          let temp = node.right;
          node.right = null;
          node.root = temp.root;
        } else {
          console.error("Direction Invalid");
        }
      } /* 
      } */

      /* returns */
      return JSON.stringify(searched);
    },

    //!                                                                 LEVEL ORDER FOREACH */
    callback(node) {
      console.log(`Node: ${node}`);
    },

    levelOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error(
          "Provided parameter is not a function! (Expected: callback function)",
        );
      }
      let queue = [this.root];

      recursiveTraverse(this.root, callback);
      function recursiveTraverse(node, callback) {
        if (queue.length === 0) {
          console.log("Queue empty");
          return;
        }
        if (node.left !== null && node.left !== undefined) {
          queue.push(node.left);
        }
        if (node.right !== null && node.right !== undefined) {
          queue.push(node.right);
        }
        queue.splice(0, 1);
        callback(node.root);

        recursiveTraverse(queue[0], callback);
      }
    }, //!IN ORDER---------------------------------------------------------------
    inOrderForEach(callback) {
      //check if left is not empty
      //recurse on left
      if (typeof callback !== "function") {
        throw new Error(
          "Provided parameter is not a function! (Expected: callback function)",
        );
      }

      recursiveTraverse(this.root, callback);
      function recursiveTraverse(node, callback) {
        if (
          node != undefined &&
          node != null &&
          node.left !== null &&
          node.left !== undefined
        ) {
          recursiveTraverse(node.left, callback);
        }
        if (node !== undefined && node !== null) {
          callback(node.root);
        }
        if (
          node != undefined &&
          node != null &&
          node.right !== null &&
          node.right !== undefined
        ) {
          recursiveTraverse(node.right, callback);
        }
      }
    }, //!PRE ORDER---------------------------------------------------------------
    preOrderForEach(callback) {
      if (typeof callback !== "function") {
        throw new Error(
          "Provided parameter is not a function! (Expected: callback function)",
        );
      }

      recursiveTraverse(this.root, callback);
      function recursiveTraverse(node, callback) {
        if (
          node != undefined &&
          node != null &&
          node.left !== null &&
          node.left !== undefined
        ) {
          callback(node.root);
          recursiveTraverse(node.left, callback);
          recursiveTraverse(node.right, callback);
        } else if (node !== undefined && node !== null) {
          callback(node.root);

          recursiveTraverse(node.right, callback);
        }
      }
    }, //!POST ORDER---------------------------------------------------------------
    postOrderForEach(callback) {
      //check if left is not empty
      //recurse on left
      if (typeof callback !== "function") {
        throw new Error(
          "Provided parameter is not a function! (Expected: callback function)",
        );
      }

      recursiveTraverse(this.root, callback);
      function recursiveTraverse(node, callback) {
        if (
          node != undefined &&
          node != null &&
          node.left !== null &&
          node.left !== undefined
        ) {
          recursiveTraverse(node.left, callback);
        }
        if (
          node != undefined &&
          node != null &&
          node.right !== null &&
          node.right !== undefined
        ) {
          recursiveTraverse(node.right, callback);
        }
        if (node !== undefined && node !== null) {
          callback(node.root);
        }
      }
    },
    //?--------------------------- height & depth functions --------------------------------
    depth(root, value) {
      if (value > root.root) {
        //go right
        if (root.right === null && root.left === null) {
          return null;
        } else if (root.right.root === value) {
          this.heightValue++;
          return this.heightValue;
        } else {
          this.heightValue++;
          return this.depth(root.right, value);
        }
      } else if (value < root.root) {
        //go left
        if (root.right === null && root.left === null) {
          return null;
        } else if (root.left.root === value) {
          this.heightValue++;
          return this.heightValue;
        } else {
          this.heightValue++;

          return this.depth(root.left, value);
        }
      } else if (value === root.root) {
        return this.heightValue;
      } else {
        return "error";
      }
    },
    height(value) {},
  };
}
