import Clicks from '../../database/models/clickModel.js';

export const registerClick = async ({ urlId, ipAddress, userAgent }) => {
  try{
    const data = await Clicks.create({
      urlId: urlId,
      ipAddress: ipAddress,
      userAgent: userAgent
    });

    return data;
  }catch(error){
    throw new Error('Erro ao registrar o click:' + error.message);
  } 
}