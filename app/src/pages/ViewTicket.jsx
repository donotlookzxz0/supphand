  import { useState, useEffect } from "react"
  import { useParams, Navigate } from "react-router"
  import { getTicketById } from "../services/ticket"
  import { getAllComments } from "../services/comment"
  import CommentForm from "../components/CommentForm"
  import CommentList from "../components/CommentList"
  import SingleTicketSkeleton from "../components/loader/viewticket/SingleTicketSkeleton"
  import AddCommentSkeleton from "../components/loader/viewticket/AddCommentSkeleton"
  import CommentListSkeleton from "../components/loader/viewticket/CommentListSkeleton"

  function ViewTicket() {
    const { ticketId } = useParams()
    const [singleTicket, setSingleTicket] = useState(null)
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect (() => {
    setLoading(false)
    setSingleTicket(null)
    setIsFetching(true)

    const ticketRequest = getTicketById(ticketId)
      .then((data) => setSingleTicket(data))
      .catch((err) => {
        console.error(err) 
        setLoading(true)
      })

    const commentsRequest = getAllComments(ticketId)
      .then((data) => setComments(data))
      .catch((err) => console.error(err));

    Promise.allSettled([ticketRequest, commentsRequest]).finally(() => setIsFetching(false))
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

    if (!singleTicket && !isFetching) {
      return <p>...</p>
    }

    return (
      <div className="flex flex-col justify-center items-center w-full m-5 p-8 gap-5">
        
        {isFetching ? (
        <SingleTicketSkeleton />
      ) : (
        <div className="flex flex-col gap-2 p-5 bg-white rounded-md w-80 md:w-120 lg:w-150 wrap-break-word">
          <p className="text-2xl font-medium">{singleTicket.title}</p>
          <p className="text-sm text-gray-500">{singleTicket.username}</p>
          <p>{singleTicket.description}</p>
        </div>
      )}

        <div>
        {isFetching ? (
          <AddCommentSkeleton />
        ) : (
          <button 
          className="border rounded-md px-2 py-1 text-white bg-orange-400 hover:bg-orange-500 cursor-pointer" 
          onClick={toggleCommentForm}
          >
            {commentForm ? "Cancel" : "Add comment"}
          </button>
        )}
        {commentForm &&   
          <CommentForm 
          ticketId={ticketId} 
          addComment={onAddComment}
          closeCommentForm={toggleCommentForm} 
        />}
        </div>

        <div className="flex flex-col gap-3 bg-white rounded-md">
          {isFetching ? <CommentListSkeleton /> : <CommentList comments={comments}/>}
        </div>

      </div>
    )
  }

  export default ViewTicket