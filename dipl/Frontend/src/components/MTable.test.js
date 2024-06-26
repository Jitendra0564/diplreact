import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MeetingsTable from '../../src/components/Meetings/MeetingsTable';

describe('MeetingsTable Component', () => {
    it('renders the meetings table with initial data', async () => {
        render(<MeetingsTable />);

        // Check if the title "Meeting List" is rendered
        expect(screen.getByText('Meeting List')).toBeInTheDocument();

        // Wait for initial meetings data to load (using mock data)
        await waitFor(() => {
            // Check if some initial meeting items are rendered
            expect(screen.getByText('Meeting 1')).toBeInTheDocument();
            expect(screen.getByText('Meeting 2')).toBeInTheDocument();
            // Adjust based on the mock data structure or specific texts rendered
        });

        // Check if the "Add Task" button is rendered
        // expect(screen.getByLabelText('Add Task')).toBeInTheDocument();
    });

    it('opens and closes schedule meeting dialog', async () => {
        render(<MeetingsTable />);

        // Click on the "Add Task" button to open the dialog
        // fireEvent.click(screen.getByLabelText('Add Task'));

        // Check if the schedule meeting dialog opens
        await waitFor(() => {
            expect(screen.getByText('Schedule Meeting')).toBeInTheDocument();
        });

        // Close the schedule meeting dialog
        fireEvent.click(screen.getByText('Cancel'));

        // Check if the dialog closes
        await waitFor(() => {
            expect(screen.queryByText('Schedule Meeting')).not.toBeInTheDocument();
        });
    });

    it('opens meeting details dialog when clicking "View Details"', async () => {
        render(<MeetingsTable />);

        // Open the menu for a meeting item
        fireEvent.click(screen.getByLabelText('More Options'));

        // Click on "View Details" in the menu
        fireEvent.click(screen.getByText('View Details'));

        // Check if the meeting details dialog opens
        await waitFor(() => {
            expect(screen.getByText('Meeting Details')).toBeInTheDocument();
        });

        // Close the meeting details dialog
        fireEvent.click(screen.getByText('Close'));

        // Check if the dialog closes
        await waitFor(() => {
            expect(screen.queryByText('Meeting Details')).not.toBeInTheDocument();
        });
    });

    it('deletes a meeting when "Delete Meeting" is clicked', async () => {
        render(<MeetingsTable />);

        // Open the menu for a meeting item
        fireEvent.click(screen.getByLabelText('More Options'));

        // Click on "Delete Meeting" in the menu
        fireEvent.click(screen.getByText('Delete Meeting'));

        // Check if the delete confirmation dialog opens
        await waitFor(() => {
            expect(screen.getByText('Are you sure you want to delete this meeting?')).toBeInTheDocument();
        });

        // Confirm deletion
        fireEvent.click(screen.getByText('Delete'));

        // Check if the meeting is removed from the table
        await waitFor(() => {
            expect(screen.queryByText('Meeting 1')).not.toBeInTheDocument();
        });
    });

    // Add more test cases to cover other interactions and edge cases as per your component's functionality
});
