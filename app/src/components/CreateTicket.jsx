import { createTicket } from "../services/ticket";
import { useState } from "react";

function CreateTicket({ onCreateTicket }) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await createTicket(title, description)
      onCreateTicket(res.ticket)
      setTitle("")
      setDescription("")
      setModal(false)
    } catch (err) { 
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        className="bg-orange-400 hover:bg-orange-500 rounded-md px-3 py-1 text-white text-lg font-semibold cursor-pointer"
        onClick={toggleModal}
      >
      Create ticket +
      </button>
      {modal && (
        <div
          className="text-lg font-sembiold font-mono bg-black/50 fixed min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0"
          onClick={toggleModal}
        >
          <form
            className="rounded-md bg-white relative text-lg font-mono p-5 flex flex-col gap-3"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="border cursor-pointer" onClick={toggleModal}>
              Close
            </button>
            <label>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="border rounded-md"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Add description</label>
            <textarea
            type="text"
              id="description"
              name="description"
              className="border rounded-md"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-black text-white cursor-pointer disabled:bg-gray-300"
              disabled={loading}
            >
             { loading ? "Creating..." : "Create ticket"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateTicket;