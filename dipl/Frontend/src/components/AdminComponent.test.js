// AdminPannelGrid.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminPannelGrid from '../../src/components/Admin/AdminPannelGrid';

jest.mock('axios');

const mockTasks = [
  { _id: '1', title: 'Task 1', description: 'Description 1', status: 'Completed' },
  { _id: '2', title: 'Task 2', description: 'Description 2', status: 'Pending' },
  // add more mock tasks as needed
];

const mockEmployees = [
  { _id: '1', name: 'Employee 1', email: 'employee1@example.com' },
  // add more mock employees as needed
];

const mockCompanies = [
  { _id: '1', name: 'Company 1' },
  // add more mock companies as needed
];



describe('AdminPannelGrid', () => {
  beforeEach(() => {
    document.cookie = 'isAdmin=true; token=mock-token';
    axios.get.mockResolvedValueOnce({ data: mockTasks });
    axios.get.mockResolvedValueOnce({ data: mockEmployees });
    axios.get.mockResolvedValueOnce({ data: mockCompanies });
  });

  test('renders correctly', async () => {
    render(<AdminPannelGrid />);

    await waitFor(() => {
      expect(screen.getByText(/Total Tasks/i)).toBeInTheDocument();
      expect(screen.getByText(/Pending Tasks/i)).toBeInTheDocument();
      // add more assertions as needed
    });
  });

  test('fetches and displays tasks correctly', async () => {
    render(<AdminPannelGrid />);

    await waitFor(() => {
        expect(screen.getByTestId('total-tasks-title')).toBeInTheDocument();
        expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('2');
        expect(screen.getByTestId('pending-tasks-title')).toBeInTheDocument();
        expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('1');
    });
});

test('handles modal visibility', async () => {
  render(<AdminPannelGrid />);

  await waitFor(() => {
      expect(screen.getByTestId('total-tasks-title')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByTestId('view-list-button'));
  
  await waitFor(() => {
      expect(screen.getByTestId('modal-heading')).toHaveTextContent('Total Tasks');
  });

  fireEvent.click(screen.getByTestId('close-button'));
  
  await waitFor(() => {
      expect(screen.queryByTestId('modal-heading')).not.toBeInTheDocument();
  });

      await waitFor(() => {
        expect(screen.getByTestId('pending-tasks-title')).toBeInTheDocument();
    });

      fireEvent.click(screen.getByTestId('view-Pendinglist-button'));

      await waitFor(() => {
        expect(screen.getByTestId('modal-heading')).toHaveTextContent('Pending Tasks');
    });
      fireEvent.click(screen.getByTestId('close-button'));

      await waitFor(() => {
        expect(screen.queryByTestId('modal-heading')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('Completed-title')).toBeInTheDocument();
  });

    fireEvent.click(screen.getByTestId('view-Completed-list'));

    await waitFor(() => {
      expect(screen.getByTestId('modal-heading')).toHaveTextContent('Completed Tasks');
  });
    fireEvent.click(screen.getByTestId('close-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('modal-heading')).not.toBeInTheDocument();
  });
});

  test('calculates completion rate correctly', async () => {
    axios.get.mockImplementation((url) => {
        if (url === 'http://localhost:5000/api/tasks') {
            return Promise.resolve({ data: tasks });
        }
        if (url === 'http://localhost:5000/api/users') {
            return Promise.resolve({ data: employees });
        }
        if (url === 'http://localhost:5000/api/companies') {
            return Promise.resolve({ data: companies });
        }
    });

    document.cookie = 'isAdmin=true';
    document.cookie = 'token=test-token';

    render(<AdminPannelGrid />);

    await waitFor(() => {
      expect(screen.getByTestId('rate-of-task-completion')).toBeInTheDocument();
      expect(screen.getByTestId('completion-rate')).toHaveTextContent('50%');
  });
      await waitFor(() => {
        expect(screen.getByTestId('Companie-title')).toBeInTheDocument();
    });

      fireEvent.click(screen.getByTestId('Companie-list'));

      await waitFor(() => {
        expect(screen.getByTestId('modal-heading')).toHaveTextContent('Total Companies');
    });
      fireEvent.click(screen.getByTestId('close-button'));

      await waitFor(() => {
        expect(screen.queryByTestId('modal-heading')).not.toBeInTheDocument();
    });
});
  // add more tests for other functionalities like error handling, other task list views, etc.
});
