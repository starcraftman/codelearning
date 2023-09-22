mod server;
mod http;

use server::Server;
use http::Request;
use http::RequestMethod;


fn main() {
    let get = RequestMethod::GET("Hello".to_string());
    dbg!("{}", get);

    let server = Server::new("127.0.0.1:8080".to_string());
    dbg!("{}", &server);
    server.run();

    // let req = Request::get(&server.addr);
    // dbg!("{}", &req);
}

