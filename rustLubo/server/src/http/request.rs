use super::method::RequestMethod;

#[derive(Debug)]
pub struct Request {
    path: String,
    query_string: Option<String>,
    method: RequestMethod,
}

impl Request {
    pub fn get(url: &str) -> Self {
        Request {
            path: url.to_string(),
            query_string: Option::None,
            method: RequestMethod::GET(String::from("Hello"))
        }
    }
}
