const request = require('supertest');

// Mock connectDB so that it doesn't try to boot up Real Mongo Atlas during tests
jest.mock('../config/db', () => jest.fn());

const app = require('../server');

describe('Feedback API Endpoints', () => {
  it('should return 401 Unauthorized for POST /feedback without a token', async () => {
    const res = await request(app)
      .post('/feedback')
      .send({
        courseId: 'test1',
        rating: 5,
        reviewText: 'Great course!'
      });
      
    // Auth middleware should block it
    expect(res.statusCode).toBe(401);
  });

  // Depending on how GET /feedback is configured (protected vs public), 
  // you might write further tests here.
  it('should have a GET /feedback/all available (if implemented)', async () => {
    // If getting all feedbacks is allowed publicly, or at least exists
    const res = await request(app).get('/feedback');
    // Assuming it's protected or returns an array, at least verify the endpoint exists
    expect([200, 401]).toContain(res.statusCode); 
  });
});
