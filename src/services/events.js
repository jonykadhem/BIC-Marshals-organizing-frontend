const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/events`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to get events")
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const show = async (eventId) => {
    try {
        const res = await fetch(`${BASE_URL}/${eventId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to get event")
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const create = async (eventFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/new`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventFormData),
        })
        
        const data = await res.json()
        console.log("Status:", res.status);
        console.log("Backend response:", data);

        if (!res.ok) {
            throw new Error(data.err || "Failed to create event")
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const update = async (eventId, eventFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${eventId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventFormData),
        })
        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to edit event")
        }

        return data
    } catch (error) {
        console.log(error)
        throw error

    }
}
const deleteEvent = async (eventId) => {
    try {
        const res = await fetch(`${BASE_URL}/${eventId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to delete event")
        }

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    index,
    show,
    create,
    update,
    deleteEvent
}