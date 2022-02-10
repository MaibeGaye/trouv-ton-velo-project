<<<<<<< HEAD
const Offer = require('../models/offer');
const jwt = require('../services/jwt');
const cloudinary = require('../services/cloudinary');
=======
const { request } = require('express');
const Offer = require('../models/offer');
// const cache = require('../services/cache');
>>>>>>> develop


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

<<<<<<< HEAD
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
            request.body.lender_id = request.userId.id;

            // const fileStr = request.body.photo;
            // const uploadResponse = await cloudinary.uploader.upload(fileStr, {});
            // request.body.photo = uploadResponse.url;

=======
    create: async (request, response) => {
        try {
            //on ajoute au contenu de la requête l'id de l'utilisateur ayant effectué la requête
            request.body.lender_id = request.userId.id;
>>>>>>> develop
            const offer = await new Offer(request.body).save();
            response.status(201).json(offer);   
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

<<<<<<< HEAD
    edit: async (request, response) => {
        try {
            const id = parseInt(request.params.offerId, 10);
            request.body.id = id;

            const lenderId = await Offer.returnLenderId(id);
            request.body.lender_id = lenderId;
            // we have to define borrower_id in order to correctly save it in the model
            const borrowerId = await Offer.returnBorrowerId(id);
            if (!borrowerId) {
                request.body.borrower_id = null;

                const offer = await new Offer(request.body).save();
                response.status(200).json(offer);
            } else { // si l'annonce possède un id loueur, on interdit la modif
                // à voir si pas mieux de filer l'info "editable: false" direct au GET /dashboard (via la returnborid) pour genre qu'ils grisent le bouton modifier, avec un tooltip attendez que l'utilisateur rende le vélo
                response.status(500).json({
                    msg: `modification aborted, the offer presents a borrower_id, return the bike first !`,
                    editable:false
                });
            }
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    bookOne: async (request, response) => {
        try {
            const idOffer = parseInt(request.params.offerId, 10);
            const idUser = request.userId.id;
            const lenderId = await Offer.returnLenderId(idOffer);
            request.body.id = idOffer;
            request.body.lender_id = lenderId;

            const borrowerId = await Offer.returnBorrowerId(idOffer);
            if (!borrowerId) {
                request.body.borrower_id = idUser;
                const updatedOffer = await new Offer(request.body).save();
                response.status(200).json(updatedOffer);
            } else { 
                response.status(500).json({
                    msg:`Abort modification, offer already lended`,
                    bookable:false
                });
            }
=======
    update: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const offer = await Offer(request.body).save(id);
            response.status(200).json(offer);   
>>>>>>> develop
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    delete: async (request, response) => {
        try {
<<<<<<< HEAD
            const id = parseInt(request.params.offerId, 10);
            const borrowerId = await Offer.returnBorrowerId(id);
            if (!borrowerId) {
                await Offer.delete(id);
                response.status(200).json({msg: `Offer "${id}" deleted !`});
            } else { // si l'annonce possède un id locataire, on interdit la modif
                // à voir si pas mieux de filer l'info "editable: false" direct au GET /dashboard (via la returnborid) pour genre qu'ils grisent le bouton modifier, avec un tooltip attendez que l'utilisateur rende le vélo
                response.status(500).json({
                    msg:`suppression aborted, the offer presents a borrower_id, return the bike first !`,
                    editable:false
                });
            }
=======
            const id = parseInt(request.params.id, 10);
            await Offer.delete(id);
            response.status(200).json({msg: "L'annonce a bien été supprimée !"});
>>>>>>> develop
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }


}
