const db = require('../db-redis');

const prefix = 'velo:token:';
const timeout = 60 * 30;

module.exports = {

    async cache (id, accessToken) {
        try {
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