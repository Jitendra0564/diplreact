import React from 'react';
import { render, waitFor, fireEvent, within} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CompaniesProfile from '../../src/components/Companies/CompaniesProfile'; // Adjust the import path as necessary

jest.mock('axios');

describe('CompaniesProfile Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/company/1']}>
                <Routes>
                    <Route path="/company/:CompanyId" element={<CompaniesProfile />} />
                </Routes>
            </MemoryRouter>
        );
        
        expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('renders company details after successful data fetch', async () => {
        const mockCompanyId = '123';
        axios.get.mockResolvedValueOnce({
            data: {
                _id: mockCompanyId,
                name: 'Test Company',
                owner: 'John Doe',
                details: {
                    address: {
                        street: '123 Test St',
                        city: 'Testville',
                        state: 'TS',
                        zip: '12345',
                        country: 'Testland'
                    },
                    contact: {
                        phone: '1234567890',
                        email: 'info@testcompany.com',
                        website: 'www.testcompany.com'
                    },
                    departments: [
                        { id: 'dept1', name: 'Sales', manager: 'Jane Smith', employees: ['Alice', 'Bob'] },
                        { id: 'dept2', name: 'Marketing', manager: 'Mike Johnson', employees: ['Eve'] }
                    ],
                    products: [
                        { id: 'prod1', name: 'Product A', category: 'Tech', price: 1000, launch_date: '2024-01-01' },
                        { id: 'prod2', name: 'Product B', category: 'Clothing', price: 50, launch_date: '2023-05-15' }
                    ],
                    financials: {
                        fiscal_year: 2024,
                        revenue: 1000000,
                        expenses: 800000,
                        net_income: 200000
                    }
                }
            }
        });
        
        const { findByText, getByText, getByRole } = render(
            <MemoryRouter initialEntries={[`/company/${mockCompanyId}`]}>
                <Routes>
                    <Route path="/company/:CompanyId" element={<CompaniesProfile />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        
        expect(await findByText('Test Company')).toBeInTheDocument();

        // Use a custom matcher to find the "Street: 123 Test St" text
        fireEvent.click(getByText(/company's address/i));
        
        const addressElement = await findByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' && content.includes('123 Test St');
        });
        
        expect(addressElement).toBeInTheDocument();
        expect(getByText('City: Testville')).toBeInTheDocument();
        expect(getByText('1234567890')).toBeInTheDocument();
        expect(getByText('Sales')).toBeInTheDocument();
        expect(getByText('$1,000.00')).toBeInTheDocument(); // Price formatting example
    });

    it('displays message when no company data is available', async () => {
        const mockCompanyId = '456';
        axios.get.mockRejectedValueOnce(new Error('Company not found'));
        
        const { findByText } = render(
            <MemoryRouter initialEntries={[`/company/${mockCompanyId}`]}>
                <Routes>
                    <Route path="/company/:CompanyId" element={<CompaniesProfile />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        
        expect(await findByText('No company profile available')).toBeInTheDocument();
    });

    it('toggles departments section visibility', async () => {
        const mockCompanyId = '789';
        axios.get.mockResolvedValueOnce({
            data: {
                _id: mockCompanyId,
                name: 'Test Company',
                details: {
                    departments: [{ id: 'dept1', name: 'Sales' }]
                }
            }
        });
        
        const { getByText, queryByText } = render(
            <MemoryRouter initialEntries={[`/company/${mockCompanyId}`]}>
                <Routes>
                    <Route path="/company/:CompanyId" element={<CompaniesProfile />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        fireEvent.click(getByText(/company's departments/i));
        
        expect(queryByText('Sales')).toBeInTheDocument(); // Department should be visible after click
    });

    it('handles data fetch error', async () => {
        const mockCompanyId = '101';
        axios.get.mockRejectedValueOnce(new Error('Network error'));
        
        const { findByText } = render(
            <MemoryRouter initialEntries={[`/company/${mockCompanyId}`]}>
                <Routes>
                    <Route path="/company/:CompanyId" element={<CompaniesProfile />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        
        expect(await findByText('Error fetching data: Network error')).toBeInTheDocument();
    });
});