import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/pages/AuthContext';
import Adminpannel from '../../src/pages/Adminpannel';
import Companies from '../../src/pages/Companies'; 
import Home from '../../src/pages/Home'; 
import Users from '../../src/pages/Users';
import Userpanel from '../../src/pages/Userpanel';
import Tools from '../../src/pages/Tools';
import Task from '../../src/pages/Task';
import TodoList from '../../src/pages/Todo';
import LoginWithGoogleButton from '../../src/pages/Login'; 
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import axios from 'axios';

// Mock common components
jest.mock('../../src/components/Common/Sidebar', () => () => <div data-testid="sidebar">Mocked Sidebar</div>);
jest.mock('../../src/components/Common/Navbar2', () => ({ isToolsPage, isUserPage, onSelectTool, onAddEmployeeClick }) => (
  <div data-testid="navbar2">
    Mocked Navbar2 - {isToolsPage ? 'isToolsPage: true' : 'isUserPage: true'}
    {onSelectTool && <button onClick={() => onSelectTool('taskManagement')}>Select Task Management</button>}
    {onSelectTool && <button onClick={() => onSelectTool('meetingsSystem')}>Select Meetings System</button>}
    {onAddEmployeeClick && <button onClick={onAddEmployeeClick}>Add Employee</button>}
  </div>
));

// Mock specific components for each page
jest.mock('../../src/components/Admin/AdminPannelGrid', () => () => <div data-testid="admin-pannel-grid">Mocked AdminPannelGrid</div>);
jest.mock('../../src/components/Companies/CompaniesTable', () => () => <div data-testid="companies-table">Mocked CompaniesTable</div>);
jest.mock('../../src/components/Companies/AddCompaniesForm', () => () => <div data-testid="add-companies-form">Mocked AddCompaniesForm</div>);
jest.mock('../../src/components/Home/Navbar', () => () => <div data-testid="navbar">Mocked Navbar</div>);
jest.mock('../../src/components/Home/Hero_card', () => () => <div data-testid="hero-card">Mocked Hero_card</div>);
jest.mock('../../src/components/Home/Service_grid', () => () => <div data-testid="service-grid">Mocked Service_grid</div>);
jest.mock('../../src/components/Home/Footer', () => () => <div data-testid="footer">Mocked Footer</div>);
jest.mock('../../src/components/Users/UserTable', () => () => <div data-testid="user-table">Mocked UserTable</div>);
jest.mock('../../src/components/Users/AddEmployeeForm', () => ({ onBack }) => (
  <div data-testid="add-employee-form">
    Mocked AddEmployeeForm
    <button onClick={onBack}>Back</button>
  </div>
));

jest.mock('../../src/components/Tool/TaskManagement/Taskmanajement', () => () => <div data-testid="task-management">Mocked TaskManagement</div>);
jest.mock('../../src/components/Tool/Meetings/MeetingsSystem', () => () => <div data-testid="meetings-system">Mocked MeetingsSystem</div>);
jest.mock('../../src/components/Tasks/TaskTable', () => () => <div data-testid="task-table">Mocked TaskTable</div>);
jest.mock('../../src/components/Tasks/AssignTaskForm', () => ({ onBack }) => (
  <div data-testid="assign-task-form">
    Mocked AssignTaskForm
    <button onClick={onBack}>Back</button>
  </div>
));

jest.mock('../../src/components/Tool/TaskManagement/components/TaskCard', () => () => <div data-testid="task-card">Mocked TaskCard</div>);
jest.mock('../../src/components/Projects/ProjectTable', () => () => <div data-testid="project-table">Mocked ProjectTable</div>);
jest.mock('../../src/components/Meetings/MeetingsTable', () => () => <div data-testid="meetings-table">Mocked MeetingsTable</div>);

// Mock axios post request
jest.mock('axios');

describe('Integration Tests', () => {
    test('AuthProvider - login and logout functionality', () => {
      const TestComponent = () => {
        const { auth, login, logout } = useAuth();
  
        return (
          <div>
            <button onClick={() => login({ isAuthenticated: true, isAdmin: false, user: { name: 'Test User' } })}>
              Login
            </button>
            <button onClick={logout}>Logout</button>
            <div data-testid="isAuthenticated">{auth.isAuthenticated.toString()}</div>
          </div>
        );
      };
  
      const { getByText, getByTestId } = render(
        <BrowserRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </BrowserRouter>
      );
  
      // Initial state
      expect(getByTestId('isAuthenticated').textContent).toBe('false');
  
      // Perform login
      fireEvent.click(getByText('Login'));
      expect(getByTestId('isAuthenticated').textContent).toBe('true');
  
      // Perform logout
      fireEvent.click(getByText('Logout'));
      expect(getByTestId('isAuthenticated').textContent).toBe('false');
    });
  //1
    test('Adminpannel - renders Sidebar and AdminPannelGrid components', () => {
      const { getByTestId } = render(<Adminpannel />);
  
      expect(getByTestId('sidebar')).toBeInTheDocument();
      expect(getByTestId('admin-pannel-grid')).toBeInTheDocument();
    });
  //2
    test('Companies - renders Sidebar, CompaniesTable, and AddCompaniesForm', () => {
      const { getByTestId, queryByTestId } = render(<Companies />);
  
      expect(getByTestId('sidebar')).toBeInTheDocument();
      expect(getByTestId('companies-table')).toBeInTheDocument();   
    });
  //3
    test('Home - renders Navbar, Hero_card, Service_grid, and Footer components', () => {
      const { getByTestId } = render(<Home />);
  
      expect(getByTestId('navbar')).toBeInTheDocument();
      expect(getByTestId('hero-card')).toBeInTheDocument();
      expect(getByTestId('service-grid')).toBeInTheDocument();
      expect(getByTestId('footer')).toBeInTheDocument();
    });
  //4
    test('Users - renders Sidebar, UserTable, Navbar2, and AddEmployeeForm', () => {
      const { getByTestId, getByText, queryByTestId } = render(<Users />);
  
      expect(getByTestId('sidebar')).toBeInTheDocument();
      expect(getByTestId('user-table')).toBeInTheDocument();
      expect(getByTestId('navbar2')).toBeInTheDocument();
      expect(getByTestId('navbar2')).toHaveTextContent('isUserPage: true');
  
      expect(queryByTestId('add-employee-form')).toBeNull();
  
      fireEvent.click(getByText('Add Employee'));
      expect(queryByTestId('add-employee-form')).toBeInTheDocument();
  
      fireEvent.click(getByText('Back'));
      expect(queryByTestId('add-employee-form')).toBeNull();
    });

  //5
    test('Userpanel - renders Sidebar and AdminPannelGrid components', () => {
      const { getByTestId } = render(<Userpanel />);
  
      expect(getByTestId('sidebar')).toBeInTheDocument();
      expect(getByTestId('admin-pannel-grid')).toBeInTheDocument();
    });

  //6
    test('Tools - renders Sidebar, Navbar2, TaskManagement and MeetingsSystem', () => {
      const { getByTestId, getByText, queryByTestId } = render(<Tools />);
  
      expect(getByTestId('sidebar')).toBeInTheDocument();
      expect(getByTestId('navbar2')).toBeInTheDocument();
      expect(getByTestId('navbar2')).toHaveTextContent('isToolsPage: true');
  
      expect(queryByTestId('task-management')).toBeNull();
      expect(queryByTestId('meetings-system')).toBeNull();
  
      fireEvent.click(getByText('Select Task Management'));
      expect(queryByTestId('task-management')).toBeInTheDocument();
      expect(queryByTestId('meetings-system')).toBeNull();
  
      fireEvent.click(getByText('Select Meetings System'));
      expect(queryByTestId('task-management')).toBeNull();
      expect(queryByTestId('meetings-system')).toBeInTheDocument();
    });

  //7
    test('Task - renders Sidebar, TaskTable, and AssignTaskForm', () => {
      const { getByTestId, getByText, queryByTestId } = render(<Task />);
  
      expect(getByTestId('sidebar')).toBeInTheDocument();
      expect(getByTestId('task-table')).toBeInTheDocument();
    });

  //8
    test('TodoList - renders TaskCard, TaskTable, ProjectTable, and MeetingsTable components', () => {
      const { getByTestId } = render(<TodoList />);
  
      expect(getByTestId('task-card')).toBeInTheDocument();
      expect(getByTestId('task-table')).toBeInTheDocument();
      expect(getByTestId('project-table')).toBeInTheDocument();
      expect(getByTestId('meetings-table')).toBeInTheDocument();
    });
  
   
    describe('LoginWithGoogleButton', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
      beforeAll(() => {
        // Mock global alert function
        global.alert = jest.fn();
      });
    
      afterAll(() => {
        // Clean up and restore the original alert function
        jest.restoreAllMocks();
      });
//9
      test('LoginWithGoogleButton - renders form and handles login', async () => {
        axios.post.mockResolvedValue({
          data: {
            token: 'mocked-token',
            isAdmin: true,
          },
        });
    
        const { getByLabelText, getByText } = render(
          <MemoryRouter>
            <LoginWithGoogleButton />
          </MemoryRouter>
        );
    
        fireEvent.change(getByLabelText(/Email Address/i), { target: { value: 'jitendra05644@gmail.com' } });
        fireEvent.change(getByLabelText(/Password/i), { target: { value: '1234' } });
    
        fireEvent.click(getByText(/login/i));
    
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/users/login', {
          email: 'jitendra05644@gmail.com',
          password: '1234',
        }));
    
        expect(document.cookie).toContain('token=mocked-token');
        expect(document.cookie).toContain('isAdmin=true');
      });
  

  //10  
      test('renders email and password inputs', () => {
        render(
          <BrowserRouter>
            <LoginWithGoogleButton />
          </BrowserRouter>
        );
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
      });
    
     
  //11  
      test('submits form with valid data', async () => {
        const mockResponse = {
          data: {
            token: 'mock-token',
            isAdmin: true,
          },
        };
        axios.post.mockResolvedValueOnce(mockResponse);
    
        render(
          <BrowserRouter>
            <LoginWithGoogleButton />
          </BrowserRouter>
        );
        const emailInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Login' });
    
        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
        fireEvent.click(submitButton);
    
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/users/login', {
            email: 'valid@email.com',
            password: 'validpassword',
          });
        });
    
        expect(document.cookie).toContain('token=mock-token');
        expect(document.cookie).toContain('isAdmin=true');
      });
    });
    
//12
    test('handles login error', async () => {
      axios.post.mockRejectedValue({ response: { data: { message: '   Invalid email or password' } } });
    
      render(
        <BrowserRouter>
          <LoginWithGoogleButton />
        </BrowserRouter>
      );
          const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const errorElement = screen.getByTestId('login-message');
        expect(errorElement).toHaveTextContent('Invalid email or password');
      });
    });
});



const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
  return "";
};

const validatePassword = (password) => {
  if (!password.trim()) return "Password is required";
  if (password.length < 4) return "Password must be at least 4 characters";
  return "";
};

const validateInputs = (email, password) => {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  
  return {
    isValid: !emailError && !passwordError,
    emailError,
    passwordError
  };
};

describe('Input Validation', () => {
  test.each([
    ['test@example.com', 'password123', true, '', ''],
    ['', 'password123', false, 'Email is required', ''],
    ['invalidemail', 'password123', false, 'Email is invalid', ''],
    ['test@example.com', '', false, '', 'Password is required'],
    ['test@example.com', 'abc', false, '', 'Password must be at least 4 characters'],
    ['', '', false, 'Email is required', 'Password is required'],
  ])('validates email "%s" and password "%s"', (email, password, expectedIsValid, expectedEmailError, expectedPasswordError) => {
    const { isValid, emailError, passwordError } = validateInputs(email, password);
    expect(isValid).toBe(expectedIsValid);
    expect(emailError).toBe(expectedEmailError);
    expect(passwordError).toBe(expectedPasswordError);
  });

});