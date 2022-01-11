import Spinner from 'react-bootstrap/Spinner'
import Card from './Card.js';

const Cards = ({serials}) => (
    serials.map((serial, ri) => <Card key={ri} title={serial.title} year={serial.year} url={serial.url} />)
);

export default ({title, serials}) => (
    <div style={{maxHeight: '300px', overflow: 'hidden'}}>
        <h2>{title}</h2>
        { serials.length
            ? <Cards serials={serials} />
            : <div style={{display: 'flex', justifyContent: 'center'}}>
                <Spinner animation="border" />
            </div>
        }
    </div>
)
