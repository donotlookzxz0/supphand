import { acceptTicket } from "../../services/staff"

function AcceptBtn({ ticketId, onUpdate }) {

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
      className='bg-red-500 text-white cursor-pointer'
      onClick={handleAccept}
      >
        Accept
      </button>
    </div>
  )
}

export default AcceptBtn  