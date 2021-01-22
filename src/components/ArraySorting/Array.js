import React from "react";
import './styles.css';
import Timer from './Timer';
import getBubbleSortAnimations from '../Algorithms/bubblesort';
import getHeapSortAnimations from '../Algorithms/heapsort';
import getQuickSortAnimations from '../Algorithms/quicksort';
import getMergeSortAnimations from '../Algorithms/mergesort';
import getInsertionSortAnimations from '../Algorithms/insertionsort';

const primaryColour = "#3DCBE0"; //blue
const selectedColour = "#7662F5"; //purple
const successColour = "#43F04F"; //green
const failedColour = "#FA5E3F"; //red
const pivotColour = "#198494"; //dark blue

export default class Array extends React.Component {
    constructor(props) {
        super(props);
        //Gets which sort type will be selected by default based on the size of the array.
        const defaultSortType = ChooseSortType(this.props.index);
        //Private Attributes
        this.state = {
            OGarray: this.props.array,
            array: this.props.array,
            isSorting: false,
            start: Date.now(),
            timerOn: false,
            comparisons: 0,
            sortType: defaultSortType,
        }
        //Binds the context of clicking a button to a function.
        this.handleSortTypeButtons = this.handleSortTypeButtons.bind(this);
    }
    componentDidUpdate() {
        //Checks if the parent array and the current array are different and will update the state.
        if(!compareArrays(this.state.OGarray, this.props.array)){
            this.setState({
                OGarray: this.props.array,
                array: this.props.array,
                start: Date.now(),
            })
        }
        //Gets and stores a copy of the current array so that the original array is not passed
        //in by reference. This is expensive but it is needed for control over the visuals of the array.
        const array = this.state.array.slice();
        let arrayBars = document.getElementsByName(`array${this.props.index}`)
        //If it should be sorting (parent component will tell it)
        //and if it is not already sorting.
        if(this.props.shouldSort && !this.state.isSorting) {
            //Then we set sorting to be true, initalise the timer with the current time and set the comparisons to 0;
            //This is so that time and comparisons are reset whenever sorting is restarted but stays on the screen
            //indefinately until that point in time.
            this.setState({ isSorting: true, timerOn: true, start: Date.now(), comparisons: 0});
            switch(this.state.sortType){
                case "merge":
                    this.MergeSort(getMergeSortAnimations(array), arrayBars);
                    break;
                case "insertion":
                    this.InsertionSort(getInsertionSortAnimations(array), arrayBars);
                    break;
                case "quick":
                    this.QuickSort(getQuickSortAnimations(array), arrayBars);
                    break;
                case "bubble":
                    this.BubbleSort(getBubbleSortAnimations(array), arrayBars);
                    break;
                case "heap":
                    this.HeapSort(getHeapSortAnimations(array), arrayBars);
                    break;
                default:
                    break;
            }
        }
        else if(!this.props.shouldSort && this.state.isSorting) {
            this.setState({ isSorting: false, timerOn: false});
            return;
        }
    }

    //Change the sorting type
    handleSortTypeButtons(e) {
        this.setState({
            sortType: e.target.value,
        })
    }
    //animation once the sorting has finished.
    async FinishSorting(arrayBars) {
        this.setState({ 
            timerOn: false 
        });
        //llambda function to change each bar colour.
        arrayBars.forEach(bar => {
            bar.style.backgroundColor = successColour;
        });
        await wait(1000);
        arrayBars.forEach(bar => {
            bar.style.backgroundColor = primaryColour;
        });
    }

    async MergeSort(animations, arrayBars) {
        let array = this.state.array.slice();
        const length = animations.length;
        for(let i = 0; i < length; i++){
          if(this.props.shouldSort){
            let [barOneIndex, barTwoIndex, barHeight] = animations[i];
            //Making sure that the bars are not going off the screen
            //(once one side has been sorted, it will point to nothing - this stops it)
            if(barOneIndex === this.props.array.length) barOneIndex--;
            if(barTwoIndex === this.props.array.length) barTwoIndex--;


            //Changing the colour of the bar.
            let barOneStyle = arrayBars[barOneIndex].style;
            let barTwoStyle = arrayBars[barTwoIndex].style;
            barOneStyle.backgroundColor = selectedColour;
            barTwoStyle.backgroundColor = selectedColour;
            await wait(this.props.speed);
            
            //Changing the height of the bar.
            barTwoStyle.height = `${barHeight}px`;
            array[barTwoIndex] = barHeight;
            await wait(this.props.speed);
            //Changing back the colour of the bar.
            barOneStyle.backgroundColor = primaryColour;
            barTwoStyle.backgroundColor = primaryColour;
          }
          else{
            return;
          }
          //Llambda function that takes the parameter of state so that it can be used
          //to update the state. Without this, the state may use an old version of state since
          //it doesn't update immediately.            
          this.setState((state) => ({array: array, comparisons: state.comparisons + 1}));
        }
        this.FinishSorting(arrayBars);
    }

    async InsertionSort(animations, arrayBars) {
        let array = this.state.array.slice();
        const length = animations.length;
        for(let i = 0; i < length; i++){
          if(this.props.shouldSort){
            if(animations[i].length === 3){
              //Setting the background colour.
              let [barOneIndex, barTwoIndex, barOneHeight] = animations[i];
              arrayBars[barOneIndex].style.backgroundColor = selectedColour;
              arrayBars[barTwoIndex].style.backgroundColor = selectedColour;

              arrayBars[barOneIndex+1].style.height = `${barOneHeight}px`;
              array[barOneIndex+1] = barOneHeight;

              await wait(this.props.speed);
              arrayBars[barOneIndex].style.backgroundColor = primaryColour;
              arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
            }
            else{
              let [barOneIndex, keyHeight] = animations[i];
              arrayBars[barOneIndex].style.height = `${keyHeight}px`;
              array[barOneIndex] = keyHeight;
              await wait(this.props.speed);
            }
          }
          else{
            return;
          }
          this.setState((state) => ({array: array, comparisons: state.comparisons + 1}));
        }
        this.FinishSorting(arrayBars);
    }
    async QuickSort(animations, arrayBars) {
        let array = this.state.array.slice();
        const length = animations.length;
        let tempPivotIndex = 0;
        for(let i = 0; i < length; i++){
          if(this.props.shouldSort){
            if(animations[i].length === 4){
              let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i];  

              arrayBars[barOneIndex].style.height = `${barTwoHeight}px`;
              array[barOneIndex] = barTwoHeight;

              arrayBars[barTwoIndex].style.height = `${barOneHeight}px`;
              array[barTwoIndex] = barOneHeight;

              arrayBars[barOneIndex].style.backgroundColor = successColour;
              arrayBars[barTwoIndex].style.backgroundColor = successColour;
              await wait(this.props.speed);
              arrayBars[barOneIndex].style.backgroundColor = primaryColour;
              arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
            }
            else if(animations[i].length === 2){
              if(i !== 0){
                let [previousPivot] = animations[i-1];
                arrayBars[previousPivot].style.backgroundColor = primaryColour;
              }
              let [pivotIndex] = animations[i];
              arrayBars[pivotIndex].style.backgroundColor = pivotColour;
              tempPivotIndex = pivotIndex;
              await wait(this.props.speed);
            }
            else{
              let [barOneIndex] = animations[i];
              arrayBars[barOneIndex].style.backgroundColor = selectedColour;
              await wait(this.props.speed);
              arrayBars[barOneIndex].style.backgroundColor = primaryColour;
            }  
          }
          else{
            arrayBars[tempPivotIndex].style.backgroundColor = primaryColour;
            return;
          }
          this.setState((state) => ({array: array, comparisons: state.comparisons + 1}));
        }
        this.FinishSorting(arrayBars);
    }
    async BubbleSort(animations, arrayBars) {
        let array = this.state.array.slice();
        const length = animations.length;
        for(let i = 0; i < length; i++){
            if(this.props.shouldSort){
                let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i]
                let barOneStyle = arrayBars[barOneIndex].style;
                let barTwoStyle = arrayBars[barTwoIndex].style;
                barOneStyle.backgroundColor = selectedColour;
                barTwoStyle.backgroundColor = selectedColour;
                await wait(this.props.speed);

                if(parseInt(barOneHeight) > parseInt(barTwoHeight)){
                    barOneStyle.height = `${barTwoHeight}px`;
                    array[barOneIndex] = barTwoHeight;

                    barTwoStyle.height = `${barOneHeight}px`;
                    array[barTwoIndex] = barOneHeight;
                    
                    barOneStyle.backgroundColor = successColour;
                    barTwoStyle.backgroundColor = successColour;
                }else{
                    barOneStyle.backgroundColor = failedColour;
                    barTwoStyle.backgroundColor = failedColour;
                }
                await wait(this.props.speed);
                barOneStyle.backgroundColor = primaryColour;
                barTwoStyle.backgroundColor = primaryColour;
            }
            else{
                return;
            }
            this.setState((state) => ({array: array, comparisons: state.comparisons + 1}));
        }
        this.FinishSorting(arrayBars);
    }
    async HeapSort(animations, arrayBars) {
        let array = this.state.array.slice();
        const length = animations.length;
        for(let i = 0; i < length; i++){
          if(this.props.shouldSort){
            let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i];   
            arrayBars[barOneIndex].style.backgroundColor = selectedColour;
            arrayBars[barTwoIndex].style.backgroundColor = selectedColour;
            await wait(this.props.speed);

            arrayBars[barOneIndex].style.height = `${barTwoHeight}px`;  
            array[barOneIndex] = barTwoHeight;

            arrayBars[barTwoIndex].style.height = `${barOneHeight}px`;
            array[barTwoIndex] = barOneHeight;
            
            arrayBars[barOneIndex].style.backgroundColor = successColour;
            arrayBars[barTwoIndex].style.backgroundColor = successColour;
            await wait(this.props.speed);
            arrayBars[barOneIndex].style.backgroundColor = primaryColour;
            arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
          }
          else{
            return;
          }
          this.setState((state) => ({array: array, comparisons: state.comparisons + 1}));
        }
        this.FinishSorting(arrayBars);
    }

    render() {
        const array = this.state.array;
        const maxheight = this.props.maxheight;
        const pixelwidth = calculatePixelWidth(window.innerWidth,array.length);
        return(
            <div className="array">
                <div className="transparent-array-bar"
                     style={{
                         height: `${maxheight}px`,
                         width: `${1}px`,
                         backgroundColor: `transparent`,
                     }}>

                </div>

                {array.map((value, index) => (
                    <div className="array-bar"
                         name={`array${this.props.index}`}
                         key={index}
                         style={{
                         height: `${value}px`,
                         width: `${pixelwidth}px`,
                }}></div>))}

                <div className="sort-button-container">
                    <label className="radio-label">
                        <input type="radio" 
                            id="merge" 
                            value="merge"
                            checked={this.state.sortType === "merge"} 
                            name={`${this.props.index}`} 
                            onChange={this.handleSortTypeButtons}/>
                        <span className="checkmark"></span>Merge
                    </label>
                    <label className="radio-label">
                        <input type="radio" className="radio-button"
                            id="insertion" 
                            value="insertion" 
                            checked={this.state.sortType === "insertion"} 
                            name={`${this.props.index}`} 
                            onChange={this.handleSortTypeButtons}/>
                        <span className="checkmark"></span>Insertion
                    </label>
                    
                    <label className="radio-label">
                        <input type="radio" 
                            id="quick" 
                            value="quick" 
                            checked={this.state.sortType === "quick"} 
                            name={`${this.props.index}`} 
                            onChange={this.handleSortTypeButtons}/>
                        <span className="checkmark"></span>Quick
                    </label>

                    <label className="radio-label">
                        <input type="radio" 
                            id="bubble" 
                            value="bubble" 
                            checked={this.state.sortType === "bubble"} 
                            name={`${this.props.index}`} 
                            onChange={this.handleSortTypeButtons}/>
                        <span className="checkmark"></span>Bubble
                    </label>

                    <label className="radio-label">
                        <input type="radio" 
                            id="heap" 
                            value="heap" 
                            checked={this.state.sortType === "heap"} 
                            name={`${this.props.index}`} 
                            onChange={this.handleSortTypeButtons}/>
                        <span className="checkmark"></span>Heap
                    </label>
                    <Timer isSorting={this.state.timerOn} 
                           doReset={this.state.reset}
                           start={this.state.start}/>
                    <label className="radio-label">
                        Comparisons : {this.state.comparisons}
                    </label>
                </div>
            </div>
            
        );
    }
}
function ChooseSortType(index) {
    let sortType;
    switch (index) {
        case 0:
            sortType = "merge";
            break;
        case 1:
            sortType = "insertion";
            break;
        case 2:
            sortType = "quick";
            break;
        case 3:
            sortType = "bubble";
            break;
        case 4:
            sortType = "heap";
            break;
        default:
            break;
    }
    return sortType;
}
function compareArrays(array1, array2){
    if(array1.length !== array2.length){
        return false;
    }
    for(let i = 0; i < array1.length; i++){
        if(array1[i] !== array2[i]){
            return false
        }
    }
    return true;
}
function calculatePixelWidth(WindowWidth, ArraySize) {
    return (WindowWidth*0.36/ArraySize);
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }