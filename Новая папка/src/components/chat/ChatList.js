import { List } from "@material-ui/core";
import { OneChat } from "./Chat";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    lines: {
        display: "flex",
        justifyContent: "space-between",

        height: theme.spacing(5),

    },
}));


export const ChatList = ({ list, onDelete }) => {
    const classes = useStyles();
    return (
        <List>
            {
                list.map((item) => (
                    <div className={classes.lines}>
                        <OneChat
                            onClick={() =>
                                onDelete(item.id)
                            }
                            key={item.id} {...item} />

                    </div>
                ))
            }
        </List>
    )
};


