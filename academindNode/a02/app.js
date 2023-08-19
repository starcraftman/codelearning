const express = require('express')

const users = ['User1', 'User2', 'User3'];

const app = express();

app.use('/middle', (req, res, next) => {
    console.log("First middleware.");
    next();
})
app.use('/middle', (req, res, next) => {
    console.log("Second middleware.");
    res.send("<h4>Hello Middleware Here</h4>")
})

app.use('/users', (req, res, next) => {
    const userList = users.map((x) => `<li>${x}</li>`).join('\n')
    res.send(`
<html>
<head><title>List of Users</title><head>
<body>
<h4>Users Present:</h4>
<ul>
    ${userList}
</ul>
</body>
</html>     
    `);
})

app.use('/', (req, res, next) => {
    res.send(`
<html>
<head><title>Create A User</title><head>
<body>
    <h4>User Creation Form</h2>
    <p>Not implemented yet.</p>
</body>
</html>     
    `);
});

app.listen(8000);