Reaction Timer App - Overview

This project is a reaction timer app that enables users to test their respective reaction time abilities by clicking a "Start" button, followed by a "Stop" button after a random delay. Users input their name, and their reaction time is recorded and displayed on the webpage. If a user attempts to 'cheat the system' by clicking rapidly and repeatedly, he or she are penalized with a temporary freeze. Similarly, if a user clicks the "Stop" button before it turns red after the delay, then there is a added time penalty.  The app consists of three primary files:

1. index.html

This is the main webpage that users interact with. It contains the structure and layout of the reaction timer interface.

Key Features:
Title: The page title is "Add a Reaction Time."
Input Box: Users can enter their name in a text field to personalize their results.
Buttons:
Start Button (Green): Initiates the reaction timer process. Once clicked, the user must wait for a random delay before they can stop the timer.
Stop Button (Red): Becomes active after the random delay - it is grey prior to becoming active. Users click this button to stop the timer and record their reaction time.
Reaction Time Log: Displays a list of all recorded reaction times along with the user names.
Status Messages: Provides feedback to users during the reaction test (e.g., "Click STOP when ready!" or "Fastest time: X ms").
The HTML also includes the styling for the buttons and basic structure for displaying times and messages.

2. script.js

This file contains the JavaScript logic that powers the reaction timer's behavior and interaction on the webpage.

Key Functions:
startReaction(): Starts the reaction timer. Disables the "Start" button, enables the "Stop" button, and initiates a random delay (between 1 and 20 seconds) before the user can stop the timer.
Updates the interface to let the user know when to click "Stop."
stopReaction(): Stops the timer when the "Stop" button is clicked. Also, calculates the user's reaction time by measuring the time difference between the start and stop events. Sends the reaction time and the user's name to the server for recording.
sendReactionTime(): Sends a POST request to the server with the user's name, ID, and reaction time.
Handles the server response, updating the page with the fastest recorded time and appending all attempts to the list of reaction times.
updateTimesList(): Updates the on-screen list of reaction times by appending new results to the log.
freezeUser(): Prevents the user from clicking any buttons for a set time (ex. 10 seconds) as a penalty for trying to cheat by clicking too rapidly.

3. server.js

This file handles the server-side logic using Node.js and Express to manage requests from the client and process the reaction time data.

Key Features:
Express Server: Serves the static files (index.html and script.js) to the client when the app is accessed.
POST Route (/submit_time): Receives data from the client (user name, reaction time) when the user stops the timer. Processes the reaction time to determine the fastest recorded time. Checks if the user has been penalized for cheating by clicking rapidly. Returns the updated fastest time and all attempts to the client.
Cheating Detection: If users try to cheat by clicking too quickly, they are penalized with a "freeze" period (ex. 10 seconds), during which they cannot start a new reaction test.
Server-Side Response: Sends the updated fastest time and all recorded reaction attempts back to the client. If cheating is detected, it returns a penalty status along with the remaining freeze time.


How to Use the App:
Open the index.html file in a web browser using Live Server or by launching the app through Node.js using the command node server.js.
Enter your name in the input box.
Click the Start button and wait for the color to change after a random delay.
Click the Stop button as fast as possible to record your reaction time.
Your time will be displayed on the page and saved for future reference. Multiple attempts can be recorded.
If you click too fast, you will be penalized and unable to participate for a set amount of time.

This project allows you to test your reaction time while providing cheat detection mechanisms to ensure fair play. Enjoy!

Note that ReadME.md is using markdown.  To run code:

node server.js

