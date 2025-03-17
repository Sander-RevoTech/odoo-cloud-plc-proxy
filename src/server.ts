// src/server.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Load settings from environment variables
const targetUrl: string | undefined = process.env.TARGET_URL;
const PORT: string | undefined = process.env.SERVER_PORT || '3000';
const IP: string | undefined = process.env.SERVER_IP || '0.0.0.0';

// Check if the target URL is set
if (!targetUrl) {
    console.error('TARGET_URL is not defined in the .env file');
    process.exit(1); // Exit the process if the target URL is not set
}

// Set up the proxy middleware
app.use('/api', createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true, // Changes the origin of the host header to the target URL
    // Removed pathRewrite to retain the /api prefix
    onProxyReq: (proxyReq, req, res) => {
        // Log the proxied request
        console.log('Proxying request:', req.method, req.originalUrl);
    },
    onError: (err, req, res) => {
        // Handle errors
        console.error('Proxy error:', err);
        res.status(500).send('Something went wrong with the proxy.');
    }
}));

// Start the server
app.listen(Number(PORT), IP, () => {
    console.log(`Proxy server is running on http://${IP}:${PORT}`);
});