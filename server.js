// This will be the node Express server that will serve up your app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3030;
const path = require('path');


// Array to store names and emails
let users = [];

// Parameters for app behavior and 'cheating' control
let fastestTime = Infinity;
let attempts = []; //store all attempts
let penaltyUsers = {};

// Serve static files
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the web page with the form
// note __dirname is the directory in which node Web Server is running 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index1.html');
});

// Handle reaction time submission
app.post('/submit_time', (req, res) => {
    const { user_name, user_id, reaction_time } = req.body; // Destructure the request body

    // Check if required data is missing
    if (!user_name || !reaction_time) {
        return res.status(400).json({ error: 'Missing user_name or reaction_time' }); // Add return here to stop further execution
    }

    // Logic for penalizing fast clicks (example: if clicking too fast)
    if (reaction_time < 300) {
        return res.json({ status: 'penalized', time_left: 10 }); // Ensure this sends the response and stops further execution
    }

    // Record the attempt
    attempts.push({ user_name, reaction_time });

    // Check if it's the fastest time
    if (fastestTime === null || reaction_time < fastestTime) {
        fastestTime = reaction_time;
    }

    // Send a response with the fastest time and all attempts
    res.json({
        status: 'ok',
        fastest_time: fastestTime,
        all_attempts: attempts,
    });
});

// Handle penalty for rapid clicking
app.post('/penalize', (req, res) => {
    const { user_id } = req.body;

    // Penalize user for 10 seconds
    penaltyUsers[user_id] = Date.now() + 10000;

    res.json({
        status: 'penalized',
        message: 'You are penalized for rapid clicking!'
    });
});

// Handle the form submission via fetch
//app.post('/input', function(req, res){
    //const name = escape(req.body.name);
    //const email = escape(req.body.email);

    // Add the new user to the array
   // users.push({ name: name, email: email });

    // Send the updated list of users back as JSON
   // res.json(users);
//});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
