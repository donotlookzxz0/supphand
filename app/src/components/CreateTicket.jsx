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
          className="bg-black/50 fixed min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0"
          onClick={toggleModal}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
          <div className="flex flex-col gap-3 justify-center rounded-md bg-white relative text-lg p-5 w-xs md:w-lg">
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-md">What's the concern about?</p>
              <button type="button" className="border rounded-md bg-red-500 hover:bg-red-600 cursor-pointer px-1 md:px-3 py-1 text-white" onClick={toggleModal}>
                Close
              </button>
            </div>
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
              rows={5}
              cols={20}
              minLength={1}
              maxLength={255}
              className="border rounded-md"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button 
              type="submit" 
              className="border rounded-md bg-orange-400 hover:bg-orange-500 cursor-pointer text-white px-2 py-1 disabled:bg-gray-500"
              disabled={loading}
            >
             { loading ? "Creating..." : "Create ticket"}
            </button>
          </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateTicket;