type Query {
  readContract(contractId: ID!): Contract
  readContractComponent(contractComponentId: ID!): ContractComponent
}

type Contract {
  id: ID!
  name: String!
  description: String!
  components: [ContractComponent]!
}

type ContractComponent {
  id: ID!
  name: String!
  description: String!
}
