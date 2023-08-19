const path = require('path');

const express = require('express');

const rootDir = path.dirname(process.mainModule.filename);
const app = express();

app.use(express.static(path.join(rootDir, 'public')));

app.get('/users', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'users.html'));
});
app.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'index.html'));
});
app.use((req, res, next) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3000);
