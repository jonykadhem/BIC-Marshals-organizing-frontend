import { Link } from "react-router"

const Home = ({ events, user }) => {

    const upcomingEvents = events
        .filter(event => new Date(event.eventDate) >= new Date())
        .slice(0, 3)

    return (
        <main>

            {/* Hero */}
            <section className="hero">

                <h1>
                    BIC Marshals
                </h1>

                <h2>
                    Motorsport Marshal Management System
                </h2>

                <p>
                    Find events, register for marshal positions,
                    and manage your assignments.
                </p>

                {user ? (
                    <>
                        <p>
                            Welcome, {user.fullName} 👋
                        </p>

                        <Link to="/events">
                            Browse Events
                        </Link>
                    </>
                ) : (
                    <div className="auth-buttons">

                        <Link to="/sign-in">
                            Sign In
                        </Link>

                        <Link to="/sign-up">
                            Sign Up
                        </Link>

                    </div>
                )}

            </section>


            {/* Upcoming Events */}
            <section>

                <h2>Upcoming Events</h2>

                {upcomingEvents.length === 0 ? (
                    <p>No upcoming events.</p>
                ) : (

                    <div className="event-list">

                        {upcomingEvents.map(event => (

                            <div
                                className="event-card"
                                key={event._id}
                            >

                                <h3>
                                    {event.title}
                                </h3>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        event.eventDate
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Location:</strong>{" "}
                                    {event.location}
                                </p>

                                <p>
                                    <strong>Marshals:</strong>{" "}
                                    {event.registrationCount || 0}
                                    {" / "}
                                    {event.maxMarshals}
                                </p>

                                <Link
                                    to={`/events/${event._id}`}
                                >
                                    View Event
                                </Link>

                            </div>

                        ))}

                    </div>
                )}

                <div>
                    <Link to="/events">
                        View All Events
                    </Link>
                </div>

            </section>


            {/* Role Section */}
            {user && (
                <section>

                    <h2>Quick Actions</h2>

                    {/* Marshal */}
                    {user.role === "marshal" && (
                        <div>

                            <h3>Marshal</h3>

                            <p>
                                Find events, register for
                                positions and view your assignments.
                            </p>

                            <Link to="/events">
                                Browse Events
                            </Link>

                            {" "}

                            <Link to="/my-events">
                                My Events
                            </Link>

                        </div>
                    )}


                    {/* Organizer */}
                    {user.role === "organizer" && (
                        <div>

                            <h3>Organizer</h3>

                            <p>
                                Create and manage your events
                                and marshal assignments.
                            </p>

                            <Link to="/events/new">
                                Create Event
                            </Link>

                            {" "}

                            <Link to="/events">
                                My Events
                            </Link>

                        </div>
                    )}


                    {/* Admin */}
                    {user.role === "admin" && (
                        <div>

                            <h3>Administrator</h3>

                            <p>
                                Manage events, users and
                                system settings.
                            </p>

                            <Link to="/admin">
                                Admin Dashboard
                            </Link>

                            {" "}

                            <Link to="/admin/users">
                                Manage Users
                            </Link>

                        </div>
                    )}

                </section>
            )}


            {/* How It Works */}
            <section>

                <h2>How It Works</h2>

                <div>

                    <div>
                        <h3>1. Find an Event</h3>

                        <p>
                            Browse upcoming BIC events
                            and find one you want to participate in.
                        </p>
                    </div>


                    <div>
                        <h3>2. Register</h3>

                        <p>
                            Select the marshal positions
                            you are able to work.
                        </p>
                    </div>


                    <div>
                        <h3>3. Get Assigned</h3>

                        <p>
                            The organizer assigns your
                            sector post for the event.
                        </p>
                    </div>

                </div>

            </section>


            {/* Bottom CTA */}
            <section>

                {!user ? (
                    <>
                        <h2>
                            Ready to join the next event?
                        </h2>

                        <p>
                            Sign in or create an account
                            to start registering.
                        </p>

                        <Link to="/sign-up">
                            Create Account
                        </Link>
                    </>
                ) : (
                    <>
                        <h2>
                            Ready for your next event?
                        </h2>

                        <Link to="/events">
                            Browse Events
                        </Link>
                    </>
                )}

            </section>

        </main>
    )
}

export default Home