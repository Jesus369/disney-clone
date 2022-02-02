import { gql, GraphQLClient } from "graphql-request";

export default async ({ body }, res) => {
  const graphcms = new GraphQLClient(process.env.ENDPOINT, {
    headers: {
      Authorization: process.env.DISNEY_TOKEN
    }
  });

  const updateMutation = gql`
    mutation($slug: String!) {
      updateVideo(where: { slug: $slug }, data: { seen: false }) {
        id
        title
        seen
      }
    }
  `;

  const publishVideo = gql`
    mutation publishVideo($slug: String!) {
      publishVideo(where: { slug: $slug }, to: PUBLISHED) {
        slug
      }
    }
  `;

  await graphcms.request(
    `
  mutation($slug: String!) {
    updateVideo(where: { slug: $slug }, data: { seen: false }) {
      id
      title
      seen
    }
  }
`,
    { slug: body.slug }
  );
  await graphcms.request(
    `
  mutation publishVideo($slug: String!) {
    publishVideo(where: { slug: $slug }, to: PUBLISHED) {
      slug
    }
  }
`,
    { slug: body.slug }
  );
};
