import React from "react";
import './Styles/Styles.css';
import Array from './Array';

export default class ArrayContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const arraycount = this.props.arraycount;
        let ArrayS = [];
        for(let i=0;i<arraycount;i++){
            ArrayS.push(
            <Array array={this.props.array}/>
            );
        }
        return(
            ArrayS.map((arr) => (
            <div className="array-container">
                {arr}
            </div>
            )))
    }
}

  