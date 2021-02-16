const joi = require('joi');

function validateOrder(order) {
    const schema = Joi.object({
        totalAmount: Joi.number().required()
    });

    return schema.validate(order);
}

exports.validate = validateOrder;