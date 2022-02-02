import { gql, GraphQLClient } from "graphql-request";
import Link from "next/Link";
import Section from "../components/Section";
import Navbar from "../components/Navbar";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;

  const GQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.DISNEY_TOKEN
    }
  });

  const query = gql`
    query {
      videos {
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "ckynqxdug018y0b25vxnw67lp" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await GQLClient.request(query);
  const videos = data.videos;

  const accountData = await GQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account
    }
  };
};

const Home = ({ videos, account }) => {
  const randomVideo = videos => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter(video => video.tags.includes(genre));
  };

  const unSeenVideos = videos => {
    return videos.filter(video => video.seen === false || videos.seen === null);
  };

  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>

        <div className="video-feed">
          <Link href="#disney">
            <a className="franchise">
              <div id="disney">DISNEY</div>
            </a>
          </Link>
          <Link href="#pixar">
            <a className="franchise">
              <div id="pixar">PIXAR</div>
            </a>
          </Link>
          <Link href="#star-wars">
            <a className="franchise">
              <div id="star-wars">STAR WARS</div>
            </a>
          </Link>
          <Link href="#nat-geo">
            <a className="franchise">
              <div id="nat-geo">NATIONAL GEOGRAPHY</div>
            </a>
          </Link>
          <Link href="#marvel">
            <a className="franchise">
              <div id="marvel">MARVEL</div>
            </a>
          </Link>
        </div>

        <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
        <Section genre={"action"} videos={filterVideos(videos, "family")} />
        <Section genre={"comedy"} videos={filterVideos(videos, "comedy")} />
        <Section genre={"family"} videos={filterVideos(videos, "family")} />
        <Section genre={"fantasy"} videos={filterVideos(videos, "fantasy")} />
        <Section
          genre={"superhero"}
          videos={filterVideos(videos, "superhero")}
        />
        <Section
          id="disney"
          genre={"Disney"}
          videos={filterVideos(videos, "disney")}
        />
        <Section
          id="pixar"
          genre={"Pixar"}
          videos={filterVideos(videos, "pixar")}
        />
        <Section
          id="star-wars"
          genre={"Star Wars"}
          videos={filterVideos(videos, "star-wars")}
        />
        <Section
          id="nat-geo"
          genre={"National Geography"}
          videos={filterVideos(videos, "nat-geo")}
        />
        <Section
          id="marvel"
          genre={"Marvel"}
          videos={filterVideos(videos, "marvel")}
        />
      </div>
    </>
  );
};

export default Home;
