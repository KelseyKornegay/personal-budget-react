// import http from 'http';

// http.get('http://localhost:3001', res => {
//   let data = '';

//   res.on('data', chunk => {
//     data += chunk;
//   });

//   res.on('end', () => {
//     if (res.statusCode === 200) {
//       console.log('Server is running on port 3001');
//     } else {
//       console.error(`Expected 200 but received ${res.statusCode}`);
//     }
//   });
// }).on('error', err => {
//   console.error('Error: ', err);
// });



import request from 'supertest';
import app from '../server.js'; 
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './server.js';


//Unit Test//
describe('authenticateToken', () => {
  it('should call next() for a valid token', () => {
    const ACCESS_TOKEN_SECRET = 'shadowcapone328823';
    const user = { username: 'test' };
    const token = jwt.sign(user, ACCESS_TOKEN_SECRET);

    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should send a 401 status for no token', () => {
    const req = { headers: {} };
    const res = {
      sendStatus: jest.fn()
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});


//E2E Test//

describe('E2E Test', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user successfully', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'test',
        email: 'test@test.com',
        password: 'test',
        budget: [{
          title: 'Test Budget',
          value: 100,
          color: '#000000'
        }]
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', 'test');
  });
});


//Visual Regression Test//
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Visual Regression Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should display the homepage correctly', async () => {
    await page.goto('http://18.191.247.199:3001'); 
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});


