import pool from '../config/db.js';

const LIMIT = 10;

const getAllTickets = async (req, res) => {
    const userId = req.user.id;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const offset = (page - 1) * LIMIT;

    const listTicket = await pool.query("SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3", [userId, LIMIT + 1, offset]);
    
    if (listTicket.rows.length === 0) {
        return res.status(200).json([]);
    }   

    return res.status(200).json({
        tickets: listTicket.rows.slice(0, LIMIT),
        page,
        hasNext: listTicket.rows.length > LIMIT,
    });
};

const getTicketById = async (req, res) => {
    const {role, id: userId} = req.user;
    const ticketId = Number(req.params.ticketId);

    if (!Number.isInteger(ticketId)) {
        return res.status(400).json({ message: "Ticket ID must be a positive integer" });
    }
    const isStaff = role === "staff" || role === "admin"

    const singleTicket = isStaff 
    ? await pool.query("SELECT * FROM tickets WHERE id = $1", [ticketId])
    : await pool.query("SELECT * FROM tickets WHERE id = $1 AND user_id = $2", [ticketId, userId]);

    if (singleTicket.rows.length === 0) {
        return res.status(404).json({message: "Ticket does not exist"});
    }

    return res.status(200).json(singleTicket.rows[0]);
};

const createTicket = async (req, res) => {
    const { id: userId, username } = req.user;
    const {title, description} = req.body;
    
    if (!title || !description) {
       return res.status(400).json({message:'Fields are required'});
    }

    const postTicket = await pool.query(
        "INSERT INTO tickets (title, description, user_id, username) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, userId, username]
    );

    if (!postTicket) {
        return res.status(400).json({message:'Error creating ticket'});
    }

    return res.status(201).json({ticket: postTicket.rows[0]})
}

export {getAllTickets, getTicketById, createTicket};