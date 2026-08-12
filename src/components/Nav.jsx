import { Link } from "react-router";

const Nav = (props) => {
    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }
    return (
        <nav>
            <Link to={'/'}>Home</Link>{" | "}
            {props.user ? (
                <>
                    {(props.user.role === "organizer" || props.user.role === "admin") && (
                        <Link to={"/events/new"}>Creat Event</Link>

                    )}
                    {' | '}
                    <Link to="/events" >Events</Link>
                    {' | '}
                    <Link to="/events/my-events" >My Events</Link>
                    {' | '}
                    <Link to="/" onClick={handleSignOut}>Sign Out</Link>{' | '}


                </>
            ) : (
                <>
                    <Link to={'/sign-in'}>Sign In</Link>{' | '}
                    <Link to={'/sign-up'}>Sign Up</Link>
                </>
            )}
            {props.user && props.user.role === "admin" && (
                <>
                    <Link to="/admin">Admin Dashboard</Link>
                    {" | "}
                    <Link to="/admin/users">Manage Users</Link>
                    
                </>
            )}
        </nav>
    )
}

export default Nav