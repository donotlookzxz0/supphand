import { rateLimit } from 'express-rate-limit'

export const authLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	limit: 10, 
	standardHeaders: false, 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
	message: "Too many requests. Try again after 5 minutes."
})
