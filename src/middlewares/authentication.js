// dependencies
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// models
import db from '../db/models';

// get environment variables
dotenv.config();
const secretKey = process.env.JWT_KEY;

/**
 * @desc handles all authentication
 */
const auth = {

  /**
   * @desc generates a token for user
   * @param {object} user
   */
  createToken(user) {
    const userToken = jwt.sign({
      userId: user.id,
      roleId: user.roleId
    },
      secretKey, { expiresIn: '2d' });
    return userToken;
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

  /**
   * @desc verifies token
   * @param {object} req
   * @param {object} res
   * @param {func} next
   */
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token']
      || req.headers.authorization;
    if (!token) {
      return res
        .status(400)
        .send({
          message: 'Token not supplied.'
        });
    }
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({
            message: 'Invalid Token'
          });
      }
      db.User
        .findByPk(decode.userId)
        .then((user) => {
          if (!user) {
            return res
              .status(404)
              .send({
                message: 'Account does not exist. Kindly signup.'
              });
          }
          if (!user.active) {
            return res
              .status(404)
              .send({
                message: 'Please sign in to access account.'
              });
          }
          req.tokenDecode = decode;
          req.tokenDecode.roleId = user.roleId;
        })
        .catch(err => {
          return res
            .status(500)
            .send({
              message: 'Error encountered',
              err
            });
        });
    });
    next();
  },

  /**
   * @desc validates if user has admin rights
   * @param {object} req
   * @param {object} res
   * @param {func} next
  */
  checkAdminRights(req, res, next) {
    db.Role
      .findByPk(req.tokenDecode.roleId)
      .then(role => {
        if (role.title !== 'admin') {
          return res
            .status(403)
            .send({
              message: 'You are not permitted to perform this action.'
            });
        }
      })
      .catch(err => {
        return res
          .status(500)
          .send({
            message: 'Error encountered',
            err
          });
      });
    next();
  },

  /**
   * @desc validates form data
   * @param {object} req
   * @param {object} res
   * @param {func} next
   */
  verifyInputs(req, res, next) {
    const {
      email,
      firstname,
      lastname,
      username,
      password
    } = req.body;
    const userEmail = /\S+@\S+\.\S+/.test(email);
    const firstName = /\w+/g.test(firstname);
    const lastName = /\w+/g.test(lastname);
    const userName = /\w+/g.test(username);
    const passWord = /\w+/g.test(password);

    if (!userEmail) {
      return res
        .status(400)
        .send({
          message: 'Please enter a valid email address.'
        });
    }
    if (!firstName || !lastName) {
      return res
        .status(400)
        .send({
          message: 'Please enter a valid name.'
        });
    }
    if (!userName) {
      return res
        .status(400)
        .send({
          message: 'Please enter a valid username.'
        });
    }
    if (!passWord) {
      return res
        .status(400)
        .send({
          message: 'Password field cannot be empty. Please enter a password.'
        });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .send({
          message: 'Password cannot be less than 8 characters. Try again!'
        });
    }
    next();
  },

  /**
   * @desc checks the database for users with matching details
   * @param {object} req
   * @param {object} res
   * @param {func} next
   */
  checkExistingUser(req, res, next) {
    db.User
      .findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) {
          return res
            .status(409)
            .send({
              message: 'Email address already exist.'
            });
        }
        db.User
          .findOne({ where: { userName: req.body.userName } })
          .then(user => {
            if (user) {
              return res
                .status(409)
                .send({
                  message: 'Username already exist.'
                });
            }
          })
          .catch(err => {
            return res
              .status(500)
              .send({
                message: 'An error occured.',
                error: err
              });
          });
      })
      .catch(err => {
        return res
          .status(500)
          .send({
            message: 'An error occurred.',
            error: err
          });
      });
    next();
  }
};

export default auth;
