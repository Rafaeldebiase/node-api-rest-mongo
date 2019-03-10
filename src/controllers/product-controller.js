'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent.validator')

exports.get = (request, response, next) => {
    Product.find({
        active: true
    }, 'title price slug').then((result) => {
        response.status(200).send(result);
    }).catch((err) => {
        response.status(400).send(err);
    });
};

exports.getById = (request, response, next) => {
    Product.findById(request.params.id).then((result) => {
        response.status(200).send(result);
    }).catch((err) => {
        response.status(400).send(err);
    });
};

exports.getBySlug = (request, response, next) => {
    Product.findOne({
        slug: request.params.slug,
        active: true
    }, 'title description price slug tags').then((result) => {
        response.status(200).send(result);
    }).catch((err) => {
        response.status(400).send(err);
    });
};

exports.getByTag = (request, response, next) => {
    Product.find({
        tags: request.params.tag,
        active: true
    }, 'title description price slug tags').then((result) => {
        response.status(200).send(result);
    }).catch((err) => {
        response.status(400).send(err);
    });
};

exports.post = (request, response, next) => {
    let contract = new ValidationContract;

    contract.hasMinLen(require.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(require.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(require.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    if (!contract.isValid) {
        response.status(400).send(contract.errors()).end();
        return;
    }

    let product = new Product(request.body);
    product.save().then((result) => {
        response.status(201).send({
            message: 'Produto cadastrado com sucesso',
            data: result
        });
    }).catch((err) => {
        response.status(400).send({
            message: 'Falha ao cadastrar produto',
            data: err
        });
    });
};
exports.put = (request, response, next) => {
    Product.findByIdAndUpdate(request.params.id, {
        $set: {
            title: request.body.title,
            description: request.body.description,
            slug: request.body.slug,
            price: request.body.price
        }
    }).then((result) => {
        response.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    }).catch((err) => {
        response.status(400).send({
            message: 'Falha ao atualizar o produto',
            data: err
        });
    });
};
exports.delete = (request, response, next) => {
    Product.findOneAndRemove(request.body.id)
    .then((result) => {
        response.status(200).send({
            message: 'Produto removido com sucesso'
        });
    }).catch((err) => {
        response.status(400).send({
            message: 'Falha ao remover o produto',
            data: err
        });
    });
};