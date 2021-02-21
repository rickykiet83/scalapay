const header = require('./../../../middleware/header');
const config = require('config');

describe('header middleware', () => {
  it('should return headers with Accept is application/json', () => {
    const token = config.get('token');
    const req = {
      token
    };
    const res = {};
    const next = jest.fn();

    header(req, res, next);
    expect(req.headers.headers.Accept).toBe('application/json');
  });
  it('should return headers with a valid Authorization included Bearer and token', () => {
    const token = config.get('token');
    const req = {
      token
    };
    const res = {};
    const next = jest.fn();

    header(req, res, next);
    expect(req.headers.headers.Authorization).toContain('Bearer');
    expect(req.headers.headers.Authorization).toContain(token);
  });

  it('should return headers with valid object headers', () => {
    const token = config.get('token');
    const req = {
      token
    };
    const res = {};
    const next = jest.fn();

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    header(req, res, next);
    expect(req.headers.headers).toMatchObject(headers);
  });
});