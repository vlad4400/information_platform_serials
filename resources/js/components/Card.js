import { Figure } from 'react-bootstrap';

export default ({title, year, url}) => (
    <Figure>
        <Figure.Image 
            width={120} 
            height={150} 
            src={url}
            style={{margin: '0 5px', cursor: 'pointer'}}
        />
        <Figure.Caption style={{margin: '0 5px'}}>{title} ({year})</Figure.Caption>
    </Figure>
)
