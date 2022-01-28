import { gql, GraphQLClient } from "graphql-request";

export const getServerSideProps = async pctx => {
  const pageSlug = pctx.query.slug;
  const url = process.env.ENDPOINT;
  const GQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.DISNEY_TOKEN
    }
  });
  const getVideo = gql`
    query($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const variables = {
    pageSlug
  };

  const data = await GQLClient.request(getVideo, variables);
  const video = data.video;
  console.log(video);
  return {
    props: {
      video
    }
  };
};

const Video = ({ video }) => {
  console.log(video);
  return <div>hello</div>;
};

export default Video;
