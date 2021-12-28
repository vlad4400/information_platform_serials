import { Figure } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default ({title, serials}) => {
    
    const Item = ({ri, serial }) => (
        <div style={{display: 'flex', margin: '0 5px' }}>
            
            <Figure.Image
                style={{marginRight: '15px'}}
                width={36} 
                height={45} 
                src={serial.url}
            />

            <span style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                <span> {ri+1}. {serial.title} ({serial.year})</span>
                <span style={{ display: 'flex', gap: '5px' }}>
                    <Button 
                        variant="outline-success"
                        size={'sm'}
                        style={{marginRight: '10px'}}
                        className={'btn-add-plus'}
                    >+</Button>
                    <span>{serial.rating}</span>
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
            <List serials={serials}/>
        </div>
    )
}
