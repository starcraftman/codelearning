import React from "react";

class Todo {
    public id: string;

    constructor(public text: string) {
        this.id = `${new Date().toISOString()}_${Math.random().toString()}`;
    }
}

export default Todo;