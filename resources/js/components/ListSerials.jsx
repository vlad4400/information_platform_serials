import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton, Figure, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default ({title, serials, loading, showNavigation = false}) => {
    
    const Item = ({ri, serial }) => (
        <div style={{display: 'flex', margin: '0 5px' }}>
            
            <Link to={`${ROUTES.SERIALS}/${serial.id}`}>
                <Figure.Image
                    style={{marginRight: '15px'}}
                    width={36} 
                    height={45} 
                    src={serial.poster}
                />
            </Link>

            <span style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                <Link
                    to={`${ROUTES.SERIALS}/${serial.id}`}
                    style={{
                        textDecoration: 'none',
                        color: 'darkblue',
                    }}

                    >
                    <span>{ri+1}. {serial.title} ({serial.year})</span>
                </Link>
                <span style={{ display: 'flex', gap: '5px' }}>
                <Button 
                    variant="outline-success"
                    size={'sm'}
                    style={{marginRight: '10px'}}
                    className={'btn-add-plus'}
                >+</Button>
                <span style={{
                    width: '50px',
                    textAlign: 'right'
                }}>{serial.rate ? `${serial.rate}/10` : ''}</span>
                </span>
            </span>

        </div>
    );

    const List = ({serials}) => (
        serials.map((serial, ri) => <Item key={serial.id} ri={ri} serial={serial} />)
    );

    return (
        <div className="top-rating" style={{marginTop: '15px'}}>
            <h2>{title}</h2>

            { !loading
                ? <>
                    { showNavigation
                        ? <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '15px',
                            }}>
                            <DropdownButton title="Отобразить" id="bg-nested-dropdown">
                                <Dropdown.Item eventKey="1">От найбольшего оличества просмотров</Dropdown.Item>
                                <Dropdown.Item eventKey="2">От найменьшего оличества просмотров</Dropdown.Item>
                                <Dropdown.Item eventKey="3">От найбольшего рейтинга</Dropdown.Item>
                                <Dropdown.Item eventKey="3">От найменьшего рейтинга</Dropdown.Item>
                            </DropdownButton>
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="secondary">1</Button>{' '}
                                <Button variant="secondary">2</Button>{' '}
                                <Button variant="secondary">3</Button>{' '}
                                <Button variant="secondary">4</Button>{' '}
                                <Button variant="secondary">5</Button>
                            </ButtonGroup>
                        </div>
                        : <></>
                    }
                    <List serials={serials}/>
                </>
                : <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spinner animation="border" />
                </div>
            }
        </div>
    )
}
