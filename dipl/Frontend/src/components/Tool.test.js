import React from 'react';
import { render, waitFor, fireEvent,screen, getByTestId } from '@testing-library/react';
import axios from 'axios';
import MeetingsSystem from '../../src/components/Tool/Meetings/MeetingsSystem';
import Taskmanajement from '../../src/components/Tool/TaskManagement/Taskmanajement';
import TaskCard from '../../src/components/Tool/TaskManagement/components/TaskCard'; // Adjust the import path based on your directory structure

jest.mock('axios'); // Mock axios to prevent actual HTTP requests

describe('MeetingsSystem Component', () => {
    test('renders MeetingsSystem component', () => {
        const { getByText } = render(<MeetingsSystem />);
        const headingElement = getByText(/i am Meetings management system/i);
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveClass('font-bold text-9xl');
    });

    // Add more specific test cases for MeetingsSystem component as needed
});

describe('Taskmanajement Component', () => {
    test('renders Taskmanajement component', () => {
        const { getByTestId } = render(<Taskmanajement />);
        expect(getByTestId('task-card')).toBeInTheDocument();
        expect(getByTestId('task-table')).toBeInTheDocument();
        expect(getByTestId('project-table')).toBeInTheDocument();
        expect(getByTestId('meetings-table')).toBeInTheDocument();
    });

    // Add more specific test cases for Taskmanajement component as needed
});


describe('TaskCard', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('renders TaskCard with initial state', async () => {
        render(<TaskCard />);
        expect(screen.getByTestId('total-tasks-title')).toBeInTheDocument();
        expect(screen.getByTestId('total-Completed-title')).toBeInTheDocument();
        expect(screen.getByTestId('total-Pending-title')).toBeInTheDocument();
        expect(screen.getByTestId('total-Expired-title')).toBeInTheDocument();
        expect(screen.getByTestId('total-InProgress-title')).toBeInTheDocument();
      });

      test('fetches tasks on component mount', async () => {
        const mockTasks = [
          { _id: '1', title: 'Task 1', description: 'Description 1', status: 'Completed' },
          { _id: '2', title: 'Task 2', description: 'Description 2', status: 'Pending' },
          { _id: '3', title: 'Task 3', description: 'Description 3', status: 'Cancelled' },
          { _id: '4', title: 'Task 4', description: 'Description 4', status: 'In Progress' },
        ];
        axios.get.mockResolvedValueOnce({ data: mockTasks });
    
        render(<TaskCard />);
    
        await waitFor(() => {
    
        expect(screen.getByTestId('total-tasks-title')).toBeInTheDocument(); // Total Tasks
        expect(screen.getByTestId('total')).toHaveTextContent('4');
        expect(screen.getByTestId('total-Completed-title')).toBeInTheDocument(); // Completed Tasks
        expect(screen.getByTestId('completed')).toHaveTextContent('1'); 
        expect(screen.getByTestId('total-Pending-title')).toBeInTheDocument(); // Pending Tasks
        expect(screen.getByTestId('pending')).toHaveTextContent('1'); 
        expect(screen.getByTestId('total-Expired-title')).toBeInTheDocument(); // Expired Tasks
        expect(screen.getByTestId('expired')).toHaveTextContent('1');  
        expect(screen.getByTestId('total-InProgress-title')).toBeInTheDocument();  // In Progress Tasks
        expect(screen.getByTestId('inprogress')).toHaveTextContent('1'); 
      });
    });
    

      test('opens and close modal when "View List" and "close" button is clicked', async() => {
          render(<TaskCard />);
      
                
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
      });


    // Add more specific test cases for TaskCard component as needed
    test('renders correct task list in modal', async () => {
        const mockTasks = [
          { _id: '1', title: 'Task 1', description: 'Description 1', status: 'Completed' },
          { _id: '2', title: 'Task 2', description: 'Description 2', status: 'Pending' },
          { _id: '3', title: 'Task 3', description: 'Description 3', status: 'In Progress' },
          { _id: '4', title: 'Task 4', description: 'Description 4', status: 'Cancelled' },
        ];
        axios.get.mockResolvedValueOnce({ data: mockTasks });
    
        const { queryByText, findByText } = render(<TaskCard />);
    
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    
        fireEvent.click(screen.getByTestId('view-list-button'));
        expect(await findByText('1.Task 1')).toBeInTheDocument();
        expect(await findByText('2.Task 2')).toBeInTheDocument();
    
        fireEvent.click(screen.getByTestId('view-Completed-button'));
        expect(await findByText('1.Task 1')).toBeInTheDocument();
        expect(queryByText('2.Task 2')).not.toBeInTheDocument();
    
        fireEvent.click(screen.getByTestId('view-Pending-button'));
        expect(await findByText('1.Task 2')).toBeInTheDocument();
        expect(queryByText('1.Task 1')).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId('view-In Progress-button'));
        expect(await findByText('1.Task 3')).toBeInTheDocument();
        expect(queryByText('1.Task 4')).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId('view-Expired-button'));
        expect(await findByText('1.Task 4')).toBeInTheDocument();
        expect(queryByText('1.Task 3')).not.toBeInTheDocument();
      });
      
});

