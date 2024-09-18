import crypto from "crypto";
import { isValidUrl } from "./UrlValidator.js";

export const generateBaseUrl = (url) => {
  const urlParts = url.split(':');
  return `${urlParts[0]}://ggf/`;
}

export const generateHash = (url) => {
  const hash = crypto.createHash('sha256').update(url).digest('base64');
  return hash.replace(/\+/g,'-').replace(/\//g, '_').substring(0, 8);
}