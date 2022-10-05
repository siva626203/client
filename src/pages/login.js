import { Fragment, useEffect, useState } from "react";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { useNavigate,Navigate } from 'react-router';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import {login} from '../redux/user'
function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const formik=useFormik({initialValues:{
        username:"",
        password:""
        },
        validationSchema:yup.object({
          username:yup.string()
          .required("This field is required"),
          password:yup.string()
          .required("*")
        }),
        onSubmit:(data)=>{
          console.log(data)
          axios.post("http://localhost:8080/api/login",data)
          .then((req,res)=>{
            console.log(req.data)
            if(req.data==="user not found"){
                toast.error(req.data)
            }else{
              dispatch(login({username:formik.values.username}));
              toast.success("Welcome")
              navigate('/')
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
        
        
        })
 
    return<Fragment>
        <h1>Login</h1>
        <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Your UserName</Form.Label>
                    <Form.Control type='text' onChange={formik.handleChange} required name="username" value={formik.values.username}/>
                    {<p className='text-danger'>{formik.errors.username}</p>}
                    <Form.Label>Enter Your password</Form.Label>
                    <Form.Control type="text" required name="password" value={formik.values.password} onChange={formik.handleChange}/>
                    {<p className='text-danger'>{formik.errors.password}</p>}
                    <Button type='submit' variant='success'>SUBMIT</Button>
                  
                </Form.Group>
        </Form>
    </Fragment>
}
export default Login;