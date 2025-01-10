import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        username: {
            type: String,
            required: true,
            unique: [true, "Username already exists"],
            trim: true,
            index: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: 8
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: [true, "Email already exists"]
        },
        coverImage: {
            type: String,
            default:
                "https://img.freepik.com/free-photo/top-view-world-tourism-day-concept-with-copy-space_23-2148608884.jpg?ga=GA1.1.294911398.1721889049&semt=ais_user"
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// check if the password is correct
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            name: this.name,
            email: this.email,
            username: this.username
        },
        process.env.ACCESSTOKEN,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIREY }
    );
};
userSchema.methods.genrateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this.id
        },
        process.env.REFRESHTOKEN,
        { expiresIn: process.env.REFRESHTOKEN_EXPIREY }
    );
};

export const User = model("User", userSchema);