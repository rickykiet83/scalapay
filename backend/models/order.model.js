const Joi = require('joi');

function validateOrder(order) {

    // shared properties
    const amount = Joi.number().required().positive();
    const currency = Joi.string().required().max(5);
    const countryCode = Joi.string().allow(null, '').max(5);
    const phoneNumber = Joi.string().allow(null, '').max(15);

    // item object property
    const item = Joi.object().keys({
        name: Joi.string().required().max(250),
        category: Joi.string().required().max(250),
        subcategory: Joi.array().items().min(1),
        brand: Joi.string().required().max(150),
        gtin: Joi.string().required().max(150),
        sku: Joi.string().required().max(150),
        quantity: Joi.number().required().min(1),
        price: {
            amount,
            currency
        },
    });

    // discount object property
    const discount = Joi.object().keys({
        displayName: Joi.string().allow(null, '').max(150),
        amount: {
            amount,
            currency
        },
    });

    // define an order schema
    const schema = Joi.object({
        totalAmount: {
            amount,
            currency
        },
        consumer: {
            phoneNumber: Joi.string().allow(null, '').max(15),
            givenNames: Joi.string().required().min(3).max(50),
            surname: Joi.string().required().min(3).max(250),
            email: Joi.string().email().required(),
        },
        billing: {
            name: Joi.string().allow(null, '').max(250),
            line1: Joi.string().allow(null, '').max(250),
            suburb: Joi.string().allow(null, '').max(50),
            postcode: Joi.string().allow(null, '').max(5),
            countryCode,
            phoneNumber,
        },
        merchant: {
            redirectConfirmUrl: Joi.string().required().max(255),
            redirectCancelUrl: Joi.string().required().max(255),
        },
        shipping: {
            name: Joi.string().required().max(255),
            line1: Joi.string().required().max(255),
            suburb: Joi.string().required().max(50),
            postcode: Joi.string().required().max(5),
            countryCode: Joi.string().required().max(5),
            phoneNumber: Joi.string().required().max(15)
        },
        merchantReference: Joi.string().required().max(50),
        items: Joi.array().items(item),
        discounts: Joi.array().items(discount),
        taxAmount: {
            amount,
            currency
        },
        shippingAmount: {
            amount,
            currency
        },
        orderExpiryMilliseconds: Joi.number().allow(null, '').positive()
    });

    return schema.validate(order);
}

exports.validate = validateOrder;