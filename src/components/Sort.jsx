import React from "react";
import './styles.css';
import getBubbleSortAnimations from './Algorithms/bubblesort';
import getHeapSortAnimations from './Algorithms/heapsort';
import getQuickSortAnimations from './Algorithms/quicksort';
import getMergeSortAnimations from './Algorithms/mergesort';
import getInsertionSortAnimations from './Algorithms/insertionsort';

const primaryColour = "#70b8c7"; //Air Superiority blue
const selectedColour = "#383683"; //Purple
const successColour = "#97DB4F"; //Inchworm green
const failedColour = "#D64933"; //Cinnabar
const backgroundColour = "FFFFFF";
let isRunning = false;
let barColour = primaryColour;
let size, pixelwidth, width, height, animationSpeed;

export default class Sort extends React.Component{
  constructor(properties){
    super(properties);
    this.state = { array: []};

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onSizeSliderChange = this.onSizeSliderChange.bind(this);
    this.onSpeedSliderChange = this.onSpeedSliderChange.bind(this);
  }
  //On startup, this is what runs.
  componentDidMount(){
    window.addEventListener('resize', this.updateWindowDimensions());
    this.updateWindowDimensions();
    size = 100;
    animationSpeed = 100;
    pixelwidth = Math.floor((width/(size*2)));
    this.resetArray();
  }
  //On closing, this is what runs
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions());
  }
  //This is so that *hopefully* this will work on any sized screen as the compenents will be generated based on screen size
  updateWindowDimensions() {
    width =  (window.innerWidth*(0.9));
    height = (window.innerHeight*(0.9));
  }
  StartSorting(){
    isRunning = true;
    let buttons = document.getElementsByClassName("disabledbutton");
    for(let button of buttons){
      button.disabled = true;
    }
    let slider = document.getElementById("size-slider");
    slider.disabled = true;
  }
  StopRunning(){
    isRunning = false;
    const arr = this.state.array;
    this.setState({ arr });
    let buttons = document.getElementsByClassName("disabledbutton");
    for(let button of buttons){
      button.disabled = false;
    }
    let slider = document.getElementById("size-slider");
    slider.disabled = false;
  }
  async AnimationFinished(){
    barColour = successColour;
    this.forceUpdate();
    await wait(1000);
    barColour = primaryColour;
    this.forceUpdate();

  }
  //Instead of returning a sorted array, these algorithms sort the array but return
  //an array of the order in which the elements were sorted giving an animation array.
  //This allows for features such as pausing and playing to be added with more ease.
  async BubbleSort(){
    let animations = getBubbleSortAnimations(this.state.array.slice());
    const size = animations.length;
    let arrayBars = document.getElementsByClassName("array-bar");
    this.StartSorting();
    for(let i=0;i<size;i++){
      if(isRunning){
        let [barOneIndex, barTwoIndex] = animations[i]

        let barOneStyle = arrayBars[barOneIndex].style;
        let barTwoStyle = arrayBars[barTwoIndex].style;
  
        barOneStyle.backgroundColor = selectedColour;
        barTwoStyle.backgroundColor = selectedColour;
        await wait(animationSpeed);
  
        if(parseInt(arrayBars[barOneIndex].style.height) > parseInt(arrayBars[barTwoIndex].style.height)){
  
          let temp = arrayBars[barTwoIndex].style.height;
          arrayBars[barTwoIndex].style.height = arrayBars[barOneIndex].style.height;
          arrayBars[barOneIndex].style.height = temp;
  
          barOneStyle.backgroundColor = successColour;
          barTwoStyle.backgroundColor = successColour;
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
    this.AnimationFinished();
  }

  async MergeSort(){
    let animations = getMergeSortAnimations(this.state.array.slice());
    let arrayBars = document.getElementsByClassName("array-bar");
    const length = animations.length;
    this.StartSorting();
    for(let i = 0; i < length; i++){
      if(isRunning){
        let [barOneIndex, barTwoIndex, barHeight] = animations[i];
        if(barOneIndex === size) barOneIndex--;
        if(barTwoIndex === size) barTwoIndex--;
  
        let barOneStyle = arrayBars[barOneIndex].style;
        let barTwoStyle = arrayBars[barTwoIndex].style;
        barOneStyle.backgroundColor = selectedColour;
        barTwoStyle.backgroundColor = selectedColour;
        await wait(animationSpeed);
        arrayBars[barTwoIndex].style.height = `${barHeight}px`;
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
        let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i];   
        arrayBars[barOneIndex].style.backgroundColor = selectedColour;
        arrayBars[barTwoIndex].style.backgroundColor = selectedColour;
        await wait(animationSpeed);
        arrayBars[barOneIndex].style.height = `${barTwoHeight}px`;
        arrayBars[barTwoIndex].style.height = `${barOneHeight}px`;
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
        if(animations[i].length === 4){
          let [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i];   
          arrayBars[barOneIndex].style.height = `${barTwoHeight}px`;
          arrayBars[barTwoIndex].style.height = `${barOneHeight}px`;
          arrayBars[barOneIndex].style.backgroundColor = successColour;
          arrayBars[barTwoIndex].style.backgroundColor = successColour;
          await wait(animationSpeed);
          arrayBars[barOneIndex].style.backgroundColor = primaryColour;
          arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
        }
        else if(animations[i].length === 2){
          if(i !== 0){
            let [previousPivot, notpivot] = animations[i-1];
            arrayBars[previousPivot].style.backgroundColor = primaryColour;
          }
          let [pivotIndex, pivot] = animations[i];
          arrayBars[pivotIndex].style.backgroundColor = selectedColour;
          await wait(animationSpeed);
        }
        else{
          let [barOneIndex] = animations[i];
          tempPivotIndex = barOneIndex;
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
          let [barOneIndex, barTwoIndex, barOneHeight] = animations[i];
          arrayBars[barOneIndex].style.backgroundColor = selectedColour;
          arrayBars[barTwoIndex].style.backgroundColor = selectedColour;
          arrayBars[barOneIndex+1].style.height = `${barOneHeight}px`;
          await wait(animationSpeed);
          arrayBars[barOneIndex].style.backgroundColor = primaryColour;
          arrayBars[barTwoIndex].style.backgroundColor = primaryColour;
        }
        else{
          let [barOneIndex, keyHeight, turn] = animations[i];
          arrayBars[barOneIndex].style.height = `${keyHeight}px`;
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
    let array = [];
    for (let i = 0; i < size-1; i++){
      array.push(getRandomNumber(10, height));
    }
    this.setState({ array });
  }
  
  shuffle(array) {
    //Fisher-Yates Shuffle - most time efficient shuffle algorithm which is important 
    //for when you are generating this many arrays.
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

  onSizeSliderChange(event){
    size = event.target.value;
    pixelwidth = Math.floor((width/(size*2)));
    if(pixelwidth < 1) pixelwidth = 1;
    this.resetArray()
  }
  
  onSpeedSliderChange(event){
    animationSpeed = 1000 - event.target.value;
  }

  render()
  {
    let array = this.state.array;
    return (
      <div className="total-container">
        <div className="array-container">
          <div className="not-array-bar"
              style={{
              backgroundColor: backgroundColour,
              height: `${height}px`,
              width: `${1}px`,
              }}
          ></div>
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
          <div>
              <button className="disabledbutton" onClick={() => this.resetArray()}>Generate New Array</button>
              <button onClick={() => this.StopRunning()}>Stop</button>
              <button className="disabledbutton" onClick={() => this.MergeSort()}>Merge Sort</button>
              <button className="disabledbutton" onClick={() => this.BubbleSort()}>Bubble Sort</button>
              <button className="disabledbutton" onClick={() => this.HeapSort()}>Heap Sort</button>
              <button className="disabledbutton" onClick={() => this.QuickSort()}>Quick Sort</button>
              <button className="disabledbutton" onClick={() => this.InsertionSort()}>Insertion Sort</button>
          </div>
          <div>
            <label>Size &nbsp;</label>
            <input 
            class="size-slider"
            id = "size-slider"
            type="range" 
            min="4"
            max="275"
            value={this.state.value}
            onChange={this.onSizeSliderChange}>
            </input>
          </div>
          <div>
            <label>Speed</label>
            <input 
            class="size-slider"
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
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}


