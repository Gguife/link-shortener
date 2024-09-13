import {isValidUrl, validProtocolAndHostname} from "../service/url/UrlValidator.js";

describe('Urlvalidator test', () => {
  
  const cases = [
    [{ protocol: 'http:', hostname: 'example.com' }, true],
    [{ protocol: 'https:', hostname: 'sub.example.com' }, true],
    [{ protocol: 'ftp:', hostname: 'example.com' }, false],
    [{ protocol: 'http:', hostname: 'localhost' }, false],
    [{ protocol: 'http:', hostname: '' }, false],
    [{ protocol: '', hostname: 'example.com' }, false],
    [{ protocol: 'http:', hostname: 'example..com' }, false],
  ];
  test.each(cases)("returns %s for URL with protocol %s and hostname %s", (parsedUrl, expected) => {
    expect(validProtocolAndHostname(parsedUrl)).toBe(expected);
  });
  
  test('should return true for a valid URL', () => {
    const validUrls = [
      'http://example.com',
      'https://www.example.com',
      'http://example.com/path?query=1',
      'http://example.com/#fragment'
    ];

    validUrls.forEach(url => {
      expect(isValidUrl(url)).toBe(true);
    })
  });

  test('should return false for an invalid URL', () => {
    const invalidUrls = [
      'htp://example.com', 
      'http://example',   
      'http://example.c',   
      'http://mple.',   
      'http://',           
      '',                 
      ' '                  
    ];

    invalidUrls.forEach(url => {
      expect(isValidUrl(url)).toBe(false);
    });
  });
});