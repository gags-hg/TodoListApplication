import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom"; 
import Base from '../header/Base';
import  "../styles/style.css";

import { Card, Col, Row,CardHeader, CardBody, Form, FormGroup,Label, Input,Button,Container } from 'reactstrap';
import {toast} from "react-toastify";

function UpdateTodo({isAuthenticated, setIsAuthenticated, match}) {
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
      await axios.put(`http://localhost:9090/api/todo/${match.params.id}`, {title, targetDate}, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
    } catch(error){
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
    }

    setErrorMessage('');
    // setMessage('Todo successfully updated');
    toast.success('Todo successfully updated');
    await timeout(1000);
    history.push("/todo");
  }

  useEffect(() => {
    const loadData = async () => {
      let response = null;
      try {
        response = await axios.get(`http://localhost:9090/api/todo/${match.params.id}`, {
          headers: {
						'Authorization': `Bearer ${sessionStorage.getItem('token')}`
					}
        });
      } catch(error){
        setMessage('');
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error: something happened');
        }
        return;
      }
      setErrorMessage('');
      setTitle(response.data.title);
      setTargetDate(moment(response.data.targetDate).format('YYYY-MM-DD'));
    }
    
		loadData();
  }, [match.params.id]);

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
                  <h1><u>Update Todo</u></h1>
                  </CardHeader>

                  <CardBody>
                    <Form onSubmit={onSubmit}>

                        <FormGroup>
                          <Label for ="tittle">Tittle</Label>
                          <Input
                          type ="text"
                          id="tittle"
                          // placeholder="Title"
                          value={title} 
                          onChange={e => setTitle(e.target.value)} 
                          
                        />
                        </FormGroup>

                        <FormGroup>
                          <Label for ="targetDate">Target Date</Label>
                          <Input
                          type="date"
                          id="targetDate"
                          // placeholder="TargetDate"
                          value={targetDate}
                          onChange={e => setTargetDate(e.target.value)} 
                          
                        />
                        </FormGroup>

                        <Container className="text-center">
                          <Button color="secondary" outline> Update Todo</Button>
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

export default UpdateTodo;