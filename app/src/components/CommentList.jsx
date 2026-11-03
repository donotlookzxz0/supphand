import { useState, useEffect } from "react";
import { getAllComments } from "../services/comment";

function CommentList({ ticketId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments(ticketId)
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [ticketId]);

  return (
    <>
      <div className="flex justify-center items-center text-white text-lg font-mono">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.description}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CommentList;