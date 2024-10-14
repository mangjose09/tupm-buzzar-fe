import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { RocketLaunchIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const DEVELOPERS = [
  {
    name: 'Jose "Madman" Domingo',
    image: "/Madman.jpg",
    role: "Frontend Developer",
  },
  {
    name: 'Jose "Madman" Domingo',
    image: "/Madman.jpg",
    role: "Backend Developer",
  },
  {
    name: 'Jose "Madman" Domingo',
    image: "/Madman.jpg",
    role: "UI/UX Designer",
  },
  {
    name: 'Jose "Madman" Domingo',
    image: "/Madman.jpg",
    role: "Product Manager",
  },
  {
    name: 'Jose "Madman" Domingo',
    image: "/Madman.jpg",
    role: "QA/Tester",
  },
];

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen px-6 py-5 md:px-24 md:py-10 space-y-10">
        <header className="w-full text-center">
          <Typography variant="h2">About Us</Typography>
          <Typography variant="lead">
            One site for all your college needs.
          </Typography>
        </header>
        <section className="grid md:grid-cols-2 gap-5">
          <Card className="w-full">
            <CardBody>
              <Typography
                variant="h4"
                color="blue-gray"
                className="flex items-center mb-2"
              >
                <RocketLaunchIcon className="h-5 w-5 mr-2" />
                Our mission
              </Typography>
              <Typography variant="paragraph">
                Integer fermentum, neque in blandit elementum, elit dui congue
                nibh, eget luctus erat dui ut nulla. Aenean felis sem, faucibus
                nec orci a, malesuada sodales risus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Suspendisse tincidunt a nisl sed fermentum.
                Vestibulum feugiat lacus eu diam.
              </Typography>
            </CardBody>
          </Card>
          <Card className="w-full">
            <CardBody>
              <Typography
                variant="h4"
                color="blue-gray"
                className="flex items-center mb-2"
              >
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                Our vision
              </Typography>
              <Typography variant="paragraph">
                Fusce justo dolor, pellentesque a blandit a, ullamcorper nec
                arcu. Mauris aliquam molestie dolor id tincidunt. In hac
                habitasse platea dictumst. Cras eu consectetur tellus. Sed et
                risus egestas, fermentum lectus et, tincidunt velit. Integer
                tempor est eu libero vehicula, in elementum velit gravida. Proin
                sodales magna a diam interdum.
              </Typography>
            </CardBody>
          </Card>
        </section>
        <section className="space-y-4">
          <Typography variant="h3" className="text-center">
            Meet Our Team
          </Typography>
          <article className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEVELOPERS.map((developer) => (
              <Card key={developer.name} className="w-full">
                <CardHeader floated={false}>
                  <img
                    className="object-cover object-top w-full h-[150px]"
                    src={developer.image}
                    alt={developer.name}
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    {developer.name}
                  </Typography>
                  <Typography variant="subtitle2" color="gray-600">
                    {developer.role}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
