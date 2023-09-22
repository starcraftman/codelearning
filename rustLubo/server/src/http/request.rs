use super::method::{RequestMethod, MethodError};
use super::QueryString;
use std::convert::TryFrom;
use std::error::Error;
use std::fmt::{Debug, Display, Formatter, Result as FmtResult};
use std::str;
use std::str::Utf8Error;

#[derive(Debug)]
pub struct Request<'buf> {
    path: &'buf str,
    query_string: Option<QueryString<'buf> >,
    method: RequestMethod,
}

impl<'buf> Request <'buf> {
    pub fn test_get() -> Self {
        Request {
            path: "/index.html",
            query_string: Some(QueryString::from("color=green")),
            method: RequestMethod::GET,
        }
    }
}

impl<'buf> TryFrom<&'buf [u8]> for Request<'buf> {
    type Error = ParseError;

    // Sample buffer: GET /search?name=abc&sort=1 HTTP/1.1
    fn try_from(buf: &'buf [u8]) -> Result<Request<'buf>, Self::Error> {
        let request = str::from_utf8(buf)?;
        let (method, request) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;
        let (mut path, request) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;
        let (protocol, _) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;

        if protocol != "HTTP/1.1" {
            return Err(ParseError::InvalidProtocol)
        }

        let method: RequestMethod = method.parse()?;
        let mut query_string = None;
        if let Some(ind) = path.find('?') {
            query_string = Some(QueryString::from(&path[ind + 1..]));
            path = &path[..ind];
        }

        Ok(Request { method, path, query_string })
    }
}

// Return new word, remainder
fn get_next_word(request: &str) -> Option<(&str, &str)> {
    for (ind, chr) in request.chars().enumerate() {
        if chr == ' ' || chr == '\r' {
            return Some((
                &request[..ind],
                &request[ind + 1..] // space is 1 byte so safe to add 1
            ))
        }
    }

    None
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

impl From<Utf8Error> for ParseError {
    fn from(_: Utf8Error) -> Self {
        Self::InvalidProtocol
    }
}

impl From<MethodError> for ParseError {
    fn from(_: MethodError) -> Self {
        Self::InvalidMethod
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

// let text = str::from_utf8(buf).or(Err(ParseError::InvalidEncoding))?; // Return unwrapped Ok() OR any
                                                                        // Err that came in
