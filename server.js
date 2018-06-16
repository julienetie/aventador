const express = require('express');
const path = require('path');
const app = express();
app.set('port', 8080);
app.use(express.static(path.join(__dirname, '/')));
app.listen(app.get('port'), () =>
    console.log(`The server is running on http://localhost: ${app.get('port')}`)
);