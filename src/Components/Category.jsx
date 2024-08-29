import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Modal, Form, FormControl, Row, Col } from 'react-bootstrap';
import { addVideoCategoryAPI, deleteCategoryAPI, getAVideoAPI, getVideoCategoryAPI, updateCategoryAPI } from '../../services/allAPI';
import VedioCard from '../Components/VedioCard';
 

function Category({dropVideoResponse}) {
  const [categoryName, setCategoryName] = useState("")
  const [allCategories, setAllCategories] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = async () => {
    if (setCategoryName) {
      const result = await addVideoCategoryAPI({ categoryName, allVideos: [] })
      if (result.status >= 200 && result.status < 300) {
        handleClose()
        setCategoryName("")
        getCategories()
      } else {
        alert(result.message)
      }
    } else {
      alert("please fill the missing fields")
    }
  }
  useEffect(() => {
    getCategories()
  }, [dropVideoResponse])

  const getCategories = async () => {
    const { data } = await getVideoCategoryAPI()
    setAllCategories(data)
  }
  const removeCategory = async (id) => {
    await deleteCategoryAPI(id)
    getCategories()
  }
  // console.log(allCategories);
  const dragOver = (e) => {
    console.log("video card dragged over the category");
    e.preventDefault()
  }
  const videoDropped = async (e, categoryId) => {
    const videoId = e.dataTransfer.getData("videoId")
    // console.log("video id" + videoId, "dropped into the " + categoryId);
    const { data } = await getAVideoAPI(videoId)
    // console.log("dataa"+data);
    const selectedCategory = allCategories.find(
      (item)=> item.id === categoryId)
    selectedCategory.allVideos.push(data)
    // console.log(selectedCategory);
    const res = await updateCategoryAPI(categoryId, selectedCategory)
    getCategories()

  }
  // console.log(allCategories);
  const videoDragStarted=(e,videoId,categoryId)=>{
    let dataShare={videoId,categoryId}
    e.dataTransfer.setData("data",JSON.stringify(dataShare))
  }

  return (
    <>
      <div className='d-grid'>
        <button onClick={handleShow} className='btn btn-info'>Add Category</button>
      </div>
    
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId='floatingName' label="Category" className='mb-3'>
              <FormControl type="text" placeholder='Enter Category Name' onChange={e => setCategoryName(e.target.value)} />
            </FloatingLabel>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      {
        allCategories?.length > 0 ? allCategories.map(category => (
          <div className="border rounded p-4 m-3" droppable="true" onDragOver={e => dragOver(e)} onDrop={e => videoDropped(e, category?.id)}>
            <div className="d-flex justify-content between align-items-center">
              <h5>{category?.categoryName}</h5>
              <button className='btn' onClick={() => removeCategory(category?.id)}><i className="fa-solid fa-trash text-danger"></i></button>
              <Row>
                {
                  category?.allVideos?.length > 0 ? category?.allVideos.map(card => (
                    <Col sm={12} className='mb-3' draggable onDragStart={e=>videoDragStarted(e,card.id,category.id)}>
                      <VedioCard video={card} insideCategory={true} />
                    </Col>
                  )) : null
                }
              </Row>
            </div>
          </div>

        )) : <p>Nothing to Display</p>
      }


    </>
  )
}

export default Category
