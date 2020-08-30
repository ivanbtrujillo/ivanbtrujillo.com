import { Layout, User, Paragraph } from "components";
import { user } from "constants/user";
import { about } from "constants/texts";

const About = () => (
  <Layout>
    <div className="page">
      <User user={user} className="mb-8" />
      <div className=" px-6 md:px-32  ">
        <div className="sm:text-center lg:text-left">
          <Paragraph>{about}</Paragraph>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
