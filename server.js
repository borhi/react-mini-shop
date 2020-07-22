const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8080);
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('listening on port ', server.address().port);
});
