import React, { useEffect } from 'react';

import { useMIDIInputs, useMIDIOutputs, useMIDIOutput } from '@react-midi/hooks';

function MidiComponent() {
    const { inputs, selectInput } = useMIDIInputs();
    const { outputs, selectOutput } = useMIDIOutputs();
    const { sendNoteOn, sendNoteOff } = useMIDIOutput();
    // const [midiOutput, setMidiOutput] = useState(null);

    useEffect(() => {
        if (inputs.length > 0) {
            // Select the first available input device
            selectInput(inputs[0].id);
        }

        if (outputs.length > 0) {
            // Select the first available output device
            selectOutput(outputs[0].id);
        }
    }, [inputs, outputs, selectInput, selectOutput]);

    const handleNoteOn = (note) => {
       // midiOutput.send(note, 127); // Send note on message
        console.log("note ", note)
       sendNoteOn(note, 127)
        //midiOutput.send([0x90, note, 127]); // Note on

    };

    const handleNoteOff = (note) => {
       //    midiOutput.send(note, 0); // Send note on message

        console.log("note ", note)
       sendNoteOff(note, 0); // Send note off message
     //   midiOutput.send([0x90, note, 0]); // Note on
    };

    return (
        <div>
            <h2>Available MIDI Inputs:</h2>
            <ul>
                {inputs.map((input) => (
                    <li key={input.id}>
                        <button onClick={() => selectInput(input.id)}>
                            {input.name}
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Available MIDI Outputs:</h2>
            <ul>
                {outputs.map((output) => (
                    <li key={output.id}>
                        <button onClick={() => selectOutput(output.id)}>
                            {output.name}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Add some UI elements to trigger MIDI messages */}
            <button onClick={() => handleNoteOn(60)}>Play C</button>
            <button onClick={() => handleNoteOff(60)}>Stop C</button>
        </div>
    );
}

export default MidiComponent;

