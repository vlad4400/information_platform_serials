import { ListGroup, Card } from "react-bootstrap";

export const List = ({ list }) => (
  <Card>
    <ListGroup as="ol" numbered>
      {list?.map(({ id, name, username, email, phone, address }) => (
        <ListGroup.Item key={id} as="li" className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto" >
            <div className="fw-bold">{name} ({username})</div>
            {email}, {phone}
            <ListGroup.Item>
              {address.street}, {address.suite}
            </ListGroup.Item>
            <ListGroup.Item>
              {address.city}  {address.zipcode}
            </ListGroup.Item>
          </div>

        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card>
);
