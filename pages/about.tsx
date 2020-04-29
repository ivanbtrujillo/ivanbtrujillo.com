import { Layout, User, Paragraph } from "components";

const user = {
  name: "Iván",
  lastName: "Trujillo",
};
const About = () => (
  <Layout title="About">
    <div className="page">
      <User imageUrl="/images/ivan.png" user={user} className="mb-8" />
      <div className=" px-6 md:px-32  ">
        <div className="sm:text-center lg:text-left">
          <Paragraph>
            I am originally from Fasnia, Tenerife 🏝 and currently live in El
            Sauzal, located in the north. I have been in the development world
            since 2014 when I finished my studies as Cross-platform Application
            Developer 📚.
          </Paragraph>
          <Paragraph>
            Where I have really found the training I need has been in books, by
            meeting new developers and doing courses on different on-line
            platforms 👨‍💻. During this time I fell in love with Javascript and
            the possibility of creating applications for any platform using the
            same language.
          </Paragraph>
          <Paragraph>
            This additional training allowed me in 2016 to start working as
            Frontend Feveloper at Blue Sky Technology 🤘, role that later
             becames Frontend Lead. During this time I started to work with
            Angular 4 and Ionic, and once I became Lead, we migrated to React
            and React Native. I was happy with my job, but I wanted to continue
            growing so I didn't stop learning 🤓.
          </Paragraph>
          <Paragraph>
            At the end of 2018 I joined Expero as Intermediate Frontend
            Developer 🚀🇺🇸. Expero is an American company located in Houston
            that performs developments for the main companies in the country.
            Joining them allowed me to be much more independent, to learn from
            great professionals and continue training myself and growing.
          </Paragraph>
          <Paragraph>
            In January 2020 we celebrate the annual summit in Houston ✈️, where
            I was awarded by the company with a Rising Star, a bonus and a
            promotion to Senior Frontend 🏆. This recognition is special for me
            since it is based on feedback they get from people that have worked
            with me 🤝.
          </Paragraph>
          <Paragraph>
            Currently I continue working and learning. Feel free to talk with me
            via my RRSS 😜.
          </Paragraph>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
