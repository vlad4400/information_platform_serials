//страница Избранное
import { Container, Row, Col, Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import WatchList from "../components/WatchList";

const watched = [
    { title: "Adventure time", rating: 12 },
    { title: "Rick and Morty", rating: 10 },
    { title: "Adventure time", rating: 12 },
    { title: "Rick and Morty", rating: 10 },
    { title: "Adventure time", rating: 12 },
    { title: "Rick and Morty", rating: 10 },
];

const toWatch = [
    {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur doloribus consectetur nam nemo, possimus sapiente quae soluta error dignissimos numquam.",
        rating: 12,
    },
    {
        title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, commodi!",
        rating: 10,
    },
    {
        title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore enim laboriosam voluptatum! Ab, asperiores alias.",
        rating: 12,
    },
    {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur doloribus consectetur nam nemo, possimus sapiente quae soluta error dignissimos numquam.",
        rating: 12,
    },
];

export const Favorites = () => {
    return (
        <Container fluid="sm">
            <h2 className="my-3">Избранное</h2>
            <Row className="mb-3">
                <Col>
                    <Card body>
                        <h3 className="mb-3">Список сериалов</h3>
                        <Form.Control
                            placeholder="Поиск по названию.."
                            aria-label="Search"
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card body>
                        <Tab.Container id="tabs" defaultActiveKey="first">
                            <Row className="mb-3">
                                <Col>
                                    <Nav variant="pills">
                                        <Nav.Item>
                                            <Nav.Link
                                                as={Button}
                                                eventKey="first"
                                            >
                                                Просмотрено
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link
                                                as={Button}
                                                eventKey="second"
                                            >
                                                Запланировано
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <WatchList list={watched} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <WatchList list={toWatch} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
