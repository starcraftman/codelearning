use super::method::RequestMethod;
use std::convert::TryFrom;

#[derive(Debug)]
pub struct Request {
    path: String,
    query_string: Option<String>,
    method: RequestMethod,
}

impl Request {
    pub fn test_get() -> Self {
        Request {
            path: "/index.html".to_string(),
            query_string: Some("color=green".to_string()),
            method: RequestMethod::GET("Hello".to_string()),
        }
    }
        // Request {
            // path: url.to_string(),
            // query_string: Option::None,
            // method: RequestMethod::GET(String::from("Hello"))
        // }
}

impl TryFrom<&[u8]> for Request {
    type Error = String;

    fn try_from(value: &[u8]) -> Result<Self, Self::Error> {
        Ok(Request::test_get())
    }
}

// Rust can extend any other type via traits, even your own
// trait Encrypt {
    // fn encrypt(&self) -> Self;
// }

// impl Encrypt for String {
    // fn encrypt(&self) -> Self {
        // println!("Encrypt");
        // self.to_string()
    // }
// }
