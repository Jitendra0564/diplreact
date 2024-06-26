import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CompaniesTable from '../../src/components/Companies/CompaniesTable';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');



describe('CompaniesTable', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays loading state initially', () => {
        render(
            <BrowserRouter>
                <CompaniesTable />
            </BrowserRouter>
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays error message when data fetching fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Error fetching companies'));
        
        render(
            <BrowserRouter>
                <CompaniesTable />
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });

    it('displays table data correctly after fetching', async () => {
        const mockCompanies = [
            {
                _id: '1',
                name: 'Test Company',
                owner: 'John Doe',
                logoUrl: 'https://via.placeholder.com/70',
            }
        ];

        axios.get.mockResolvedValueOnce({ data: mockCompanies });

        render(
            <BrowserRouter>
                <CompaniesTable />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/test company/i)).toBeInTheDocument();
            expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        });
    });

    // it('opens the Add Companies form and finds the close button', async () => {
    //     axios.get.mockResolvedValueOnce({ data: [] });

    //     render(
    //         <BrowserRouter>
    //             <CompaniesTable />
    //         </BrowserRouter>
    //     );

    //     // Ensure the button to open the form is rendered
    //     const addButton = await screen.findByTestId('add-company-button');
    //     expect(addButton).toBeInTheDocument();

    //     // Click the button to open the form
    //     fireEvent.click(addButton);

    //     // Ensure the form is opened by checking for the dialog title
    //     await waitFor(() => {
    //         expect(screen.getByText(/Add Company/i)).toBeInTheDocument();
    //     });

    //     // Find and check the close button
    //     const closeButton = await screen.findByTestId('close-button');
    //     expect(closeButton).toBeInTheDocument();
        
    //     // Debugging: Log the HTML output to confirm the close button is found
    //     screen.debug();
    // });



    it('navigates to company profile when View Profile button is clicked', async () => {
        const mockCompanies = [
            {
                _id: '1',
                name: 'Test Company',
                owner: 'John Doe',
                logoUrl: 'https://via.placeholder.com/70',
            }
        ];

        axios.get.mockResolvedValueOnce({ data: mockCompanies });
        const { container } = render(
            <BrowserRouter>
                <CompaniesTable />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/test company/i)).toBeInTheDocument();
        });

        const viewProfileButton = screen.getByText(/view profile/i);
        fireEvent.click(viewProfileButton);

        await waitFor(() => {
            const url = new URL(window.location);
            expect(url.pathname).toBe('/companyprofile/1');
        });
    });
});
