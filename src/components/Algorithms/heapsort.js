let animations, size;
export default function getHeapSortAnimations(array){
    animations = []
    size = array.length;
    HeapSort(array);
    console.log(animations);
    console.log(array);
    console.log(size);
    return animations;
}
function HeapSort(array){
    for (let i = Math.floor(size / 2); i >= 0; i --){
        maxHeap(array, i);
    }
    for (let i = array.length - 1; i > 0; i--){
        animations.push([0, i, array[0], array[i]]);
        swap(array, 0, i);
        size--
        maxHeap(array, 0);
    }
    return;
}
function maxHeap(array, i) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let max = i

    if (left < size && array[left] > array[max]){
        max = left
    }

    if (right < size && array[right] > array[max]){
        max = right
    }

    if (max != i) {
        animations.push([i, max, array[i], array[max]]);
        swap(array, i, max)
        maxHeap(array, max)
    }
}

function swap(input, indexA, indexB) {
    const temp = input[indexA]
    input[indexA] = input[indexB]
    input[indexB] = temp
}