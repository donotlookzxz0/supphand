import pool from '../config/db.js';

const getAllTickets = async (req, res) => {
    const userId = req.user.id;

    const listTicket = await pool.query("SELECT * FROM tickets WHERE user_id = $1",[userId]);
    
    if (listTicket.rows.length === 0) {
        return res.status(200).json([]);
    }   

    return res.status(200).json(listTicket.rows);
};

const getTicketById = async (req, res) => {
    const userId = req.user.id;
    const ticketId = Number(req.params.ticketId);

    if (!Number.isInteger(ticketId)) {
        return res.status(400).json({ message: "Ticket ID must be a positive integer" });
    }

    const singleTicket = await pool.query("SELECT * FROM tickets WHERE id = $1 AND user_id = $2", [ticketId, userId]);

    if (singleTicket.rows.length === 0) {
        return res.status(400).json({message: "Ticket does not exist"});
    }

    return res.status(200).json(singleTicket.rows[0]);
};

const createTicket = async (req, res) => {
    const userId = req.user.id;

    const {title, description} = req.body;
    
    if (!title || !description) {
       return res.status(401).json({message:'Fields are required'});
    }

    const postTicket = await pool.query(
        "INSERT INTO tickets (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
        [title, description, userId]
    );

    if (!postTicket) {
        return res.status(400).json({message:'Error creating ticket'});
    }

    return res.status(201).json({ticket: postTicket.rows[0]})
}

export {getAllTickets, getTicketById, createTicket};