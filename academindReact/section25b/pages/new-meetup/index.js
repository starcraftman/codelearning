import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

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
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    );
}

export default NewMeetup;