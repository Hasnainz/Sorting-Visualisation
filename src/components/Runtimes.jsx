import React from "react";
import './RuntimeStyles.css';
import getBubbleSortAnimations from './Algorithms/bubblesort';
import getHeapSortAnimations from './Algorithms/heapsort';
import getQuickSortAnimations from './Algorithms/quicksort';
import getMergeSortAnimations from './Algorithms/mergesort';
import getInsertionSortAnimations from './Algorithms/insertionsort';
import {getRandomNumber} from './Sort.jsx';



export default class Runtimes extends React.Component{
  constructor(properties){
    super(properties);
    this.state = {
      disabled : false,
      RunTimeModels : []
    }
  }
  CheckTest(){
    console.log(this.state.RunTimeModels);
  }

  GetRunTimeData(){
    
  }
  PushRunTimeData(){
    
  }
  //On startup, this is what runs.
  componentDidMount(){

  }
  //On closing, this is what runs
  componentWillUnmount() {

  }
  async GenerateNewTestCases(){
    if(this.state.disabled === true) { return; }
    this.setState({disabled : true});
    let sorttype;
    let RunTimeModelArray = [];
    for(let size = 5; size <= 5120; size*=2){
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
        const RunTimeModel = ({RunTime:runtime, SortType:sorttype, ArraySize:size});
        RunTimeModelArray.push(RunTimeModel);
      }
    }
    this.setState((state) => {
      return{
        RunTimeModels : state.RunTimeModels.concat(RunTimeModelArray)
      }
    })
    this.PushRunTimeData();
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
        <button className="button"
                onClick={() => this.GenerateNewTestCases()}>
                Generate new test cases</button>
        <button className="button"
                onClick={() => this.CheckTest()}>
                Check Test</button>
      </div >
    );
  }

}
