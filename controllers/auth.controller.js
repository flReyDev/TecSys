const { response, request } = require("express");
const { verifyJwt } = require("../utils/ManagerJwt");

const validRefreshToken = async ( req = request, res = response)=>{
    
    try {        
        let token = req.cookies?.refrehsToken;
        if(!token)
            throw new Error("No existe el token!")
        console.log( token );
        let { _id } = await verifyJwt( token, process.env.JWT_REFRESH );

        console.log( _id );

    } catch (error) {
        res.status( 400 ).json({ error });
    }
}

module.exports = validRefreshToken;