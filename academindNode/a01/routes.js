const fs = require('fs');
let users = [];

const requestHandler = (req, res) => {
    //console.log(req.url, req.method);

    if (req.url === '/users') {
        const userList = users.map((x) => `<li>${x}</li>`).join('\n')
        res.write(`
<html>
<head><title>List of Users</title><head>
<body>
    <h4>Users Present:</h2>
    <ul>
        <li>Test User 1</li>
        <li>Test User 2</li>
        <li>Test User 3</li>
        <li>Test User 4</li>
        ${userList}
    </ul>
</body>
</html>     
        `);
        res.end();
    } else if (req.method === 'POST' && req.url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => body.push(chunk));
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const name = parsedBody.split('=')[1];
            console.log(name);
            users.push(name);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    } else {
        res.write(`
<html>
<head><title>Create A User</title><head>
<body>
    <h4>User Creation Form</h2>
    <p>This is a simple form to create users. They will display on /users page.</p>
    <form action="/create-user" method="POST">
        <label>Username to create: </label>
        <input type="text" name="name" autofocus>
        <button type="submit">Send</button>
    </form>
</body>
</html>     
        `);
        return res.end();
    }
}

module.exports = requestHandler;