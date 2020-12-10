import React from "react";
import './Styles/styles.css';
import Array from './Array';

export default class ArrayContainer extends React.Component {
   //Holds an array of objects of type Array (poor naming choice since Array is self-defined)
    render() {
        const arraycount = this.props.arraycount;
        let ArrayS = [];
        for(let i = 0; i < arraycount; i++){
            ArrayS.push(
            <Array array={this.props.array}
                   maxheight={this.props.maxheight} 
                   index={i}
                   shouldSort={this.props.isSorting}
                   speed={this.props.speed}/>
            );
        }
        return(
            //Maps arrays to the screen using a llambda function.
            ArrayS.map((arr, index) => (
            <div className="array-container"
                 key={index}>
                {arr}
            </div>
            )))
    }
}

  