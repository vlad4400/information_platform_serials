import { ListItem, ListItemText } from '@material-ui/core';
import { ListItemSecondaryAction } from '@material-ui/core';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export const OneChat = (props) => {

    return (
        <ListItem component={Link} to={`/chats/${props.id}`}>
            <ListItemText>
                {props.name} - {props.id}

            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={props.onClick} edge="end">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

OneChat.propTypes = {
    id: propTypes.string,
    name: propTypes.string
}