use std::fmt::{Debug, Display, Formatter, Result as FmtResult};
use std::str::FromStr;

#[derive(Debug)]
pub enum RequestMethod {
    GET,
    DELETE,
    POST,
    PUT,
    HEAD,
    CONNECT,
    OPTIONS,
    TRACE,
    PATCH,
}

impl FromStr for RequestMethod {
    type Err = MethodError;

    fn from_str(text: &str) -> Result<Self, Self::Err> {
        match text {
            "GET" => Ok(Self::GET),
            "DELETE" => Ok(Self::DELETE),
            "POST" => Ok(Self::POST),
            "PUT" => Ok(Self::PUT),
            "HEAD" => Ok(Self::HEAD),
            "CONNECT" => Ok(Self::CONNECT),
            "OPTIONS" => Ok(Self::OPTIONS),
            "TRACE" => Ok(Self::TRACE),
            "PATCH" => Ok(Self::PATCH),
            _ => Err(MethodError),
        }
    }
}

impl Display for RequestMethod {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        let method = match self {
            RequestMethod::GET => "GET",
            RequestMethod::DELETE => "DELETE",
            RequestMethod::POST => "POST",
            RequestMethod::PUT => "PUT",
            RequestMethod::HEAD => "HEAD",
            RequestMethod::CONNECT => "CONNECT",
            RequestMethod::OPTIONS => "OPTIONS",
            RequestMethod::TRACE => "TRACE",
            RequestMethod::PATCH => "PATCH",
        };
        write!(f, "RequestMethod: {}", method)
    }
}

pub struct MethodError ;

/*
 * Notes from lectures
 */

// Can implement enums to take different values on creation, size used is maximum storage needed.
// pub enum RequestMethod {
    // GET(String),
    // DELETE(u64),
// }
