//backend code
const mongoose =require("mongoose")
const express=require("express")
const multer=require("multer")
const fs =require("fs")
const cors=require("cors")

const app=express();
const port=  4000;
app.use(express.json());
app.use(cors());



//backend interface
app.get("/",(req,res)=>{
    res.send("ApI Working")

})

//connection with dtabase
const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://ritikmahakalkar:9763767457@cluster0.knfsppp.mongodb.net/tak').then(()=>console.log("DATABASE Connected"));
        
    } catch (error) {
        console.error("Database connection failed");
        console.log(error);
        process.exit(0);

        
    }
};
//starting server
const start = async ()=>{
    try {
        app.listen(port,()=>{
            console.log( `server running on http://localhost:${port}`)
        })
        
    } catch (error) {
        console.log(error);
    }
   
};




//backend model

const appSchema =new mongoose.Schema({
    name:{type:String,
        required:true},

    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

})

const appModel = mongoose.models.apps || mongoose.model("apps",appSchema);


//controller

//controller - add item
const addItem = async(req,res)=>{
    let image_filename = `${req.file.filename }`;

    const dataitem=new appModel({
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        email:req.body.email,
        image:image_filename
    })
    try{
        await dataitem.save();
        res.json({success:true,message:"Item Added"})
        console.log(dataitem)
        

    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})

    }

}

// controller - all list 
const listItem= async (req,res)=>{
try {
    const dataitems =await appModel.find({});
    res.json({success:true,data:dataitems})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
}
}
//controller - update item
const updateItem= async (req,res)=>{
    
    
    
    
    try {
        
        await appModel.findByIdAndUpdate(req.body.id, {
        
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            email:req.body.email,

        
       }
       )
               
        
        res.json({success:true,message:"Updated"})
        
                        
           
        
    
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

    
}

//controller - remove  item

const removeItem =async (req,res) =>{
    try {
        const dataitem=await appModel.findById(req.body.id);
        fs.unlink(`uploads/${dataitem.image}`,()=>{})

        await appModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:" item removed"})
        console.log(dataitem)
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}


//router
const appRouter =express.Router();

//image storage
const storage= multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload =multer({storage:storage})

appRouter.post("/add",upload.single("image"),addItem)
appRouter.get("/list",listItem)
appRouter.post("/remove",removeItem);
appRouter.post("/update",updateItem)



//api endpoint
app.use("/api/app",appRouter)
app.use("/images",express.static('uploads'))




//executing command
start();
connectDB();

