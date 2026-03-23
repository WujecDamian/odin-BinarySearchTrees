import { buildTree } from "./buildTree.js"

export function tree(arr){
    const uniqueSortedArray=[...new Set(arr.sort((a,b)=>a-b))]
    return{
        root:buildTree(uniqueSortedArray,0,uniqueSortedArray.length-1),
        includes(value){},
        insert(value){},
        deleteItem(value){},
        
    }
}