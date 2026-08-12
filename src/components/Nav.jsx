import { Link } from "react-router";
import '../styles/Nav.css'

const Nav = (props) => {
    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }
    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-bic">BIC</span>
                    <span className="logo-marshals">MARSHALS</span>
                </Link>


                {/* Navigation */}
                <div className="navbar-links">

                    <Link to="/" className="nav-link">
                        Home
                    </Link>


                    {props.user ? (
                        <>

                            <Link
                                to="/events"
                                className="nav-link"
                            >
                                Events
                            </Link>


                            <Link
                                to="/events/my-events"
                                className="nav-link"
                            >
                                My Events
                            </Link>


                            {(props.user.role === "organizer" ||
                                props.user.role === "admin") && (
                                    <Link
                                        to="/events/new"
                                        className="nav-link"
                                    >
                                        Create Event
                                    </Link>
                                )}


                            {props.user.role === "admin" && (
                                <>
                                    <Link
                                        to="/admin"
                                        className="nav-link"
                                    >
                                        Admin Dashboard
                                    </Link>

                                    <Link
                                        to="/admin/users"
                                        className="nav-link"
                                    >
                                        Manage Users
                                    </Link>
                                </>
                            )}


                            <button
                                className="nav-signout"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>

                        </>
                    ) : (
                        <>

                            <Link
                                to="/sign-in"
                                className="nav-link"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/sign-up"
                                className="nav-signup"
                            >
                                Sign Up
                            </Link>

                        </>
                    )}

                </div>

            </div>

        </nav>
    )
}

export default Nav