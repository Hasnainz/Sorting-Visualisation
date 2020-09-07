//Setting global animation and size variables so I don't have to pass them as parameters.
let animations, size;
export default function getHeapSortAnimations(array){
    animations = []
    size = array.length;
    //Heapsort works by treating the array as a binary tree which is where a lot of odd numbers come from.
    HeapSort(array);
    return animations;
}
function HeapSort(array){
    //You first build the max heap to get the largest value to the top of the heap.
    //We start sorting from the highest node which is what i is set to.
    for (let i = Math.floor(size / 2); i >= 0; i --){
        maxHeap(array, i);
    }   
    //We then sort based on the last child element of the array and go backwards from there.
    for (let i = array.length - 1; i > 0; i--){
        animations.push([0, i, array[0], array[i]]);
        swap(array, 0, i);
        size--
        maxHeap(array, 0);
    }
    return;
}



//This compares a parent and 2 children to make sure that they are in order for a max heap. 
function maxHeap(array, i) {
    //Because we are representing a binary tree with an array, to find the left and right nodes 
    //we can multiply by 2 and add 1 and 2 respectively. Instead of doing an extra calculation,
    //The right node will just be the left node + 1.
    const left = 2 * i + 1
    const right = left + 1
    //The parent node
    let max = i

    //We now compare if the parent node is larger than its children.
    //We also check that the already sorted nodes are left alone which is where the in bounds in checked.
    if (left < size && array[left] > array[max]){
        max = left
    }

    if (right < size && array[right] > array[max]){
        max = right
    }

    //If if turns out that the parent node was larger than its children,
    //We now need to swap them and then repeat this but the child now becomes the parent node.
    //We repeat this to ensure the children's children are sorted. 
    if (max !== i) {
        animations.push([i, max, array[i], array[max]]);
        swap(array, i, max)
        maxHeap(array, max)
    }
}

//This just swaps two elements of an array using a temporary variable.
//For some unknown reason, the [,][,] method that exists in javascript to swap these
//(I used in quicksort line 47) didn't work here.
function swap(input, indexA, indexB) {
    const temp = input[indexA]
    input[indexA] = input[indexB]
    input[indexB] = temp
}