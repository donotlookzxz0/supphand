import api from './api.js';

const getAllComments = async (ticketId) => {

    try {
        const res = await api.get(`/tickets/${ticketId}/comments`)
        return res.data
    } catch (error) {
        console.error(error)
        throw(error)
    }
}

const createComment = async (ticketId, description) => {

    try {
        const res = await api.post(`/tickets/${ticketId}/comments`, {
            description,
        })
        return res.data
    } catch (error) {
        console.error(error)
        throw(error)
    }
}

export { getAllComments, createComment }