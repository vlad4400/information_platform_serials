import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const ListItem = ({ i, title, rating, episodes = "100/100" }) => {
    return (
        <tr>
            <th scope="row">{i + 1}</th>
            <td style={{ width: "100%" }}>
              <Link to={ROUTES.SERIALS + '/' + i}>{title}</Link>
            </td>
            <td>{rating}/10</td>
            <td>{episodes}</td>
        </tr>
    );
};

export default function WatchList({ list }) {
    return (
        <>
            <Table hover>
                <thead className="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Эпизоды</th>
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
        </>
    );
}
