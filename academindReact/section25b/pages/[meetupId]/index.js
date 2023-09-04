import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  const meetup = {
    id: "m1",
    title: "First Meetup",
    image:
      "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638884690/EducationHub/photos/bengali-village.jpg",
    address: "Some address, 1235 Some City",
    description: "This is a first meetup",
  };
  return <MeetupDetail {...meetup} />;
};

export async function getStaticPaths() {
  const paths = ["m1", "m2", "m3"].map(x => { 
    return {params: { meetupId: x }}
  });
  return {
    paths: paths,
    fallback: false
  }
}

// Used for static site generation, will be cached at build
export async function getStaticProps(context) {
  // fetch data
  const meetupId = context.params.meetupId;

  // Use backend to fetch data for static build

  return {
      props: {
          meetup: {} 
      },
      revalidate: 10
  }
};

export default MeetupDetails;
