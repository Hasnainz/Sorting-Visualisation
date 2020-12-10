import React from 'react';
import Sort from './Sort'
import './Styles/styles.css';

export default class Main extends React.Component {

    constructor(props) {
        //using state to store the window height and width so that whenever these values are changed, the component tree is rerendered using the new values.
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    //When this component is mounted onto the screen, occurs after the constructor.
    componentDidMount() {
        this.updateWindowDimensions();
        //Adds an event listener to have a callback whenever the window is resized.
        window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        //removes the listener when this component is unloaded.
        window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return(
            <div className="page-container">
                <Sort/>
            </div>
        );
    }
}
