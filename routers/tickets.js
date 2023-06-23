
const express = require('express');
const router = express.Router();
const TicketsController = require('../controllers/ticketsControllers');
const jwt =require('../cofig/jwt')


// Create a ticket
router.post('/',jwt.verifyToken, TicketsController.createTicket);

// Get a ticket
router.get('/byid',jwt.verifyToken, TicketsController.getTicket);

// Delete a ticket
router.delete('/byid',jwt.verifyToken, TicketsController.deleteTicket);

//Total profit
router.get('/total_profit',jwt.verifyToken,TicketsController.totalProfit)

module.exports = router;
