// const { request } = require('express');
const Offer = require('../models/offer');
const jwt = require('../services/jwt');

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

    findFiltered: async (request, response) => {
        try {
            const filteredOffers = await Offer.filter(request.body);
            response.json(filteredOffers);
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
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            response.status(201).json(offer);   
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    edit: async (request, response) => {
        try {
            const id = parseInt(request.params.offerId, 10);
            request.body.id = id;

            const lenderId = await Offer.returnLenderId(id);

            // si pas de locataire actuel, on définit quand même borrower_id sur null 
            // pour avoir un objet body offer complet
            const borrowerId = await Offer.returnBorrowerId(id);
            if (!borrowerId) {
                request.body.borrower_id = null
            } else {
                request.body.borrower_id = borrowerId
            }

            const offer = await new Offer(request.body).save();
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            response.status(200).json(offer);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.offerId, 10);
            await Offer.delete(id);
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            response.status(200).json({msg: `L'annonce ${id} a bien été supprimée !`});
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }


}
