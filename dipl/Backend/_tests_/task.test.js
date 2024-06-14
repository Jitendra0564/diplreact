const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Task = require('../src/models/TaskModels');
const User = require('../src/models/UsersModels');
const bcrypt = require('bcryptjs');

let adminToken, userToken, userId, taskId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create an admin user and log in to get token
  const adminLogin = await request(app)
    .post('/api/users/login')
    .send({
      email: 'jitendra05644@gmail.com',
      password: '1234',
    });
  adminToken = adminLogin.body.token;

  // Create a regular user and log in to get token
  const userLogin = await request(app)
    .post('/api/users/login')
    .send({
      email: 'newuser@example.com',
      password: 'newpassword',
    });
  userToken = userLogin.body.token;

  // Get the user ID
  const user = await User.findOne({ email: 'newuser@example.com' });
  userId = user._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Endpoints', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'New Task',
        description: 'Task description',
        assignedTo: userId,
        status: 'Pending',
        assignDate: '2024-06-14',
        DueDate: '2024-07-14',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    taskId = res.body._id; // Save the task ID for further tests
  });

  it('should get all tasks (admin)', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get all tasks assigned to the user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].assignedTo).toHaveProperty('_id', userId.toString());
  });

  it('should get a particular task by ID', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', taskId.toString());
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Updated Task Title',
        description: 'Updated task description',
        status: 'In Progress',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Task Title');
  });

  it('should schedule a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}/schedule`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        scheduledDate: new Date().toISOString(),
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.history).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            eventType: 'Scheduled',
          }),
        ])
      );
  });

  it('should reschedule a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}/reschedule`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        rescheduledDate: new Date().toISOString(),
        remarks: 'Rescheduled due to XYZ reasons',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.history).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            eventType: 'Rescheduled',
          }),
        ])
      );
  });

  it('should get task history', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}/history`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'Task Successfully deleted');

    // Verify that the task is actually deleted from the database
    const deletedTask = await Task.findById(taskId);
    expect(deletedTask).toBeNull();
  });
});
