import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../src/components/Common/Sidebar';

// Mock the document.cookie value
const setDocumentCookie = (cookie) => {
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: cookie,
  });
};

describe('Sidebar', () => {
  beforeEach(() => {
    // Reset document.cookie before each test
    setDocumentCookie('');
  });

  it('renders the logo image', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const logoImage = screen.getByAltText('');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders the "Company Page" link when isAdmin is true', () => {
    // Set document.cookie to make isAdmin true
    setDocumentCookie('isAdmin=true');

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check if the Company Page link is in the document
    const companyLink = screen.getByLabelText('company page');
    expect(companyLink).toBeInTheDocument();
  });

  it('renders the "Admin Page" link when isAdmin is true', () => {
    // Set document.cookie to make isAdmin true
    setDocumentCookie('isAdmin=true');

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check if the Company Page link is in the document
    const AdminLink = screen.getByLabelText('Admin page');
    expect(AdminLink).toBeInTheDocument();
  });

  it('does not render the "User1 Page" link when isAdmin is false', () => {
    // Set document.cookie to make isAdmin false
    setDocumentCookie('isAdmin=false');

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

   
    // Check if the Company Page link is in the document
    const companyLink = screen.getByLabelText('user page');
    expect(companyLink).toBeInTheDocument();
  });

  it('renders the "Task Page" link', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check if the Task Page link is in the document
    const taskLink = screen.getByLabelText('task page');
    expect(taskLink).toBeInTheDocument();
  });

  it('renders the "User Management Page" link', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check if the Task Page link is in the document
    const taskLink = screen.getByLabelText('user management page');
    expect(taskLink).toBeInTheDocument();
  });

  it('renders the "Todo Page" link', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check if the Task Page link is in the document
    const taskLink = screen.getByLabelText('todo page');
    expect(taskLink).toBeInTheDocument();
  });
});
