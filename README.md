# EventManager
Running `npm start` will start PM2 and the server. You can stop the server process with `pm2 stop all`. Likewise, you can restart the server with `pm2 restart all` (if you have updated the server while it's running). 

For a much more thorough documentation of PM2, see https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/ .

The app runs with ExpressJS -> https://expressjs.com/en/starter/basic-routing.html

The app uses CORS -> https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

The app uses NPM to manage packages and PM2 to manage processes.
