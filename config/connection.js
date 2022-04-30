const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose.connection;