export const  validProtocolAndHostname = (parsedUrl) => {
  const validProtocols = ['http:', 'https:'];

  const isValidProtocol = validProtocols.includes(parsedUrl.protocol);
  
  const hostnameParts = parsedUrl.hostname.split('.');
  const isValidHostname = hostnameParts.length > 1  && hostnameParts.every(part => part.length > 0) && hostnameParts[hostnameParts.length - 1].length > 1;

  return isValidProtocol && isValidHostname;
}

export const isValidUrl = (url) => {
  try{
    const parsedUrl = new URL(url);
    const isValid = validProtocolAndHostname(parsedUrl);

    return isValid;
  }catch(error){
    console.log(error);
    return false;
  }
}