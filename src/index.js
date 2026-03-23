//put inside src/index.js
import './styles.css'
import { tree } from './scripts/tree.js'
import { prettyPrint } from './scripts/prettyPrint.js'

let tree1=tree([1,9,3,5,7])
console.log(tree1.root)
prettyPrint(tree1.root)