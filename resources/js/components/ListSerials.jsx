import { Figure, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { switchFavorite } from '../services/SerialsService';
import { deleteFavouriteById } from '../store/favourites.slice';
import { switchSerialIsFavoriteById } from '../store/serials.slice';

export default ({title, serials, loading, isAuth = false}) => {

    const dispatch = useDispatch();
    
    const onClickAddToFavorite = (id, isFavorite) => {
        dispatch(switchSerialIsFavoriteById(id));
        switchFavorite(id).then(success => {
            if (isFavorite) {
                dispatch(deleteFavouriteById(id));
            }
        })
        .catch(() => {
            dispatch(switchSerialIsFavoriteById(id));
        }).finally();
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
                <span style={{ display: 'flex', gap: '5px' }}>
                { isAuth
                    ? <Button 
                        variant="outline-success"
                        size={'sm'}
                        style={{marginRight: '10px'}}
                        className={serial.isFavorite ? 'btn-remove-minus' : 'btn-add-plus'}
                        onClick={() => onClickAddToFavorite(serial.id, serial.isFavorite)}
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
