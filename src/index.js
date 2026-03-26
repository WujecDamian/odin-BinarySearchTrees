//put inside src/index.js
import "./styles.css";
import { tree } from "./scripts/tree.js";
import { prettyPrint } from "./scripts/prettyPrint.js";

let tree1 = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 9, 9, 9, 9, 67, 6345, 324]);
/* tree1.insert(tree1.root,'11')
tree1.insert(tree1.root,'2')
tree1.insert(tree1.root,'86')
tree1.insert(tree1.root,'432')
tree1.deleteItem(tree1.root, 4); 
tree1.levelOrderForEach(tree1.callback);
tree1.preOrderForEach(tree1.callback);
tree1.postOrderForEach(tree1.callback);*/

tree1.height(9);
console.log(`${tree1.height(tree1.root, 9)}`);

prettyPrint(tree1.root);
