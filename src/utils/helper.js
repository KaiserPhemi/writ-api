// clean up data
const helper = {
  /**
   * @desc filters user data not needed at the client
   * @param {object} user
   */
  userProfile(user) {
    // user object
    const userProps = {
      id: user.id,
      username: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userProps;
  },
};

export default helper;
