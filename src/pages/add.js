import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {Form,Button}from 'react-bootstrap'
import {useFormik}from 'formik'
import  {toast} from 'react-toastify'
import * as yup from 'yup'
function Add(){
    const [file,setFile]=useState(null);
    const formik=useFormik({
        initialValues:{
            productname:"",
            price:0,
            image:null
        },
        validationSchema:yup.object({
            productname:yup.string()
            .required("*"),
            price:yup.number()
            .required("*")
            
        }),
        onSubmit:(data)=>{
            const formdata=new FormData();
            formdata.append('Photo',file);
            const config={
                headers:{
                    'content-type':'multipart/formdata'
                }
            }
            console.log(formdata);
            axios.post("http://localhost:8080/api/add",{data:{
                productname:data.productname,
                price:data.price,
                image:formdata
            }},config)
            .then((req,res)=>{
             toast.success("Data Saved"); 
             console.log(req)  
            })
            .catch((e)=>{
                console.log(e)
            })
        }
    })
   const onInputChange=(e)=>{
    setFile(e.target.files[0]);
   }
    return<Fragment>
            <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Name" name="productname" onChange={formik.handleChange} value={formik.values.productname}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Enter Price</Form.Label>
        <Form.Control type="number" placeholder="Price" name="price" onChange={formik.handleChange} value={formik.values.price}/>
      </Form.Group>
    <Form.Group controlId="formFile">
    <Form.Label>select Image</Form.Label>
        <Form.Control type="file" onChange={onInputChange} name="photo" value={formik.values.image}/>
    </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Fragment>
}
export default Add;