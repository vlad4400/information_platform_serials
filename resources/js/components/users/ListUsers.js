import Table from 'react-bootstrap/Table';
import { Rows } from './RowsUsers';

/* const Rows = ({ name, email, is_admin, key }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{is_admin}</td>
        </tr>
    );
}; */

export const ListUsers = ({ list }) => {
    console.log(list);
    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Имя пользователя</th>
                        <th>e-mail</th>
                        <th>Админ</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map(({ item }) => (
                        <Rows
                            name={item.name}
                            email={item.email}
                            is_admin={item.is_admin}
                            key={id}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
