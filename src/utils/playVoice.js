import positionSavedMp3 from '../data/voices/position-saved-voice.mp3';
import countineReadingMp3 from '../data/voices/countine-reading-voice.mp3';

export function PositionSavedVoice() { // not in use
        const audio = new Audio(positionSavedMp3);
        audio.play();
}

export function CountineReadingVoice() { // not in use
        const audio = new Audio(countineReadingMp3);
        audio.play();
}