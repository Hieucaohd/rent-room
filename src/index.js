import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { DB, PORT } from "./config";
import apolloServer from "./graphql";
import { success, error } from "consola";
import applyMiddleware from "./middlewares";
import mongoose from "mongoose";
import resetPasswordRouter from "../routes/reset-password.route";

const app = express();
const port = process.env.PORT || PORT;

/* start app */
const startApp = async () => {
    try {
        await applyMiddleware(app);

        // connect to mongodb
        await mongoose.connect(DB);
        success({
            message: "Successfully connect to mongodb",
            badge: true,
        });

        // start apollo server
        await apolloServer.start();

        // for upload file
        app.use(graphqlUploadExpress());

        // connect apollo server with express app
        apolloServer.applyMiddleware({ app });

        app.use("/forgot", resetPasswordRouter)
        app.listen(PORT, () => {
            success({ message: `Server started on PORT ${port}`, badge: true });
        });
    } catch (err) {
        error({
            message: err.message,
            badge: true,
        });
    }
};

startApp();
