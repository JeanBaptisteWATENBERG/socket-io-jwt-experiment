const app = require('express')();
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');

const jwtSecret = 'MySuperSecr3tJWTSecret'

const whitelist = ['http://127.0.0.1:3001', undefined, 'http://127.0.0.1:3001', 'http://localhost:3001']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/login', (req, res) => {

  // TODO: validate the actual user user
  const profile = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  // we are sending the profile in the token
  const token = jwt.sign(profile, jwtSecret, { expiresIn: '8h' });

  res.json({ token: token, ...profile });
});

io.sockets
  .on('connection', (socket) => {
    const decodedToken = jwt.verify(socket.handshake.query.token, jwtSecret);
    console.log(decodedToken);
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});