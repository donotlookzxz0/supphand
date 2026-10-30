import api from './api.js';

const getAllTickets = async (title, description, status) => {

    try {
        const res = await api.get('/tickets', {
            title,
            description,
            status
        })
        return res.data
    } catch (error) {
        console.error(error)
        throw(error)
    }
}

const getTicketById = async (id, title, description, status) => {

    try {
        const res = await api.get(`/tickets/${id}`, {
            ticketId: id,
            title,
            description,
            status
        })
        return res.data
    } catch (error) {
        console.error(error)
        throw(error)
    }
}

const createTicket = async (title, description) => {

    try {
        const res = await api.post('/tickets', {
            title,
            description,
        })
        return res.data
    } catch (error) {
        console.error(error)
        throw(error)
    }
}

export { getAllTickets, getTicketById, createTicket }