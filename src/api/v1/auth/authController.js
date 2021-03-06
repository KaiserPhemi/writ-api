// third-party libraries
import jwt from 'jsonwebtoken';

// database connection
import pool from '../../../db/connection';

// utilities
import { loginSchema } from '../../../utils/schemaValidation';
import { checkUser, setUserActive } from '../../../db/query';
import { comparePassword } from '../../../utils/encrypt';

// key
const jwtKey = process.env.JWT_KEY;

/**
 * @desc auth controller
 */
const authController = {
  /**
   * @desc login a user
   * @param {object} req 
   * @param {object} res 
   */
  async loginUser(req, res) {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password }); 
    if (error) {
      return res.status(400)
        .send({
          message: "Invalid input",
          error: error.details[0].message
        });
    }
    const user = (await pool.query(checkUser(email))).rows[0];
    if (!user) {
      return res.status(400)
        .send({
          message: "Invalid email or password"
        });
    }
    const validatePassword = await comparePassword(password, user.user_password);
    if (!validatePassword) {
      return res.status(400)
        .send({
          message: "Invalid email or password"
        });
    }
    const activeUser = (await pool.query(setUserActive(email))).rows[0];
    const userToken = jwt.sign({
        userId: activeUser.user_id,
        roleTitle: activeUser.role_title
      },
      jwtKey,
      { expiresIn: '24h' }
    );
    return res.status(201)
      .header('x-auth-token', userToken)
      .send({
        message: 'User logged in successfully!.',
        activeUser
      })
  }
}

export default authController;
