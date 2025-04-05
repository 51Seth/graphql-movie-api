// Step 1: Import required modules
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

// Step 2: Create an Express app
const app = express();
app.use(cors());

// Step 3: Sample in-memory data
const movies = [
  { id: "1", title: "Inception", director: "Christopher Nolan", releaseYear: 2010 },
  { id: "2", title: "Interstellar", director: "Christopher Nolan", releaseYear: 2014 }
];

// Step 4: Define GraphQL schema
const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    director: String!
    releaseYear: Int!
  }

  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
  }

  type Mutation {
    addMovie(title: String!, director: String!, releaseYear: Int!): Movie
  }
`;

// Step 5: Define resolvers
const resolvers = {
  Query: {
    getMovies: () => movies,
    getMovie: (_, { id }) => movies.find(movie => movie.id === id)
  },
  Mutation: {
    addMovie: (_, { title, director, releaseYear }) => {
      const newMovie = { id: String(movies.length + 1), title, director, releaseYear };
      movies.push(newMovie);
      return newMovie;
    }
  }
};

// Step 6: Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Step 7: Start the server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
}

startServer();
