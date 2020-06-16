export default function getMergeSortAnimations(array){
    const auxiliaryArray = array.slice();
    const animations = []
    if (array.length <= 1) return array;
    MergeSort(array, auxiliaryArray, 0, array.length - 1, animations);
    console.log(animations);
    return animations;
}
function MergeSort(array, auxillaryArray, start, end, animations){
    if(start === end) return;
    const middle = Math.floor((start + end)/2);
    MergeSort(auxillaryArray, array, start, middle, animations);
    MergeSort(auxillaryArray, array, middle + 1, end, animations);
    Merge(array, auxillaryArray, start, end, middle, animations);
}
function Merge(array, auxillaryArray, start, end, middle, animations){
    let left = start;
    let right = middle + 1;
    let index = start;
    console.log(array.length);
    while(left <= middle && right <= end){
        if(auxillaryArray[left] < auxillaryArray[right]){
            animations.push([left, index, auxillaryArray[left]])
            array[index] = auxillaryArray[left];
            left++;
        }else{
            animations.push([right, index, auxillaryArray[right]])
            array[index] = auxillaryArray[right];
            right++;
        }
        index++;
    }
    while(left <= middle){
        animations.push([left, index,auxillaryArray[left]])
        array[index] = auxillaryArray[left];
        left++;
        index++;
    }
    while(right <= end){
        animations.push([right, index, auxillaryArray[right]])
        array[index] = auxillaryArray[right];
        right++;
        index++;
    }
}
