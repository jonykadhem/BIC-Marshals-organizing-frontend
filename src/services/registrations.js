const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

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

const myRegistration = async () =>{
    try {
         const res = await fetch(`${BASE_URL}/events/my-events`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to get registrations")
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const cancelRegistration = async (registrationId) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${registrationId}/cancel`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to cancel registrations")
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    registerForEvent,
    myRegistration,
    cancelRegistration
}