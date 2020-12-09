const basicDetails = (user) => {
  const { _id, email, avatar, fullName, userName } = user;
  return { _id, email, avatar, fullName, userName };
};

module.exports = { basicDetails };
