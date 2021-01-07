const express = require('express');
var app = express();
const mongoose = require('mongoose');
const configer = require('./meddleware/meddleware')


//connect to db 
mongoose.connect('mongodb+srv://al:123@cluster0.rgoi5.mongodb.net/discordimplementation?retryWrites=true&w=majority', () => console.log('DB connected ....'))

app.listen(3000, () => { console.log('Server is up....') });
app = configer(app);