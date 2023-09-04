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

export default MeetupDetails;
