import resetPasswordRouter from './reset-password.route';
import welcomeRouter from './welcome.route';

function applyRouter(app) {
    app.use("/forgot", resetPasswordRouter)
	app.use("/", welcomeRouter);
}

export default applyRouter;