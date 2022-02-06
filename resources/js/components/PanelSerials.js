import Loader from '../utilities/Loader';
import Card from './Card';

export default ({title, serials, loading}) => {

    const Cards = ({serials}) => (
        serials.map((serial, ri) => 
            <Card
                key={ri}
                id={serial.id}
                title={serial.title}
                year={serial.year}
                url={serial.poster}
            />
        )
    );

    return (
        <div>
            <h2>{title}</h2>
            { !loading
                ? <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        justifyContent: 'space-evenly',
                        maxHeight: '236px',
                        overflow: 'hidden',
                    }}>
                    <Cards serials={serials}/>
                </div>
                : <Loader />
            }
        </div>
    )
}
