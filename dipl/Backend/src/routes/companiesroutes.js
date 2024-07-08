import { Router } from 'express';
const router = Router();
import { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from '../controllers/companyController.js';

// Get all companies
router.get('/', getAllCompanies);

// Get a company by ID
router.get('/:id', getCompanyById);

// Create a new company
router.post('/', createCompany);

// Update a company
router.put('/:id', updateCompany);

// Delete a company
router.delete('/:id', deleteCompany);

export default router;