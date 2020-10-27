import React, { useState, useEffect } from 'react';

function Timer(props) {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        let interval = null;
        if (props.isSorting) {
        interval = setInterval(() => {
            setElapsed(Date.now() - props.start);
        }, 10);

        } else if (!props.isSorting) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [props.isSorting, props.doReset, props.start]);

    return (
        <label className="radio-label">
            Timer : {Math.floor(elapsed)}ms
        </label>
    )
}


export default Timer;