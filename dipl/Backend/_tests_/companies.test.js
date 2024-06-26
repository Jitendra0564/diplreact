const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Company = require('../src/models/companiesModel');

let authToken; // Variable to hold the JWT token

// Before all tests, connect to the database and obtain JWT token
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Simulate user login to obtain JWT token
  const loginResponse = await request(app)
    .post('/api/users/login')
    .send({
      email: 'jitendra05644@gmail.com',
      password: '1234',
    });

  authToken = loginResponse.body.token; // Save the token for authenticated requests
});

// After all tests, close the database connection
afterAll(async () => {
  await mongoose.connection.close();
});

// Test cases for company endpoints
describe('Company API Tests', () => {
  beforeEach(async () => {
    // Prepare test data or reset database state before each test
    await Company.deleteMany({});
  });

  // Test creating a new company
  describe('POST /api/companies', () => {
    it('should create a new company', async () => {
      const newCompany = {
        name: 'Test Company',
        owner: 'Test Owner',
        details: {
          address: {
            street: '123 Test St',
            city: 'Test City',
            state: 'TS',
            zip: '12345',
            country: 'Test Country'
          },
          contact: {
            phone: '1234567890',
            email: 'test@example.com',
            website: 'http://www.test.com'
          },
          employees: [
            {
              name: 'Employee One',
              position: 'Developer',
              email: 'employee1@example.com',
              phone: '9876543210'
            }
          ],
          departments: [],
          products: [],
          financials: {
            fiscal_year: 2023,
            revenue: 1000000,
            expenses: 800000,
            net_income: 200000
          }
        }
      };

      const res = await request(app)
        .post('/api/companies')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newCompany);

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toEqual(newCompany.name);
      // Add more assertions as needed
    });
  });

  // Test getting a company by ID
  describe('GET /api/companies/:id', () => {
    it('should get a company by ID', async () => {
      const company = new Company({
        name: 'Test Company',
        owner: 'Test Owner',
        details: {
          address: {
            street: '123 Test St',
            city: 'Test City',
            state: 'TS',
            zip: '12345',
            country: 'Test Country'
          },
          contact: {
            phone: '1234567890',
            email: 'test@example.com',
            website: 'http://www.test.com'
          },
          employees: [],
          departments: [],
          products: [],
          financials: {
            fiscal_year: 2023,
            revenue: 1000000,
            expenses: 800000,
            net_income: 200000
          }
        }
      });
      await company.save();

      const res = await request(app)
        .get(`/api/companies/${company._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body._id).toEqual(company._id.toString());
      // Add more assertions as needed
    });

    
  });

  // Add tests for PUT, DELETE, and other routes as needed
});
