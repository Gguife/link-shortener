import { generateBaseUrl, generateShortUrl, generateHash } from "../service/url/UrlGenerator";
import { isValidUrl } from "../service/url/UrlValidator";
import crypto from "crypto";

jest.mock('crypto', () => ({
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue('mocked_hash_base64_string+and/more')
  }))
}));

jest.mock('../service/url/UrlValidator', () => ({
  isValidUrl: jest.fn()
}));

describe('UrlGenerator test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const cases = [
    ['http://example.com', 'http://ggf/'],
    ['https://example.com', 'https://ggf/'],
  ];

  test.each(cases)("generates base URL for %s as %s", (inputUrl, expectedBaseUrl) => {
    jest.spyOn(require('../service/url/UrlGenerator'), 'generateBaseUrl').mockReturnValue(expectedBaseUrl);
    expect(generateBaseUrl(inputUrl)).toBe(expectedBaseUrl);
  });

  test('should throw an error if the URL is invalid', () => {
    const invalidUrl = 'url-invalida.com';
    isValidUrl.mockReturnValue(false);
    expect(() => generateShortUrl(invalidUrl)).toThrow();
  });

  test('should generate a correct hash for a given URL', () => {
    const url = 'https://example.com';
    const expectedHash = 'mocked_h'; 
    
    const result = generateHash(url);
    
    expect(result).toBe(expectedHash);
    
    expect(crypto.createHash).toHaveBeenCalledWith('sha256');
  });
});
