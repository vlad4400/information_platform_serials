import { Figure, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { switchFavorite } from '../services/SerialsService';
import { deleteFavourite, restoreFavourites } from '../store/favourites.slice';
import { switchSerialIsFavoriteById } from '../store/serials.slice';

export default ({title, serials, loading, isAuth = false}) => {

    const dispatch = useDispatch();
    
    const onClickAddToFavorite = (id) => {
        dispatch(switchSerialIsFavoriteById(id));
        dispatch(deleteFavourite({id}));
        switchFavorite(id)
            .then()
            .catch(() => {
                dispatch(switchSerialIsFavoriteById(id));
                dispatch(restoreFavourites());
            })
            .finally(() => {
            });
    }
    
    const Item = ({ri, serial }) => (
        <div style={{display: 'flex', margin: '0 5px' }}>
            
            <Link to={`${ROUTES.SERIALS}/${serial.id}`}>
                <Figure.Image
                    style={{marginRight: '15px'}}
                    width={36} 
                    height={45} 
                    src={serial.poster}
                />
            </Link>

            <span style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                <Link
                    to={`${ROUTES.SERIALS}/${serial.id}`}
                    style={{
                        textDecoration: 'none',
                        color: 'darkblue',
                    }}

                    >
                    <span>{ri+1}. {serial.title} ({serial.year})</span>
                </Link>
                
                <span style={{ display: 'flex', gap: '5px', alignItems: 'baseline' }}>
                    <span style={{
                        textAlign: 'right',
                        marginRight: '10px',
                        fontSize: '14px',
                        color: 'grey',
                    }}>{serial.my_eval ? `Мой рейтинг: ${serial.my_eval}/10` : ''}</span>
                    { isAuth
                        ? <Button 
                            variant="outline-success"
                            size={'sm'}
                            style={{marginRight: '10px'}}
                            className={serial.isFavorite ? 'btn-remove-minus' : 'btn-add-plus'}
                            onClick={() => onClickAddToFavorite(serial.id)}
                        >{serial.isFavorite ? '-' : '+'}</Button>
                        : <></>
                    }
                    <span style={{
                        width: '50px',
                        textAlign: 'right'
                    }}>{serial.rate ? `${serial.rate}/10` : ''}</span>
                </span>
            </span>

        </div>
    );

    const List = ({serials}) => (
        serials.map((serial, ri) => <Item key={serial.id} ri={ri} serial={serial} />)
    );


    return (
        <div className="top-rating" style={{marginTop: '15px'}}>
            <h2>{title}</h2>

            { !loading
                ? <>
                    { serials?.length
                        ? <List serials={serials}/>
                        : <>Нет сериалов.</>
                    }
                </>
                : <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Spinner animation="border" />
                </div>
            }
        </div>
    )
}
