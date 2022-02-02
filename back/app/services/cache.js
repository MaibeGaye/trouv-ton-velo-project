const {createClient} = require('redis');
// const db = createClient();
// db.connect();
const config = {};

if (process.env.NODE_ENV === 'production') {
    config.url = process.env.REDIS_URL
}

const db = createClient(config);

db.on('error', err => {
    console.log('Redis err')
    console.log(err)
})
db.connect();

const prefix = 'velo:';
const timeout = 60 * 30;

const keys = [];

const cache = async (request, response, next) => {
    //est-ce que les data sont présentes dans le cache ?
    const key = `${prefix}${request.url}`;
    console.log(key);

    await db.set(
        "object",
        JSON.stringify({
            name: "Redis",
            lastname: "Client",
        })
    );
    
    const getStringResult = await db.get("object");
    console.log("Get string result: ", JSON.parse(getStringResult));

    //si les data sont présentes dans le cache
    if (await db.exists(key)) {
        console.log('Data depuis Redis');
        //on récupère la string stockée dans redis
        const cachedString = await db.get(key);
        //on la transforme en object JS
        const cachedValue = JSON.parse(cachedString);
        //on envoie l'object ou le tableau d'object au front
        return response.json(cachedValue);
    }

    //sinon : récupérer depuis postgres et mettre en cache

    // on a besoin de faire la requête SQL ET de placer le résultat en cache
    
    // on sauvegarde le response.json original en n'oubliant pas de bien lui redéfinir son contexte
    console.log('Sauvegarde du code original de response.json');
    const originalResponseJson = response.json.bind(response);

    // on redéfinit response.json pour lui donner de nouvelles fonctionnalités :
    // - stringifier le résultat de la requête
    //- mise en cache
    //- utiliser la sauvegarde de response.json original pour véritablement envoyer une réponse au front
    console.log('Redéfinition de response.json');
    response.json = async (data) => {
        console.log('Mise en cache des data')
        const str = JSON.stringify(data);
        //afin de supprimer les entrées en cache sans bousiller les perfs, on stocke nous même une liste des clés concernant notre appli
        keys.push(key);
        await db.set(key, str, {EX: timeout, NX: true});
        console.log('Envoi au front');
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
