import { Button } from 'react-bootstrap';
import { API_ADMIN_PARSER } from '../utilities/Constants';

export const ParserSerials = () => {

    const setSerialsAsync = async () => {
        try {
            const response = await fetch(API_ADMIN_PARSER);
            if (!response.ok) {
                throw new Error('Error!!!!!!!!!!!!!');
            }
            const result = await response.json();

        } catch (e) {
            console.error(e);

        }

    };

    return (
        <div>
            <Button variant="dark" onClick={setSerialsAsync}>Parser</Button>{' '}
        </div >
    );

};

