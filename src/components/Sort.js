import React from "react";
import ArrayContainer from './ArrayContainer';
import './Styles/styles.css';

export default class Sort extends React.Component {
    
    constructor(props){
        //The size and maximum bar length are calculated based on the window height and length.
        super(props);
        const size = calculateMaxArraySize(window.innerWidth);
        const barlength = calculateBarLength(window.innerHeight, 3)
        //This component mangages the following values and will rerender the necessary children components when these are updated.
        this.state = {
            isSorting: false,
            size: size,
            barlength: barlength,
            array: getRandomArray(size, barlength),
            speed: 0,
            arraycount: 2,
        }
        //Binding the button click events to local functions.
        this.handleSizeSlider = this.handleSizeSlider.bind(this);
        this.handleSpeedSlider = this.handleSpeedSlider.bind(this);
        this.handleAddArray = this.handleAddArray.bind(this);
        this.handleResetArray = this.handleResetArray.bind(this);
        this.toggleSorting = this.toggleSorting.bind(this);
    }
    //Recalculates the height whenever the component is updated
    // componentDidUpdate() {
    //     const size = calculateMaxArraySize(window.innerWidth);
    //     const barlength = calculateBarLength(window.innerHeight, 3)
    //     this.setState({
    //         size: size,
    //         barlength: barlength,
    //     })
    // }

    handleSpeedSlider(e) {
        //Changes the speed at which animations occur.
        this.setState({
            speed: 1000 - e.target.value,
        })
    }

    toggleSorting() {
        //Toggles the sorting button from being on or off.
        this.setState((state) => ({
            isSorting: !state.isSorting,
        }));
    }
    handleSizeSlider(event) {
        //Changes the size of the array, also stops sorting.
        const size = event.target.value;
        this.setState((state) => ({
            isSorting: false,
            size: size,
            array: getRandomArray(size, state.barlength)
        }))
    }

    handleResetArray() {
        //When the reset button is clicked, sorting is stoped and a new array is generated.
        const arr = getRandomArray(this.state.size, this.state.barlength)
        this.setState({
            isSorting: false,
            array: arr,
        })
    }

   
    handleAddArray(e) {
        //This sets bounds for the minimum and maximum amount of arrays that can be on the screen.
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
        //This will recalculate height (since less arrays means that each one can be taller)
        const barlength = calculateBarLength(window.innerHeight, arraycount)
        this.setState({
            isSorting: false,
            arraycount: arraycount,
            barlength: barlength,
            array: getRandomArray(this.state.size, barlength)
        });
    }
    
    render() {
        return(
            <div>
                <div>
                    {/* Sets the props of the array container */}
                    <ArrayContainer
                        arraycount={this.state.arraycount} 
                        array={this.state.array}
                        maxheight={this.state.barlength}
                        isSorting={this.state.isSorting}
                        speed={this.state.speed}/>
                </div>
                {/* The buttons and their event handlers */}
                <div className="button-container">
                    <button className="medium-button" 
                            value="-" 
                            onClick={(e) => this.handleAddArray(e)}>-</button>

                    <button className="medium-button" 
                        onClick={this.handleResetArray}>⟳</button>

                    <button className="medium-button" 
                        value="+"
                         onClick={(e) => this.handleAddArray(e)}>+</button>

                    <button onClick={this.toggleSorting} 
                            className="main-button"
                            style={{
                                /* Changes the colour of the button depending on whether or not it is sorting */
                                backgroundColor: !this.state.isSorting ? '#3DCBE0' : '#FA5E3F'
                            }}>
                        {/* Changes the text of the button depending on whether or not it is sorting */}
                        {!this.state.isSorting ? 'Sort' : 'Stop'}
                    </button>
               </div>
               
               <div className="slider-container">
                    <label className="slider-label">
                        <input className="slider"
                            type="range" 
                            id="speed"
                            min="0"
                            max="1000"
                            value={1000 - this.state.speed}
                            onChange={(e) => this.handleSpeedSlider(e)}/>
                        Speed
                    </label>
                    <label className="slider-label">
                        <input className="slider"
                            type="range" 
                            id="size" 
                            min="4"
                            max={calculateMaxArraySize(window.innerWidth)}
                            value={this.state.size}
                            onChange={this.handleSizeSlider}/>
                        &nbsp;Size
                    </label>
                </div>

                    
            </div>
        )
    }
}
//Calclates how long the vertical bar should be
function calculateBarLength(WindowHeight, NumberOfArrays) {
    return Math.floor((WindowHeight*0.64)/NumberOfArrays);
}
//Calculates how large the array size can be in order to not flow off the screen.
function calculateMaxArraySize(WindowWidth) {
    return Math.floor(WindowWidth * 0.147);
}

function getRandomArray(size, maxlength) { 
    //This generates a random array.
    let array = [];
    for (let i = 0; i < size-1; i++){
        array.push(getRandomNumber(10, maxlength));
    }
    return array;
}
//Generates a random number between the two bounds.
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}