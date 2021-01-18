//requirements
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

//Port configurations
const port = process.env.PORT || 5000; //port for running server

//Middleware Configurations
app.use(cors());
app.use(express.json()); //allows for JSON parsing

// (Heroku deployment)
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

//Port deployment
app.listen(process.env.PORT || port, () => console.log(`Server running on ${port}`));
