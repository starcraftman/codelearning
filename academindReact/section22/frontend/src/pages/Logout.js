import { redirect } from "react-router-dom";

export function action() {
    console.log('hello');
    localStorage.removeItem('token');
    return redirect('/');
}