// middleware/authMiddleware.js
const setToken = (req, res, next) => {
    if (!req.cookies.token) {
        res.cookie("token", req.token, { expiresIn: "1d" });
    }
    next();
};

module.exports = setToken;
