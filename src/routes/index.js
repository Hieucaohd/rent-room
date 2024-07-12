import resetPasswordRouter from './reset-password.route';
import welcomeRouter from './welcome.route';
import vietnameAddressRouter from './vietnam-address.route';


function applyRouter(app) {
    app.use('/forgot', resetPasswordRouter);
    app.use('/vietnam-address', vietnameAddressRouter);
    app.use('/', welcomeRouter);
}

export default applyRouter;
