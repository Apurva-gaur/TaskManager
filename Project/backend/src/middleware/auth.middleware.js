import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer", "");
        console.log("token", token)
        if (!token) {
            throw new ApiError(401, "unauthorized");
        }

        const decode = jwt.verify(token, process.env.ACCESSTOKEN);
        const user = await User.findById(decode._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "unauthorized");
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        throw new ApiError(
            401,
            error.message || "somthing went wrong while jwt auth"
        );
    }
});

export { authMiddleware };