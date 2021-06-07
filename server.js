const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect Database

connectDB();

//Init Middleware

app.use(
  express.json({
    extented: false,
  })
);

//Routes
app.use('/api/users', require('./Routes/api/Users'));
app.use('/api/auth', require('./Routes/api/Auth'));
app.use('/api/posts', require('./Routes/api/Post'));
app.use('/api/profile', require('./Routes/api/Profile'));

//Serve static asset in production
if (process.env.NODE_ENV === 'production') {
  //set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Port Connected');
});
