// utilities
import { loginSchema } from '../../../utils/schemaValidation';

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
      return res.status(401)
        .send({
          message: "Invalid input",
          error: error.details[0].message
        });
    }

   },
  async logoutUser(req, res){}
}

export default authController;