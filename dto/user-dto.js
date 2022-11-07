export default {
  generateUserDto: (userModel) => {
    return {
      email: userModel.email,
      id: userModel._id,
      isActivated: userModel.isActivated,
    };
  },
};
