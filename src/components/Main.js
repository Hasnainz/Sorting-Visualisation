import React from 'react';
import Sort from './Sort'
import './Styles/Styles.css';


export default class Main extends React.Component {

    constructor(props) {
        const size = 100;
        const height = 100;
        const array = getRandomArray(100, 100);
        super(props);
        this.state = {
            size: size,
            height: height,
            isSorting: false,
            array: array
        }

        this.handleSizeSlider = this.handleSizeSlider.bind(this);
        this.handleSpeedSlider = this.handleSpeedSlider.bind(this);
        this.handleResetArray = this.handleResetArray.bind(this);
        this.toggleSorting = this.toggleSorting.bind(this);
    }

    handleResetArray() {
        const arr = getRandomArray(this.state.size, this.state.height)
        this.setState({
            array: arr,
        })
    }

    handleSpeedSlider(event) {
        this.setState({
            speed: event.target.value
        })
    }

    handleSizeSlider(event) {
        const size = event.target.value;
        this.setState((state) => ({
            size: size,
            array: getRandomArray(state.size, state.height)
        }))
    }
    
    toggleSorting() {
        this.setState((state) => ({
            isSorting: !state.isSorting
        }));
    }


    render() {
        return(
            <div className="page-container">

                <label for="size">Size</label>
                <input 
                    type="range" 
                    id="size" 
                    min="4"
                    max="275"
                    value={this.state.size}
                    onChange={this.handleSizeSlider}/>

                <label for="speed">Speed</label>
                <input 
                    type="range" 
                    id="speed"
                    min="0"
                    max="1000"
                    value={this.state.speed}
                    onChange={this.handleSpeedSlider}/>
               
                <button onClick={this.toggleSorting}>
                    {!this.state.isSorting ? 'Sort' : 'Stop'}
                </button>

                <button onClick={this.handleResetArray}>⟳</button>

                <Sort array={this.state.array}/>
            </div>
        );
    }
}
function getRandomArray(size = 100, maxlength = 500){ 
    //This generates a random array.
    let array = [];
    for (let i = 0; i < size-1; i++){
        array.push(getRandomNumber(10, maxlength));
    }
    return array;
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}