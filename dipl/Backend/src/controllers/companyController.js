import mongoose from 'mongoose';
//import Company, { find, findById, findOne, findByIdAndUpdate, findByIdAndDelete } from '../models/companiesModel';
import Company from '../models/companiesModel.js';

// Get all companies
export async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a company by ID
export async function getCompanyById(req, res) {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new company
export async function createCompany(req, res) {
  try {
    const { image, name, owner, details } = req.body;

    // Check if the company already exists based on the email
    const companyExists = await Company.findOne({
      'details.contact.email': details.contact.email,
    });
    if (companyExists) {
      return res.status(400).json({ msg: 'Company already exists' });
    }

    // Check if any employee email already exists
    const employeeEmailExists = details.employees.some(
      (emp) => details.employees.filter((e) => e.email === emp.email).length > 1
    );
    if (employeeEmailExists) {
      return res.status(400).json({ msg: 'Employee email already exists' });
    }

    const newCompany = new Company({
      image,
      name,
      owner,
      details,
    });
    
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Update a company
export async function updateCompany(req, res) {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a company
export async function deleteCompany(req, res) {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}