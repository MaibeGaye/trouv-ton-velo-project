const {createClient} = require('redis');
const db = createClient();
db.connect();

const cache = {
    setPosts: async function(posts, timeout=5*60) {
        //on va déclencher la mise en cache du tableau de posts obtenu depuis postgres sous forme de string pour éviter de refaire la requête quand la route GET /posts sera à nouveau appelée
        await db.set('oblog:posts', JSON.stringify(posts), {EX: timeout, NX: true});
    },
    getPosts: async function() {
        return JSON.parse(await db.get('oblog:posts'));
    },
    postsExists: async function() {
        return await db.exists('oblog:posts');
    }
};

module.exports = cache;