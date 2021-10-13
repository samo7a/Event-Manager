# Event Manager

Event Manger web application that allows Registered School Organizations to organize events, and students to join them.

This project was part of the Database Management Class (COP 4710) @ UCF

Time spent: **more than 50 hrs** hours spent in total

## User Stories

- [x] There are 3 types of users (University Admins, RSO Admins, Students).
- [x] Users can signup/login/logout from the website.
- [x] University Admins can see all the events activities that happen in the university.
- [x] Univerity Admins can delete events/RSO.
- [x] University Admins can approve specific type of events.
- [x] Students can form an RSO with minimum of 5 students. If the RSO has less than 5 Students, it will be an inactive.
- [x] Students can join/leave an RSO.
- [x] Students can rate an event.
- [x] Students can add comments to a specific event.
- [x] There are 3 types of events (public, private, RSO)
        - Public Events are visible for everyone.
        - Private Events are visible only for students within the same university.
        - RSO Events are visible only for students within the same RSO. 
- [x] RSO Admins can create all types of events. 
- [x] Students can create events, but it has to approved by the University Admin.

# Run the app
Running `npm start` will start PM2 and the server. You can stop the server process with `pm2 stop all`. Likewise, you can restart the server with `pm2 restart all` (if you have updated the server while it's running). 

For a much more thorough documentation of PM2, see https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/ .

The app runs with ExpressJS -> https://expressjs.com/en/starter/basic-routing.html

The app uses CORS -> https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

The app uses NPM to manage packages and PM2 to manage processes.
