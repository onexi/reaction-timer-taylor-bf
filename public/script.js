let startTime = 0;
let userId = Date.now(); // Unique ID for the user session
let clickCount = 0;
let isWaiting = true;

function startReaction() {
    let userName = document.getElementById('userName').value;

    if (!userName) {
        alert("Please enter your name!");
        return;
    }

    // Disable start button and enable stop button
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
    stopButton.style.backgroundColor = 'grey';

    // Random delay between 1 and 20 seconds
    let randomDelay = Math.floor(Math.random() * 20000) + 1000;

    setTimeout(() => {
        isWaiting = false;
        startTime = Date.now();
        stopButton.style.backgroundColor = 'red';
        document.getElementById('statusMessage').innerText = "Click STOP when ready!";
    }, randomDelay);
}

function stopReaction() {
    if (isWaiting) return; // Don't stop if still waiting
    endTime = new Date();

    let reactionTime = endTime - startTime;
    let userName = document.getElementById('userName').value;

    sendReactionTime(userName, reactionTime);

    // Re-enable the start button and disable stop button again
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}

function sendReactionTime(userName, reactionTime) {
    fetch('/submit_time', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: userName, user_id: userId, reaction_time: reactionTime }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'penalized') {
            freezeUser(data.time_left);
        } else {
            document.getElementById('statusMessage').innerText = `Fastest time: ${data.fastest_time} ms`;
            updateTimesList(data.all_attempts);
        }

        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    });
}

// Appends the recorded times to the times list
function updateTimesList(attempts) {
    const timesList = document.getElementById('timesList');
    timesList.innerHTML = ''; // Clear current list
    
    attempts.forEach(attempt => {
        let listItem = document.createElement('li');
        listItem.textContent = `${attempt.user_name}: ${attempt.reaction_time} ms`;
        timesList.appendChild(listItem); // Append new time without clearing the list
    });
}

function freezeUser(timeLeft = 10) {
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = true;
    document.getElementById('statusMessage').innerText = `You are frozen for ${timeLeft} seconds`;

    setTimeout(() => {
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
        document.getElementById('statusMessage').innerText = '';
        clickCount = 0;
    }, timeLeft * 1000);
}
