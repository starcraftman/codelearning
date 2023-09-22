use std::fmt::{Debug, Formatter, Result as FmtResult, Display};
use std::collections::HashMap;

// Example of query string format, multiple entries lead array: a=1&b=2&c&d=&e===&d=7&d=abc
pub struct QueryString <'buf> {
    data: HashMap<&'buf str, Value<'buf> >
}

pub enum Value <'buf> {
    Single(&'buf str),
    Multiple(Vec<&'buf str>),
}

impl<'buf> QueryString<'buf> {
    pub fn get(&self, key: &str) -> Option<&Value> {
        self.data.get(key)
    }
}

impl <'buf> From<&'buf str> for QueryString<'buf> {
    fn from(text: &'buf str) -> Self {
        let mut data = HashMap::new();

        for part in text.split('&') {
            let mut key = part;
            let mut val = "";
            if let Some(ind) = part.find('=') { key = &part[..ind];
                val = &part[ind + 1..];
            }

            data.entry(key)
                .and_modify(|existing: &mut Value| match existing {
                    Value::Single(prev_value) => {
                        let vec: Vec<&'buf str> = vec![prev_value, val];
                        *existing = Value::Multiple(vec);
                    },
                    Value::Multiple(vec) => vec.push(val),
                })
                .or_insert(Value::Single(val));
        }

        QueryString { data }
    }
}

impl <'buf> Debug for QueryString<'buf> {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        let mut result: FmtResult = write!(f, "QueryString HashMap follows:");
        for (key, val) in &self.data {
            match val {
                Value::Single(val)  => {
                    result = write!(f, "{}={}", key, val);
                },
                Value::Multiple(vec)  => {
                    result = write!(f, "{}=(first){}", key, vec[0]);
                },
            }
        }

        result
    }
}

impl <'buf> Display for QueryString<'buf> {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        let mut result: FmtResult = write!(f, "QueryString HashMap(");
        for (key, val) in &self.data {
            match val {
                Value::Single(val)  => {
                    result = write!(f, "{}={}, ", key, val);
                },
                Value::Multiple(vec)  => {
                    result = write!(f, "{}=(first){}, ", key, vec[0]);
                },
            }
        }

        write!(f, ")")
    }

}
