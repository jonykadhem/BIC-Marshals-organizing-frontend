const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/registrations`

const registerForEvent = async (eventId, positions) => {
    try {
        const res = await fetch(`${BASE_URL}/events/${eventId}/registrations`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ positions: positions }),
        })
        const data = await res.json()

        if (!res.ok) {
            throw new Error(
                data.err || "Failed to register for the event"
            )
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export {
    registerForEvent
}