// /api/new-meetup
import { MongoClient } from "mongodb";
import { getDbUri } from "../../util/secrets";

const client = new MongoClient(getDbUri());

const handler = async (req, res) => {
    const data = JSON.parse(req.body);
    console.log(data);

    if (req.method !== "POST") {
        return res.status(403).json({
            message: "Denying service."
        })
    }

    if (!data) {
        return res.status(422).json({
            message: "Missing fields information."
        })
    }

    try {
        await client.connect();
        const result = await client.db().collection("meetups").insertOne({...data});
        console.log(result);
    } finally {
        client.close();
    }

    return res.status(201).json({
        message: "Meetup inserted"
    })
};

export default handler;