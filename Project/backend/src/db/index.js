import { connect } from "mongoose"
import { DBNAME } from "../constant/index.js"

const connectDB = async () => {
    console.log("mongooUri", process.env.MONGO_URI)
    console.log("port", process.env.PORT)
    try {
        const connectionInstance = await connect(`${process.env.MONGO_URI}/${DBNAME}`)
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`)
    }
    catch (error) {
        console.log(error)
        console.log(`Error: ${error.message}`)
    }
}

export default connectDB