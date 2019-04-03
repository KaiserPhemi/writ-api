// middlewares
import auth from '../../../middlewares/authentication';

// model
import db from '../../../db/models';

/**
 * @desc handles all request for a user
 */
const userController = {

  /**
   *
   * @param {objkect} req
   * @param {*} res
   */
  loginUser(req, res) {
    const { email, password } = req.body;
    db.User
      .findOne({ where: { email } })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          user.update({ active: true });
          const token = auth.getToken(user);
          user = Helper.userProfile(user);
          return res
            .status(200)
            .send({
              message: 'You have successfully logged in.',
              token,
              user
            });
        }
        res.status(401)
          .send({
            message: 'Incorrect login credentials. Please try again.'
          });
      });
  },
  getAllUsers() {
    //check if user logged in is admin
    // get all users in the database
  },

  /**
   * @desc creates user in the database
   * @param {object} req
   * @param {object} res
   */
  createUser(req, res) {
    db.User
      .create(req.body)
      .then(user => {
        // const token = Authentication.getToken(user);
        // user = Helper.userProfile(user);
        return res
          .status(201)
          .send({
            message: 'Account created successfully.',
            // token,
            user
          });
      })
      .catch(err => {
        return res
          .status(500)
          .send({
            message: 'An error has occured. Account was not created',
            error: err
          });
      });
  },

  logoutUser() {
    // logout user
    // garbage collect resources
  }
}

export default userController;
