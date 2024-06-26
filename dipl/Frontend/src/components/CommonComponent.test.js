import React from 'react';
import { render,screen,waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TodoList from '../../src/components/Common/FloatingButton/TodoList';
import ProtectedRoute from '../../src/components/Common/ProtectedRoute';
import { useAuth } from '../pages/AuthContext';
import TaskCard from '../../src/components/Tool/TaskManagement/components/TaskCard';
import TaskTable from '../../src/components/Tasks/TaskTable';
import ProjectTable from '../../src/components/Projects/ProjectTable';
import MeetingsTable from '../../src/components/Meetings/MeetingsTable';

test('renders TodoList component', () => {
  const { getByTestId } = render(<TodoList />);
  const todoListContainer = getByTestId('TodoListContainer');
  expect(todoListContainer).toBeInTheDocument();
});

// test('renders TaskCard component within TodoList', () => {
//     const { getByTestId, getByText } = render(<TodoList />);
//     const todoListContainer = getByTestId('TodoListContainer');
  
//     // Use a regular expression for text matching
//     const taskCardElement = getByText(todoListContainer, /TaskCard/i);
  
//     expect(taskCardElement).toBeInTheDocument();
//   });

  test('renders TaskCard component within TodoList', () => {
    render(<TodoList />);
    const taskCardContainer = screen.getByTestId('TaskCardContainer');
    expect(taskCardContainer).toBeInTheDocument();
});

test('renders TaskTable component within TodoList', () => {
    render(<TodoList />);
    const taskTableContainer = screen.getByTestId('TaskTableContainer');
    expect(taskTableContainer).toBeInTheDocument();
});

test('renders ProjectTable component within TodoList', () => {
    render(<TodoList />);
    const projectTableContainer = screen.getByTestId('ProjectTableContainer');
    expect(projectTableContainer).toBeInTheDocument();
});

test('renders MeetingsTable component within TodoList', async () => {
    render(<TodoList />);
    await waitFor(() => {
      expect(screen.getByTestId('MeetingsTableContainer')).toBeInTheDocument('MeetingsTable');
  });
});
