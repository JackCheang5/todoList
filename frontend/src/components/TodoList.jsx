import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import TodoItem from "./TodoItem";

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        margin: theme.spacing(4, 0, 1)
    },
    item: {
        flexGrow: 1
    }
}));

export default function TodoList(props) {
    const classes = useStyle();

    return (
        <Grid item className={classes.root}>
            <Typography variant="h4" className={classes.title}>
                TODO List:
            </Typography>
            <List>
                {props.todoList.map((todo) => (
                <TodoItem key={todo.id} todo={todo} needUpdate={props.needUpdate}/>))}
            </List>
        </Grid>
    )
}