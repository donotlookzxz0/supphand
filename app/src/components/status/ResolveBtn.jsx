import { resolveTicket } from "../../services/staff"

function ResolveBtn({ ticketId, onUpdate }) {

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
      className='bg-green-500 text-white cursor-pointer'
      onClick={handleResolve}
      >
        Resolve
      </button>
    </div>
  )
}

export default ResolveBtn