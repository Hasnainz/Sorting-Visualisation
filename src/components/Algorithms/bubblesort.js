export default function getBubbleSortAnimations(array){
    //Initialise the animations array so that it can be returned.
    let animations = [];
    const arrayLength = array.length;
    //Assign swapped to a variable so i
    let swapped;
    //This starts from the end of the array.
    for (let i = arrayLength; i > 0; i--) {
        swapped = 0;
        //This increments the end of the array so that it doesn't check already sorted values.
        for ( let j = 1; j < i; j++ ) {
        //Assigning the values of elements that are being compared.
        const a = array[j-1];
        const b = array[j];
        //sending this information to the animation array so that the program can do the same calculation below.
        animations.push([j-1, j, a, b]);
            if (a > b) {
              array[j-1] = b;
              array[j] = a;
              swapped = j;
            }
        }
        //If 0 then it will appear as false and break out of the loop because the swapped is the index of the swap 
        if (!swapped) {
            break;
        }else {
            i = swapped + 1;
        }
    }
    return animations;
}
    
