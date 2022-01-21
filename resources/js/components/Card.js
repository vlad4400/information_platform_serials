import { Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default ({id, title, year, url}) => (
    <Figure style={{
        minWidth: '120px',
        maxWidth: '120px',
        marginBottom: '50px',
        }}>
        <Link to={`${ROUTES.SERIALS}/${id}`}>
            <Figure.Image 
                width={120} 
                height={150}
                style={{maxHeight: '170px'}}
                src={url}
            />
        </Link>
        <Figure.Caption>   
            <div>{title}</div>
            <div>({year})</div>
        </Figure.Caption>
    </Figure>
);
