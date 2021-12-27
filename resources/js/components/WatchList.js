import Table from "react-bootstrap/Table";

const ListItem = ({ i, title, rating }) => {
    return (
        <tr>
            <th scope="row">{i + 1}</th>
            <td style={{ width: "100%" }}>{title}</td>
            <td>{rating}/10</td>
            <td>100/100</td>
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
