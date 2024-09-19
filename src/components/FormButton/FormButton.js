import React from "react";
import Button from '@mui/material/Button'; // Assuming you're using Material-UI

function FormButton({ isSubmitting, disabled, text }) {
    return (
        <Button variant="contained" disabled={disabled} type="submit">
            {isSubmitting ? '...Playing!' : text}
        </Button>
    );
}

export default FormButton;
