import Card from './Card.js';

export default ({title, serials}) => {

    const Cards = ({serials}) => (
        serials.map((serial, ri) => <Card key={ri} title={serial.title} year={serial.year} url={serial.url} />)
    );

    return (
        <div style={{maxHeight: '250px', overflow: 'hidden'}}>
            <h2>{title}</h2>
            <Cards serials={serials} />
        </div>
    )
}
