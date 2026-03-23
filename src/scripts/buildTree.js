import { node } from "./node.js"

export function buildTree(arr,start,end){
if(start>end){
    return null
}

let root=start+Math.floor((end-start)/2)
let newNode = node(arr[root])

newNode.left=buildTree(arr,start,root-1)
newNode.right=buildTree(arr,root+1,end)
return newNode

}