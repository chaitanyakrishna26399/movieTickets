const User = require('../models/User');
const jwt = require('../cofig/jwt')
const bcrypt = require('bcrypt');
class user {
    static async userRegestration(req, res, next) {
        try {
            const result = await User.createUser(req.body)
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const result = await User.getToken(req.body);
            if (result) {
                
                bcrypt.compare(result.password_,result.dbpassword, async function  (err, response) {
                    if (err) {
                       console.log(err)
                    }
                    if (response) {
                        var data = await jwt.createToken("sumData")
                        res.json({ success: true, token:data })
                    } else {
                        // response is OutgoingMessage object that server response http request
                        return res.json({ success: false, message: 'passwords do not match' });
                    }
                });

            } else {
                res.status(404).json({ error: 'user not found' });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = user
