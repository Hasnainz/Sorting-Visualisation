import React from "react";
import ArrayContainer from './ArrayContainer';
import './Styles/Styles.css';

export default class Sort extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arraycount: 3,
        }
        this.handleAddArray = this.handleAddArray.bind(this);
    }

    handleAddArray(e) {
        if(this.state.arraycount < 5 && e.target.value == "+") {
            this.setState((state) => ({
                arraycount: state.arraycount + 1,
            }));
        }
        else if(this.state.arraycount > 1 && e.target.value == "-") {
            this.setState((state) => ({
                arraycount: state.arraycount - 1,
            }));
        }
    }
    
    render() {
        return(
            <div>
                <ArrayContainer 
                    arraycount={this.state.arraycount} 
                    array={this.props.array}/>
                <div className="button-container">
                    <button value="+" onClick={(e) => this.handleAddArray(e)}>+</button>
                    <button value="-" onClick={(e) => this.handleAddArray(e)}>-</button>
                </div>
            </div>
        )
    }
}
