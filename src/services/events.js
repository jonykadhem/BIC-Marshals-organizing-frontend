const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/events`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers:{ Authorization: `Bearer ${localStorage.getItem('token')}` },
        })

        const data = await res.json()

        if(!res.ok){
            throw new Error(data.err || "Failed to get events")
        }
        
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    index,
}