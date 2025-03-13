const { ApolloServer, gql } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const fs = require('fs');
const pubsub = new PubSub();
let products = [];
const productsFilePath = './data/products.json';
fs.readFile(productsFilePath, (err, data) => {
    if (!err) {
        try {
            products = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            products = [];
        }
    }
});
const typeDefs = gql`
    type Product {
        id: Int
        name: String
        price: Int
        description: String
        category: [String]
    }
    type Query {
        products: [Product]
    }
`;
const resolvers = {
    Query: {
        products() {return products}
    }
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});