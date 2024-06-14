const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const User = require('../src/models/UsersModels');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
  });

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Endpoints', () => {
  let token;
  let userId;
  let Admintoken;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'test',
        dob: '1990-01-01',
        fatherName: 'Test Father',
        motherName: 'Test Mother',
        contactNo: '1234567890',
        AlternativeNo: '0987654321',
        fatherNo: '1234567890',
        Address: 'Test Address',
        BankName: 'Test Bank',
        BankAccNo: '12345678',
        Ifsc: 'TEST0001',
        Department: 'Test Department',
        Position: 'Test Position',
        Role: 'Test Role',
        joiningdate: '2020-01-01',
        Education: JSON.stringify([{ degree: 'Test Degree', field_of_study: 'Test Field', institution: 'Test Institution', start_date: '2000-01-01', end_date: '2004-01-01' }]),
        workHistory: JSON.stringify([{ company: 'Test Company', job_title: 'Test Job', start_date: '2005-01-01', end_date: '2010-01-01' }]),
        Language: 'Test Language',
        Status: 'Active',
        AadharCardNo: '123412341234',
        PanCardNo: 'ABCDE1234F',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'test',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Save token for authenticated routes
  });

  it('should login a Admin', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'jitendra05644@gmail.com',
        password: '1234',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    Admintoken = res.body.token; // Save admin token for authenticated routes 
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a user by id', async () => {
    const existingUser = await User.findOne({ email: 'testuser@example.com' });
    userId = existingUser._id;

    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(userId.toString()); // Ensure correct user ID is returned
    expect(res.body.name).toEqual('Test User');

    //await User.findByIdAndDelete(userId);
    //userId = undefined;
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'New User',
        email: 'newuser@example.com',
        dob: '1990-01-01',
        password: 'newpassword',
        fatherName: 'New Father',
        motherName: 'New Mother',
        contactNo: '1234567890',
        AlternativeNo: '0987654321',
        fatherNo: '1234567890',
        Address: 'New Address',
        BankName: 'New Bank',
        BankAccNo: '12345678',
        Ifsc: 'NEW0001',
        Department: 'New Department',
        Position: 'New Position',
        Role: 'New Role',
        joiningdate: '2020-01-01',
        Education: JSON.stringify([{ degree: 'New Degree', field_of_study: 'New Field', institution: 'New Institution', start_date: '2000-01-01', end_date: '2004-01-01' }]),
        workHistory: JSON.stringify([{ company: 'New Company', job_title: 'New Job', start_date: '2005-01-01', end_date: '2010-01-01' }]),
        Language: 'New Language',
        Status: 'Active',
        AadharCardNo: '123412341234',
        PanCardNo: 'ABCDE1234F',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toEqual('newuser@example.com');
  });

  it('should delete a user', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${Admintoken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual('User deleted');

    // Verify that the user is actually deleted from the database
    const deletedUser = await User.findById(userId);
    expect(deletedUser).toBeNull();

    // Optionally, reset userIdToDelete after test to ensure test isolation
    userId = undefined;
  });

  // Add more tests for other endpoints.
});
