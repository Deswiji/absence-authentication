const tb_users = require('../models/tb_users');

const validateUser = async (email) => {
  const dataUser = await tb_users.findOne({
    where: {
      email,
    },
  });
  if (dataUser) {
    return {
      data: dataUser,
      message: 'Email has been registered.',
    };
  }
};

module.exports = {
  validateUser,
};
