import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { getTicketById } from "../services/ticket"

function ViewTicket() {
  const { ticketId } = useParams()
  const [singleTicket, setSingleTicket] = useState(null)

  useEffect (() => {
    getTicketById(ticketId)
    .then((data) => setSingleTicket(data))
    .catch((err) => console.error(err))
  }, [ticketId])

  if (!singleTicket) {
    return <p>...</p>
  }

  return (
    <div>
      <Link to="/" className="text-green-500">Back</Link>
      {singleTicket.title}
      {singleTicket.description}
      {singleTicket.status}
    </div>
    
  )
}

export default ViewTicket