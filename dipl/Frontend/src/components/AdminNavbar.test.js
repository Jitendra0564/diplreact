import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar2 from '../../src/components/Common/Navbar2';

// Mock document.cookie
Object.defineProperty(global.document, 'cookie', {
  writable: true,
  value: 'isAdmin=true',
});

describe('Navbar2', () => {
  const mockOnAddCompanyClick = jest.fn();
  const mockOnAddEmployeeClick = jest.fn();
  const mockOnAssignTaskClick = jest.fn();
  const mockOnSelectTool = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render "Create Company" button when isCompaniesPage is true', () => {
    render(<Navbar2 isCompaniesPage={true} onAddCompanyClick={mockOnAddCompanyClick} />);
    const createCompanyButton = screen.getByText('Create Company');
    expect(createCompanyButton).toBeInTheDocument();
  });

  it('should call onAddCompanyClick when "Create Company" button is clicked', () => {
    render(<Navbar2 isCompaniesPage={true} onAddCompanyClick={mockOnAddCompanyClick} />);
    const createCompanyButton = screen.getByText('Create Company');
    fireEvent.click(createCompanyButton);
    expect(mockOnAddCompanyClick).toHaveBeenCalled();
  });

  it('should render "Create Task" button when isTaskPage is true', () => {
    render(<Navbar2 isTaskPage={true} onAssignTaskClick={mockOnAssignTaskClick} />);
    const createTaskButton = screen.getByText('Create Task');
    expect(createTaskButton).toBeInTheDocument();
  });

  it('should call onAssignTaskClick when "Create Task" button is clicked', () => {
    render(<Navbar2 isTaskPage={true} onAssignTaskClick={mockOnAssignTaskClick} />);
    const createTaskButton = screen.getByText('Create Task');
    fireEvent.click(createTaskButton);
    expect(mockOnAssignTaskClick).toHaveBeenCalled();
  });

  it('should render "Create User" button when isUserPage is true and user is an admin', () => {
    render(<Navbar2 isUserPage={true} isAdmin={true} onAddEmployeeClick={mockOnAddEmployeeClick} />);
    const createUserButton = screen.getByText('Create User');
    expect(createUserButton).toBeInTheDocument();
  });

  it('should call onAddEmployeeClick when "Create User" button is clicked', () => {
    render(<Navbar2 isUserPage={true} isAdmin={true} onAddEmployeeClick={mockOnAddEmployeeClick} />);
    const createUserButton = screen.getByText('Create User');
    fireEvent.click(createUserButton);
    expect(mockOnAddEmployeeClick).toHaveBeenCalled();
  });

  it('should not render "Create User" button when isUserPage is true and user is not an admin', () => {
    render(<Navbar2 isUserPage={false} isAdmin={false} onAddEmployeeClick={mockOnAddEmployeeClick} />);
    const createUserButton = screen.queryByRole('link', { name: 'Create User' });
    expect(createUserButton).toBeNull();
  });

  it('should render task management and meetings system icons when isToolsPage is true', () => {
    render(<Navbar2 isToolsPage={true} onSelectTool={mockOnSelectTool} />);
    const taskManagementIcon = screen.getByTestId('task-management-icon');
    const meetingsSystemIcon = screen.getByTestId('meetings-system-icon');
    expect(taskManagementIcon).toBeInTheDocument();
    expect(meetingsSystemIcon).toBeInTheDocument();
  });
  
  it('should call onSelectTool with "taskManagement" when task management icon is clicked', () => {
    render(<Navbar2 isToolsPage={true} onSelectTool={mockOnSelectTool} />);
    const taskManagementIcon = screen.getByTestId('task-management-icon');
    fireEvent.click(taskManagementIcon);
    expect(mockOnSelectTool).toHaveBeenCalledWith('taskManagement');
  });
  
  it('should call onSelectTool with "meetingsSystem" when meetings system icon is clicked', () => {
    render(<Navbar2 isToolsPage={true} onSelectTool={mockOnSelectTool} />);
    const meetingsSystemIcon = screen.getByTestId('meetings-system-icon');
    fireEvent.click(meetingsSystemIcon);
    expect(mockOnSelectTool).toHaveBeenCalledWith('meetingsSystem');
  });
});