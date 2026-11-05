import pool from '../config/db.js';

const getComments = async (req,res) => {
    const ticketId = Number(req.params.ticketId);
    
    if (!Number.isInteger(ticketId)) {
        return res.status(400).json({message: "Ticket ID associated with the comment must be a positive integer"});
    }

    const listComments = await pool.query("SELECT * FROM comments WHERE ticket_id = $1", [ticketId]);

    if (listComments.rows.length === 0) {
        return res.status(200).json([]);
    }

    return res.status(200).json(listComments.rows);
}

const getCommentById = async (req,res) => {
   const {ticketId, commentId} = req.params;

   if (!Number.isInteger(Number(ticketId)) || !Number.isInteger(Number(commentId))) {
    return res.status(400).json({message: "Ticket ID and Comment ID must be positive integers"});
   }

   const singleComment = await pool.query("SELECT * FROM comments WHERE ticket_id = $1 AND id = $2", [ticketId, commentId]);

   if (singleComment.rows.length === 0) {
    return res.status(400).json({message: "Comment does not exist"});
   }        

    return res.status(200).json(singleComment.rows[0]);

}

const createComment = async (req, res) => {
    const userId = req.user.id;
    const ticketId = Number(req.params.ticketId);
    
    const { description } = req.body;

    if (!description) {
        return res.status(401).json({message:'Description field is required'});
    }

    const postComment = await pool.query("INSERT INTO comments (description, ticket_id, user_id) values ($1, $2, $3) returning *", [description, ticketId, userId]);
    
    if (!postComment) {
        return res.status(400).json({message:'Error creating comment'});
    }
    
   if (ticketId !== postComment.rows[0].ticket_id) {
        return res.status(400).json({message: "Ticket ID does not match the comment's ticket ID"});
    }

    return res.status(201).json(postComment.rows[0]);
} 

export {getComments, getCommentById, createComment};