const UserModel = require('../models/userModel');

const roleAuth = (req, res, next) => {
  const user = req.user;

  if (user) {
    UserModel.findOne({ username: user.username })
      .then((foundUser) => {
        if (foundUser && foundUser.role === 'admin') {
          // Nếu role là admin, cho phép đi tiếp
          next();
        } else {
          // Nếu không phải admin, từ chối truy cập
          return res.status(403).json({ code: 1, message: 'Access denied. Only admins are allowed.' });
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
        return res.status(500).json({ code: 2, message: 'Internal server error' });
      });
  } else {
    // Nếu không có người dùng, từ chối truy cập
    return res.status(401).json({ code: 3, message: 'Unauthorized. Please log in' });
  }
};

module.exports = roleAuth;