const request = require('supertest');
const app = require('../app');

describe('GET /items', () => {
  it('should return a list of items with status 200', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});

const request = require('supertest');
const app = require('../app');

describe('GET /items', () => {
  it('should return a list of items with status 200', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});

describe('POST /signup', () => {
  it('should create a new user and return 201', async () => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };
    const res = await request(app).post('/signup').send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', newUser.username);
  });

  it('should return 400 if the email is already in use', async () => {
    const existingUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };
    await request(app).post('/signup').send(existingUser);
    const res = await request(app).post('/signup').send(existingUser);
    expect(res.statusCode).toEqual(400);
  });
});

describe('POST /login', () => {
  it('should authenticate user and return 200 with a token', async () => {
    const userCredentials = {
      email: 'testuser@example.com',
      password: 'password123',
    };
    const res = await request(app).post('/login').send(userCredentials);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const invalidCredentials = {
      email: 'wrongemail@example.com',
      password: 'wrongpassword',
    };
    const res = await request(app).post('/login').send(invalidCredentials);
    expect(res.statusCode).toEqual(401);
  });
});

describe('POST /items/:id/reviews', () => {
  it('should allow a logged-in user to submit a review', async () => {
    const review = {
      rating: 5,
      review_text: 'Great product!',
    };
    const itemId = 'some-valid-item-id';
    const token = 'valid-jwt-token';

    const res = await request(app)
      .post(`/items/${itemId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('rating', review.rating);
  });

  it('should return 401 if the user is not authenticated', async () => {
    const review = {
      rating: 5,
      review_text: 'Great product!',
    };
    const itemId = 'some-valid-item-id';

    const res = await request(app)
      .post(`/items/${itemId}/reviews`)
      .send(review);

    expect(res.statusCode).toEqual(401);
  });

  it('should return 400 if the review already exists for the user and item', async () => {
    const review = {
      rating: 5,
      review_text: 'Great product!',
    };
    const itemId = 'some-valid-item-id';
    const token = 'valid-jwt-token';

    // First review
    await request(app)
      .post(`/items/${itemId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    // Second review
    const res = await request(app)
      .post(`/items/${itemId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(res.statusCode).toEqual(400);
  });
});
