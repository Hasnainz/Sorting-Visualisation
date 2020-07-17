import React from 'react';
import axios from 'axios';
import './RuntimeStyles.css';
import getBubbleSortAnimations from './Algorithms/bubblesort';
import getHeapSortAnimations from './Algorithms/heapsort';
import getQuickSortAnimations from './Algorithms/quicksort';
import getMergeSortAnimations from './Algorithms/mergesort';
import getInsertionSortAnimations from './Algorithms/insertionsort';
import {getRandomNumber} from './Sort.jsx';
import { Bar } from 'react-chartjs-2';

let size = 5000;

export default class Runtimes extends React.Component{
  constructor(properties){
    super(properties);
    this.state = {
      disabled : false,
      RunTimeModels : [],
      RunTimeModelResponses : [],
      data : {},
      options : {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
            }
          }]
        }
      }
    }
  }
  async PushRunTimeData(){
    let size = this.state.RunTimeModels.length;
    for(let i = 0; i < size; i++){
      await axios.post('http://localhost:5000/runtime/add', this.state.RunTimeModels[i])
      .then(res => console.log(res.data));
    }
    this.componentDidMount();
  }
  componentDidMount(){
    axios.get('http://localhost:5000/runtime/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          RunTimeModelResponses : response.data
        },this.SetGraphData)
      }
    })
  }
  SetGraphData(){
    console.log(size);
    let Bubble = [];
    let Merge = [];
    let Quick = [];
    let Heap = [];
    let Insertion = [];
    for(let i = 0; i < this.state.RunTimeModelResponses.length; i++){
        switch(this.state.RunTimeModelResponses[i].sort){
          case 'bubble':
            if(this.state.RunTimeModelResponses[i].sortsize == size){
              Bubble.push(this.state.RunTimeModelResponses[i].runtime)
            }
            break;
          case 'merge':
            if(this.state.RunTimeModelResponses[i].sortsize == size){
              Merge.push(this.state.RunTimeModelResponses[i].runtime)
            }
            break;
          case 'quick':
            if(this.state.RunTimeModelResponses[i].sortsize == size){
              Quick.push(this.state.RunTimeModelResponses[i].runtime)
            }
            break;
          case 'heap':
            if(this.state.RunTimeModelResponses[i].sortsize == size){
              Heap.push(this.state.RunTimeModelResponses[i].runtime)
            }
            break;
          case 'insertion':
            if(this.state.RunTimeModelResponses[i].sortsize == size){
              Insertion.push(this.state.RunTimeModelResponses[i].runtime)
            }
            break;
          default:
            break;
      }
    }
    let BubbleAverage = AverageArray(Bubble);
    let MergeAverage = AverageArray(Merge);
    let QuickAverage = AverageArray(Quick);
    let HeapAverage = AverageArray(Heap);
    let InsertionAverage = AverageArray(Insertion);
    this.setState({
      data : {      
        labels : ['Bubble', 'Merge', 'Quick', 'Heap', 'Insertion'],
        datasets : [{
          label : ['Runtime'],
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data : [BubbleAverage,MergeAverage,QuickAverage,HeapAverage,InsertionAverage]
        }]
        
      }
    });
  }
  async GenerateNewTestCases(){
    if(this.state.disabled === true) { return; }
    this.setState({disabled : true});
    let sorttype;
    let RunTimeModelArray = [];
    for(let size = 100; size <= 100; size+=1){
      for(let j = 0; j < 5; j++){
        switch(j){
          case 0:
            sorttype = 'bubble';
            break;
          case 1:
            sorttype = 'merge';
            break;
          case 2:
            sorttype = 'quick';
            break;
          case 3:
            sorttype = 'heap';
            break;
          case 4:
            sorttype = 'insertion';
            break;
          default:
            break;
        }
        let array = this.resetArray(size);
        let runtime = this.findRuntime(array, sorttype, size);
        const RunTimeModel = ({SortType:sorttype, RunTime:runtime,  ArraySize:size});
        RunTimeModelArray.push(RunTimeModel);
      }
    }
    this.setState({
      RunTimeModels : this.state.RunTimeModels.concat(RunTimeModelArray)
    }, this.PushRunTimeData);
  }
  findRuntime(array, SortType){
    let t0, t1;
    switch(SortType){
      case 'bubble':
        t0 = performance.now();
        getBubbleSortAnimations(array)
        t1 = performance.now();
        break;
      case 'merge':
        t0 = performance.now();
        getMergeSortAnimations(array)
        t1 = performance.now();
        break;
      case 'quick':
        t0 = performance.now();
        getQuickSortAnimations(array)
        t1 = performance.now();
        break;
      case 'heap':
        t0 = performance.now();
        getHeapSortAnimations(array)
        t1 = performance.now();
        break;
      case 'insertion':
        t0 = performance.now();
        getInsertionSortAnimations(array)
        t1 = performance.now();
        break;
      default:
        break;
      }
    return t1-t0;
  }
  resetArray(maxarraysize){
    let array = [];
    for (let i = 0; i < maxarraysize-1; i++){
      array.push(getRandomNumber(0, 5000));
    }
    return array;
  }
  onSizeSliderChange(event){
    size = event.target.value; 
  }
 
  render()
  {
    return (
      <div className="total-container">
        <div>
          <Bar
          data={this.state.data}
          options={this.state.options}>
          </Bar>
        </div>
        <div>
          <button className="button"
                  onClick={() => this.GenerateNewTestCases()}>
                  Generate new test cases</button>
          <button className="button"
                  onClick={() => this.SetGraphData()}>
                  Re-generate graph</button>
        </div>
        <div>
            <label className="text">Array Size</label>
            <input 
            className="slider"
            type="range" 
            min="5"
            max="200"
            value={this.state.value}
            onChange={this.onSizeSliderChange}>
            </input>
          </div>
      </div >
    );
  }

}
function AverageArray(array){
  const size = array.length;
  let sum = 0;
  for(let i = 0; i < size; i++){
    sum += array[i];
  }
  return sum/size;
}