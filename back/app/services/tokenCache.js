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

const prefix = 'velo:token:';
const timeout = 60 * 30;

module.exports = {

    async cache (id, accessToken) {
        try {
            // console.log(accessToken);
            const key =`${prefix}${id}`;
            await db.set(key, accessToken, { EX: timeout, NX: true});
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async verifyToken(id, token) {
        try {
            const verifiedToken = await db.get(`${prefix}${id}`);
            console.log('verifiedToken :');
            console.log(verifiedToken);
            return verifiedToken === token ? true : undefined;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async deleteToken(id) {
        try {
            await db.del(`${prefix}${id}`);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}