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
  createUser() {
    // check if all fields are valid i.e. all required fields
    // create user
    // return user (firstname, lastname, email)
  },
  logoutUser() {
    // logout user
    // garbage collect resources
  }
}

export default userController;
