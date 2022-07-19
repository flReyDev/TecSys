const msg_jwt = (msg) => {

    let message = {
        "invalid token":                "Token invalido, valida e intenta nuevamente!",
        "jwt malformed":                "Formato del token invalido, valida e intenta nuevamente!",
        "jwt signature is required":    "Firma del token requerida!",
        "invalid signature":            "Firma del token invalida!",
        "jwt audience invalid":         "Aundencia del token no valida!",
        "jwt issuer invalid":           "Emisor del token invalido!",
        "jwt id invalid":               "Identificador del token no es valido!",
        "jwt subject invalid":          "Sujeto del token invalido!",
        "jwt expired":                  "El token expiro!",
        "No Token":                     "No estas usando el Bearer token en el header!"
    }
    return message[ msg ];
}


module.exports = {
    msg_jwt
}