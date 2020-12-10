import React, { useState, useEffect } from 'react';

//Writing a function to be exported
function Timer(props) { //Props are the properties it gets from its parents.
    //useState is an encapsulated value so that it won't share this data
    //with other instances of a timer.
    const [elapsed, setElapsed] = useState(0); //Elapsed time and a function to set the elapsed time

    //
    useEffect(() => {
        let interval = null;
        if (props.isSorting) {
        //Lamda expression to set off every 10ms to update the time on the screen
        //based on the data passed from the parent component.
        interval = setInterval(() => {
            setElapsed(Date.now() - props.start);
        }, 10);
        //If the parent has stopped sorting, clear the interval and be ready to reset the timer to 0.
        } else if (!props.isSorting) {
            clearInterval(interval);
        }
        //Waits until the program is reset before the interval get reset so that the time 
        //remains on the screen so you can compare it.
        return () => clearInterval(interval);
    }, [props.isSorting, props.doReset, props.start]);

    return (
        <label className="radio-label">
            Timer : {Math.floor(elapsed)}ms
        </label>
    )
}


export default Timer;