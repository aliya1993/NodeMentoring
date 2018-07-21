import app from './app.js';

const port = process.env.PORT || 8085;
app.listen(port, () => console.log(`App listening on port ${port}!`))
