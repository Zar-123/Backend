
export const verificarApiKey = (req,res,next) =>{
    const API_KEY_SECRETA = "123";
    const apikey = req.headers['x-api-key'];

    if(apikey === API_KEY_SECRETA ){
        console.log("Acceso autorizado por API Key.");
        next();
    }else{
        console.warn("Intento de acceso denegado. Clave inválida o faltante.");
        res.status(401);
    }
}

export const handleJsonError = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "JSON mal formado en el cuerpo de la solicitud." });
    }
    next(err);
};