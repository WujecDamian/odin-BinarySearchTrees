import { buildTree } from "./buildTree.js"
import { node } from "./node.js";

export function tree(arr){
    const uniqueSortedArray=[...new Set(arr.sort((a,b)=>a-b))]
    return{
        root:buildTree(uniqueSortedArray,0,uniqueSortedArray.length-1),
        includes(value){
            let wasInside=false
            uniqueSortedArray.forEach(element => {
                if(element===value){
                    wasInside = true
                }
            });
            return wasInside
        },
        insert(root,value){

            if(root===null){
                return node(value)
            }

            if(value<root.root){
                root.left=this.insert(root.left,value)
            }
            else{
                root.right=this.insert(root.right,value)

            }
            return root
        },
        deleteItem(value){
            let current=this.root.root
            function findRoot(root,value){
                 if(value>root.root){
                    //go right 
                    if(root.right===null){
                        return null
                    }
                    else{
                        findRoot(root.right,value)
                    }
                 }else if(value<root.root){
                    //go left
                    if(root.left===null){
                        return null
                    }
                    else{
                        findRoot(root.left,value)
                    }
                 }
                 else if(value===root.root){
                    return root.root
                 }
            }
        },

    }
}