import React, { useState } from 'react';
import clickSound from '../data/mouse-click.mp3';

export default function clickSoundFunction() {

    const [playSound, setPlaySound] = useState(false);

    const handleClick = () => {
        setPlaySound(true);
        const audio = new Audio(clickSound);
        audio.play();
        audio.onended = () => {
            setPlaySound(false);
        };
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
};


