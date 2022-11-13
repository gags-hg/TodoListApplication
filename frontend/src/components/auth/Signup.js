import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 
import { Link } from "react-router-dom";
import { Button, Card,CardBody,CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import  "../styles/style.css";
import Base from '../header/Base';
import {toast} from "react-toastify"

function Signup({isAuthenticated, setIsAuthenticated}) {
	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

	const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/api/auth/signup', {username, password});
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', response.data.username);
      setIsAuthenticated(true);
    } catch(error){
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      setIsAuthenticated(false);
      return;
    }
    
    setUsername('');
    setPassword('');
    setErrorMessage('');
    // setMessage('Sign up successful');
    toast.success('Signup successfully');
    await timeout(1000);
    history.push("/");
  }

  useEffect(() => {
    setMessage('')
  }, [username, password])

  const showMessage = () => {
    if(message === ''){
      return <div></div>
    }
    return <div className="alert alert-success" role="alert">
      {message}
    </div> 
  }

  const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

	return (
		
    <Base>

        <Container >
            <div className="text-center"><h1 ><u>Welcome To ToDoList :)</u></h1></div> 
           <Row className="mt-4">

            {/* {JSON.stringify(data)} */}
            <Col sm={ {size:4,offset:4}}>

             <Card    color="dark" inverse>

                <CardHeader className="text-center"  >
                <h3> <u>SignUp</u> </h3>
                <p>Give User Details here!!</p>
                </CardHeader>

                <CardBody>

                {/* Creating form  */}
                    <Form onSubmit={onSubmit}>

                        {/* user Name Field  */}
                        <FormGroup>
                            <Label for ="username">Enter UserName</Label>
                            <Input 
                                type="text"
                                placeholder=" Username here"
                                id="username"
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                            />
                            
                        </FormGroup>
                        {/* Password  field*/}
                        <FormGroup>
                        <Label for ="password">Enter Password</Label>
                        <Input 
                            type="password"
                            placeholder="Enter Password here"
                            id="password"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                           
                        />
                          
                        </FormGroup>


                        <Container className="text-center">
                            <Button color="primary" outline> SignUp</Button>
                        </Container>

                       

                    </Form>
                    <Container className="text-center" style={{marginTop:'1rem'}}> 
                        <p> Existing User? <Link to="/signin"><u>LogIn</u></Link></p>
                        
                    </Container>
                    {showMessage()}
                     {showErrorMessage()}
                    </CardBody>
            
                </Card>

            </Col>

           </Row>
        
        </Container>
        
        </Base>

	)
}

export default Signup;