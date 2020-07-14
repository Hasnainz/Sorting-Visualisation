import React from 'react';
import axios from 'axios';
import './RuntimeStyles.css';
import getBubbleSortAnimations from './Algorithms/bubblesort';
import getHeapSortAnimations from './Algorithms/heapsort';
import getQuickSortAnimations from './Algorithms/quicksort';
import getMergeSortAnimations from './Algorithms/mergesort';
import getInsertionSortAnimations from './Algorithms/insertionsort';
import {getRandomNumber} from './Sort.jsx';
import { Line as LineChart } from 'react-chartjs-2';


export default class Runtimes extends React.Component{
  constructor(properties){
    super(properties);
    this.state = {
      disabled : false,
      RunTimeModels : [],
      RunTimeModelResponses : [],
      data : {},
      options : {}
    }
  }
  CheckTest(){
    console.log(this.state.RunTimeModels);
    console.log(this.state.RunTimeModelResponses);

  }
  PushRunTimeData(){
    let size = this.state.RunTimeModels.length;
    for(let i = 0; i < size; i++){
      axios.post('http://localhost:5000/runtime/add', this.state.RunTimeModels[i])
      .then(res => console.log(res.data));
    }
   
  }
  componentDidMount(){
    axios.get('http://localhost:5000/runtime/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          RunTimeModelResponses : response.data
        }, this.SetGraphData)
      }
    })
  }
  SetGraphData(){
    let BubbleLabels = [];
    let Bubble = [];
    let Merge = [];
    let Quick = [];
    let Heap = [];
    let Insertion = [];

    for(let i = 0; i < this.state.RunTimeModelResponses.length; i++){
        switch(this.state.RunTimeModelResponses[i].sort){
          case 'bubble':
            Bubble.push({x: this.state.RunTimeModelResponses[i].sortsize,  y: this.state.RunTimeModelResponses[i].runtime})
            BubbleLabels.push(this.state.RunTimeModelResponses[i].sortsize);
            break;
          case 'merge':
            Merge.push({x: this.state.RunTimeModelResponses[i].sortsize,  y: this.state.RunTimeModelResponses[i].runtime})
            break;
          case 'quick':
            Quick.push({x: this.state.RunTimeModelResponses[i].sortsize,  y: this.state.RunTimeModelResponses[i].runtime})
            break;
          case 'heap':
            Heap.push({x: this.state.RunTimeModelResponses[i].sortsize,  y: this.state.RunTimeModelResponses[i].runtime})
            break;
          case 'insertion':
            Insertion.push({x: this.state.RunTimeModelResponses[i].sortsize,  y: this.state.RunTimeModelResponses[i].runtime})
            break;
          default:
            break;
      }
    }
    console.log(Bubble);
    this.setState({
      data : {
        labels: BubbleLabels,
            datasets: [
              {
                label: 'Bubble',
                fill: false,
                showLine: true, 
                backgroundColor: 'rgba(75,192,192,0.4)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: Bubble
              }
            ]
      }
    });
    
      
  }
  async GenerateNewTestCases(){
    if(this.state.disabled === true) { return; }
    this.setState({disabled : true});
    let sorttype;
    let RunTimeModelArray = [];
    for(let size = 2500; size <= 2500; size+=1){
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

 
  render()
  {
    return (
      <div className="total-container">
        <div>
          <LineChart
          data={this.state.data}
          options={this.state.options}
          width="600" height="250">
          </LineChart>
        </div>
        <div>
          <button className="button"
                  onClick={() => this.GenerateNewTestCases()}>
                  Generate new test cases</button>
          <button className="button"
                  onClick={() => this.CheckTest()}>
                  Check</button>
        </div>
      </div >
    );
  }

}
