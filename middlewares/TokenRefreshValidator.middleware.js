const { request, response } = require("express");
const { msg_jwt } = require("../helpers/msg");
const { verifyJwt } = require("../utils/ManagerJwt");

const tokenRefreshValidator = async ( req = request, res = response, next ) =>{
    try {
        let token = req.cookies?.refrehsToken;
        if(!token)
            throw new Error("No Refresh Token")

        let { _id, _role } =  await verifyJwt( token, process.env.JWT_REFRESH);
        
        req._id = _id;
        req._role = _role;

        next();
    } catch (error) {
        res.status(401).json({ error: msg_jwt(error.message) });
    }
}
module.exports = tokenRefreshValidator;