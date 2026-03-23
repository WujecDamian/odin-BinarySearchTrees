//put inside src/index.js
import './styles.css'
import { tree } from './scripts/tree.js'
import { prettyPrint } from './scripts/prettyPrint.js'

let tree1=tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9,9,9,9,9, 67, 6345, 324])
console.log(tree1.root)
prettyPrint(tree1.root)