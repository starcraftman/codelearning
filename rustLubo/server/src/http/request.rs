use super::method::RequestMethod;
use std::convert::TryFrom;
use std::error::Error;
use std::fmt::{Debug, Display, Formatter, Result as FmtResult};

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
}

impl TryFrom<&[u8]> for Request {
    type Error = ParseError;

    fn try_from(buf: &[u8]) -> Result<Self, Self::Error> {
        Ok(Request::test_get())
    }
}

pub enum ParseError {
    InvalidRequest,
    InvalidEncoding,
    InvalidProtocol,
    InvalidMethod,
}

impl ParseError {
    fn message(&self) -> &str {
        match self {
            Self::InvalidRequest => "Invalid Request",
            Self::InvalidEncoding => "Invalid Encoding",
            Self::InvalidProtocol => "Invalid Protocol",
            Self::InvalidMethod => "Invalid Method",
        }
    }
}

impl Display for ParseError {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        write!(f, "{}", self.message())
    }
}

impl Debug for ParseError {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        write!(f, "{}", self.message())
    }
}

impl Error for ParseError { }

/*
 * Notes from lectures
 */

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
