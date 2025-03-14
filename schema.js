
const joi = require("joi");

module.exports.listingSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    location: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().allow("", null),
    country: joi.string().optional() 
});

  




module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5).error(new Error('Rating must be a number between 1 and 5')),
        comment: joi.string().required()
    }).required()
});
