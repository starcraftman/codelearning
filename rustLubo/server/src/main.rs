#![allow(dead_code)]
mod server;
mod http;
mod website_handler;

use std::env;
use server::Server;
use http::{Request, RequestMethod};
use website_handler::WebsiteHandler;


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
    let default_path = format!("{}/public", env!("CARGO_MANIFEST_DIR"));
    let public_path = env::var("PUBLIC_PATH").unwrap_or(default_path);
    println!("Public path: {}", public_path);
    server.run(WebsiteHandler::new(public_path));
}

