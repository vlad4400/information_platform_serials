import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosAsync } from '../../reducers/serials';
import PanelSerials from '../../components/PanelSerials.js';
import ListSerials from '../../components/ListSerials.js';
import Container from '../../components/Container.js';

export const Home = () => {
	const dispatch = useDispatch();
    const serials = useSelector((state) => state.serials);

    useEffect(() => { dispatch(getTodosAsync()) }, [dispatch]);

    return (
        <Container>
            <PanelSerials title={'Новые сериалы'} serials={serials} />
            <ListSerials title={'Найболее рейтинговые сериалы'} serials={serials} />
        </Container>
    )
}
