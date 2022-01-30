import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";

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

  const data = await GQLClient.request(query);
  const videos = data.videos;
  return {
    props: {
      videos
    }
  };
};

const Home = ({ videos }) => {
  const randomVideo = videos => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter(video => video.tags.includes(genre));
  };

  const unSeenVideos = videos => {
    return videos.filter(video => video.seen == false || videos.seen == null);
  };

  return (
    <>
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>

        <div className="video-feed">
          <Section
            genre={"Recommended for you"}
            videos={unSeenVideos(videos)}
          />
          <Section genre={"action"} videos={filterVideos(videos, "family")} />
          <Section genre={"comedy"} videos={filterVideos(videos, "comedy")} />
          <Section genre={"family"} videos={filterVideos(videos, "family")} />
          <Section genre={"fantasy"} videos={filterVideos(videos, "fantasy")} />
          <Section
            genre={"superhero"}
            videos={filterVideos(videos, "superhero")}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
