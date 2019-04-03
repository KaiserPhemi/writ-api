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
          message: 'Unauthorized Access.'
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
    next();
  }
};

export default auth;
