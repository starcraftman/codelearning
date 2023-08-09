const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input PostInputData {
        title: String!
        content: String!
        imageUrl: String!
    }

    type PostsData {
        totalItems: Int!
        posts: [Post!]!
    }

    type RootQuery {
        login(email: String!, password: String!) : AuthData
        getPosts: PostsData!
        getPost(postId: String!): Post!
    }
    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(input: PostInputData): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
