const express = require('express');

const helmet = require('helmet') ;
const {xss} = require('express-xss-sanitizer') ;
const rateLimit =require('express-rate-limit') ;
const hpp = require('hpp');
const cors = require('cors') ;

const users = require('./routes/users');

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(hpp());
app.use(cors());

// Mount user routes
app.use('/users', users);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});