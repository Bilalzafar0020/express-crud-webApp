// app.js or server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();

import api1Router from './Api1/script.mjs';

const app = express();

app.use(express.json());
app.use(cors())

// Serve the public folder for the frontend
app.use('/', express.static(path.join(__dirname, 'Public')))

// Use the API routes from api1
app.use('/Api1', api1Router);

// Start the server
const port = 3004;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
