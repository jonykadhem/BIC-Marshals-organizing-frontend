import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import * as adminService from "../../services/admin"

const AdminUsers = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await adminService.getUsers()

                setUsers(data)
            } catch (error) {
                setMessage(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleRoleChange = async (userId, role) => {
        try {
            const updatedUser = await adminService.updateUserRole(userId, role)

            setUsers(users.map((user) => user._id === userId
                ? updatedUser : user))

            setMessage("User role updated successfully.")
        } catch (error) {
            setMessage(error.message)
        }
    }
    if (loading) {
        return <p>Loading users...</p>
    }

    return (
        <main>

            <button onClick={() => navigate("/admin")}>
                ← Back to Dashboard
            </button>

            <h1>Manage Users</h1>

            {message && (
                <p>{message}</p>
            )}

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (

                <div className="users-list">

                    {users.map((user) => (

                        <div
                            key={user._id}
                            className="user-card"
                        >

                            <h2>
                                {user.fullName}
                            </h2>

                            <p>
                                <strong>Email:</strong>{" "}
                                {user.email}
                            </p>

                            <p>
                                <strong>License:</strong>{" "}
                                {user.licenseNo || "N/A"}
                            </p>

                            <p>
                                <strong>Current Role:</strong>{" "}
                                {user.role}
                            </p>


                            {user.role === "admin" ? (

                                <p>
                                    <strong>
                                        Admin
                                    </strong>
                                </p>

                            ) : (

                                <div>

                                    <label>
                                        Change Role:
                                    </label>

                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(
                                                user._id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="marshal">
                                            Marshal
                                        </option>

                                        <option value="organizer">
                                            Organizer
                                        </option>

                                    </select>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </main>
    )
}

export default AdminUsers