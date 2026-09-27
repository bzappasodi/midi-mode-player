import React, { useState, useEffect } from 'react';

const MidiGenerator = ({ noteNumber }) => {
    console.log("hi " + noteNumber)
    const [midiAccess, setMidiAccess] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Initialize MIDI access when component mounts
    useEffect(() => {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(
                    (access) => {
                        setMidiAccess(access);
                    },
                    (err) => {
                        setError('MIDI Access failed: ' + err);
                    }
                );
        } else {
            setError('Web MIDI API not supported in this browser');
        }
    }, []);

    // Validate and constrain MIDI note number (0-127)
    const getValidNoteNumber = (num) => {
        const parsedNum = parseInt(num, 10);
        return Math.max(0, Math.min(127, parsedNum));
    };

    const playNote = () => {
        if (!midiAccess || !midiAccess.outputs.size) {
            setError('No MIDI outputs available');
            return;
        }

        const note = getValidNoteNumber(noteNumber);
        const velocity = 100; // Note velocity (0-127)
        const duration = 1000; // Duration in milliseconds

        // Get the first available MIDI output
        const output = midiAccess.outputs.values().next().value;

        if (output) {
            setIsPlaying(true);

            // Note On message: [command, note, velocity]
            output.send([0x90, note, velocity]);

            // Schedule Note Off after duration
            setTimeout(() => {
                output.send([0x80, note, 0]);
                setIsPlaying(false);
            }, duration);
        }
    };

    return (
        <div className="midi-generator">
            <h3>MIDI Note Generator</h3>
            {error && <p className="error">{error}</p>}

            <div>
                <p>Current Note: {getValidNoteNumber(noteNumber)}</p>
                <p>Status: {isPlaying ? 'Playing' : 'Stopped'}</p>
            </div>

            <button
                onClick={playNote}
                disabled={!midiAccess || isPlaying}
            >
                Play Note
            </button>

            <div style={{ marginTop: '1rem' }}>
                <small>
                    Note: MIDI output requires browser support and a connected MIDI device/synthesizer.
                    Valid MIDI note numbers are 0-127 (Middle C = 60).
                </small>
            </div>
        </div>
    );
};

// Example usage:
// <MidiGenerator noteNumber={60} />

export default MidiGenerator;