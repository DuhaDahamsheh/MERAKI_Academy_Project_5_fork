import React ,{useEffect ,useState} from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import axios from 'axios'

import { NavLink } from 'react-router-dom'
import { MDBSpinner } from "mdb-react-ui-kit";

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBIcon,
    MDBRow,
  MDBTableHead,
  MDBTable
  } from "mdb-react-ui-kit";


 
  

const OldOrder = () => {
const [count ,setCount]=useState(1)
const [previous ,setPrevious]=useState([])
const [today,setToday]=useState("")
const { token } = useSelector((state) => {
        return {
          token: state.auth.token,
        };
      });
     
    useEffect(()=>{
axios.get(`http://localhost:5000/orders/done/?pageNumber=${count}`,{ headers: {
    Authorization: `Bearer ${token}`,
  }}).then((result)=>{
    console.log(result.data);
    setPrevious(result.data.result)
    setToday(result.data.result[0].date.toString().split('T')[0])
  }).catch((err)=>{
    console.log(err);
  })
    },[count])
    if(previous.length ===0){
        return (
          <MDBSpinner color="danger">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        )
      }
  return (
    <div>
         <div > 
    <section className="vh-75" style={{ backgroundColor: "#eee" }}>
   
     <MDBRow className="justify-content-center align-items-center h-75 w-100" >
       <MDBCol>
         <p>
           <span className="h2">Orders</span>
         </p>
         <MDBTable>
         <MDBTableHead>
        <tr>
          <th scope='col' ><NavLink to="/previousOrder">previous order</NavLink></th>
          <th scope='col' > <NavLink to="/orders">current order</NavLink>
          
          </th>
        
        </tr>
      </MDBTableHead>
      </MDBTable>
{previous&&previous.map((item ,i)=>{
  return(<div key={i+1}  style={{ backgroundColor: "#eee" }}>

 
         <MDBCard className="mb-4" >
           <MDBCardBody className="p-4">
             <MDBRow className="align-items-center" >
               
               <MDBCol md="2" className="d-flex justify-content-center" >
                 <div>
                   <p className="small text-muted mb-4 pb-2">Name of provider</p>
                   <p className="lead fw-normal mb-0">{item.fname} {item.lname}</p>
                 </div>
               </MDBCol>
               <MDBCol md="1" className="d-flex justify-content-center">
                 <div>
                   <p className="small text-muted mb-4 pb-2">Service</p>
                   <p className="lead fw-normal mb-0">
                     <MDBIcon
                       fas
                       icon="circle me-2"
                       style={{ color: "#eee" }}
                     />
                     {item.service}
                   </p>
                 </div>
               </MDBCol>
               <MDBCol md="2" className="d-flex justify-content-center">
                 <div>
                   <p className="small text-muted mb-4 pb-2">Time</p>
                   <p className="lead fw-normal mb-0">{item.time_from}-{item.time_to}</p>
                 </div>
               </MDBCol>
               <MDBCol md="2" className="d-flex justify-content-center">
                 <div>
                   <p className="small text-muted mb-4 pb-2">Date</p>
                   <p className="lead fw-normal mb-0">{today}</p>
                 </div>
               </MDBCol> 
               
               <MDBCol md="2" className="d-flex justify-content-center">
                 <div>
                   <p className="small text-muted mb-4 pb-2">Phone Number</p>
                   <p className="lead fw-normal mb-0">{item.phonenumber}</p>
                 </div>
               </MDBCol>
               <MDBCol md="2" className="d-flex justify-content-center">
                 <div>
                   <p className="small text-muted mb-4 pb-2">price_per_hour</p>
                   <p className="lead fw-normal mb-0">{item.price_per_hour}JD</p>
                 </div>
               </MDBCol></MDBRow>
            
             
           
         
            </MDBCardBody>
          </MDBCard>
 </div>)
 })}
  <div>
  
   <MDBBtn outline onClick={()=>{
    setCount(count-1)
   }}>Previous</MDBBtn>
    <MDBBtn outline onClick={()=>{
    setCount(1)
   }}>1</MDBBtn> 
   <MDBBtn outline onClick={()=>{
    setCount(2)
   }}>2</MDBBtn> 
   <MDBBtn outline onClick={()=>{
    setCount(3)
   }}>3</MDBBtn> 
   <MDBBtn outline onClick={()=>{
    setCount(4)
   }}>4</MDBBtn> 
   <MDBBtn outline onClick={()=>{
    setCount(5)
   }}>5</MDBBtn> 
     <MDBBtn outline onClick={()=>{
    setCount(count+1)
   }}>Next</MDBBtn>
    <br />


  </div>
        
        </MDBCol>
      </MDBRow>
 
  </section></div>
    </div>
  )
}

export default OldOrder