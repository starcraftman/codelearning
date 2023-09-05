import MeetupList from "../components/meetups/MeetupList";
import { getDbClient } from "../util/secrets";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}


// Used for static site generation, will be cached at build
export async function getStaticProps() {
  const client = getDbClient();
  try {
      await client.connect();
      const meetups = await client
        .db()
        .collection("meetups")
        .find({})
        .toArray();
      console.log(meetups);

        return {
          props: {
              meetups: meetups.map((x) => {
                return {
                  id: x._id.toString(),
                  title: x.title,
                  image: x.image,
                  address: x.address,
                  description: x.description,
                }
              })
          },
          revalidate: 10
      }  
  } finally {
      client.close();
  }
};

// export async function getServerSideProps(context) {
//     console.log(context.req, context.res);
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         }
//     }
// };

export default HomePage;
