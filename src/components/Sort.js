import React from "react";
import ArrayContainer from './ArrayContainer';
import './Styles/Styles.css';

export default class Sort extends React.Component {
    constructor(props){
        super(props);
        const size = calculateMaxArraySize(this.props.width);
        const barlength = calculateBarLength(this.props.height, 3)
        this.state = {
            size: size,
            barlength: barlength,
            array: getRandomArray(size, barlength),
            arraycount: 3,
        }
        this.handleSizeSlider = this.handleSizeSlider.bind(this);
        this.handleAddArray = this.handleAddArray.bind(this);
        this.handleResetArray = this.handleResetArray.bind(this);
    }

    handleSizeSlider(event) {
        const size = event.target.value;
        this.setState((state) => ({
            size: size,
            array: getRandomArray(size, state.barlength)
        }))
    }

    handleResetArray() {
        const arr = getRandomArray(this.state.size, this.state.barlength)
        this.setState({
            array: arr,
        })
    }

    handleAddArray(e) {
        let arraycount = this.state.arraycount;
        if(arraycount < 5 && e.target.value === "+") {
            arraycount++;
        }
        else if(arraycount > 1 && e.target.value === "-") {
            arraycount--;
        }
        else{
            return;
        }
        const barlength = calculateBarLength(this.props.height, arraycount)
        this.setState({
            arraycount: arraycount,
            barlength: barlength,
            array: getRandomArray(this.state.size, barlength)
        });
    }
    
    render() {
        return(
            <div>
                <div className="array-container">
                    <ArrayContainer
                        width={this.props.width}
                        arraycount={this.state.arraycount} 
                        array={this.state.array}
                        maxheight={this.state.barlength}/>
                </div>

                <div className="button-container">
                    <button className="medium-button" 
                            value="-" 
                            onClick={(e) => this.handleAddArray(e)}>-</button>

                    <button className="medium-button" 
                        onClick={this.handleResetArray}>⟳</button>

                    <button className="medium-button" 
                        value="+"
                         onClick={(e) => this.handleAddArray(e)}>+</button>
                </div>

                <div className="slider-container">
                    <label htmlFor="size" className="slider-label">Size</label>
                    <input 
                        className="main-slider"
                        type="range" 
                        id="size" 
                        min="4"
                        max={calculateMaxArraySize(this.props.width)}
                        value={this.state.size}
                        onChange={this.handleSizeSlider}/>
                </div>
            </div>
        )
    }
}
function calculateBarLength(WindowHeight, NumberOfArrays) {
    return Math.floor((WindowHeight*0.55)/NumberOfArrays);
}

function calculateMaxArraySize(WindowWidth) {
    return Math.floor(WindowWidth * 0.1475);
}

function getRandomArray(size, maxlength) { 
    //This generates a random array.
    let array = [];
    for (let i = 0; i < size-1; i++){
        array.push(getRandomNumber(10, maxlength));
    }
    return array;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}