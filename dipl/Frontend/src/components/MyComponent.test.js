// src/components/Home/HomeComponents.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Home/Header';
import Footer from '../../src/components/Home/Footer';
import HeroCard from '../../src/components/Home/Hero_card';
import Navbar from '../../src/components/Home/Navbar';
import ServiceGrid from '../../src/components/Home/service_grid';

test('renders all components with correct text', () => {
  render(<Header />);
  render(<Footer />);
  render(<HeroCard />);

  const headerElement = screen.getByText(/header/i);
  const footerElement = screen.getByText(/Footer/i);
  const heroCardElement = screen.getByText(/Dudhat Business Management Solution/i);

  expect(headerElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();
  expect(heroCardElement).toBeInTheDocument();
  
});

describe('Navbar', () => {
  it('renders Navbar correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the title "DIPL" is present
    expect(screen.getByText('DIPL')).toBeInTheDocument();

    // Check if the "LOGIN" link is present
    const loginLink = screen.getByText('LOGIN');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });
});

describe('ServiceGrid component', () => {
  test('renders service grid component', () => {
    render(<ServiceGrid />);
    
    // Example test assertions
    const headerElement = screen.getByText(/Our Services/i);
    const employeeManagementElement = screen.getByText(/Employee Management/i);
    const customerManagementElement = screen.getByText(/Customer Management/i);
    const businessToolsElement = screen.getByText(/Business Tools/i);
    const financeManagementElement = screen.getByText(/Finance Management/i);

    expect(headerElement).toBeInTheDocument();
    expect(employeeManagementElement).toBeInTheDocument();
    expect(customerManagementElement).toBeInTheDocument();
    expect(businessToolsElement).toBeInTheDocument();
    expect(financeManagementElement).toBeInTheDocument();
  });
});


