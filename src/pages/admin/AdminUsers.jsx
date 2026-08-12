import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import * as adminService from "../../services/admin"
import '../../styles/AdminUsers.css'

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
        <main className="admin-users-page">

            <div className="admin-users-container">

                {/* Header */}
                <div className="admin-users-header">

                    <button
                        className="back-button"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Dashboard
                    </button>

                    <span className="section-label">
                        ADMINISTRATION
                    </span>

                    <h1>
                        Manage Users
                    </h1>

                    <p>
                        View registered users and manage their
                        system roles.
                    </p>

                </div>


                {/* Message */}
                {message && (
                    <div className="admin-users-message">
                        {message}
                    </div>
                )}


                {/* Users */}
                {users.length === 0 ? (

                    <div className="users-empty">

                        <h2>
                            No users found
                        </h2>

                        <p>
                            There are currently no users to display.
                        </p>

                    </div>

                ) : (

                    <div className="users-list">

                        {users.map((user) => (

                            <div
                                key={user._id}
                                className="user-card"
                            >

                                {/* User Header */}
                                <div className="user-card-header">

                                    <div className="user-avatar">
                                        {user.fullName
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="user-name">

                                        <h2>
                                            {user.fullName}
                                        </h2>

                                        <span>
                                            {user.email}
                                        </span>

                                    </div>

                                </div>


                                {/* User Information */}
                                <div className="user-info">

                                    <div className="user-info-item">

                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {user.email}
                                        </strong>

                                    </div>


                                    <div className="user-info-item">

                                        <span>
                                            License Number
                                        </span>

                                        <strong>
                                            {user.licenseNo || "N/A"}
                                        </strong>

                                    </div>


                                    <div className="user-info-item">

                                        <span>
                                            Current Role
                                        </span>

                                        <span
                                            className={`role-badge role-${user.role}`}
                                        >
                                            {user.role}
                                        </span>

                                    </div>

                                </div>


                                {/* Role Management */}
                                <div className="role-management">

                                    {user.role === "admin" ? (

                                        <div className="admin-protected">

                                            <span className="admin-shield">
                                                ✓
                                            </span>

                                            <div>
                                                <strong>
                                                    Administrator
                                                </strong>

                                                <p>
                                                    Admin roles cannot be
                                                    changed here.
                                                </p>
                                            </div>

                                        </div>

                                    ) : (

                                        <div className="role-selector">

                                            <label htmlFor={`role-${user._id}`}>
                                                Change Role
                                            </label>

                                            <select
                                                id={`role-${user._id}`}
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

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>
    )
}

export default AdminUsers