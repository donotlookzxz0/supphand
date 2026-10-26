import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,     
};

const register = async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({message:'Fields are required'})
    }

    const existingUsername = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
    
    if (existingUsername.rows.length > 0){
        return res.status(400).json({message:'Username is already taken'});
    }

    const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
    
    if (existingEmail.rows.length > 0){
        return res.status(400).json({message:'User with that email already exists'});
    }

    if (password.length < 8) {
        return res.status(400).json({message:'Password must be at least 8 characters'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
        "INSERT INTO users (username, email, password_hashed) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
    );

    const newUserData = newUser.rows[0];

    const token = generateToken(newUser.rows[0].id);
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({ user: {
        id: newUserData.id,
        username: newUserData.username,
        email: newUserData.email,
    }});
};

const login = async (req, res) => {
    const {username, password} = req.body;
    
    if (!username || !password) {
        return res.status(401).json({message:'Fields are required to log in'});
    }

    const user = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    if (user.rows.length === 0) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const userData = user.rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, userData.password_hashed)
    
    if (!isPasswordValid) {
        return res.status(401).json({message:"Incorrect username or password"});
    }
    
    const token = generateToken(userData)
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
    user: {
      id: userData.id,
      username: userData.username,
    },
  });

};

const me = async (req, res) => {
    return res.json(req.user);
}

const logout = async (req, res) => {
    // res.cookie("jwt", "", {
    //     httpOnly: true,
    //     expires: new Date(0),
    // });
    // res.status(200).json({
    //     message: 'Logged out'
    // });

    res.cookie("token", "", {
        ...cookieOptions, maxAge: 1
    });
    res.status(200).json({
        message: 'Logged out'
    });
};

export {register, login, me, logout};