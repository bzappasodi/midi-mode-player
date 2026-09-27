const KEY_TO_MIDI = {
    C: 60, D: 62, E: 64, F: 65, G: 67, A: 69, B: 71
};

const MODE_INTERVALS = {
    Ionian:     [0, 2, 4, 5, 7, 9, 11, 12],
    Dorian:     [0, 2, 3, 5, 7, 9, 10, 12],
    Phrygian:   [0, 1, 3, 5, 7, 8, 10, 12],
    Lydian:     [0, 2, 4, 6, 7, 9, 11, 12],
    Mixolydian: [0, 2, 4, 5, 7, 9, 10, 12],
    Aeolian:    [0, 2, 3, 5, 7, 8, 10, 12],
    Locrian:    [0, 1, 3, 5, 6, 8, 10, 12],
};

export function getScaleNotes(key, mode) {
    const root = KEY_TO_MIDI[key];
    if (root == null || !MODE_INTERVALS[mode]) return [];
    return MODE_INTERVALS[mode].map((interval) => root + interval);
}

// Tone.js prefers note names; convert MIDI number → note name
export function midiToNoteName(midi) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const octave = Math.floor(midi / 12) - 1;
    return notes[midi % 12] + octave;
}