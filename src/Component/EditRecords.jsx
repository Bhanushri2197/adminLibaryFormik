import React, { useState , useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../utility/ApiService';
import { useFormik } from 'formik';
import { BookValidate } from '../Schemas/Bookvalidate';

function EditRecords() {
    let params = useParams();
    let navigate = useNavigate();
    let [initialValue , setIntialValues] = useState({
        bookTitle: "",
        bookAuthor : '',
        bookISBNNo: '',
        booksPublishDate:'',     
        authorName: '',
        dateOfBirth:'',
        authorbio: '', 
    })
    const getData = async() => {
        let {id} = params;
        try {
          let res=await AxiosService.get(`/formikbookauthor/${id}`);
          if (res.status === 200) {
            setIntialValues({
                bookTitle: res.data.bookTitle,
                bookAuthor : res.data.bookAuthor,
                bookISBNNo: res.data.bookISBNNo,
                booksPublishDate: res.data.booksPublishDate,     
                authorName: res.data.authorName,
                dateOfBirth: res.data.dateOfBirth,
                authorbio: res.data.authorbio,
            })
          }
        }
        catch(error){
            console.log(error);
        }
    }
    let formik= useFormik({
        initialValues: initialValue,
        validationSchema:BookValidate,
        enableReinitialize: true,
        onSubmit:async(values) => {
            let {id}=params;
            values.id=id;
            try {
              let res=await AxiosService.put(`/formikbookauthor/${id}`,values);
              if (res.status===200) navigate("/");
            } catch (error) {
              console.log(error);
            }
          }
    })
    useEffect(()=>{getData()},[])
  return (
    <div>
       <div className="addRecordBlock">
   <div className='container'>
  <div className=" d-flex justify-content-center">
  <div className="addRecord d-flex flex-column align-items-center justify-content-center pt-5 pl-2 pr-2">
        <h1 className='text-center'>Update Book Records </h1>
        <Form className='mt-5 addRecordForms' onSubmit={formik.handleSubmit}>
          <h2 className="heading2 mt-3 text-center">Edit Book Details</h2>
          <div className='formInputField'>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="bookTitle" className='mt-4 mb-2 fw-bold'>Book Title:</Form.Label>
              <Form.Control id="bookTitle" type="text" className={formik.touched.bookTitle && formik.errors.bookTitle ? 'input-error' : ''} onChange={formik.handleChange} value={formik.values.bookTitle}  placeholder="Enter Book title" />
              {formik.touched.bookTitle && formik.errors.bookTitle && <p className='errorText'>{formik.errors.bookTitle}</p>}
              <Form.Label htmlFor="bookAuthor" className='mt-4 mb-2 fw-bold'>Book Author Name:</Form.Label>
              <Form.Control id="bookAuthor" type="text"  className={formik.touched.bookAuthor && formik.errors.bookAuthor ? 'input-error' : ''} onChange={formik.handleChange} value={formik.values.bookAuthor}   placeholder="Enter Author Name" />
              {formik.touched.bookAuthor && formik.errors.bookAuthor && <p className='errorText'>{formik.errors.bookAuthor}</p>}
              <Form.Label htmlFor="bookISBNNo" className='mt-4 mb-2 fw-bold'>Book ISBN Number:</Form.Label>
              <Form.Control id="bookISBNNo" type="text" className={formik.touched.bookISBNNo && formik.errors.bookISBNNo ? 'input-error' : ''} onChange={formik.handleChange} value={formik.values.bookISBNNo}   placeholder="Enter ISBN Number" />
              {formik.touched.bookISBNNo && formik.errors.bookISBNNo && <p className='errorText'>{formik.errors.bookISBNNo}</p>}
              <Form.Label htmlFor="booksPublishDate" className='mt-4 mb-2 fw-bold'>Publication Date:</Form.Label>
              <Form.Control id="booksPublishDate" type="date" className={formik.touched.booksPublishDate && formik.errors.booksPublishDate ? 'input-error' : ''} onChange={formik.handleChange} value={formik.values.booksPublishDate}   placeholder="Enter Published date" />
              {formik.touched.booksPublishDate && formik.errors.booksPublishDate && <p className='errorText'>{formik.errors.booksPublishDate}</p>}
            </Form.Group>
            </div>
            <h2 className="heading2 mt-5 text-center">Edit Author Details</h2>
            <div className='formInputField'>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="authorName" className='mt-4 mb-2 fw-bold'>Author Name</Form.Label>
              <Form.Control id="authorName" type="text" className={formik.touched.authorName && formik.errors.authorName ? 'input-error' : ''}  onChange={formik.handleChange} value={formik.values.authorName}   placeholder="Enter Author Name" />
              {formik.touched.authorName && formik.errors.authorName && <p className='errorText'>{formik.errors.authorName}</p>}
              <Form.Label htmlFor="dateOfBirth" className='mt-4 mb-2 fw-bold'>Author Birthday</Form.Label>
              <Form.Control id="dateOfBirth" type="date" className={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'input-error' : ''}  onChange={formik.handleChange} value={formik.values.dateOfBirth}   placeholder="Enter Author dob" />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && <p className='errorText'>{formik.errors.dateOfBirth}</p>}
              <Form.Label htmlFor="authorbio" className='mt-4 mb-2 fw-bold'>Authors Bio</Form.Label>
              <Form.Control id="authorbio" type="text"  className={formik.touched.authorbio && formik.errors.authorbio ? 'input-error' : ''} onChange={formik.handleChange} value={formik.values.authorbio}   placeholder="Enter short biography" />
              {formik.touched.authorbio && formik.errors.authorbio && <p className='errorText'>{formik.errors.authorbio}</p>}
            </Form.Group>
            </div>
            <Button disabled={formik.isSubmitting} variant="primary" type="submit">
              Submit
            </Button>
            {console.log(formik)}
          </Form>
      </div>
  </div>
      
   
    </div>
    </div>
    </div>
  )
}

export default EditRecords
