import React from 'react';
import { useTime } from 'react-timer-hook';

function MyTime({ style }) {
    const {
        seconds,
        minutes,
        hours,
        ampm,
    } = useTime({ format: '24-hour' });

    return (
        <div className="my-time" style={style}>
            <div style={{ fontSize: 50}}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                <span>{ampm}</span>
            </div>
        </div>
    );
}
export default MyTime