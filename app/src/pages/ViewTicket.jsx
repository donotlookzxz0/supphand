import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { getTicketById } from "../services/ticket"
import CommentForm from "../components/CommentForm"
import CommentList from "../components/CommentList"

function ViewTicket() {
  const { ticketId } = useParams()
  const [singleTicket, setSingleTicket] = useState(null)
  const [commentForm, setCommentForm] = useState(false)

  useEffect (() => {
    getTicketById(ticketId)
    .then((data) => setSingleTicket(data))
    .catch((err) => console.error(err))
  }, [ticketId])

  const toggleCommentForm = () => {
    setCommentForm(!commentForm)
  }

  if (!singleTicket) {
    return <p>...</p>
  }

  return (
    <>
    <div>
      <Link to="/" className="text-green-500">Back</Link>
      {singleTicket.title}
      {singleTicket.description}
      {singleTicket.status}
    </div>

    <div>
      <button className="text-white cursor-pointer" onClick={toggleCommentForm}>
        {commentForm ? "Cancel" : "Add comment"}
      </button>
      {commentForm && <CommentForm ticketId={ticketId} closeCommentForm={toggleCommentForm} />}
      <CommentList ticketId={ticketId}/>
    </div>
    </>
    
  )
}

export default ViewTicket