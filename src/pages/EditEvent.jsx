import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as eventService from "../services/events"

const EditEvent = () => {
    const {eventId} = useParams()
    
    return(
        <h1>potato</h1>
    )
}

export default EditEvent