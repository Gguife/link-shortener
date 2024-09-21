import express from "express";
import Url from '../database/models/urlModel.js';
import { generateBaseUrl, generateHash } from "../service/url/UrlGenerator.js";
import { isValidUrl } from "../service/url/UrlValidator.js";

const router = express.Router();


router.post('/shorten', async (req, res) => {
  const original_url = req.body.original_url;

  if(!original_url) return res.status(400).json({message: "link não fornecido"});

  if(!isValidUrl(original_url)) return res.status(400).json({error: "Link inválido"});
  
  const hash = generateHash(original_url);

  try{
    await Url.create({
      originalUrl: original_url,
      hash: hash
    })

    const base_url = generateBaseUrl(original_url);
    const short_url = `${base_url}${hash}`;

    res.status(201).json({ short_url: short_url });
  }catch(error){
    res.status(500).send(error.message);
  }
})



router.get('/:hash', async (req, res) => {
  const { hash } = req.params;

  try{
    const original_url = await Url.findOne({ where: { hash: hash }});
    
    if(!original_url){
      return res.status(404).json({error: "Url orginal não encontrada!"})
    }

    res.redirect(original_url.originalUrl);
  }catch(error){
    res.status(500).send(error.message);
  }
});

export default router;