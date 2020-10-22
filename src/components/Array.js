import React from "react";
import './Styles/Styles.css';

export default class Array extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: null,
        }
        this.handleSortTypeButtons = this.handleSortTypeButtons.bind(this);
    }
    handleSortTypeButtons(e) {
        this.setState({
            sortType: e.target.value
        })
    }

    async BubbleSort(animations) {
    
    }

    render() {
        const array = this.props.array;
        const maxheight =this.props.maxheight;
        const pixelwidth = calculatePixelWidth(this.props.width,array.length);
        return(
            <div>
                <div className="array-bar"
                     style={{
                         height: `${maxheight}px`,
                         width: `${1}px`,
                         backgroundColor: `transparent`,
                     }}>

                </div>

                {array.map((value, index) => (
                    <div className="array-bar"
                    key={index}
                    style={{
                        height: `${value}px`,
                        width: `${pixelwidth}px`,
                }}></div>))}

                <div className="sort-button-container">
                    <button className="small-button" 
                        onClick={(e) => this.handleSortTypeButtons(e)} 
                        value="merge">Merge</button>
                    <button className="small-button" 
                        onClick={(e) => this.handleSortTypeButtons(e)} 
                        value="insertion">Insertion</button>
                    <button className="small-button" 
                        onClick={(e) => this.handleSortTypeButtons(e)} 
                        value="quick">Quick</button>
                    <button className="small-button" 
                        onClick={(e) => this.handleSortTypeButtons(e)} 
                        value="bubble">Bubble</button>
                    <button className="small-button" 
                        onClick={(e) => this.handleSortTypeButtons(e)} 
                        value="heap">Heap</button>
                </div>

            </div>
            
        );
    }
}
function ChooseSortType(index) {

}
function calculatePixelWidth(WindowWidth, ArraySize) {
    return (WindowWidth*0.35/ArraySize);
}