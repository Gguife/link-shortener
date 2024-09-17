import crypto from "crypto";
import { isValidUrl } from "./UrlValidator.js";

export const generateBaseUrl = (url) => {
  const urlParts = url.split(':');
  return `${urlParts[0]}://ggf/`;
}

export const generateShortUrl = (url) => {
  if(!isValidUrl(url)){
    throw new Error('Invalid URL for hash generation');
  }

  const baseUrl = generateBaseUrl(url);

  const hash = crypto.createHash('sha256').update(url).digest('base64');
  const shortenedHash = hash.replace(/\+/g,'-').replace(/\//g, '_').substring(0, 8);

  return `${baseUrl}${shortenedHash}`;
}