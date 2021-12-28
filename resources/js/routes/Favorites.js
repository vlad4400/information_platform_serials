//страница Избранное
import { useState, useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import WatchList from "../components/WatchList";

const WATCHLIST = {
    watched: [
        { title: "adventure time", rating: 12 },
        { title: "Rick and Morty", rating: 10 },
        { title: "Проснувшийся", rating: 12 },
        { title: "Уральские пельмени", rating: 10 },
        { title: "План любви", rating: 12 },
        { title: "9-1-1: Одинокая звезда", rating: 10 },
    ],
    toWatch: [
        {
            title: "Книга Бобы Фетта",
            rating: 12,
        },
        {
            title: "Кобра Кай",
            rating: 10,
        },
        {
            title: "Проснувшийся",
            rating: 12,
        },
        {
            title: "Уральские пельмени",
            rating: 12,
        },
    ],
};

const { watched, toWatch } = WATCHLIST;
const keys = Object.keys(WATCHLIST);
const [watchedKey, toWatchKey] = keys;

export const Favorites = () => {
    const [input, setInput] = useState("");
    const onInputChange = (e) => {
        setInput(e.target.value);
    };

    const [key, setKey] = useState(watchedKey);

    const [filteredList, SetFilteredList] = useState([]);

    const filterList = (input, key) => {
        const list =
            key === watchedKey ? watched : key === toWatchKey ? toWatch : [];
        return list.filter((item) =>
            item.title.toLowerCase().includes(input.toLowerCase())
        );
    };

    useEffect(() => {
        const filteredList = filterList(input, key);
        SetFilteredList(filteredList);
    }, [input, key]);

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
                            value={input}
                            onChange={onInputChange}
                        />
                    </Card>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card body>
                        <Tabs
                            variant="pills"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey={watchedKey} title="Просмотрено">
                                <WatchList list={filteredList} />
                            </Tab>
                            <Tab eventKey={toWatchKey} title="Запланировано">
                                <WatchList list={filteredList} />
                            </Tab>
                            <Tab eventKey="Смотрю" title="Смотрю" disabled>
                                Смотрю
                            </Tab>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
