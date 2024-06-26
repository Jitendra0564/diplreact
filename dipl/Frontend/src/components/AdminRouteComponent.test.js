
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate } from 'react-router-dom';
import AdminRoute from '../../src/components/Common/AdminRoute';

// Mock the useAuth hook
jest.mock('../../src/pages/AuthContext', () => ({
  useAuth: jest.fn(),
}));


// Mock the Navigate component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(({ to }) => <div>Navigating to: {to}</div>),
}));

describe('AdminRoute', () => {
  const MockComponent = () => <div>Admin Component</div>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when user is authenticated and an admin', () => {
    const useAuthMock = require('../../src/pages/AuthContext');
    useAuthMock.useAuth.mockReturnValue({
      auth: { token: 'valid_token', isAdmin: true },
    });

    render(
      <MemoryRouter>
        <AdminRoute>
          <MockComponent />
        </AdminRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Component')).toBeInTheDocument();
  });

  it('should redirect to /login when user is not authenticated', () => {
    const useAuthMock = require('../../src/pages/AuthContext');
    useAuthMock.useAuth.mockReturnValue({ auth: { token: null, isAdmin: false } });

    render(
      <MemoryRouter>
        <AdminRoute>
          <MockComponent />
        </AdminRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Admin Component')).not.toBeInTheDocument();
    expect(screen.getByText('Navigating to: /login')).toBeInTheDocument();
  });

  it('should redirect to /login when user is not an admin', () => {
    const useAuthMock = require('../../src/pages/AuthContext');
    useAuthMock.useAuth.mockReturnValue({ auth: { token: 'valid_token', isAdmin: false } });

    render(
      <MemoryRouter>
        <AdminRoute>
          <MockComponent />
        </AdminRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Admin Component')).not.toBeInTheDocument();
    expect(screen.getByText('Navigating to: /login')).toBeInTheDocument();
  });
});