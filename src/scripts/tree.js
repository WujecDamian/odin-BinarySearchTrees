import { buildTree } from "./buildTree.js"

export function tree(arr){
    return{
        root:buildTree(arr.sort((a,b)=>a-b),0,arr.length-1)
    }
}