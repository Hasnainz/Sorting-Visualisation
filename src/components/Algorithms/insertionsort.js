let animations;
export default function getInsertionSortAnimations(array){
    animations = [];
    insertionSort(array);
    return animations;
}
    
function insertionSort(array){
    let size = array.length;
    for (let i = 1; i < size; i++){
        //This assigns indexes i, j and the values of them. 
        let key = array[i];
        let j = i - 1;
        //This for each element, keeps moving left until it has found the place 
        //where it needs to be inserted and then it inserts it there.
        while (j >= 0 && array[j] > key){
            animations.push([j, i, array[j]]);
            array[j + 1] = array[j];
            j-- ;
        }
        animations.push([j+1, key])
        array[j + 1] = key;
    }
    return array;
};