import React, { useState, useEffect } from 'react';

function Timer(props) {
    const [milliseconds, setMilliseconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (props.doReset){
            setMilliseconds(0);
        }
        if (props.isSorting) {
        interval = setInterval(() => {
            setMilliseconds(milliseconds => milliseconds + 1);
        }, 1);

        } else if (!props.isSorting && milliseconds !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [props.isSorting, props.doReset, milliseconds]);



    return (
        <label className="radio-label">
            Timer : {milliseconds}ms
        </label>
    )
}


export default Timer;