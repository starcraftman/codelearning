import { redirect } from "react-router-dom";

export function action() {
    console.log('hello');
    localStorage.removeItem('token');
    localStorage.removeItem('token-expiration');
    return redirect('/');
}