import { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router"
import { getTicketById } from "../services/ticket"
import { getAllComments } from "../services/comment"
import CommentForm from "../components/CommentForm"
import CommentList from "../components/CommentList"

function ViewTicket() {
  const { ticketId } = useParams()
  const [singleTicket, setSingleTicket] = useState(null)
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState(false)

  useEffect (() => {
    setLoading(false)
    setSingleTicket(null)
    getTicketById(ticketId)
    .then((data) => setSingleTicket(data))
    .catch((err) => {
      console.error(err) 
      setLoading(true)
    })

    getAllComments(ticketId)
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [ticketId])

  const toggleCommentForm = () => {
    setCommentForm(!commentForm)
  } 

  const onAddComment = (newComment) => {
    setComments((prev) => [...prev, newComment])
  }

  if (loading) {
    return <Navigate to='/' replace/>
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
      <CommentList comments={comments}/>
      <button className="text-white cursor-pointer" onClick={toggleCommentForm}>
        {commentForm ? "Cancel" : "Add comment"}
      </button>
      {commentForm && 
        <CommentForm 
        ticketId={ticketId} 
        addComment={onAddComment}
        closeCommentForm={toggleCommentForm} 
      />}
    </div>
    </>
    
  )
}

export default ViewTicket