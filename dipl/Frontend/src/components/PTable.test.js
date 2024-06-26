import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProjectTable from '../../src/components/Projects/ProjectTable';

// Mock the modules used in ProjectTable that are imported from MUI and react-icons
jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  createTheme: () => ({})
}));

jest.mock('react-icons/md', () => ({
  MdOutlineAddTask: 'MdOutlineAddTaskMock',
  MdMoreVert: 'MdMoreVertMock'
}));

describe('ProjectTable Component', () => {
  // Mock projects data for testing
  const mockProjects = [
    {
      id: 1,
      projectDescription: 'Project 1',
      assignedBy: 'User 1',
      assignedTo: 'User 2',
      assignedDate: '2023-01-01',
      dueDate: '2023-01-15',
      status: 'In Progress',
      progress: 50,
      details: 'Lorem ipsum dolor sit amet.'
    },
    {
      id: 2,
      projectDescription: 'Project 2',
      assignedBy: 'User 3',
      assignedTo: 'User 4',
      assignedDate: '2023-02-01',
      dueDate: '2023-02-28',
      status: 'Pending',
      progress: 0,
      details: 'Lorem ipsum dolor sit amet.'
    }
  ];

  beforeEach(() => {
    // Mock useEffect to prevent making real API calls in tests
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  });

  it('renders project table correctly', () => {
    const { getByText } = render(<ProjectTable />);

    // Check if the project list table is rendered with its title
    expect(getByText('Project List')).toBeInTheDocument();
    
    // Check if the project descriptions from mock data are rendered
    expect(getByText('Project 1')).toBeInTheDocument();
    expect(getByText('Project 2')).toBeInTheDocument();
  });

  it('opens project details dialog on clicking view project', async () => {
    const { getByText, getByTestId } = render(<ProjectTable />);
    
    // Open menu for first project
    fireEvent.click(getByTestId('project-table-row-menu-button-0'));
    
    // Click on "View Project" option in the menu
    fireEvent.click(getByText('View Project'));
    
    // Wait for dialog to appear
    await waitFor(() => {
      expect(getByText('Project Details')).toBeInTheDocument();
    });
  });

  it('opens project update dialog on clicking update project', async () => {
    const { getByText, getByTestId } = render(<ProjectTable />);
    
    // Open menu for second project
    fireEvent.click(getByTestId('project-table-row-menu-button-1'));
    
    // Click on "Update Project" option in the menu
    fireEvent.click(getByText('Update Project'));
    
    // Wait for dialog to appear
    await waitFor(() => {
      expect(getByText('Update Project')).toBeInTheDocument();
    });
  });

  it('deletes a project on confirmation', async () => {
    const { getByText, getByTestId, queryByText } = render(<ProjectTable />);
    
    // Open menu for first project
    fireEvent.click(getByTestId('project-table-row-menu-button-0'));
    
    // Click on "Delete Project" option in the menu
    fireEvent.click(getByText('Delete Project'));
    
    // Wait for delete confirmation dialog to appear
    await waitFor(() => {
      expect(getByText('Are you sure you want to delete this project?')).toBeInTheDocument();
    });

    // Click on "Delete" button in the confirmation dialog
    fireEvent.click(getByText('Delete'));
    
    // Wait for Snackbar message indicating deletion success
    await waitFor(() => {
      expect(getByText('Project deleted successfully!')).toBeInTheDocument();
    });

    // Check if the deleted project is no longer in the table
    expect(queryByText('Project 1')).toBeNull();
  });
});
