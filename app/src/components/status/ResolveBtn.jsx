import { resolveTicket } from "../../services/staff"

function ResolveBtn({ ticketId, status, onUpdate }) {

  const disabled = status !== "PENDING"

  const handleResolve = async (e) => {
    try {
      e.stopPropagation()
      const res = await resolveTicket(ticketId)
      onUpdate(res)
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div>
      <button 
      className="bg-green-500 text-white hover:bg-green-600 cursor-pointer rounded-md px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500"
      onClick={handleResolve}
      disabled={disabled}
      >
        Resolve
      </button>
    </div>
  )
}

export default ResolveBtn