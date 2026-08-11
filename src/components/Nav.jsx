import { Link } from "react-router";

const Nav = (props) => {
    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }
    return(
        <nav>
            <Link to={'/'}>Events</Link>{" | "}
            {props.user ? (
                <>
                <Link to="/" onClick={handleSignOut}>Sign Out</Link>
                </>
            ):(
                <>
                <Link to={'/sign-in'}>Sign In</Link>{' | '}
                <Link to={'/sign-up'}>Sign Up</Link>
                </>
            )}
        </nav>
    )
}

export default Nav