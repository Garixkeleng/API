import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const API_URL = "https://api.genderize.io?";

app.get("/", (req, res)=>{
    res.render("index.ejs",{content:"Enter the name"});
})

app.post("/get-sec", async(req,res)=>{
    const name = req.body.name;
    
    try{
       const result = await axios.get(API_URL+ "name="+ name);
       console.log(result);
    //    const result1 = 
       res.render("index.ejs",{content:result.data })
    } catch(error){
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})

app.listen(port,(req,res)=>{
    console.log(`Server listening on ${port}`);
})