

const Ticket = require('../models/Ticket');

class TicketsController {
  static async createTicket(req, res, next) {
    try {
      const ticket = await Ticket.createTicket(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  static async getTicket(req, res, next) {
    try {
      console.log(req.params)
      const ticket = await Ticket.getTicket(req.body.id);
      console.log(ticket)
      if (ticket) {
        res.json(ticket);
      } else {
        res.status(404).json({ error: 'Ticket not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteTicket(req, res, next) {
    try {
      var data = await Ticket.deleteTicket(req.body.id);
      if (data) {
        res.status(200).json({ message: 'Ticket not found' });
      }else{
        res.status(404).json({ error: 'id not found' });
      }
      

    } catch (error) {
      next(error);
    }
  }
}

module.exports = TicketsController;
