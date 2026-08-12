import { Link } from "react-router"
import '../styles/EventsList.css'

const EventList = (props) => {
    console.log(!props.event);

    if (!props.events) return (<p>Loading...</p>)


    return (
        <main className="events-page">

            <div className="events-page-container">

                {/* Header */}
                <div className="events-page-header">

                    <span className="section-label">
                        BIC MARSHALS
                    </span>

                    <h1>Upcoming Events</h1>

                    <p>
                        Browse upcoming motorsport events and
                        register for marshal positions.
                    </p>

                </div>


                {/* Events */}
                <div className="events-container">

                    {props.events.map((event) => (

                        <Link
                            key={event._id}
                            to={`/events/${event._id}`}
                            className="event-card"
                        >

                            <div className="event-card-header">

                                <h2>
                                    {event.title}
                                </h2>

                                <span
                                    className={`event-status event-status-${event.status?.toLowerCase()}`}
                                >
                                    {event.status}
                                </span>

                            </div>


                            <p className="event-description">
                                {event.description}
                            </p>


                            <div className="event-card-info">

                                <div className="event-info-item">

                                    <span>
                                        Event Date
                                    </span>

                                    <strong>
                                        {new Date(
                                            event.eventDate
                                        ).toLocaleDateString()}
                                    </strong>

                                </div>


                                <div className="event-info-item">

                                    <span>
                                        Maximum Marshals
                                    </span>

                                    <strong>
                                        {event.maxMarshals}
                                    </strong>

                                </div>

                            </div>


                            <div className="event-card-footer">

                                <span>
                                    View Event
                                </span>

                                <span className="event-arrow">
                                    →
                                </span>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </main>
    )
}

export default EventList