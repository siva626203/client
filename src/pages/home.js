import { Fragment, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {logout} from '../redux/user'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
function Home(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
    const [data,setData]=useState([]);
    const [card,setCard]=useState([]);
    const [filter,setFilter]=useState({});
    const navigate=useNavigate();
    const currentUser=useSelector(state=>state.user.value)
    console.log(currentUser.username);
    const dispatch=useDispatch();
    const getCart=(e,id)=>{
        axios.post("http://localhost:8080/api/carditem",{data:{card:id.map((e)=>{})}})
        .then((req,res)=>{
            
            console.log(id.map((e)=>{return e[0.0]}))
            console.log(req.data)
            setFilter(req.data);
            console.log(filter)
        }).catch((e)=>{
            console.log(e)
        })
    }
    const addProduct=(e,data)=>{
        axios.put("http://localhost:8080/api/card",{data:{
            username:currentUser.username,
            card:data
        }})
        .then((req,res)=>{
            console.log(data)
            toast.success("Card Added");
           console.log(req)
        }).catch((e)=>{
            console.log(e)
        })
       }
    useEffect(()=>{
        axios.get("http://localhost:8080/api/product")
        .then((req,res)=>{
            console.log(req.data)
            setData(req.data);
        }).catch((e)=>{
            console.log(e)
        })
        axios.get("http://localhost:8080/api/usercard")
        .then((req,res)=>{
            console.log(req.data)
            setCard(req.data);
        }).catch((e)=>{
            console.log(e)
        })
        
        
    },[])
    const Logout=()=>{
        dispatch(logout())
    navigate("/login")
    }
   
    return<Fragment>
        
        <h1>
            Home Page
        </h1>
        {(currentUser.username!==null)?<Fragment>
            <Button variant="primary" onClick={handleShow}>
            CARD
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CARD ITEM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Fragment>
                <Card style={{ width: '18rem' }} key={filter._id}>
      <Card.Img variant="top" src={"http://localhost:8080/"+filter.image} />
      <Card.Body>
        <Card.Title>{filter.productname}</Card.Title>
        <Card.Text>
          Price:{filter.price}
        </Card.Text>
        <Button variant="primary">addCard</Button>
      </Card.Body>
    </Card>
    <Button variant="primary" onClick={event=>{getCart(event,card.map((e)=>{return e.card}))}}>
            Get CARD Item
          </Button>
            </Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
        </Fragment>:null}
        {(currentUser.username===null)?<Link style={{paddingLeft: 13, textDecoration: 'none'}} to={'/login'}>Login</Link>:<Fragment><Button onClick={Logout}>logout</Button></Fragment>}
        {data.map((e)=>{
            return<Fragment>
                <Card style={{ width: '18rem' }} key={e._id}>
      <Card.Img variant="top" src={"http://localhost:8080/"+e.image} />
      <Card.Body>
        <Card.Title>{e.productname}</Card.Title>
        <Card.Text>
          Price:{e.price}
        </Card.Text>
        <Button variant="primary" onClick={event=>{addProduct(event.target.value,console.log(e._id))}}>addCard</Button>
      </Card.Body>
    </Card>
            </Fragment>
        })}
    </Fragment>
}
export default Home;