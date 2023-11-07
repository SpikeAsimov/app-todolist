const express = require("express");
const cors = require('cors');

const app = express();


const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to syn db: " + err.message);
    });

   

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded( { extended: true }));



app.get("/", (req, res) => {
    res.json({ message: "App || To Do List"});
});

require("./routes/task.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

