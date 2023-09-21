struct Server {
    addr: String,
}

impl Server {
    fn run(self) {
        println!("Server running on: {}", self.addr);
    }

    fn new(addr: String) -> Self {
        Server { addr }
    }
}

fn main() {
    let server = Server::new("127.0.0.1:8080".to_string());
    server.run();
}
