import React from "react";
import './styles.css';
import getBubbleSortAnimations from './Algorithms/bubblesort';
import getHeapSortAnimations from './Algorithms/heapsort';
import getQuickSortAnimations from './Algorithms/quicksort';
import getMergeSortAnimations from './Algorithms/mergesort';
import getInsertionSortAnimations from './Algorithms/insertionsort';
//colours to use 
//#2b303a Gunmetal
//#dea478 Peach
//#f0c256 Yellow
//#d89598 Pink
//#70b8c7 light blue
//#9c9fb6 lilac
//#383683 purple
const primaryColour = "#6EA4BF"; //Air Superiority blue
const selectedColour = "#383683"; //Purple
const successColour = "#97DB4F"; //Inchworm green
const failedColour = "#D64933"; //Cinnabar
let backgroundColour = primaryColour;

let size, pixelwidth, width, height, animationSpeed;

export default class Sort extends React.Component{
  constructor(properties){
    super(properties);
    this.state = { array: []};

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onSizeSliderChange = this.onSizeSliderChange.bind(this);
    this.onSpeedSliderChange = this.onSpeedSliderChange.bind(this);
  }
  
  componentDidMount(){
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    size = 100;
    animationSpeed = 100;
    pixelwidth = Math.floor((width/(size*2)));
    this.resetArray();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    width =  (window.innerWidth*(0.9));
    height = (window.innerHeight*(0.9));
  }
  async displayAnimations(animations){
    const size = animations.length;
    let arrayBars = document.getElementsByClassName("array-bar");
    for(let i=0;i<size;i++){
      let [barOneIndex, barTwoIndex] = animations[i]

      let barOneStyle = arrayBars[barOneIndex].style;
      let barTwoStyle = arrayBars[barTwoIndex].style;

      console.log(arrayBars[barOneIndex].style.height);
      console.log(arrayBars[barTwoIndex].style.height)

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
    backgroundColour = successColour;
    this.forceUpdate();
    await wait(1000);
    backgroundColour = primaryColour;
    this.forceUpdate();
  }

  BubbleSort(){
    let animations = getBubbleSortAnimations(this.state.array);
    this.displayAnimations(animations);
  }

  MergeSort(){
    let animations = getMergeSortAnimations(this.state.array);
    this.displayAnimations(animations);
  }

  HeapSort(){
    let animations = getHeapSortAnimations(this.state.array);
    this.displayAnimations(animations);
  }

  QuickSort(){
    let animations = getQuickSortAnimations(this.state.array);
    this.displayAnimations(animations);
  }
  InsertionSort(){
    let animations = getInsertionSortAnimations(this.state.array);
    this.displayAnimations(animations);
  }
  
  resetArray(){
    const array = [];
    for (let i = 0; i < size; i++){
      array.push(getRandomNumber(10, height));
    }
    this.setState({ array });
  }

  onSizeSliderChange(event){
    size = event.target.value;
    pixelwidth = Math.floor((width/(size*2)));
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
          {array.map((value, index) => (
            <div className="array-bar"
              key={index}
              style={{
                backgroundColor: backgroundColour,
                height: `${value}px`,
                width: `${pixelwidth}px`,
              }}></div>
          ))}
        </div>
        <div className="footer-container">
          <div>
              <button onClick={() => this.resetArray()}>Generate New Array</button>
              <button onClick={() => this.MergeSort()}>Merge Sort</button>
              <button onClick={() => this.BubbleSort()}>Bubble Sort</button>
              <button onClick={() => this.HeapSort()}>Heap Sort</button>
              <button onClick={() => this.QuickSort()}>Quick Sort</button>
              <button onClick={() => this.InsertionSort()}>Insertion Sort</button>
          </div>
          <div>
            <label>Size &nbsp;</label>
            <input 
            class="size-slider"
            type="range" 
            min="4"
            max="300"
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



