const BASE_URL = "http://localhost:3000/admin"


const dashboard = async () => {
    try {
        const res = await fetch(`${BASE_URL}/dashboard`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(
                data.err || "Failed to load dashboard"
            )
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}


const getUsers = async () => {
    try {
        const res = await fetch(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(
                data.err || "Failed to load users"
            )
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}


const updateUserRole = async (userId, role) => {
    try {
        const res = await fetch(
            `${BASE_URL}/users/${userId}/role`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: role
                }),
            }
        )

        const data = await res.json()

        if (!res.ok) {
            throw new Error(
                data.err || "Failed to update user role"
            )
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}


export {
    dashboard,
    getUsers,
    updateUserRole
}