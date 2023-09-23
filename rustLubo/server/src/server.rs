use std::convert::TryFrom;
use std::io::Read;
use std::net::TcpListener;

use crate::http::{ParseError, Request, Response, StatusCode};

pub trait Handler {
    fn handle_request(&mut self, request: &Request) -> Response;
    fn handle_bad_request(&mut self, err: &ParseError) -> Response {
        println!("Failed to parse request: {}", err);
        Response::new(StatusCode::BadRequest, None)
    }
}

#[derive(Debug)]
pub struct Server {
    pub addr: String,
}

impl Server {
    pub fn run(self, mut handler: impl Handler) {
        println!("Server running on: {}", self.addr);
        let listener = TcpListener::bind(&self.addr).unwrap();

        loop {
            match listener.accept() {
                Err(e) => {
                    println!("Err occurred: {}", e);
                    continue;
                },

                Ok((mut stream, addr)) => {
                    println!("Connected to: {}", addr);
                    let mut buffer = [0; 1024];

                    match stream.read(&mut buffer) {
                        Err(e) => {
                            println!("Failed to read connection: {}", e);
                        },

                        Ok(_) => {
                            println!("Received a request: {}", String::from_utf8_lossy(&buffer));
                            let resp = match Request::try_from(&buffer[..]) {
                                Err(e) => handler.handle_bad_request(&e),
                                Ok(request) => handler.handle_request(&request),
                            };

                            if let Err(e) = resp.send(&mut stream) {
                                println!("Failed to send response: {}", e);
                            }
                        },
                    }
                },
            }
        }
    }

    pub fn new(addr: String) -> Self {
        Server { addr }
    }
}

/*
 * Notes Follow from lectures
 */

// can break nested loops with labels, 'outer: loop {

// How arrays are used
// fn arr(a: &[u8]) {}
// let a: [u8; 4] = [1, 2, 3, 4];
// arr(&a[1..3]);

// Default cases are matched with _
//_ => {}
// Multiple cases per arm separated with: "a" | "b"
//

// How tuples work, same as others can be mixed types
// let tup = (5, "a", listener);
