import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


import jwt from "jsonwebtoken"

const authStatus = asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(200).json(new ApiResponse(200, false, "User is not logged in"));
    }
    jwt.verify(accessToken, process.env.ACCESSTOKEN, (err, decoded) => {
        if (err) {
            return res.status(200).json(new ApiResponse(200, false, "User is not logged in"));
        }
        res.status(200).json(new ApiResponse(200, true, "User is logged in"));
    }
    );

})



// function for the genrating access token and refresh token
const genrateAccessAndRefreshToken = async userId => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(400, "User not found");
        }
        const accessToken = user.genrateAccessToken();
        const refreshToken = user.genrateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while genrating the tokens");
    }
};
// creating new user

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword, username } = req.body;

    console.log("req.body", req.body);

    if (!name || !email || !password || !confirmPassword || !username) {
        throw new ApiError(400, "Please fill all the fields");
    }
    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }


    const ExistingEmailOrUsername = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (ExistingEmailOrUsername) {
        throw new ApiError(400, "Email or Username is  already exists");
    }

    const user = new User({ name, email, password, username });
    await user.save();
    const Isuser = await User.findOne({ email }).select(
        "-password -refreshToken"
    );
    if (!Isuser) {
        throw new ApiError(400, "Internal error");
    }
    res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", Isuser));
});

const loginUser = asyncHandler(async (req, res) => {
    // get the email or username  and password
    // check if the email or username is provided or not
    // check if the email or username is present in the database or not
    // check if the password is correct or not
    // if everthing is corret then make a jwt token and send it to the user
    // if anything is wrong then send the error message to the user

    try {
        const { email, username, password } = req.body;
        if (!(email || username)) {
            throw new ApiError(400, "Please provide email or username");
        }
        if (!password) {
            throw new ApiError(400, "Please provide password");
        }
        const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if (!user) {
            throw new ApiError(400, "User not found");
        }
        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) {
            throw new ApiError(400, "Invalid credentials");
        }

        const { refreshToken, accessToken } = await genrateAccessAndRefreshToken(
            user._id
        );
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "None",  // Allow cross-site cookie sending
            maxAge: 7 * 24 * 60 * 60 * 1000,  // Optional: cookie expiration time (e.g., 7 days)

        };
        res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json(
                new ApiResponse(200, "User logged in successfully", {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                })
            );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});
const logoutUser = asyncHandler(async (req, res) => {
    // clear the cookies
    // send the response to the user
    try {
        res
            .status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({
                message: "User logged out successfully"
            });
    } catch (err) {
        throw new ApiError(400, err.message);
    }
});

// const get the refresh token and genrate the new access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body;
        if (!incomingRefreshToken) {
            throw new ApiError(400, "Unauthorization request");
        }
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.ACCESSTOKEN
        );
        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "invaild refresh token");
        }
        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is exprired or invaild");
        }
        const option = {
            httpOnly: true,
            secure: true
        };
        const { newrefreshToken, accessToken } = await genrateAccessAndRefreshToken(
            decodedToken._id
        );
        res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", newrefreshToken, option)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newrefreshToken },
                    "Refresh token refresed"
                )
            );
    } catch (error) {
        throw new ApiError(
            400,
            "Something went wrong while refreshin the new access token"
        );
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    // get the new password and old password from the user
    // check if the old password is correct or not
    // if the old password is correct then update the new password
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw new ApiError(400, "Please provide old password and new password");
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ApiError(400, "User not found");
        }
        const isMatch = await user.isPasswordMatch(oldPassword);
        if (!isMatch) {
            throw new ApiError(400, "Old password is incorrect");
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json(new ApiResponse(200, "Password changed successfully"));
    } catch (err) {
        throw new ApiError(400, err.message);
    }
});
// get the current user
const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select(
            "-password -refreshToken"
        );
        if (!user) {
            throw new ApiError(400, "User not found");
        }
        res.status(200).json(new ApiResponse(200, user, "Currrent User Info"));
    } catch (err) {
        throw new ApiError(400, err.message);
    }
});

export {
    createUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    authStatus
};