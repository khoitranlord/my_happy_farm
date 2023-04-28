const User = require('../models/user.model');

const login = (req, res) => {
    User.login(req.body, (result) => {
        if (result === null) {
            res.status(500).send("Đăng nhập sai tài khoản hoặc mật khẩu");
        } else {
            res.send(result[0][0]);
        }
    })
}

const register = (req, res) => {
    User.register(req.body, (result) => {
        if (result === null) {
            res.status(500).send("Đăng ký không thành công");
        } else {
            res.send(result);
        }
    })
}

module.exports = { login, register }