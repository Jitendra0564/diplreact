// AssignTaskForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';

import axios from 'axios';
import { BrowserRouter,useNavigate } from 'react-router-dom';
import AssignTaskForm from '../../src/components/Tasks/AssignTaskForm';
import CustomSnackbar from '../../src/components/Tasks/CustomSnackbar'; // Adjust the import according to your file structure
import { ThemeProvider, createTheme } from '@mui/material/styles';



jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});




const renderWithThemeAndRouter = (ui, { theme = createTheme() } = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};

// Define a custom theme for testing
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    common: {
      white: '#fff',
    },
  },
});

describe('AssignTaskForm', () => {
  beforeAll(() => {
    // Mock global alert function
    global.alert = jest.fn();
  });

  afterAll(() => {
    // Clean up and restore the original alert function
    jest.restoreAllMocks();
  });
    test('renders form fields correctly', () => {
        renderWithThemeAndRouter(<AssignTaskForm onBack={jest.fn()} />);
        expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Employee Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument(); // Use the correct field name
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
      });

  test('fetches and displays users', async () => {
    axios.get.mockResolvedValue({ data: [{ _id: '1', name: 'John Doe' }] });
    renderWithThemeAndRouter(<AssignTaskForm onBack={jest.fn()} />);
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
  });

  test('submits the form successfully', async () => {
    axios.get.mockResolvedValue({ data: [{ _id: '1', name: 'John Doe' }] });
    axios.post.mockResolvedValue({ data: { message: 'Task created successfully' } });
    renderWithThemeAndRouter(<AssignTaskForm onBack={jest.fn()} />);
    
   // Wait for the success message to appear (with a flexible text matcher)
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Task Name/i), { target: { value: 'Test Task' } });
      fireEvent.change(screen.getByLabelText(/Employee Name/i), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-06-19' } });
      fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-06-20' } }); // Use the correct field name
      fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
      fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'In Progress' } });
      fireEvent.click(screen.getByText(/submit/i));
      expect(global.alert).toHaveBeenCalledWith('Task assigned successfully!');
    });
  });

  test('handles form submission failure', async () => {
    axios.get.mockResolvedValue({ data: [{ _id: '1', name: 'John Doe' }] });
    axios.post.mockRejectedValue(new Error('Error creating task:'));

    const onBackMock = jest.fn();
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    
    renderWithThemeAndRouter(<AssignTaskForm onBack={onBackMock} />);
      
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Task Name/i), { target: { value: 'Test Task' } });
      fireEvent.change(screen.getByLabelText(/Employee Name/i), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-06-19' } });
      fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-06-20' } });
      fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
      fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'In Progress' } });
      fireEvent.click(screen.getByText(/submit/i));
      expect(global.alert).toHaveBeenCalledWith('An error occurred while assigning the task.');
    });
    

        // After the form submission is successful, assert the following actions
     // expect(navigateMock).toHaveBeenCalledWith('/task'); // Ensure navigate('/task') was called
      //expect(onBackMock).toHaveBeenCalled(); // Verify onBack callback was called

      // Use act to advance timers for setTimeout
      //act(() => {
        //jest.advanceTimersByTime(3000); // Move ahead 3 seconds to trigger setTimeout
      //});

      // Assert that setShowSuccessAlert(false) is called after 3 seconds
      //expect(screen.queryByText(/success message/i)).toBeNull(); // Assuming the success alert text

      // Log the final state of the component for debugging
      //console.log('Final component state:', screen.container.innerHTML);
  });
});

describe('CustomSnackbar', () => {
  test('renders with the correct message', () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomSnackbar message="Test message" open={true} />
      </ThemeProvider>
    );

    const snackbarMessage = screen.getByText(/test message/i);
    expect(snackbarMessage).toBeInTheDocument();
  });

  test('uses the correct color when the color prop is provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomSnackbar message="Test message" color="red" open={true} />
      </ThemeProvider>
    );

    const snackbarContent = screen.getByText(/test message/i).parentElement;
    expect(snackbarContent).toHaveStyle('background-color: red');
  });

  test('uses the default theme color when the color prop is not provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomSnackbar message="Test message" open={true} />
      </ThemeProvider>
    );

    const snackbarContent = screen.getByText(/test message/i).parentElement;
    expect(snackbarContent).toHaveStyle('background-color: #1976d2');
  });
});