import React from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal, { ErrorModalInputType} from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

interface PropsType {
    onAdd: (name: string, age: number) => void;
};

const DEFAULT_ERROR: ErrorModalInputType = {
    title: "",
    message: ""
}


const AddUser = (props: PropsType) => {
    // Alternative solution, use refs to fetch only finished age and name on click then push users
    // const [users, setUsers] = React.useState([]);
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState("");
    const [error, setError] = React.useState(DEFAULT_ERROR);

    const addUserHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if ([name.trim().length, age.trim().length].includes(0)) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age."
            })
            return;
        }
        const ageNum = parseInt(age);
        if (ageNum < 1) {
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (>= 0)."
            })
            return;
        }
        props.onAdd(name, ageNum);
        setError(DEFAULT_ERROR);
    };

    const onClickHandler = (event: React.MouseEvent) => {
        console.log('clicked button');
    }

    const nameChangeHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setName(target.value)
    }
    const ageChangeHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setAge(target.value);
    }

    const clearModal = () => {
        setError(DEFAULT_ERROR);
    }

    return (
        <React.Fragment>
            {error !== DEFAULT_ERROR && <ErrorModal onModalClick={clearModal} errorData={error}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input value={name} onChange={nameChangeHandler} id="username" type="text" />
                    <label htmlFor="age">Age</label>
                    <input value={age} onChange={ageChangeHandler} id="age" type="number" />
                    <Button onClick={onClickHandler} type="submit">Add User</Button>
                </form>
            </Card>
        </React.Fragment>
    );
}

export default AddUser;