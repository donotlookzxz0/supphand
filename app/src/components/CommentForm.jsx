import { useState } from "react";
import { createComment } from "../services/comment";

function CommentForm({ ticketId, closeCommentForm }) {
  const [description, setDescription] = useState("");

  const handleCommentCreation = async (e) => {
    e.preventDefault();
    try {
      const res = await createComment(ticketId, description);
      setDescription("");
      closeCommentForm();
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentCreation}>
        <input
          className="text-white"
          type="text"
          placeholder="Provide additional details..."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="text-white cursor-pointer">Post</button>
      </form>
    </div>
  );
}

export default CommentForm;
