import React, { useEffect,useState } from 'react'
import './Forms.css'
import axios from "axios"
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js'
const Forms = () => {
    const [image,setImage]=useState(false);
    const [list,setList]=useState([]);
    const [query,setQuery]=useState('');
    const [currentState,setCurrentState]=useState("Add");
    const url='http://localhost:4000';
    
     const [data,setData]=useState({
      name:"",
      email:"",
      category:"",
      description:"",
     })
     const onChangeHandler=(event)=>{
       const name=event.target.name;
       const value=event.target.value;
       setData(data=>({...data,[name]:value}))
     }
 
    
 
 
     const onSubmitHandler = async (event)=>{
       event.preventDefault();
      
       const formData =new FormData();
       formData.append("name",data.name)
       formData.append("email",data.email)
       formData.append("category",data.category)
       formData.append("description",data.description)
       formData.append("image",image)

       if (currentState==="Add") {
        const response = await axios.post(`${url}/api/app/add`,formData);
       if(response.data.success){
         setData({
           name:"",
           email:"",
           category:"",
           description:"",
           
         })
         setImage(false)
         alert("Submitted")
        
 
       }else{
         toast.error(response.data.message)
       }

       }
       
       
       
      }
      const fetchList=async()=>{
        const response =await axios.get(`${url}/api/app/list`);
        
        if(response.data.success){
          setList(response.data.data);
    
        }else{
          toast.error("error")
        }
      }
      useEffect(()=>{
        fetchList();
    
      },[])
    
    
    
      const removeFood=async(applicationId)=>{
       const response=await axios.post(`${url}/api/app/remove`,{id:applicationId});
       await fetchList();
       if(response.data.success){
        alert("Are you sure to remove")
       }else{
        toast.error("error")
       }
    
      }
      


    
  return (
    <div>
        <form action='' onSubmit={onSubmitHandler} className='add_product'>
        <div className="productfild">
            
       {currentState==="Add"? <div>
        <h2>FORM</h2>
        <div class=" input_box">
            
             <input   type="text" onChange={onChangeHandler} value={data.name}  name='name' required/>
             <label > Name</label>
        </div>
        
        <div class=" input_box">
            
             <input   type="email" onChange={onChangeHandler} value={data.email}  name='email' required/>
             <label >Email</label>
        </div>
        <div class=" input_box">
            
             <input   type="text" onChange={onChangeHandler} value={data.category}  name='category' required/>
             <label > Category</label>
        </div>
        
        <div class=" input_box">
            
             <input   type="text"  onChange={onChangeHandler} value={data.description} name='description' required/>
             <label > Description</label>
        </div>
        

        <div className="addproduct_itemfield">
        <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.photo} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div>

        </div>
        </div>:<></>}
        {currentState==="Modify"? <div>
        <h2> MODIFY FORM </h2>
        <div class=" input_box">
            
             <input   type="text" onChange={onChangeHandler} value={data.name}  name='name' required/>
             <label > Name</label>
        </div>
        
        <div class=" input_box">
            
             <input   type="email"onChange={onChangeHandler} value={data.email}   name='email' required/>
             <label >Email</label>
        </div>
        <div class=" input_box">
            
             <input   type="text"  onChange={onChangeHandler} value={data.category} name='category' required/>
             <label > Category</label>
        </div>
        
        <div class=" input_box">
            
             <input   type="text" onChange={onChangeHandler} value={data.description}  name='description' required/>
             <label > Description</label>
        </div>
        <div class=" input_box">
            
             <input   type="text" onChange={onChangeHandler} value={data.id}  name='id' required/>
             <label > Id</label>
        </div>
        

        
        <div>

        </div>
        </div>:<></>}
        {currentState==="Delete"? <div>
        
            <div >
      <div className="list add flex-col">
        <div className="heading">
        <h1>Delete Form</h1>
        <input type="text"  className="search" placeholder='Search here'onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
        </div>
        
        {list.filter((item)=>item.name.toLowerCase().includes(query)).map((item,index)=>{
          return(
            <div className="forms" key={index} >
              <div className="side-left">
              <img src={`${url}/images/`+item.image} alt="" />
              <p> {item.name} </p>
              
              </div>
              <div className="side-right">
               
                <p className='detail'>application Details</p>
                <hr/>
              <p><b>application Id :</b>{item._id} </p>
              <hr/>
              
              <p className='detail'>Contact Details</p>
               <hr/>
              <p>{item.email} </p>
              
              <hr/>
              <p className='detail'>Category</p>
               <hr/>
              <p>{item.category} </p>
              
              <hr/>
              <p className='detail'>Description</p>
               <hr/>
              <p>{item.description} </p>
              
              <hr/>
              
              
              
              
              <p className='cursor remove'onClick={()=>removeFood(item._id)}>Remove</p>
              

              </div>
              
              
              
           </div>
           
           
          )
            
           
          

        })}


    </div>
      
    </div>
        </div>:<></>}


        {currentState==="Add"?<p className='option'>If you want to Modify <span onClick={()=>setCurrentState("Modify")} >Click Here</span> or Delete <span onClick={()=>setCurrentState("Delete")}>Click Here</span></p>:<></>}
       {currentState==="Modify"? <p className='option'>If you want to Add <span onClick={()=>setCurrentState("Add")} >Click Here</span> or Delete <span onClick={()=>setCurrentState("Delete")}>Click Here</span></p>:<></>}
       {currentState==="Delete"?<p className='option'>If you want to Modify <span onClick={()=>setCurrentState("Modify")} >Click Here</span> or Add <span onClick={()=>setCurrentState("Add")}>Click Here</span></p>:<></>}
        {currentState==="Delete"?<></>:<button className="add_btn" >Submit</button>}
        
        </div>
        
    </form>
      
      
    </div>
  )
}

export default Forms
