import pool from '../config/db.js';

const LIMIT = 10;

const getAllUserTickets = async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const offset = (page - 1) * LIMIT;
    const search = req.query.search?.trim().slice(0, 100) || '';

    const listAllTickets = await pool.query( "SELECT * FROM tickets WHERE ($3 = '' OR title ILIKE '%' || $3 || '%' OR description ILIKE '%' || $3 || '%') ORDER BY id DESC LIMIT $1 OFFSET $2",[LIMIT + 1, offset, search]);

    if (listAllTickets.rows.length === 0) {
        return res.status(200).json([]);
    }

    return res.status(200).json({
        tickets: listAllTickets.rows.slice(0, LIMIT),
        page,
        hasNext: listAllTickets.rows.length > LIMIT,
    });
}

const getUserTicketById = async (req, res) => {

    const userTicketId = Number(req.params.id);

    if (!Number.isInteger(userTicketId)) {
        return res.status(400).json({ message: "Ticket ID must be a positive integer" });
    }

    const viewUserTicket = await pool.query("SELECT * FROM tickets WHERE id = $1",[userTicketId]);

    if (viewUserTicket.rows.length === 0) {
        return res.status(404).json({message: "Ticket does not exist"});
    }

    res.json({viewTicket: viewUserTicket.rows[0]});
}

const status = {PENDING:'PENDING', RESOLVED:'RESOLVED'};

const acceptTicket = async (req, res) => {

    const userTicketId = Number(req.params.id);
    
    const acceptedTicket = await pool.query("UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",[status.PENDING, userTicketId])

    if (acceptedTicket.rows.length === 0) {
        return res.status(404).json({message: "Ticket not found"});
    }

    return res.status(200).json(acceptedTicket.rows[0]);
}

const resolveTicket = async (req, res) => {

    const userTicketId = Number(req.params.id);;

    const resolvedTicket = await pool.query("UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",[status.RESOLVED, userTicketId])

    if (resolvedTicket.rows.length === 0) {
        return res.status(404).json({message: "Ticket not found"});
    }

    return res.status(200).json(resolvedTicket.rows[0]);
}

export {getAllUserTickets, getUserTicketById, acceptTicket, resolveTicket};