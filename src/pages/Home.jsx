import { Link } from "react-router"

const Home = ({ events, user }) => {

    const upcomingEvents = events
        .filter(event => new Date(event.eventDate) >= new Date())
        .slice(0, 3)

    return (
        <main className="home-page">

            {/* Hero */}
            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-badge">
                        BIC MARSHAL MANAGEMENT
                    </span>

                    <h1>
                        BIC Marshals
                    </h1>

                    <h2>
                        Motorsport Marshal Management System
                    </h2>

                    <p className="hero-description">
                        Find events, register for marshal positions,
                        and manage your assignments all in one place.
                    </p>

                    {user ? (
                        <div className="hero-user">

                            <p>
                                Welcome, <strong>{user.fullName}</strong> 👋
                            </p>

                            <Link
                                className="btn btn-primary"
                                to="/events"
                            >
                                Browse Events
                            </Link>

                        </div>
                    ) : (
                        <div className="auth-buttons">

                            <Link
                                className="btn btn-primary"
                                to="/sign-in"
                            >
                                Sign In
                            </Link>

                            <Link
                                className="btn btn-outline"
                                to="/sign-up"
                            >
                                Sign Up
                            </Link>

                        </div>
                    )}

                </div>

            </section>


            {/* Upcoming Events */}
            <section className="home-section events-section">

                <div className="section-header">

                    <div>
                        <span className="section-label">
                            DON'T MISS OUT
                        </span>

                        <h2>
                            Upcoming Events
                        </h2>
                    </div>

                    <Link
                        className="view-all-link"
                        to="/events"
                    >
                        View All Events →
                    </Link>

                </div>


                {upcomingEvents.length === 0 ? (

                    <div className="empty-state">
                        <h3>No upcoming events</h3>

                        <p>
                            Check back later for new events.
                        </p>
                    </div>

                ) : (

                    <div className="event-list">

                        {upcomingEvents.map(event => (

                            <article
                                className="event-card"
                                key={event._id}
                            >

                                <div className="event-card-header">

                                    <span className="event-status">
                                        {event.status}
                                    </span>

                                </div>

                                <h3>
                                    {event.title}
                                </h3>

                                <div className="event-info">

                                    <p>
                                        <span className="info-label">
                                            Date
                                        </span>

                                        {new Date(
                                            event.eventDate
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <span className="info-label">
                                            Location
                                        </span>

                                        {event.location}
                                    </p>

                                    <p>
                                        <span className="info-label">
                                            Marshals
                                        </span>

                                        {event.registrationCount || 0}
                                        {" / "}
                                        {event.maxMarshals}
                                    </p>

                                </div>

                                <Link
                                    className="event-card-link"
                                    to={`/events/${event._id}`}
                                >
                                    View Event
                                    <span>→</span>
                                </Link>

                            </article>

                        ))}

                    </div>

                )}

            </section>


            {/* Role Section */}
            {user && (
                <section className="home-section quick-actions-section">

                    <div className="section-header">

                        <div>
                            <span className="section-label">
                                YOUR ACCOUNT
                            </span>

                            <h2>
                                Quick Actions
                            </h2>
                        </div>

                    </div>


                    <div className="quick-actions-grid">

                        {/* Marshal */}
                        {user.role === "marshal" && (
                            <div className="action-card">

                                <div className="action-icon">
                                    M
                                </div>

                                <h3>
                                    Marshal
                                </h3>

                                <p>
                                    Find events, register for positions
                                    and view your assignments.
                                </p>

                                <div className="action-links">

                                    <Link
                                        className="btn btn-primary"
                                        to="/events"
                                    >
                                        Browse Events
                                    </Link>

                                    <Link
                                        className="btn btn-secondary"
                                        to="/my-events"
                                    >
                                        My Events
                                    </Link>

                                </div>

                            </div>
                        )}


                        {/* Organizer */}
                        {user.role === "organizer" && (
                            <div className="action-card">

                                <div className="action-icon">
                                    O
                                </div>

                                <h3>
                                    Organizer
                                </h3>

                                <p>
                                    Create and manage your events
                                    and marshal assignments.
                                </p>

                                <div className="action-links">

                                    <Link
                                        className="btn btn-primary"
                                        to="/events/new"
                                    >
                                        Create Event
                                    </Link>

                                    <Link
                                        className="btn btn-secondary"
                                        to="/events"
                                    >
                                        My Events
                                    </Link>

                                </div>

                            </div>
                        )}


                        {/* Admin */}
                        {user.role === "admin" && (
                            <div className="action-card">

                                <div className="action-icon">
                                    A
                                </div>

                                <h3>
                                    Administrator
                                </h3>

                                <p>
                                    Manage events, users and
                                    system settings.
                                </p>

                                <div className="action-links">

                                    <Link
                                        className="btn btn-primary"
                                        to="/admin"
                                    >
                                        Admin Dashboard
                                    </Link>

                                    <Link
                                        className="btn btn-secondary"
                                        to="/admin/users"
                                    >
                                        Manage Users
                                    </Link>

                                </div>

                            </div>
                        )}

                    </div>

                </section>
            )}


            {/* How It Works */}
            <section className="home-section how-section">

                <div className="section-header centered">

                    <span className="section-label">
                        SIMPLE PROCESS
                    </span>

                    <h2>
                        How It Works
                    </h2>

                    <p>
                        Get ready for your next motorsport event
                        in three simple steps.
                    </p>

                </div>


                <div className="steps-grid">

                    <div className="step-card">

                        <span className="step-number">
                            01
                        </span>

                        <h3>
                            Find an Event
                        </h3>

                        <p>
                            Browse upcoming BIC events and find
                            one you want to participate in.
                        </p>

                    </div>


                    <div className="step-card">

                        <span className="step-number">
                            02
                        </span>

                        <h3>
                            Register
                        </h3>

                        <p>
                            Select the marshal positions you
                            are able to work.
                        </p>

                    </div>


                    <div className="step-card">

                        <span className="step-number">
                            03
                        </span>

                        <h3>
                            Get Assigned
                        </h3>

                        <p>
                            The organizer assigns your sector
                            post for the event.
                        </p>

                    </div>

                </div>

            </section>


            {/* Bottom CTA */}
            <section className="cta-section">

                <div className="cta-content">

                    {!user ? (
                        <>
                            <span className="section-label">
                                JOIN THE TEAM
                            </span>

                            <h2>
                                Ready to join the next event?
                            </h2>

                            <p>
                                Sign in or create an account
                                to start registering.
                            </p>

                            <Link
                                className="btn btn-primary"
                                to="/sign-up"
                            >
                                Create Account
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="section-label">
                                YOUR NEXT EVENT
                            </span>

                            <h2>
                                Ready for your next event?
                            </h2>

                            <Link
                                className="btn btn-primary"
                                to="/events"
                            >
                                Browse Events
                            </Link>
                        </>
                    )}

                </div>

            </section>

        </main>
    )
}

export default Home