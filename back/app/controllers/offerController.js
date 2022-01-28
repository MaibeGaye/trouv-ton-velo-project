const { request } = require('express');
const Offer = require('../models/offer');
// const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
        const offers = await Offer.findAll();
        response.json(offers);
    },

    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const offer = await Offer.findOne(id);
            response.json(offer);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
        
    },

    create: async (request, response) => {
        try {
            //on ajoute au contenu de la requête l'id de l'utilisateur ayant effectué la requête
            request.body.lender_id = request.userId.id;
            const offer = await new Offer(request.body).save();
            response.status(201).json(offer);   
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    update: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const offer = await Offer(request.body).save(id);
            response.status(200).json(offer);   
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            await Offer.delete(id);
            response.status(200).json({msg: "L'annonce a bien été supprimée !"});
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }


}
