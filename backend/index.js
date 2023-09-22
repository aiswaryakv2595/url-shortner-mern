import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import ShortUrl from './model/shortUrl.js'

const app = express();

app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',async(req,res) =>{
   const url = await ShortUrl.find()
   res.json({url}) 
})
app.post('/shortUrls',async (req,res) => {
  const existing = await ShortUrl.findOne({full:req.body.fullUrl})
  if(existing){
   res.json({message:"Already exist"})
  }
  else{
   const result = await ShortUrl.create({full:req.body.fullUrl})
   if (result) {
      res.json({message:"Success"})
   } else {
      res.json({message:"Something went wrong"})
   }
  }
   
})
app.get('/:shortUrl',async(req,res)=>{
   const shortUrl = await ShortUrl.findOne({short:req.params.shortUrl})
   if(shortUrl == null) res.sendStatus(404)

   shortUrl.clicks++
  await shortUrl.save()
   res.json({full:shortUrl.full})
})

mongoose.connect('mongodb://127.0.0.1:27017/urlShortner').then(()=>{
    app.listen(process.env.PORT || 5000)
    console.log('Database connected in port 5000')
}).catch((err) => console.log(err))