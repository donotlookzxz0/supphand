import pool from '../config/db.js';

const getAllUserTickets = async (req, res) => {

    const listAllTickets = await pool.query("SELECT * FROM tickets");

    if (listAllTickets.rows.length === 0) {
        return res.status(400).json({message:'No ticket/s found'});
    }

    return res.status(200).json({messge: listAllTickets.rows[0]});
}

const getUserTicketById = async (req, res) => {

    const userTicketId = Number(req.params.id);

    if (!Number.isInteger(userTicketId)) {
        return res.status(400).json({ message: "Ticket ID must be a positive integer" });
    }

    const viewUserTicket = await pool.query("SELECT * FROM tickets WHERE id = $1",[userTicketId]);

    if (viewUserTicket.rows.length === 0) {
        return res.status(400).json({message: "Ticket does not exist"});
    }

    res.json({viewTicket: viewUserTicket.rows[0]});
}


const acceptTicket = async (req, res) => {

    const userTicketId = Number(req.params.id);
    const status = req.body.status;

    const acceptedTicket = await pool.query("UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",[status=['PENDING'], userTicketId])

    return res.status(201).json(acceptedTicket.rows[0]);
}

const closeTicket = async (req, res) => {

    const userTicketId = Number(req.params.id);
    const status = req.body.status;

    const closedTicket = await pool.query("UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",[status=['CLOSED'], userTicketId])

    if (closedTicket.rows.length === 0) {
        return res.status(400).json({message: "Ticket not found"});
    }

    return res.status(201).json(closedTicket.rows[0]);
}

export {getAllUserTickets, getUserTicketById, acceptTicket, closeTicket};