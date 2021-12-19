//не исп

//import { makeStyles } from '@material-ui/core/styles';
import { ChatList } from './ChatList'

//вывод списка чатов

export const ChatBD = () => {

    return (

        <ChatList
            list={[
                {
                    name: "Chat1",
                    id: Date.now()
                },
                {
                    name: "Chat2",
                    id: Date.now()
                },
                {
                    name: "Chat3",
                    id: Date.now()
                },
            ]} />

    );
};