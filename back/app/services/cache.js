const db = require('../db-redis');

const prefix = 'velo:';
const timeout = 60 * 30;

const keys = [];

const cache = async (request, response, next) => {
    const key = `${prefix}${request.url}`;

    //if redis key exists (= data saved in cache, = no flush since last GET request))
    if (await db.exists(key)) {
        console.log('Data from Redis');
        const cachedString = await db.get(key);
        const cachedValue = JSON.parse(cachedString);
        return response.json(cachedValue);
    }

    //else : get data from postgres & save the data output in cache

    // save original res.json with his context
    const originalResponseJson = response.json.bind(response);

    // redefine response.json to access new functionalities :
    // - stringify the query output
    // - cache
    // - use the original response.json to send data to front
    response.json = async (data) => {
        console.log('Caching in Redis the Postgres data')
        const str = JSON.stringify(data);
        //to delete cache entries without performance issues, we stock our app keylist
        keys.push(key);
        await db.set(key, str, {EX: timeout, NX: true});
        originalResponseJson(data);
    }
    next();
};

const flush = async (request, response, next) => {
    console.log('Flushing cache');

    while(key=keys.shift()) {
        await db.del(key);
    }
    next();
}

module.exports = {cache, flush};
