import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const ListItem = ({ i, id, title, rate, episodes }) => (
    <tr>
            <td scope="row">{i + 1}</td>
            <td style={{ width: "100%" }}>
                <Link to={`${ROUTES.SERIALS}/${id}`}>
                    {title}
                </Link>
            </td>
            <td>
                <Button 
                    variant="outline-success"
                    size={'sm'}
                    style={{marginRight: '10px'}}
                    className={'btn-add-plus'}
                >+</Button>
            </td>
            <td>{rate ? `${rate}/10` : ''}</td>
            <td>{episodes ? `${episodes}` : ''}</td>
        
    </tr>
);

const ListTable = ({list}) => (
    <Table hover>
        <thead className="table-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col"></th>
                <th scope="col">Оценка</th>
                <th scope="col">{/*Эпизоды*/}</th>
            </tr>
        </thead>
        <tbody>
            {list.map((item, i) => (
                <ListItem
                    id={item.id}
                    key={i}
                    i={i}
                    title={item.title}
                    rate={item.rate}
                />
            ))}
        </tbody>
    </Table>
);

export default ({title, serials, loading}) => (
    <div className="top-rating" style={{marginTop: '15px'}}>
        <h2>{title}</h2>
        { !loading
            ? <ListTable list={serials}/>
            : <div style={{display: 'flex', justifyContent: 'center'}}>
                <Spinner animation="border" />
            </div>
        }
    </div>
);
