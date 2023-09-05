import MeetupDetail from "../../components/meetups/MeetupDetail";
import { getDbClient } from "../../util/secrets";
import { ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  console.log(props.meetup);
  return <MeetupDetail {...props.meetup} />;
};

export async function getStaticPaths() {
  const client = getDbClient();
  try {
      await client.connect();
      const meetupIds = await client
        .db()
        .collection("meetups")
        .find({}, {_id: 1})
        .toArray();

      const paths = meetupIds.map(x => { 
        return {params: { meetupId: x._id.toString() }}
      });
      return {
        paths: paths,
        fallback: false
      }

  } finally {
      client.close();
  }
}

// Used for static site generation, will be cached at build
export async function getStaticProps(context) {
  // fetch data
  const meetupId = context.params.meetupId;

  // Use backend to fetch data for static build
  const client = getDbClient();
  try {
      await client.connect();
      const meetup = await client
        .db()
        .collection("meetups")
        .findOne({_id: new ObjectId(meetupId)});

        return {
          props: {
              meetup: {
                ...meetup,
                _id: meetup._id.toString(),
                id: meetup._id.toString()
              } 
          },
          revalidate: 10
      }

  } finally {
      client.close();
  }
};

export default MeetupDetails;
