import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 
import Base from '../header/Base';
import  "../styles/style.css";

import { Card, Col, Row,CardHeader, CardBody, Form, FormGroup,Label, Input,Button,Container } from 'reactstrap';
import {toast} from "react-toastify";

function AddTodo({isAuthenticated, setIsAuthenticated}) {
	const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  useEffect(() => {
		if(!isAuthenticated){
			history.push("/");
		}
	}, [isAuthenticated, history])

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
	const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:9090/api/todo', {title, targetDate}, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
      })
    } catch(error){
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
    }
    
    setTitle('');
    setTargetDate('');
    setErrorMessage('');
    // setMessage('Todo successfully created');
    toast.success('Todo successfully created');
    await timeout(1000);
    history.push("/todo")
  }

  useEffect(() => {
    setMessage('')
  }, [title, targetDate])

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
      <Container>
            <Row className="mt-4">
                <Col sm={ {size:4,offset:4}}>
                  <Card  color="light" >

                    <CardHeader className="text-center">
                    <h1><u>Add New Todo</u></h1>
                    </CardHeader>

                    <CardBody>
                      <Form onSubmit={onSubmit}>

                          <FormGroup>
                            <Label for ="tittle">Tittle</Label>
                            <Input
                            type ="text"
                            id="tittle"
                            placeholder="Title"
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                            
                          />
                          </FormGroup>

                          <FormGroup>
                            <Label for ="targetDate">Target Date</Label>
                            <Input
                            type="date"
                            id="targetDate"
                            placeholder="Title"
                            value={targetDate}
                            onChange={e => setTargetDate(e.target.value)} 
                            
                          />
                          </FormGroup>

                          <Container className="text-center">
                            <Button color="success" outline> Add Todo</Button>
                        </Container>

                      </Form>
                    </CardBody>
                    {showMessage()}
                     {showErrorMessage()}
                  </Card>
                </Col>
            </Row>
      </Container>
    
    </Base>


	)
}

export default AddTodo;