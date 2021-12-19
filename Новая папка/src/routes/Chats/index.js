
import { Switch, Route } from 'react-router-dom';
import { ChatList } from '../../components/chat/ChatList';
import { Messages } from '../Messages';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { withChats } from '../../hocs/withChats';


const useStyles = makeStyles({
    columns: {
        display: "grid",
        gridTemplateColumns: "300px 1fr"
    }
});

export const ChatsRender = ({ chats, onCreateChat, onDeleteChat }) => {

    const classes = useStyles();

    return (
        <div className={classes.columns}>

            <div>
                <ChatList onDelete={onDeleteChat} list={chats} />
                <Button onClick={onCreateChat}>Add chat</Button>
            </div>
            <div>
                <Switch>
                    <Route component={Messages} path="/chats/:chatID" />
                </Switch>
            </div>
        </div>
    );
};

export const Chats = withChats(ChatsRender);

