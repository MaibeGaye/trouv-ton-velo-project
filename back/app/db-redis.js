const {createClient} = require('redis');

// const config = {};

if (process.env.NODE_ENV === 'production') {
    config.url = process.env.REDIS_URL
}

// const db = createClient(config);

const db = createClient();

db.on('error', err => {
    console.log('Redis err')
    console.log(err)
})
db.connect();

module.exports = db;