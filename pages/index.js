import { gql, GraphQLClient } from "graphql-request";

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
  console.log(videos);
  return <div>Hello</div>;
};

export default Home;
