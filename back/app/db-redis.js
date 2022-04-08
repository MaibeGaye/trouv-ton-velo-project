const {createClient} = require('redis');

const config = {};

if (process.env.NODE_ENV === 'production') {
    config.url = process.env.REDISCLOUD_URL
}

const db = createClient(config);

db.on('error', err => {
    console.log('Redis err')
    console.log(err)
})
db.connect();

module.exports = db;