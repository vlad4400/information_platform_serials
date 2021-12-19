import { useState, useRef, useEffect } from "react";
import { Paper, Button, InputBase } from "@material-ui/core"; //@material-ui версии 4
import Icon from '@material-ui/core/Icon';
import { makeStyles } from "@material-ui/core/styles";
//форма ввода сообщений


//стили для @material-ui
const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    input: {
        flexGrow: 1
    },
    button: {
        margin: theme.spacing(1),
    },
}));

//форма
export const InputForm = (props) => {

    const classes = useStyles();
    const [textMes, TextMes] = useState("");    //сообщение

    const inputRef = useRef(null);  //для фокуса на поле ввода

    const onChangeMessageText = (event) => {
        TextMes(event.target.value);
    }
    //при нажатии кнопки на форме
    const onSendMes = (event) => {
        event.preventDefault(); //отключение стандартного обработчика
        /*   if (textMes.trim() !== "") {    //запрет вывода пустых строк
              props.onSend(textMes);
          } */

        TextMes("");
        //inputRef.current.focus();   //возврат фокуса в поле ввода (если не делать проверку на пробелы - не нужен здесь)


    }

    useEffect(() => {
        inputRef.current.focus();
    });

    //вывод формы
    return (
        <div className="placeForm">
            <Paper elevation={3} className={classes.paper} component="form" onSubmit={onSendMes}>
                <InputBase
                    inputRef={inputRef}
                    type="text"
                    className={classes.input}
                    placeholder="Enter your message"
                    value={textMes}
                    onChange={onChangeMessageText} />
                <Button type="submit" variant="contained" color="primary" className={classes.button} endIcon={<Icon>send</Icon>}>Send</Button>
            </Paper >
        </div>
    );
};
