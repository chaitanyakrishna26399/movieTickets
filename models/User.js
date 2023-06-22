const db = require('../cofig/db');
const jwt = require('../cofig/jwt')
const bcrypt = require('bcrypt');

class user {
    static async createUser(userData) {
        const { customer_name, password_ } = userData;
        var haspassword = await bcrypt.hash(password_, 10);
        console.log(haspassword)
        const query = 'INSERT INTO customer (customer_name, password_) VALUES ($1, $2) RETURNING *';
        const values = [customer_name, haspassword];
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error creating ticket');
        }
    }


    static async getToken(userData) {
        const { customer_name, password_ } = userData;
        const query = 'SELECT * FROM customer  WHERE customer_name = $1';
        const values = [customer_name];
        try {
            const result = await db.query(query, values);
            var dbpassword = result.rows[0].password_
            return ({password_,dbpassword})
        } catch (error) {
            throw new Error('Error retrieving ticket');
        }

    }
}

module.exports = user