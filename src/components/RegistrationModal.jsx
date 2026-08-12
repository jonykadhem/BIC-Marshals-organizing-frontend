import { useState } from "react";
import * as registrationService from "../services/registrations";
import "../styles/RegistrationModal.css"

const positions = [
    "Flag Post",
    "Tracky",
    "Comms",
    "DigiFlag",
    "Pit Lane",
    "Recovery",
    "Medical",
    "Observer"
];
const RegistrationModal = ({ event, onClose, onRegistered }) => {
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePositionChange = (position) => {
        if (selectedPositions.includes(position)) {
            selectedPositions.filter((item) => item !== position)
        } else {
            setSelectedPositions([...selectedPositions, position])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (selectedPositions.length === 0) {
            setMessage("Please select at least one position.")
            return
        }

        try {
            setLoading(true)
            setMessage('')

            const registration = await registrationService.registerForEvent(
                event._id,
                selectedPositions
            )

            onRegistered(registration)
            onClose()
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="modal-overlay">

        <div className="registration-modal">

            {/* Close */}
            <button
                type="button"
                className="close-button"
                onClick={onClose}
                aria-label="Close"
            >
                ×
            </button>


            {/* Header */}
            <div className="registration-modal-header">

                <span className="section-label">
                    EVENT REGISTRATION
                </span>

                <h2>
                    Register for Event
                </h2>

                <h3>
                    {event.title}
                </h3>

                <p>
                    Select the marshal positions you are
                    able to work.
                </p>

            </div>


            {/* Error */}
            {message && (
                <p className="registration-modal-error">
                    {message}
                </p>
            )}


            {/* Form */}
            <form onSubmit={handleSubmit}>

                <div className="positions">

                    {positions.map((position) => (

                        <label
                            key={position}
                            className={`position-option ${
                                selectedPositions.includes(position)
                                    ? "selected"
                                    : ""
                            }`}
                        >

                            <input
                                type="checkbox"
                                value={position}
                                checked={selectedPositions.includes(
                                    position
                                )}
                                onChange={() =>
                                    handlePositionChange(position)
                                }
                            />

                            <span className="position-check">
                                ✓
                            </span>

                            <span className="position-name">
                                {position}
                            </span>

                        </label>

                    ))}

                </div>


                {/* Actions */}
                <div className="modal-actions">

                    <button
                        type="submit"
                        className="modal-confirm-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Registering..."
                            : "Confirm Registration"}
                    </button>


                    <button
                        type="button"
                        className="modal-cancel-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    </div>
)
}

export default RegistrationModal
