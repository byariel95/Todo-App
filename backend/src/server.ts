import app from "./app";
import 'dotenv/config';
import mongoose from "mongoose";
const PORT = process.env.PORT || 5000;
async function main() {

    const mongoURI = process.env.DB_URL as string || 'mongodb://localhost:27017/taskApp';
    await mongoose.connect(mongoURI);

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    })

}

main().then(() => console.log("Mongodb is connected successfully!"))
    .catch(error => console.log(error));