import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Container,
  Button,
} from 'react-bootstrap';

export const SingleSerial = ({ serials }) => {
  const { serialId } = useParams();
  const serial = serials.find((serial) => serial.id == serialId);
  const getData = (() => { 
    axios.get(`/api/serials/${serialId}`)
      .then(response => { setState({title: response.data.title }); });
  })
  console.log(this)

return (
    <Container py="3">
        <Row>
            <Col sm="2" mw="100"></Col>
            <h1>{ serial.title }</h1>
        </Row>
    
        <Row className="py-3 px-0">
            <Col sm="2"></Col>
    
            <Col lg="2" px="0">
                <img src="image 9.png" className="card-img-top" alt="Responsive image"/>
                <Button variant="primary" className="w-100 mt-4">Добавить в список</Button>
                <Button variant="success" className="w-100 mt-4">Просмотрено</Button>
            </Col>
    
            <Col lg="7" pl="4">
    
                <Row>
                    <h4 className="col-lg-10 mb-3">Информация</h4>
                    <h6 className="col-lg-2 px-2 py-0 m-0 text-center"> IMDb RATING:</h6>
                </Row>
    
                <div className="h5">Эпизоды:</div>
                <div className="h5">Статус:</div>
                <div className="h5 mb-4">Жанры:</div>
    
                <div className="h4 mb-3">Сюжет</div>
                <p className="text-left mb-4">{ serial.description }</p>
    
                <div className="h4 mb-3">Кадры</div>
            </Col>
    
            <Col sm="2"></Col>
        </Row>
    </Container>
  );
};
