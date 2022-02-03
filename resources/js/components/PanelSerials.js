import Card from './Card';
import Spinner from 'react-bootstrap/Spinner';

export default ({title, serials, loading}) => {

    const Cards = ({serials}) => (
        serials.map((serial, ri) => 
            <Card
                key={ri}
                id={serial.id}
                title={serial.title}
                year={serial.year}
                url={serial.poster}
            />
        )
    );

    return (
        <div>
            <h2>{title}</h2>
            { !loading
                ? <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        justifyContent: 'space-evenly',
                        maxHeight: '236px',
                        overflow: 'hidden',
                    }}>
                    <Cards serials={serials}/>
                </div>
                : <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spinner animation="border" />
                </div>
            }
        </div>
    )
}
