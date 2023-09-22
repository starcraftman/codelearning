use std::convert::TryFrom;
use std::convert::TryInto;
use std::io::Read;
use std::net::TcpListener;

use crate::http::Request;

#[derive(Debug)]
pub struct Server {
    pub addr: String,
}

// How arrays are used
// fn arr(a: &[u8]) {}
// let a: [u8; 4] = [1, 2, 3, 4];
// arr(&a[1..3]);

impl Server {
    pub fn run(self) {
        println!("Server running on: {}", self.addr);
        let listener = TcpListener::bind(&self.addr).unwrap();

        // can break nested loops with labels, 'outer: loop {
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
                        Ok(_) => {
                            println!("Received a request: {}", String::from_utf8_lossy(&buffer));
                            match Request::try_from(&buffer[..]) {
                                Ok(request) => {
                                    dbg!(request);
                                },
                                Err(e) => {
                                    println!("Err: {}", e);
                                }
                            }
                        },
                        Err(e) => {
                            println!("Failed to read onnection: {}", e);
                        }
                    }

                },

                // Default cases are matched with _
                //_ => {}
                // Multiple cases per arm separated with: "a" | "b"
            }
        }

        // How tuples work
        // let tup = (5, "a", listener);
    }

    pub fn new(addr: String) -> Self {
        Server { addr }
    }
}
