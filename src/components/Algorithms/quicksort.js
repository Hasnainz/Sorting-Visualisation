let animations;

export default function getQuickSortAnimations(array){
    animations = [];
    QuickSort(array, 0, array.length-1)
    return animations;
}
    
function QuickSort(array, left = 0, right = array.length - 1) {
    let len = array.length,index;
    if(len > 1) {
      index = Partition(array, left, right)
      if(left < index - 1) {
        QuickSort(array, left, index - 1);
      } 
      if(index < right) {
        QuickSort(array, index, right);
      }
    }
    return array;
}

function Partition(array, left, right) {
    let middle = Math.floor((right + left) / 2),
        pivot = array[middle],
        i = left,
        j = right
        animations.push([middle, pivot])
    while(i <= j) {
        while(array[i] < pivot) {
            animations.push([i]);
            i++
        }
        while(array[j] > pivot) {
            animations.push([j]);
            j--
        }
        
        if(i <= j) {
            animations.push([i, j, array[i], array[j]]); 
            [array[i], array[j]] = [array[j], array[i]];
            i++
            j--
        }
    }
    return i;
}