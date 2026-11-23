import api from './api.js';

const getAllTickets = async (page = 1, search = '', status = "All") => {

    try {
        const res = await api.get('/tickets', { params: { page, search, status } })
        return res.data
    } catch (error) {
        console.error(error)
        throw(error)
    }
}

const getTicketById = async (id) => {

    try {
        const res = await api.get(`/tickets/${id}`)
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