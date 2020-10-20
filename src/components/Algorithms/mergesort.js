export default function getMergeSortAnimations(array){
    //By using array.slice(), I assign the auxiliary array to a copy of the array.
    //I then use this to sort on but I can still have a copy of the original array.
    const auxiliaryArray = array.slice();
    const animations = []
    if (array.length <= 1) return array;
    MergeSort(array, auxiliaryArray, 0, array.length - 1, animations);
    return animations;
}
function MergeSort(array, auxillaryArray, start, end, animations){
    if(start === end) return;
    const middle = Math.floor((start + end)/2);
    //I first run merge sort recursively on the first half of the array.
    MergeSort(auxillaryArray, array, start, middle, animations);
    //Then run merge sort recursively on the second half of the array.
    MergeSort(auxillaryArray, array, middle + 1, end, animations);
    //Then use the auxillary array in place of the array
    Merge(array, auxillaryArray, start, end, middle, animations);
}
function Merge(array, auxillaryArray, start, end, middle, animations){
    let left = start;
    let right = middle + 1;
    let index = start;
    //This goes from the left and right pillar and merges them together by overriding the array using values from the auxillary array.
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
    //When doing the above step there will be left over values where one pillar has reached its end although the other hasn't 
    //This is to push the other pillar to the end and overwrite those values.
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
