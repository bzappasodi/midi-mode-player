import {useState} from 'react'

const ModePlayHooks = () => {

    const STATUS = {
        IDLE: 'IDLE',
        SUBMITTING: 'SUBMITTING',
        SUBMITTED: 'SUBMITTED',
        COMPLETED: 'COMPLETED',
    }

    let [status, setStatus] = useState(STATUS.IDLE);

    const [selectedKey, setSelectedKey] = useState("");
    const [selectedMode, setSelectedMode] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    return{
        status, setStatus,
        selectedKey,
        setSelectedKey,
        selectedMode,
        setSelectedMode,
        buttonDisabled,
        setButtonDisabled,
        STATUS
    }

}

export default ModePlayHooks;


