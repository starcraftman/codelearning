import React from "react";

import Card from "../UI/Card";
import classes from "./UserList.module.css"

export interface UserType {
    name: string;
    age: number;
    key: number;
}

interface PropsType {
    users: UserType[];
}

const UserList = (props: PropsType) => {
    const userEntries =  props.users.map(user => {
        return <li key={user.key}>{user.name} ({user.age} years old)</li>
    })
    return (
        <Card className={classes.users}>
            <ul>
                {userEntries}
            </ul>
        </Card>
    );
};

export default UserList;