import Table from "react-bootstrap/Table";
import Spinner from 'react-bootstrap/Spinner'

const ListItem = ({ i, title, rating, episodes }) => (
    <tr>
        <th scope="row">{i + 1}</th>
        <td style={{ width: "100%" }}>{title}</td>
        <td>{rating}/10</td>
        {episodes ? <td>{episodes}</td> : <></>}
    </tr>
)

const ListTable = ({list}) => (
    <Table hover>
        <thead className="table-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Оценка</th>
                {list.episodes ? <th scope="col">Эпизоды</th> : <></>}
            </tr>
        </thead>
        <tbody>
            {list.map((item, i) => (
                <ListItem
                    key={i}
                    i={i}
                    title={item.title}
                    rating={item.rating}
                />
            ))}
        </tbody>
    </Table>
)

export default ({title, serials}) => (
    <div className="top-rating" style={{marginTop: '15px'}}>
        <h2>{title}</h2>
        { serials.length
            ? <ListTable list={serials}/>
            : <div style={{display: 'flex', justifyContent: 'center'}}>
                <Spinner animation="border" />
            </div>
        }
    </div>
);
