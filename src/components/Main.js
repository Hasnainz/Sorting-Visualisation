import React from 'react';
import Sort from './Sort'
import './Styles/Styles.css';


export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            speed: 500,
            isSorting: false,
        }

        this.handleSpeedSlider = this.handleSpeedSlider.bind(this);
        this.toggleSorting = this.toggleSorting.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        console.log(window.innerWidth);
        console.log(window.innerHeight);
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleSpeedSlider(event) {
        this.setState({
            speed: 1000 - event.target.value
        })
    }
    toggleSorting() {
        this.setState((state) => ({
            isSorting: !state.isSorting
        }));
    }

    render() {
        return(
            <div className="page-container">
                <div className="button-container">
                    <button onClick={this.toggleSorting} className="main-button">
                        {!this.state.isSorting ? 'Sort' : 'Stop'}
                    </button>
                </div>


               <div className="slider-container">
                <label htmlFor="speed" className="slider-label">Speed</label>
                    <input 
                        className="main-slider"
                        type="range" 
                        id="speed"
                        min="0"
                        max="1000"
                        value={1000 - this.state.speed}
                        onChange={this.handleSpeedSlider}/>
               </div>

                <Sort height={this.state.height}
                      width={this.state.width}/>
            </div>
        );
    }
}
