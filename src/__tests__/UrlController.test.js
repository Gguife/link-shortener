import request from 'supertest';
import express from 'express';
import Url from '../database/models/urlModel.js';
import userController from '../controller/url.js';
import { generateBaseUrl, generateHash } from '../service/url/UrlGenerator';
import { isValidUrl } from '../service/url/UrlValidator';

jest.mock('../database/models/urlModel.js');
jest.mock('../service/url/UrlGenerator.js');
jest.mock('../service/url/UrlValidator.js');

const app = express();
app.use(express.json());
app.use('/', userController);

describe('POST /shorten', () => {
  test('should return 400 if no URL is provided', async () => {
    const response = await request(app).post('/shorten').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({message: "link não fornecido"});
  });

  test('should return 400 if URL is invalid', async () => {
    isValidUrl.mockReturnValue(false);
    const response = await request(app).post('/shorten').send({ original_url: 'invalid-url' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Link inválido" });
  });

  test('should return 201 and shortened url', async () => {
    const original_url = 'http://example.com';
    const hash = 'abc123';
    const short_url = `http://ggf/${hash}`;

    isValidUrl.mockReturnValue(true);
    generateHash.mockReturnValue(hash);
    generateBaseUrl.mockReturnValue('http://ggf/');

    Url.create.mockResolvedValue({
      originalUrl: original_url,
      hash: hash
    })

    const response = await request(app).post('/shorten').send({ original_url });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ short_url });
  });

  test('should return 500 in case database error', async () => {
    const original_url = 'http://example.com';
    const hash = 'abc123';

    isValidUrl.mockReturnValue(true);
    generateHash.mockReturnValue(hash);
    generateBaseUrl.mockReturnValue('http://ggf/');


    Url.create.mockRejectedValue(new Error('Erro no banco de dados'));

    const response = await request(app).post('/shorten').send({ original_url });
    expect(response.status).toBe(500);
  });
})

describe('GET /:hash', () => {
  test('should return 404 if hash does not exist', async () => {
    Url.findOne.mockResolvedValue(null);

    const response = await request(app).get('/abc1234');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'Url original não encontrada!'})
  });

  test('should redirect to original URL if hash exist', async () => {
    const original_url = 'http://example.com';

    Url.findOne.mockResolvedValue({ originalUrl: original_url });

    const response = await request(app).get('/abc1234');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(original_url);
  });

  test('sould return 500 in case database error', async () => {
    Url.findOne.mockRejectedValue(new Error('Erro no banco de dados'));

    const response = await request(app).get('/abc1234')
    expect(response.status).toBe(500);
  });
})