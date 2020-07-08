export default function getBubbleSortAnimations(array){
    let animations = [];
    const arrayLength = array.length;
    let swapped;
    for (let i=arrayLength; i>0; i--) {
        swapped = 0;
        for ( let j=1; j<i; j++ ) {
        const a = array[j-1];
        const b = array[j];
        animations.push([j-1, j, a, b]);
            if (a > b) {
              array[j-1] = b;
              array[j] = a;
              swapped = j;
            }
        }
        if (!swapped) {
            break;
        }else {
            i = swapped + 1;
        }
    }
    return animations;
}
    
