import { generateBaseUrl, generateShortUrl } from "../service/url/UrlGenerator";
import crypto from "crypto";
import { isValidUrl } from "../service/url/UrlValidator";

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
    expect(generateBaseUrl(inputUrl)).toBe(expectedBaseUrl);
  });

  test('should throw an error if the URL is invalid', () => {
    const invalidUrl = 'url-invalida.com';
    isValidUrl.mockReturnValue(false);
    expect(() => generateShortUrl(invalidUrl)).toThrow();
  });

  test('should generate a short URL for a valid input', () => {
    const validUrl = 'https://example.com';
    const mockBaseUrl = 'https://ggf/';
    
    isValidUrl.mockReturnValue(true);
    const mockGenerateBaseUrl = jest.fn().mockReturnValue(mockBaseUrl);
    jest.spyOn(require('../service/url/UrlGenerator'), 'generateBaseUrl').mockImplementation(mockGenerateBaseUrl);

    const expectedShortUrl = `${mockBaseUrl}mocked_h`;

    const result = generateShortUrl(validUrl);
    expect(result).toBe(expectedShortUrl);

    expect(isValidUrl).toHaveBeenCalledWith(validUrl);
  });

});