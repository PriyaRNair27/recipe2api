const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
    var recipmodel=Mongoose.model("recips",
    new Mongoose.Schema({
        image:String,
        recipetitle:String,
        category:String,
        description:String,
        preparedby:String
    }))
    Mongoose.connect("mongodb+srv://mzcbook:807826@cluster0.2sbk9.mongodb.net/recipeDb")
    app.post("/api/recipdelete",(req,res)=>{
        var getId=req.body
        recipmodel.findByIdAndRemove(getId,(error,data)=>{
            if(error)
        {
            res.send({"status":"error","data":error})
        }
        else{
            res.send({"status":"success","data":data})
        }
        })
    })
app.post("/api/recipsearch",(req,res)=>{
    var getrecipetitle=req.body
    recipmodel.find(getrecipetitle,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else{
            res.send({"status":"success","data":data})
        }
    })
})

app.post("/api/recipeviewall",(req,res)=>{
    var data=req.body
    let recip=new recipmodel(data)
    recip.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
})
app.get("/api/recview",(req,res)=>{
    recipmodel.find(
        (error,data)=>{
            if(error)
     {
         res.send({"status":"error","data":error})
     }
     else
     {
         res.send({"status":"success","data":data})
     }

            
        }
    )
   
})
app.listen(4000,()=>{
    console.log("server running")
})
