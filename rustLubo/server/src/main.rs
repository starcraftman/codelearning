#![allow(dead_code)]
mod server;
mod http;

use server::Server;
use http::Request;
use http::RequestMethod;


fn main() {
    let get = RequestMethod::GET;
    dbg!("{}", &get);
    println!("{}", &get);
    let qstring = http::QueryString::from("test=1&works=true&hello=world");
    dbg!(qstring);

    let req = Request::test_get();
    dbg!("{}", &req);

    let server = Server::new("127.0.0.1:8080".to_string());
    dbg!("{}", &server);
    server.run();
}

