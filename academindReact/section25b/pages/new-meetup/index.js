import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetup() {
    const router = useRouter();
    const addMeetupHandler = async (meetupData) => {
        console.log(meetupData);
        const resp = await fetch("/api/new-meetup", {
            method: "POST",
            headers: {
                "Content-Type": "applciation/json"
            },
            body: JSON.stringify(meetupData)
        });

        const data = await resp.json();
        console.log(data);
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>Add A Meetup</title>
                <meta name="description" content="Add a new meetup for others to see" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
}

export default NewMeetup;