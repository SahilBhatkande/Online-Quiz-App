const request = require('supertest');
const app = require('../server');

describe('POST /submit', () => {
  it('should calculate score correctly for all correct answers', async () => {
    const answers = [0, 1, 1]; // All correct
    const res = await request(app).post('/submit').send({ answers });
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(3);
    expect(res.body.total).toBe(3);
    expect(res.body.results).toHaveLength(3);
    expect(res.body.results.every(r => r.correct)).toBe(true);
  });

  it('should calculate score correctly for mixed answers', async () => {
    const answers = [0, 0, 1]; // First two wrong, last correct
    const res = await request(app).post('/submit').send({ answers });
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(1);
    expect(res.body.total).toBe(3);
    expect(res.body.results[0].correct).toBe(true);
    expect(res.body.results[1].correct).toBe(false);
    expect(res.body.results[2].correct).toBe(true);
  });

  it('should handle invalid input', async () => {
    const res = await request(app).post('/submit').send({});
    expect(res.status).toBe(400);
  });
});