import React from "react";
import axios from "axios";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TodoItem(props) {
    async function removeTodo(id) {
        await axios.delete(`http://localhost:8000/api/todo/${id}`)
            .then((res) => console.log(res.data.response))
            .catch((e) => console.log(e));
        props.needUpdate();
    }

    return (
        <ListItem>
            <ListItemText
                primary={props.todo.item}
                secondary={props.todo.description}
            />
            <ListItemSecondaryAction>
                <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => removeTodo(props.todo.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}