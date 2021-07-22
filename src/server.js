const app = require('./app');
const PORT = process.env.PORT || 80;

app.listen(PORT, err => { err ? console.error(err) : console.log(`Server Running At Port: ${PORT}`) });