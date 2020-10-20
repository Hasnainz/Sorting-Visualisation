import React from "react";
import './Styles/Styles.css';

export default class Array extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: null,
        }

    }
    async BubbleSort(animations) {
    
    }

    render() {
        const array = this.props.array;
        return(
            <div>
                {array.map((value, index) => (
                    <div className="array-bar"
                    key={index}
                    style={{
                        height: `${value}px`,
                        width: `${2}px`,
                }}></div>))}
            </div>
            
        );
    }
}