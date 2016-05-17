/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Product = require('../api/product/product.model');
var Catalog = require('../api/catalog/catalog.model');
var mainCatalog, vertical, roller, shutter;

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: process.env.ADMIN_PASSWORD || 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

Catalog
  .find({})
  .remove()
  .then(function () {
    return Catalog.create({ name: 'All'});
  })
  .then(function (catalog) {
    mainCatalog = catalog;
    return mainCatalog.addChild({name: 'Vertical'});
  })
  .then(function (category) {
    vertical = category._id;
    return mainCatalog.addChild({name: 'Roller'});
  })
  .then(function (category) {
    roller = category._id;
    return mainCatalog.addChild({name: 'Shutter'});
  })
  .then(function (category) {
    shutter = category._id;
    return Product.find({}).remove({});
  })
  .then(function() {
    return Product.create({
      title: 'Blue fabric vertical blind',
      imageUrl: '/assets/uploads/b1.jpg',
      price: 25,
      stock: 250,
      categories: [vertical],
      description: 'Vertical'
    }, {
      title: 'Brown fabric roller blind',
      imageUrl: '/assets/uploads/b2.jpg',
      price: 15,
      stock: 100,
      categories: [roller],
      description: 'Roller'
    }, {
      title: 'White veneer shutter blind',
      imageUrl: '/assets/uploads/b3.jpg',
      price: 8,
      stock: 50,
      categories: [shutter],
      description: 'Shutter'
    });
  })
  .then(function () {
    console.log('Finished populating Products with categories');
  })
  .then(null, function (err) {
    console.error('Error populating Products & categories: ', err);
  });
