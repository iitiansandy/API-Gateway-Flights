const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const rateLimit = require('express-rate-limit');

const { createProxyMiddleware } = require('http-proxy-middleware');
const serverConfig = require('./config/server-config');

const app = express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many requests from this IP, please try again later."
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use('/flightService', createProxyMiddleware({ 
    target: serverConfig.FLIGHT_SERVICE, 
    changeOrigin: true,
    pathRewrite: {'^/flightService' : '/'}
}));

app.use('/bookingService', createProxyMiddleware({ 
    target: serverConfig.BOOKING_SERVICE, 
    changeOrigin: true,
    pathRewrite: {'^/bookingService' : '/'}
}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`App is running or port: ${ServerConfig.PORT}`);
});
