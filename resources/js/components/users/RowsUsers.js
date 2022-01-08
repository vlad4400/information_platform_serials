//import Table from 'react-bootstrap/Table';

export const Rows = ({ name, email, is_admin, key }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{is_admin}</td>
        </tr>
    );
};
