const fastify = require('fastify')();
const gql = require('fastify-gql');
const schema = require('./schema');
const data = require('./data');

fastify.register(gql, {
  schema,
  resolvers: {
    Query: {
      readContract: (root, args, context, info) => {
        const contractId = args.contractId;
        return data.contracts.find((contract) => contract.id === contractId) || null;
      },
      readContractComponent: (root, args, context, info) => {
        const contractComponentId = args.contractComponentId;
        return data.contractComponents.find((component) => component.id === contractComponentId) || null;
      },
    },
  },
});

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
