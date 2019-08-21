const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin');

exports.signIn = (req, res, next) => {
    const { email, password } = req.body;
    
    Admin.findOne({
        where: {
            email: email,
        }
    })
        .then(result => {
            console.log('rs', result.password)
            if (result) {
                if (bcrypt.compareSync(password, result.password)) {
                    const token = jwt.sign({
                        userId: result.id.toString(),
                        email: result.email
                    }, process.env.SECRET_KEY, { expiresIn: '2h' });

                    res.status(200).json({
                        token,
                        message: 'OK',
                    })
                }

            }
            return res.status(401).json({
                message: 'Email or password is not correct'
            })
        })
        .catch(error => {
            if (error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })

}