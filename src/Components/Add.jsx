import React,{useState} from 'react'
import {Button,FloatingLabel,Form,Modal} from 'react-bootstrap'
import { uploadVideoAPI } from '../../services/allAPI';

function Add({setUploadVideoResponse}) {
  const[uploadVideo,setUploadVideo]=useState({id:"",name:"",url:"",link:""})
  console.log(uploadVideo);

  const getYoutubeLink =(e)=>{
    const{value}=e.target
    if(value.includes("v=")){
    let VID =  value.split("v=")[1].slice(0,11)
    console.log(`https://www.youtube.com/embed/${VID}`);
    setUploadVideo({...uploadVideo,link:`https://www.youtube.com/embed/${VID}`})
    
  }else{
    setUploadVideo({...uploadVideo,link:""})
  }
}
const handleAdd = async(e)=>{
const{id,name,url,link} = uploadVideo
if(!id || !name || !url || !link){
  alert("please fill the missing fields")
}else{
  //video upload to json server
  const result=await uploadVideoAPI(uploadVideo)
  console.log(result);
  if(result.status>=200 && result.status<=300){
    alert("video uploaded")
    handleClose()
    setUploadVideo({
      id:"",name:"",url:"",link:""
    })
    setUploadVideoResponse(result.data)
  }else{
    alert(result.message)
  }
  
}
}

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
   <>
   <div className='d-flex mb-5 mt-5 align-items-center'>
    <h2>Upload Videos</h2>
    <button onClick={handleShow} className='btn'><i class="fa-solid fa-upload fa-beat-feat-fa-2x mb-2"></i></button>
   </div>
   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
         <FloatingLabel
        controlId="floatingName"
        label="Video Id"
        className="mb-3"
      >

        <Form.Control type="text" placeholder="Enter Video id"  onChange={(e)=>setUploadVideo({...uploadVideo,id:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingName" label="Video Name" className='mb-3'>
        <Form.Control type="text" placeholder="enter video name" onChange={(e)=>setUploadVideo({...uploadVideo,name:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingName" label="Image URL" className='mb-3'>
        <Form.Control type="text" placeholder="Image URL" onChange={(e)=>setUploadVideo({...uploadVideo,url:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingName" label="Video URL" className='mb-3'>
        <Form.Control type="text" placeholder="enter video URL" onChange={getYoutubeLink} />
      </FloatingLabel>
         </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
           Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
         Add
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default Add
