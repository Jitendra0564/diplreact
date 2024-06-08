const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Get all companies
router.get('/', companyController.getAllCompanies);

// Get a company by ID
router.get('/:id', companyController.getCompanyById);

// Create a new company
router.post('/', companyController.createCompany);

// Update a company
router.put('/:id', companyController.updateCompany);

// Delete a company
router.delete('/:id', companyController.deleteCompany);

module.exports = router;