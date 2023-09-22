#[derive(Debug)]
pub struct Server {
    pub addr: String,
}

impl Server {
    pub fn run(self) {
        println!("Server running on: {}", self.addr);
    }

    pub fn new(addr: String) -> Self {
        Server { addr }
    }
}
