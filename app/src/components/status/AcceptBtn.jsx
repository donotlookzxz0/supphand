import { acceptTicket } from "../../services/staff"

function AcceptBtn({ ticketId, status, onUpdate }) {

  const disabled = status !== "OPEN"

  const handleAccept = async (e) => {
    try {
      e.stopPropagation()
      const res = await acceptTicket(ticketId)
      onUpdate(res)
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div>
      <button 
      className='bg-orange-400 text-white hover:bg-orange-500 cursor-pointer rounded-md px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-400'
      onClick={handleAccept}
      disabled={disabled}
      >
        Accept
      </button>
    </div>
  )
}

export default AcceptBtn  