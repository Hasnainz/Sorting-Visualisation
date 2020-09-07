import React from "react";
import './Styles/styles.css';
import getBubbleSortAnimations from './Algorithms/bubblesort';
import getHeapSortAnimations from './Algorithms/heapsort';
import getQuickSortAnimations from './Algorithms/quicksort';
import getMergeSortAnimations from './Algorithms/mergesort';
import getInsertionSortAnimations from './Algorithms/insertionsort';
//This file is the main body of the first page.

//This is to fit with solution requirement 2 so that the user has an easier time seeing what is going on.
const primaryColour = "#70b8c7"; //Air Superiority blue
const selectedColour = "#383683"; //Purple
const successColour = "#97DB4F"; //Inchworm green
const failedColour = "#D64933"; //Cinnabar
const pivotColour = "#383683"; //Deep Jungle Green
const backgroundColour = "FFFFFF";
let isRunning = false;
let barColour = primaryColour;
let size, pixelwidth, width, height, animationSpeed;

export default class Sort extends React.Component{
  constructor(properties){
    super(properties);

    //I have placed the array that is being sorted into the React state so that 
    //I can access it from anywhere across the program and that it automatically
    //rerenders the graph visuals whenever the array changes.
    this.state = { array: []};

    //This binds the buttons listeners with functions within the code.
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onSizeSliderChange = this.onSizeSliderChange.bind(this);
    this.onSpeedSliderChange = this.onSpeedSliderChange.bind(this);
  }
  //On startup, this is what runs.
  componentDidMount(){
    //Whenever a resize event is fired, the update window dimensions subroutine is called.
    window.addEventListener('resize', this.updateWindowDimensions());
    //This assigns initial values to the sliders so that they will work from the start.    
    size = 100;
    animationSpeed = 100;
    //This calculates how wide the width of each bar should be based on the size of the screen.
    pixelwidth = Math.floor((width/(size*2)));
    this.resetArray();
  }
  //On closing, this is what runs
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions());
  }
  //This is so that *hopefully* this will work on any sized screen as the compenents will be generated based on screen size
  updateWindowDimensions() {
    //Dynamically updating the height and width of the objects on the screen.
    width =  (window.innerWidth*(0.825));
    height = (window.innerHeight*(0.825));
  }
  StartSorting(){
    //This disables the buttons so that multiple animations on the same array can't run at the same time.
    isRunning = true;
    let buttons = document.getElementsByClassName("disabledbutton");
    for(let button of buttons){
      button.disabled = true;
    }
    //This disables the size slider so that you can't change the size of the array while it is running. 
    let slider = document.getElementById("size-slider");
    slider.disabled = true;
  }
  StopRunning(){
    isRunning = false;
    //This freezes the current state of the array.
    const arr = this.state.array;
    this.setState({ arr });
    //Undisables the buttons.
    let buttons = document.getElementsByClassName("disabledbutton");
    for(let button of buttons){
      button.disabled = false;
    }
    let slider = document.getElementById("size-slider");
    slider.disabled = false;
  }
  async AnimationFinished(){
    //A flashing green effect so that the user knows it is sorted.
    barColour = successColour;
    this.forceUpdate();
    await wait(1000);
    barColour = primaryColour;
    this.forceUpdate();
    this.StopRunning();
  }
  //Instead of returning a sorted array, these algorithms sort the array but return
  //an array of the order in which the elements were sorted giving an animation array.
  async BubbleSort(){
    //This sends a copy of the array so that the array isn't passed in by val
    let animations = getBubbleSortAnimations(this.state.array.slice());
    const length = animations.length;
    let arrayBars = document.getElementsByClassName("array-bar");
    this.StartSorting();
    for(let i=0;i<length;i++){
      //Checks if the stop button has been clicked.
      if(isRunning){
        //Assigns the indexes and heights to variables to be swapped and changed colours.
        let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i]

        let barOneStyle = arrayBars[barOneIndex].style;
        let barTwoStyle = arrayBars[barTwoIndex].style;
  
        barOneStyle.backgroundColor = selectedColour;
        barTwoStyle.backgroundColor = selectedColour;
        //This function sets a promise lasting the time specified in 
        //ms so that the animations don't happen instantly and can't be seen.
        await wait(animationSpeed);
        //This performs the same bubble sort calculation to swap them if they are larger.
        if(parseInt(barOneHeight) > parseInt(barTwoHeight)){
          barOneStyle.height = `${barTwoHeight}px`;
          this.state.array[barOneIndex] = barTwoHeight;

          barTwoStyle.height = `${barOneHeight}px`;
          this.state.array[barTwoIndex] = barOneHeight;
          await wait(animationSpeed);
        }else{
          barOneStyle.backgroundColor = failedColour;
          barTwoStyle.backgroundColor = failedColour;
          await wait(animationSpeed);
        }
        barOneStyle.backgroundColor = primaryColour;
        barTwoStyle.backgroundColor = primaryColour;
      }
      else{
        return;
      }
    }
    await this.AnimationFinished();
  }

  async MergeSort(){
    let animations = getMergeSortAnimations(this.state.array.slice());
    let arrayBars = document.getElementsByClassName("array-bar");
    const length = animations.length;
    this.StartSorting();
    for(let i = 0; i < length; i++){
      if(isRunning){
        let [barOneIndex, barTwoIndex, barHeight] = animations[i];
        //This acts as a buffer so that if the maximum size is reached, it won't have an out of bounds error.
        if(barOneIndex === size) barOneIndex--;
        if(barTwoIndex === size) barTwoIndex--;
        //Change colours then height then colours.
        let barOneStyle = arrayBars[barOneIndex].style;
        let barTwoStyle = arrayBars[barTwoIndex].style;
        barOneStyle.backgroundColor = selectedColour;
        barTwoStyle.backgroundColor = selectedColour;
        await wait(animationSpeed);
        //Since the merge sort algorithm worked by overidding the array, doing the same here
        //would be correct to fit in with solution requirement 3 of accuracy.
        barTwoStyle.height = `${barHeight}px`;
        this.state.array[barTwoIndex] = barHeight;
        await wait(animationSpeed);
        barOneStyle.backgroundColor = primaryColour;
        barTwoStyle.backgroundColor = primaryColour;
      }
      else{
        return;
      }
    }
    await this.AnimationFinished();
  }

  async HeapSort(){
    let animations = getHeapSortAnimations(this.state.array.slice());
    const length = animations.length;
    let arrayBars = document.getElementsByClassName("array-bar");
    this.StartSorting();
    for(let i = 0; i < length; i++){
      if(isRunning){
        //This swaps the height of two bars simultaneously to be accurate to heap sort swapping
        //parent with children values if needed fitting solution requirement 3.
        let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i];   
        arrayBars[barOneIndex].style.backgroundColor = selectedColour;
        arrayBars[barTwoIndex].style.backgroundColor = selectedColour;
        await wait(animationSpeed);
        arrayBars[barOneIndex].style.height = `${barTwoHeight}px`;
        this.state.array[barOneIndex] = barTwoHeight;

        arrayBars[barTwoIndex].style.height = `${barOneHeight}px`;
        this.state.array[barTwoIndex] = barOneHeight;

        arrayBars[barOneIndex].style.backgroundColor = successColour;
        arrayBars[barTwoIndex].style.backgroundColor = successColour;
        await wait(animationSpeed);
        arrayBars[barOneIndex].style.backgroundColor = primaryColour;
        arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
      }
      else{
        return;
      }
    }
    await this.AnimationFinished();
  }

  async QuickSort(){
    let animations = getQuickSortAnimations(this.state.array.slice());
    const length = animations.length;
    let arrayBars = document.getElementsByClassName("array-bar");
    let tempPivotIndex = 0;
    this.StartSorting();
    for(let i = 0; i < length; i++){
      if(isRunning){
        //This organises the animations information to split it into swapping or pivot values.
        if(animations[i].length === 4){
          //This is the swapping of the two i and j values in quicksort when they are being compared.
          let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i];   
          arrayBars[barOneIndex].style.height = `${barTwoHeight}px`;
          this.state.array[barOneIndex] = barTwoHeight;

          arrayBars[barTwoIndex].style.height = `${barOneHeight}px`;
          this.state.array[barTwoIndex] = barOneHeight;

          arrayBars[barOneIndex].style.backgroundColor = successColour;
          arrayBars[barTwoIndex].style.backgroundColor = successColour;
          await wait(animationSpeed);
          arrayBars[barOneIndex].style.backgroundColor = primaryColour;
          arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
        }
        else if(animations[i].length === 2){
          //This is to display the pivot value onto the screen so that you can see
          //What it is being compared against.
          if(i !== 0){
            let [previousPivot] = animations[i-1];
            arrayBars[previousPivot].style.backgroundColor = primaryColour;
          }
          let [pivotIndex] = animations[i];
          arrayBars[pivotIndex].style.backgroundColor = pivotColour;
          tempPivotIndex = pivotIndex;
          await wait(animationSpeed);
        }
        else{
          //If it is not a pivot value or a swap, then this just shows what is being selected. 
          let [barOneIndex] = animations[i];
          arrayBars[barOneIndex].style.backgroundColor = selectedColour;
          await wait(animationSpeed);
          arrayBars[barOneIndex].style.backgroundColor = primaryColour;
        }  
      }
      else{
        arrayBars[tempPivotIndex].style.backgroundColor = primaryColour;
        return;
      }
    }
    await this.AnimationFinished();
  }
  async InsertionSort(){
    let animations = getInsertionSortAnimations(this.state.array.slice());
    const length = animations.length;
    let arrayBars = document.getElementsByClassName("array-bar");
    this.StartSorting();
    for(let i = 0; i < length; i++){
      if(isRunning){
        if(animations[i].length === 3){
          //This is the selection animation
          let [barOneIndex, barTwoIndex, barOneHeight] = animations[i];
          //Comparison
          arrayBars[barOneIndex].style.backgroundColor = selectedColour;
          arrayBars[barTwoIndex].style.backgroundColor = selectedColour;
          //Acts like a memory buffer since the values are overwritten then rewritten to where they 
          //should be.
          arrayBars[barOneIndex+1].style.height = `${barOneHeight}px`;
          this.state.array[barOneIndex+1] = barOneHeight;

          await wait(animationSpeed);
          arrayBars[barOneIndex].style.backgroundColor = primaryColour;
          arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
        }
        else{
          //Insertion
          let [barOneIndex, keyHeight] = animations[i];
          arrayBars[barOneIndex].style.height = `${keyHeight}px`;
          this.state.array[barOneIndex] = keyHeight;

          await wait(animationSpeed);
        }
      }
      else{
        return;
      }
    }
    await this.AnimationFinished();
  }
  
  resetArray(){
    //This generates a random array.
    let array = [];
    for (let i = 0; i < size-1; i++){
      array.push(getRandomNumber(10, height));
    }
    this.setState({ array });
  }

  onSizeSliderChange(event){
    //This takes the value from the event parameter which is actually the slider.
    size = event.target.value;
    pixelwidth = Math.floor((width/(size*2)));
    if(pixelwidth < 1) pixelwidth = 1;
    this.resetArray()
  }
  
  onSpeedSliderChange(event){
    //This sets the animation speed but I wanted to set it so that the larger the 
    //slider, the faster the animation so I have set it subtract the target value instead
    //of the other way round.
    animationSpeed = 1000 - event.target.value;
  }

  render()
  {
    let array = this.state.array;
    return (
      <div className="total-container">
        <div className="array-container">
         {/*This places in an invisible bar acting like a support beam so that the buttons don't change 
         height based on the array sizes.*/} 
          <div className="not-array-bar"
              style={{
              backgroundColor: backgroundColour,
              height: `${height}px`,
              width: `${1}px`,
              }}
          ></div>
          {/*This maps the array values to the div heights which makes the on screen visual 
          and extremely easy to update since I can alter the styles or the array to change the visuals.*/}
          {array.map((value, index) => (
            <div className="array-bar"
              key={index}
              style={{
                backgroundColor: barColour,
                height: `${value}px`,
                width: `${pixelwidth}px`,
              }}></div>
          ))}
        </div>
        <div className="footer-container">
          <div>{/*Call backs of what the buttons do.*/}
              <button className="disabledbutton" onClick={() => this.resetArray()}>Generate New Array</button>
              <button className="disabledbutton" onClick={() => this.MergeSort()}>Merge Sort</button>
              <button className="disabledbutton" onClick={() => this.BubbleSort()}>Bubble Sort</button>
              <button className="disabledbutton" onClick={() => this.HeapSort()}>Heap Sort</button>
              <button className="disabledbutton" onClick={() => this.QuickSort()}>Quick Sort</button>
              <button className="disabledbutton" onClick={() => this.InsertionSort()}>Insertion Sort</button>
              <button className="stopbutton" onClick={() => this.StopRunning()}>Stop</button>
          </div>
          <div>{/*&nbsp; is a space. The min and max sizes are set here as well.*/}
            <label className="text">Size &nbsp;</label>
            <input 
            class="slider"
            id = "size-slider"
            type="range" 
            min="4"
            max="275"
            value={this.state.value}
            onChange={this.onSizeSliderChange}>
            </input>
          </div>
          <div>{/*The speed is set here so that the slowest speed is 10 seconds and slowest is 0 seconds*/}
            <label className="text">Speed</label>
            <input 
            class="slider"
            type="range" 
            min="1"
            max="1000"
            value={this.state.value}
            onChange={this.onSpeedSliderChange}>
            </input>
          </div>
        </div>
      </div >
    );
  }

}
function wait(ms) {
  //This resolves a promise which waits for the setTimeout to resolve for the time in ms.
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}



