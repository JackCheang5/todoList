import React, {useState} from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "flex-end",
    },
    input: {
        margin: theme.spacing(0, 2, 0, 0),
    },
}))

export default function AddTodo(props) {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState("");

    function titleChangeHandler(value) {
        if (error && value!=="") {
            setError(false);
            setHelpText("");
        }
        setTitle(value);
    }

    async function addTodoHandler() {
        if (title==="") {
            setError(true);
            setHelpText("Title cannot be empty");
        } else {
            let id = 0;
            await axios.post("http://localhost:8000/api/todo", {
                "id": `${id}`,
                "item": `${title}`,
                "description": `${desc}`
            })
                .then((res) => console.log(res.data))
            setTitle("");
            setDesc("");
            props.needUpdate();
        }
    }

    return (
        <Grid item className={classes.root}>
            <TextField 
                error={error}
                helperText={helpText}
                label="Title"
                className={classes.input}
                onChange={(e) => {titleChangeHandler(e.target.value)}} value={title} />
            <TextField 
                label="Description"
                className={classes.input}
                onChange={(e) => {setDesc(e.target.value)}} value={desc} />                
            <Button
                size="large"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={addTodoHandler}
                >
                Add
            </Button>
        </Grid>
    )
}