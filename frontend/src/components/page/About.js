import React from 'react';
import Base from '../header/Base';
import  "../styles/style.css";
import{Col,Row, Container, CardBody,Card } from "reactstrap";
export default function About() {
	return (
	

		<Base>
			<Container>
				<Row className="mt-4">
					<Col sm={ {size:4,offset:4}}>
						<Card    color="light" >
							<CardBody className="text-center">
							<h1><u>About</u></h1>
							<h3>This Application Developed By</h3>
		 					<h4>Suprakash Mandal</h4>
		 					<h4>Aishwarya</h4>
		 					<h4>Gagan Gowda</h4>
		 					<p>This is todo list app version 1.0.0</p>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		
		</Base>
	)
}