import VlogClient from "../Components/VlogClient";


export const metadata = {
  title: "Vlog | Abhi Services",
  description:
    "Watch our latest vlogs and behind-the-scenes content about our web development process, AI innovations, and digital products.",
  alternates: {
    canonical: "https://abhi.services/vlog",
  },
};

const VlogPage = () => {
  return <VlogClient/>;
}

export default VlogPage;