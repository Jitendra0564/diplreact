import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  prettyDOM,
} from "@testing-library/react";
import axios from "axios";
import TaskList from "../../src/components/Tasks/TaskTable";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

describe("TaskList Component", () => {
  beforeAll(() => {
    // Mock global alert function
    jest.spyOn(global, "alert").mockImplementation(() => {});
  });

  afterAll(() => {
    // Clean up and restore the original alert function
    jest.clearAllMocks();
  });
  const mockTasks = [
    {
      _id: "1",
      serialNumber: 1,
      title: "Task 1",
      description: "Description for Task 1",
      createdBy: "User A",
      assignedTo: "User B",
      assignDate: "2023-01-01",
      DueDate: "2023-01-10",
      status: "Pending",
      eventDate: "2023-01-05",
    },
  ];

  const mockUsers = [
    { _id: "userA", name: "User A" },
    { _id: "userB", name: "User B" },
  ];

  const mockStatusOptions = ["Pending", "In Progress", "Completed"];

  beforeEach(() => {
    console.log("--------->");
    axios.get.mockImplementation((url) => {
      if (url === "http://localhost:5000/api/tasks") {
        return Promise.resolve({ data: mockTasks });
      }
      if (url === "http://localhost:5000/api/users") {
        return Promise.resolve({ data: mockUsers });
      }
      return Promise.resolve({ data: [] });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the task list table", async () => {
    render(<TaskList />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2); // tasks and users options
    });

    const taskTable = screen.getByTestId("task-list");
    expect(taskTable).toBeInTheDocument();
  });

  test("renders the assign task button and opens the form on click", async () => {
    render(
      <BrowserRouter>
        <TaskList />
      </BrowserRouter>
    );

    // Wait for the component to finish rendering and for any async operations to settle
    await waitFor(() => {
      const assignTaskButton = screen.getByTestId("add-task-button");
      expect(assignTaskButton).toBeInTheDocument();

      fireEvent.click(assignTaskButton);

      const dialogTitle = screen.getByText("Add Task");
      expect(dialogTitle).toBeInTheDocument();
    });
  });

  test("opens the task details dialog on clicking view task details", async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // Mocking API call to return an empty array for tasks

    const { container } = render(
      <BrowserRouter>
        <TaskList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2); // tasks and users options
    });

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>.", prettyDOM(container));

    // Find the MdMoreVert button
    const moreOptionsButton = screen.getByTestId("more-options");
  
    // Click the MdMoreVert button to open the menu
    fireEvent.click(moreOptionsButton);

    expect(screen.getByText).toBeInTheDocument('View Task');

    // Find the "View Task" menu item
    const viewTaskButton = screen.getByTestId("View-task-button");
    expect(viewTaskButton).toBeInTheDocument();

    // Click the "View Task" menu item
    fireEvent.click(viewTaskButton);

    // Assert that the dialog is opened with the expected title
    const dialogTitle = await screen.findByText(/View Task/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  // it('opens the update task dialog on clicking edit task', async () => {
  //     render(<TaskList />);

  //     await waitFor(() => {
  //         expect(axios.get).toHaveBeenCalledTimes(2);
  //     });

  //     const editButtons = screen.getAllByLabelText('Edit Task');
  //     fireEvent.click(editButtons[0]);

  //     await waitFor(() => {
  //         const dialogTitle = screen.getByText('Update Task');
  //         expect(dialogTitle).toBeInTheDocument();
  //     });
  // });

  // it('opens the delete confirmation dialog on clicking delete task', async () => {
  //     render(<TaskList />);

  //     await waitFor(() => {
  //         expect(axios.get).toHaveBeenCalledTimes(2);
  //     });

  //     const deleteButtons = screen.getAllByLabelText('Delete Task');
  //     fireEvent.click(deleteButtons[0]);

  //     await waitFor(() => {
  //         const dialogTitle = screen.getByText('Delete Task');
  //         expect(dialogTitle).toBeInTheDocument();
  //     });
  // });

  // it('opens the schedule task dialog on clicking schedule task', async () => {
  //     render(<TaskList />);

  //     await waitFor(() => {
  //         expect(axios.get).toHaveBeenCalledTimes(2);
  //     });

  //     const scheduleButtons = screen.getAllByLabelText('Schedule Task');
  //     fireEvent.click(scheduleButtons[0]);

  //     await waitFor(() => {
  //         const dialogTitle = screen.getByText('Schedule Task');
  //         expect(dialogTitle).toBeInTheDocument();
  //     });
  // });

  // it('opens the reschedule task dialog on clicking reschedule task', async () => {
  //     render(<TaskList />);

  //     await waitFor(() => {
  //         expect(axios.get).toHaveBeenCalledTimes(2);
  //     });

  //     const rescheduleButtons = screen.getAllByLabelText('Reschedule Task');
  //     fireEvent.click(rescheduleButtons[0]);

  //     await waitFor(() => {
  //         const dialogTitle = screen.getByText('Reschedule Task');
  //         expect(dialogTitle).toBeInTheDocument();
  //     });
  // });

  // it('opens the task history dialog on clicking view task history', async () => {
  //     render(<TaskList />);

  //     await waitFor(() => {
  //         expect(axios.get).toHaveBeenCalledTimes(2);
  //     });

  //     const historyButtons = screen.getAllByLabelText('View Task History');
  //     fireEvent.click(historyButtons[0]);

  //     await waitFor(() => {
  //         const dialogTitle = screen.getByText('Task History');
  //         expect(dialogTitle).toBeInTheDocument();
  //     });
  // });

  // it('handles API errors gracefully', async () => {
  //     axios.get.mockRejectedValueOnce(new Error('error'));

  //     render(<TaskList />);
  //     await waitFor(() => {
  //       expect(global.alert).toHaveBeenCalledWith('Error fetching tasks:');
  //     });
  // });
});
