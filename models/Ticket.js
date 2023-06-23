

const db = require('../cofig/db');

class Ticket {
  static async createTicket(ticketData) {
    const { customer_id, movieTitle, movieTime, ticketPrice,ticketsCount } = ticketData;
    const query = 'INSERT INTO tickets (customer_id, movie_title, movie_time, ticket_price,ticketsCount) VALUES ($1, $2, $3, $4,$5) RETURNING *';
    const values = [customer_id, movieTitle, movieTime, ticketPrice*ticketsCount,ticketsCount];
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating ticket');
    }
  }

  static async getTicket(ticketId) {
    const query = 'SELECT * FROM tickets WHERE id = $1';
    const values = [ticketId];
    console.log(ticketId)
    try {
      const result = await db.query(query, values);
      console.log(result.rows)
      return result.rows[0];
    } catch (error) {
      throw new Error('Error retrieving ticket');
    }
  }


  static async deleteTicket(ticketId) {
    const query = 'DELETE FROM tickets WHERE id = $1';
    const values = [ticketId];
    try {
      var d=await db.query(query, values);
      if(d.rowCount>0){
        return true
      }else{
        return false
      }

      
    } catch (error) {
      throw new Error('Error deleting ticket');
    }
  }

  static async total_profit(dateData){
    const {startDate,endDate}=dateData
    const query="SELECT TO_CHAR(createdAt, 'Month') AS month_name,SUM(ticket_price) AS total_profit,SUM(ticketsCount) as viewers FROM tickets WHERE createdAt >= $1::date AND createdAt <= $2::date GROUP BY month_name"
    const values=[startDate,endDate]
    try{
      var d=await db.query(query,values)
      if(d.rowCount>0){
        return d.rows[0]
      }else{
        return false
      }
    }catch (error) {
      throw new Error('Error deleting ticket');
    }
  }
}

module.exports = Ticket;
