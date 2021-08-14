import React, {useState, useEffect} from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import TodoList from "./TodoList";
import AddTodo from './AddTodo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
        flexDirection: "column",
        gap: 10,
    },
}))

export default function Todo() {
    const classes = useStyles();
    const [update, setUpdate] = useState(false);
    const [todoList, setTodoList] = useState([]);

    function needUpdate() {
        setUpdate(!update);
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/todo")
            .then((res) => {
                setTodoList(res.data.todoList);
            })
    }, [update])

    return (
        <Grid container className={classes.root}>
            <Header content="TODO List App" />
            <AddTodo mt={10} todoList={todoList} needUpdate={needUpdate}/>
            <TodoList todoList={todoList} needUpdate={needUpdate}/>
        </Grid>
    )
}