const app = require('./app');
require('./lib/db')();

app.listen(process.env.PORT || 4000, () => {
  console.log('Server started', process.env.PORT);
});
