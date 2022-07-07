import { gql } from '@apollo/client';

export const GET_CHARS = gql`
  query ($page: Int!, $gender: String!, $species: String!) {
    characters(page: $page, filter: { gender: $gender, species: $species }) {
      results {
        id
        name
        species
        image
        location {
          name
        }
        gender
      }
      info {
        count
      }
    }
  }
`;
