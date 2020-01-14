// third-party libraries
import jwt from 'jsonwebtoken';

/**
 * @desc 
 */
const auth = {
  /**
   * @desc verifies the token supplied
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   */
  async verifyToken(req, res, next) { 
    const token = req.header('x-auth-token')
    if (!token) {
      return res.status(401)
        .send({
          message: 'Unauthorized. Please login.'
        })
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400)
        .send({
          message: 'Invalid token',
          error
        })
    }
  },

  /**
   * @desc check if user has admin rights
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   */
  async checkAdminRights(req, res, next) {
    const { user } = req;
    if (user.roleTitle != 'super-admin' || user.roleTitle != 'team-admin') {
      return res.status(403)
        .send({
          message: 'Access forbidden.'
        })
    }
    next();
  } 
}

export default auth;