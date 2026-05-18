import ServiceClient from "../Components/ServiceClient";

export const metadata = {
  title: "Services | Abhi Services",
  description:
    "Explore our range of web development, AI solutions, and digital products designed to elevate your online presence.",
  alternates: {
    canonical: "https://abhi.services/services",
  },
};

const ServicesPage = () => {
  return <ServiceClient/>;
}
export default ServicesPage;