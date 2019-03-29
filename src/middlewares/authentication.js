// dependencies
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// get environment variables
dotenv.config();
const secretKey = process.env.JWT_KEY;

/**
 * @desc handles all authentication
 */
const auth = {

  createToken(user) {
    const userToken = jwt.sign({

    })
  },

  /**
   * @desc validates the users' inputs on login fields
   * @param {object} req request object
   * @param {object} res response object
   * @param {func} next next method
   */
  verifyLogin(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({
          message: 'Please provide your email and password to login.'
        });
    }
    const email = /\S+@\S+\.\S+/.test(req.body.email);
    const password = /\w+/g.test(req.body.password);
    if (!email || !password) {
      return res
        .status(400)
        .send({
          message: 'Please enter a valid email and password.'
        })
    }
    next();
  },

  verifyToken() { },
  checkAdminRights() { },
  verifyInputs(){}

};

export default auth;
