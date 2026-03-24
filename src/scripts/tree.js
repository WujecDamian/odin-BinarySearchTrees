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
            function findRoot(root,value){
                 if(value>root.root){

                    //go right 
                    if(root.right===null && root.left===null){
                        return null
                    }
                    else if(root.right.root===value){
                        return root.right.root
                    }
                    
                    else{
                        return findRoot(root.right,value)
                    }

                 }else if(value<root.root){
                    //go left
                    if(root.right===null && root.left===null){
                        return null
                    }
                    else if(root.left.root===value){ 
                        return root.left.root
                    }
                    else{
                        return findRoot(root.left,value)
                    }
                 }else{
                    return "error"
                 }

                 
            }
            let searched=findRoot(this.root,value)
            //* /\ /\ /\ here we got searched 

            //? TODO. Now We have to handle 3 cases:[ 1. 0children | 2. 1children | 3. 2children ]

            //*[ 1. 0children ]



            /* returns */
            console.log(searched.right)
            return JSON.stringify(searched)
        },

    }
}