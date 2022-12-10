# TYPE RUNNER

A typing speed Typing speed test application with emphasis on smooth clean design, smooth/intuitive interface and frontend performance. “Type Runner” uses a database of Blade Runner quotes to assist users in practicing their typing speed.  

### Check out the app [here](https://typerunner.herokuapp.com). 
Login using default credentials or feel to create a new account and try get your name on the scoreboard! 

![](https://i.imgur.com/qCTu2hR.png)

## Technologies used:

- React.js
- Python(Flask)
- Node.js
- Postgres (SQL)
- Javascript
- git, Github
- HTML5
- CSS
- Framer Motion (React animation library)
- Deployed on Heroku


## Key Features

- Typing speed test utilising iconic Blade Runner quotes
- Reset button that fetches a random quote from the database
- Stopwatch timer that logs time taken to complete test
- Words per minute counter
- User account creation/login
- Mini user profile with stats including tests completed, average WPM, and highest WPM achieved
- Leaderboard showing the top 10 highest scores across all users

## Concepts and Goals

- Type Runner was intended to showcases my skills in React by creating a truly single page app with all the necessary features that users would expect from typing speed test. All functionality from quote fetching and scoreboard/stats updates to registration/login are all handled seemlessly without the need for a reroute or page refresh. 
- Having recently acquired skills in Python and SQL made this application a perfect test case for implementing a Flask/SQL backend. 
- Smooth animations, cohesive styling and a fun user experience were a priority from the beginning, with the goal to get users addicted to improving their typing performance. 

## Noteable Challenges 

### Basic functionality 
All parts of the typing test functionality were challenging, though setting the correct letter colour changes proved to be the most problematic for me personally. The solution I landed upon was to update each individual letter's className dynamically according to whether the letter value from the user's input matched the letter value at the same index. This allows for correct letters, incorrect letters, correct spaces and incorrect spaces to all be styled differently. The current letter that is yet to but inputted is also given a clasName of "current" which allows for the distinct "bouncing" animation and flashing cursor to be implemented correctly.

### User stats

Being heavily focused on frontend perfomance and design, implementing a FLASK/Postgres backend was ideal as it allowed for quick setup and simple syntax when creating database models. However, one crucial hiccup emerged while attempting to log a user's test WPM score once they had completed a test. The user model was initially defined with keys for their completed tests count and average WPM etc. I soon learned why adding stats that need to be accessed independently from the user to the user model is considered bad practice. All issues with accessing said data in real time were alleviated by adding in a new databse table that specifcallt logged test stats from all users.

## To be improved:

User authentication is quite barebones at time of current deployment. Password confirmation is working correctly, however user's are not currently notified if their registration fails due to their username being taken. This feature coming very soon!

