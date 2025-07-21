import rateLimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await rateLimit.limit("my-limit-key");
        if(!success) {
            return res.status(429).json({
                message: "To many request, please wait"
            })
        }
        next();
    }
    catch (e) {
        console.log("rate limit error", e)
        next(e);
    }
}

export default rateLimiter;