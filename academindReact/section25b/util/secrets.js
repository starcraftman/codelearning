import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

let ROOT = __filename;
while (path.basename(ROOT) !== "section25b") {
    ROOT = path.dirname(ROOT);
}

export function getDbUri() {
    return fs.readFileSync(path.join(ROOT, "dbUri.private"), 'utf-8')
}

const dbUri = getDbUri();
export function getDbClient() {
    return new MongoClient(dbUri);
}