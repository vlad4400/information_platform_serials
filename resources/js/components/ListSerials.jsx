import { Figure, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { switchFavorite } from '../services/SerialsService';
import { deleteFavourite, setLoadingFavouriteStatus, setLoadingFavouriteStatusComplete } from '../store/favourites.slice';
import { setLoadingSerialStatus, setLoadingSerialStatusComplete, switchSerialIsFavoriteById } from '../store/serials.slice';

export default ({title, serials, loading, isAuth = false}) => {
    const dispatch = useDispatch();
    
    const onClickAddToFavorite = (id) => {
        dispatch(setLoadingSerialStatus(id));
        dispatch(setLoadingFavouriteStatus(id));

        switchFavorite(id)
            .then(() => {
                dispatch(switchSerialIsFavoriteById(id));
                dispatch(deleteFavourite(id));
            })
            .finally(() => {
                dispatch(setLoadingSerialStatusComplete(id));
                dispatch(setLoadingFavouriteStatusComplete(id));
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
                            variant={serial.isFavorite ? 'outline-danger' : 'primary'}
                            size="sm"
                            onClick={() => onClickAddToFavorite(serial.id)}
                            disabled={serial.isLoading}
                            >
                            {   serial.isLoading
                                    ? <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                    : <></>
                            }
                            { serial.isFavorite ? 'Удалить' : 'Добавить' }
                        </Button>
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
