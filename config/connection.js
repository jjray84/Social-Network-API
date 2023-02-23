const { connect, connection } = require('mongoose');

connect('mongodv:localhost/developersApplications', {
    useNewUrlParser: true,
    useInifiedTopology: true,
});

module.exports = connection;