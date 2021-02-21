const auth = require("../../../middleware/auth");

describe('auth middleware', () => {
  it('should populate req.token with the payload of a valid JWT', () => {
    const config = require('config');
    const token = config.get('token');

    const req = {
      headers: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.token).toBe('qhtfs87hjnc12kkos');
  });
});