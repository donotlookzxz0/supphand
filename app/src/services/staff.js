import api from './api.js';

const getAllUserTickets = async() => {
    try {
        const res = await api.get('/staff')
        return res.data
    } catch(err) {
        console.error(err)
        throw(err)
    }   
}

const getUserTicketById = async(id) => {
    try {
        const res = await api.get(`/staff/${id}`)
        return res.data
    } catch(err) {
        console.error(err)
        throw(err)
    }   
}

const acceptTicket = async(id) => {
    try {
        const res = await api.put(`/staff/${id}/accept`)
        return res.data
    } catch(err) {
        console.error(err)
        throw(err)
    }   
}

const resolveTicket = async(id) => {
    try {
        const res = await api.put(`/staff/${id}/resolve`)
        return res.data
    } catch(err) {
        console.error(err)
        throw(err)
    }   
}

export { getAllUserTickets, getUserTicketById, acceptTicket, resolveTicket }