const Category = require('../models/category');

module.exports = {
    findAll: async (_, response) => {
        const categories = await Category.findAll();
        response.json(categories);
    }

}