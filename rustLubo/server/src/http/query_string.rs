use std::collections::HashMap;

// Example of query string format, multiple entries lead array: a=1&b=2&c&d=&e===&d=7&d=abc
pub struct QueryString <'buf> {
    data: HashMap<&'buf str, Value<'buf> >
}

pub enum Value <'buf> {
    Single(&'buf str),
    Multipl(Vec<&'buf str>),
}

impl<'buf> QueryString<'buf> {
    pub fn get(&self, key: &str) -> Option<&Value> {
        self.data.get(key)
    }
}
