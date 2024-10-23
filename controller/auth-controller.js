const User = require('../model/user-model')
const { setUser } = require('../service/auth-service')
const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password
    });
    return res.redirect("/");
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email, password
    });
    if (!user)
        return res.render('login', {
            error: "Invalid UserName or Password"
        })

    const token = setUser(user);
    // res.cookie('uid', token);
    return res.json({ token });
}

module.exports = { handleUserSignup, handleUserLogin }