import { useState } from "react";
import { createComment } from "../services/comment";

function CommentForm({ ticketId, addComment, closeCommentForm }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)

  const handleCommentCreation = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await createComment(ticketId, description);
      addComment(res)
      setDescription("");
      closeCommentForm();
      return res.data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentCreation}>
        <div className="flex flex-col gap-2">
          <textarea
            className="border rounded-md p-2 w-1/2"
            type="text"
            id="description"
            name="description"
            placeholder="Add a comment..."
            rows={5}
            cols={100}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <button 
            className="border rounded-md px-3 py-1 text-white bg-orange-400 hover:bg-orange-500 cursor-pointer disabled:bg-gray-500"
            disabled={loading}
            >
             {loading ? "Posting..." : "Post comment"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
