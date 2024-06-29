"use strict";

var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companyController');

// Get all companies
router.get('/', companyController.getAllCompanies);

// Get a company by ID
router.get('/:id', companyController.getCompanyById);

// Create a new company
router.post('/', companyController.createCompany);

// Update a company
router.put('/:id', companyController.updateCompany);

// Delete a company
router["delete"]('/:id', companyController.deleteCompany);
module.exports = router;