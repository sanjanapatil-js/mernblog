// post-api/server.js
const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Use cors middleware

// Basic route for home
app.get('/', (req, res) => {
    res.send('Welcome to the Post API!');
});

// Use post routes
app.use('/posts', postRoutes);

// Basic error handling for unhandled routes (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Basic global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
