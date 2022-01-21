const Post = require('../models/post');
const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
        console.log('Data depuis Postgres');
        const posts = await Post.findAll();
        console.log('Appel de response.json');
        response.json(posts);
    },

    findOne: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const post = await Post.findOne(id);
        response.json(post);
    },

    findByCategory: async (request, response) => {
        const catId = parseInt(request.params.id, 10);
        const posts = await Post.findByCategory(catId);
        response.json(posts);
    },

    addPost: async (request, response) => {
        //on va créer une instance de Post à partir des infos de request.body
        const post = new Post(request.body);
        console.log('avant save', post);
        try {
            //on appelle la méthode save de cette instance pour sauvegarder en BDD
            await post.save();
            console.log('après save', post);

            //on répond au front avec le status qui va bien et l'instance mise à jour avec l'id créé par postgres
            response.status(201).json(post);
        } catch(error) {
            response.status(500).json(error.message);
        }

    }

}