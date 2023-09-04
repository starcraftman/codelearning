import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638884690/EducationHub/photos/bengali-village.jpg",
    address: "Some address, 1235 Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638884690/EducationHub/photos/bengali-village.jpg",
    address: "Some address, 1235 Some City",
    description: "This is a second meetup",
  },
  {
    id: "m3",
    title: "Third Meetup",
    image:
      "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638884690/EducationHub/photos/bengali-village.jpg",
    address: "Some address, 1235 Some City",
    description: "Third is a first meetup",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// Used for static site generation, will be cached at build
export async function getStaticProps() {
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        revalidate: 10
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
