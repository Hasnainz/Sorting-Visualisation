let animations;

export default function getQuickSortAnimations(array){
    animations = [];
    QuickSort(array, 0, array.length-1)
    return animations;
}
    
function QuickSort(array, left = 0, right = array.length - 1) {
    let len = array.length,index;
    if(len > 1) {
        //First a partition is made to organise where the pivot value is.
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
    //This sets up a pivot value to sort other values around.
    let middle = Math.floor((right + left) / 2),
        pivot = array[middle],
        i = left,
        j = right
        animations.push([middle, pivot])
    //Checks to make sure that the left value is smaller than the right value.
    while(i <= j) {
        //Compares the left value to the pivot value, increases it if it is smaller than the pivot.
        while(array[i] < pivot) {
            animations.push([i]);
            i++
        }
        //Compares right value is larger than the pivot value, decreases it if it smaller than the pivot.
        while(array[j] > pivot) {
            animations.push([j]);
            j--
        }
        //This will swap elements i and j which have been selected from the above process.
        if(i <= j) {
            animations.push([i, j, array[i], array[j]]); 
            //Swaps elements of the array.
            [array[i], array[j]] = [array[j], array[i]];
            i++
            j--
        }
    }
    return i;
}