import { Figure } from 'react-bootstrap';

export default ({title, year, url}) => (
    <Figure style={{height: '265px', overflow: 'hidden'}}>
        <Figure.Image 
            width={120} 
            height={150} 
            src={url}
            style={{margin: '0 5px', cursor: 'pointer'}}
        />
        <Figure.Caption style={{margin: '0 5px', maxWidth: '120px'}}>
            <div>
                {title} 
            </div>
            <div>
                ({year})
            </div>
        </Figure.Caption>
    </Figure>
)
