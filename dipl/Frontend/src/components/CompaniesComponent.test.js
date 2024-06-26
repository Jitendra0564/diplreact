import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import AddCompaniesForm, { initialValues } from '../../src/components/Companies/AddCompaniesForm';

jest.mock('axios');

const mockCountriesResponse = [
  { name: 'United States' },
  { name: 'Canada' },
  { name: 'United Kingdom' },
];


// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCountriesResponse),
  })
);


// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


describe('AddCompaniesForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', () => {
    render(<AddCompaniesForm />);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/owner name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fiscal year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/revenue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expenses/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/net income/i)).toBeInTheDocument();
  });

  it('fetches and populates country select options', async () => {
    render(
      <BrowserRouter>
        <AddCompaniesForm onBack={jest.fn()} />
      </BrowserRouter>
    );

    // Wait for the countries to be fetched and options to be populated
    await waitFor(() => {
      
      screen.debug();

      const countrySelect = screen.getByLabelText(/country/i);
      expect(countrySelect).toBeInTheDocument();
      expect(countrySelect).toHaveTextContent(/United States/);
      expect(countrySelect).toHaveTextContent(/Canada/);
      expect(countrySelect).toHaveTextContent(/United Kingdom/);
    });
  });

  it('submits the form successfully', async () => {
    const mockCompanyResponse = { /* mock company data */ };
    axios.post.mockResolvedValueOnce({ data: mockCompanyResponse });
  
    render(
      <BrowserRouter>
        <AddCompaniesForm onBack={jest.fn()} />
      </BrowserRouter>
    );
  
    // Fill out the form fields
    userEvent.type(screen.getByLabelText(/company name/i), 'Test Company1'); // Ensure this matches the expected company name
    userEvent.type(screen.getByLabelText(/owner name/i), 'John Doe');
    userEvent.type(screen.getByLabelText(/phone/i), '1234567890');
    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/website/i), 'https://example.com');
    userEvent.type(screen.getByLabelText(/street/i), '123 Main St');
    userEvent.type(screen.getByLabelText(/city/i), 'New York');
    userEvent.type(screen.getByLabelText(/state/i), 'NY');
    userEvent.type(screen.getByLabelText(/zip code/i), '10001');
  
    // Wait for the countries to be fetched and options to be populated
    await waitFor(() => {
      expect(screen.getByText(/United States/i)).toBeInTheDocument();
      expect(screen.getByText(/Canada/i)).toBeInTheDocument();
      expect(screen.getByText(/United Kingdom/i)).toBeInTheDocument();
    });
  
    // Select country option
    userEvent.selectOptions(screen.getByLabelText(/country/i), 'United States');
  
    userEvent.type(screen.getByLabelText(/fiscal year/i), '2023');
    userEvent.type(screen.getByLabelText(/revenue/i), '1000000');
    userEvent.type(screen.getByLabelText(/expenses/i), '500000');
    userEvent.type(screen.getByLabelText(/net income/i), '500000');
  
    // Add an employee
    const addEmployeeButton = screen.getAllByText(/Add Employee/i)[0];
    userEvent.click(addEmployeeButton);
    userEvent.type(screen.getAllByPlaceholderText(/employee name/i)[0], 'John Smith');
    userEvent.type(screen.getAllByPlaceholderText(/employee email/i)[0], 'john@example.com');
    userEvent.type(screen.getAllByPlaceholderText(/employee position/i)[0], 'Manager');
    userEvent.type(screen.getAllByPlaceholderText(/employee phone/i)[0], '9876543210');
  
    // Add a department
    const addDepartmentButton = screen.getByText(/Add Department/i);
    userEvent.click(addDepartmentButton);
    userEvent.type(screen.getAllByPlaceholderText(/department name/i)[0], 'Engineering');
    userEvent.type(screen.getAllByPlaceholderText(/department manager/i)[0], 'Jane Doe');
    const addDepartmentEmployeeButton = screen.getAllByText(/add employee/i)[1];
    userEvent.click(addDepartmentEmployeeButton);
    userEvent.type(screen.getAllByPlaceholderText(/employee/i)[0], 'Bob Johnson');
  
    // Add a product
    const addProductButton = screen.getByText(/Add Product/i);
    userEvent.click(addProductButton);
    userEvent.type(screen.getAllByPlaceholderText(/product name/i)[0], 'Product X');
    userEvent.type(screen.getAllByPlaceholderText(/product category/i)[0], 'Electronics');
    userEvent.type(screen.getAllByPlaceholderText(/product price/i)[0], '99.99');
    fireEvent.change(screen.getAllByPlaceholderText(/launch date/i)[0], { target: { value: '2023-06-01' } });
  
      // Submit the form
      await act(async () => { 
        userEvent.click(screen.getByRole('button', { name: /submit/i }));
      });
  
    // Ensure axios.post is called with the expected data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/companies',
        {
          companyName: 'Test Company1',
          ownerName: 'John Doe',
          phone: '1234567890',
          email: 'test@example.com',
          website: 'https://example.com',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States',
          fiscalYear: '2023',
          revenue: '1000000',
          expenses: '500000',
          netIncome: '500000',
          employees: [
            {
              name: 'John Smith',
              email: 'john@example.com',
              position: 'Manager',
              phone: '9876543210',
            },
          ],
          departments: [
            {
              name: 'Engineering',
              manager: 'Jane Doe',
              employees: ['Bob Johnson'],
            },
          ],
          products: [
            {
              name: 'Product X',
              category: 'Electronics',
              price: '99.99',
              launchDate: '2023-06-01',
            },
          ],
        }
      );
    });
  });
  

  it('validates form fields', async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        {({ isSubmitting }) => (
          <AddCompaniesForm onBack={() => {}} isSubmitting={isSubmitting} />
        )}
      </Formik>
    );

    const companyNameInput = screen.getByPlaceholderText(/Enter company name/i);
    const fiscalYearInput = screen.getByPlaceholderText(/Enter fiscal year/i);
    const revenueInput = screen.getByPlaceholderText(/Enter Revenue/i);
    const expensesInput = screen.getByPlaceholderText(/Enter Expenses/i);
    const netIncomeInput = screen.getByPlaceholderText(/Enter Net Income/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Clear inputs
    userEvent.clear(companyNameInput);
    userEvent.clear(fiscalYearInput);
    userEvent.clear(revenueInput);
    userEvent.clear(expensesInput);
    userEvent.clear(netIncomeInput);

    // Submit form
    fireEvent.click(submitButton);

    // Assert validation errors
    await waitFor(() => {
      expect(screen.getByText(/Company name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Owner name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Website is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Fiscal year is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Revenue is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Expenses is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Net income is required/i)).toBeInTheDocument();
    });
  });
});
