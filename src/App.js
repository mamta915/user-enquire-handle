import logo from './logo.svg';
import './App.css';
import { Col, Container, Form, Row, Table, } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  

  let[formdata,setformdata]=useState(
    {
      uname:'',
      uemail:'',
      uphone:'',
      umessage:'',
      index:''
    }
  )

  let [useData,setuseData]=useState([])

  let getValue=(event)=>{
    let oldData={...formdata}
    let inputName=event.target.name;
    let inputValue=event.target.value;
     oldData[inputName]=inputValue;
     setformdata(oldData);

  } 
    
    let handleSubmit=(event)=>{
           
      let currentUserFormatdata={

         uname:formdata.uname,
        uemail:formdata.uemail,
        uphone: formdata.uphone,
        umessage: formdata.umessage
      }

       if(formdata.index===""){
        setuseData([...useData,currentUserFormatdata])
    
      let checkFilterUser=useData.filter((v)=>v.uemail==formdata.uemail || v.uphone==formdata.uphone)

      if(checkFilterUser.length==1){
           toast.warning("email and phone has already exit");
      }
      else{
        
        let oldUserData=[...useData,currentUserFormatdata ]   //old arr+new arr element
      setuseData(oldUserData)
      setformdata(
        {
      uname:'',
      uemail:'',
      uphone:'',
      umessage:'',
      index:''
        }
      
        
      )
    }
  }
  else{
    let editIndex=formdata.index;
    let oldUserData=useData;

    let checkFilterUser=useData.filter((v,i)=>(v.uemail==formdata.uemail || v.uphone==formdata.uphone) && i!=editIndex)

    
    if(checkFilterUser.length==0){
    oldUserData[editIndex]['uname']=formdata.uname
    oldUserData[editIndex]['uemail']=formdata.uemail
    oldUserData[editIndex]['uphone']=formdata.uphone
    oldUserData[editIndex]['umessage']=formdata.umessage


  
    setuseData(oldUserData)
    setformdata(
      {
    uname:'',
    uemail:'',
    uphone:'',
    umessage:'',
    index:''
      }
    
      
    )

    }
    else{
      toast.error("Already Exit")
    }
  }

     event.preventDefault();
    }
     
    let deleteRow=(indexNumber)=>{

      
      let filterDataAfterDelete=useData.filter((v,i)=> i!=indexNumber)
      setuseData(filterDataAfterDelete)
    }
    let editRow=(indexNumber)=>{
      
      let editData=useData.filter((v,i)=>i===indexNumber)[0]
  
      editData['index']=indexNumber;
      setformdata(editData)
    }
    
  return (
   <div className='maindiv'>
   <Container fluid>
     <ToastContainer/>
   <Container>
    <Row>
      <Col className='text-center py-5'>
      </Col>
    </Row>
      <Row >
        <Col lg={5}>
          
      <Form onSubmit={handleSubmit} className='form'>
        <h1> Enquiry Now</h1>
        <div className="pb-3">
          <label className='ulabel'>Name</label>
          <input type='text' onChange={getValue} value={formdata.uname} name='uname' className='form-control'/>
        </div>
        <div className="pb-3">
          <label className='ulabel'>Email</label>
          <input type='email' onChange={getValue} value={formdata.uemail} name='uemail' className='form-control'/>
        </div>
        <div className="pb-3">
          <label className='ulabel'>Phone</label>
          <input type='number' onChange={getValue} value={formdata.uphone} name='uphone' className='form-control'/>
        </div>
        <div className='textarea'>
          <label className='ulabel'>Message</label>
          <textarea className="textarea" onChange={getValue} value={formdata.umessage} name="umessage" id=""  Col="9"></textarea>
        </div>

        <button className="button">
          {
            formdata.index!=="" ? 'update':'save'
          }
        </button>
      </Form>
      </Col> 
      <Col className='table'>
      <Table striped bordered hover>
      <thead className='table'>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
          <th>MESSAGE</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody className='table'>
        {useData.length>=1 ?

        useData.map((Obj,index)=>{
          return(

            <tr key={index}>
            <td>{index+1}</td>
            <td>{Obj.uname}</td>
            <td>{Obj.uemail}</td>
            <td>{Obj.uphone}</td>
            <td>{Obj.umessage}</td>
            <td>
                <button onClick={()=>deleteRow(index)}>delete</button>
                <button onClick={()=>editRow(index)}>update</button>
  
            </td>
          </tr>
          )
        })
       

        :
        <tr>
          <td colSpan={6}> No data found </td>
           </tr>

        }
      </tbody>
      </Table>
      
      </Col>
      </Row>
      </Container>
      </Container>
</div>
  );

};
export default App;
