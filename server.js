const express = require("express");
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server-express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

// connect mongoose to DB
mongoose.connect('mongodb://localhost:27017/graphqlDB', {useNewUrlParser: true});

// 
const User = mongoose.model('User', { name: String });

const typeDefs = gql`
    type Query{
        users: [User!]!
        user(name: String!):User!
    }

    type User{
        _id: String
        name: String!
    }

    type Mutation{
        createUser(name : String!): User
        updateUser(name : String!, newName : String!): User
    }
`

const resolvers = {
    Query: {
        users: async () => {
            const result = await User.find();
            result.map((user,i) => {
                const userObj = user.toObject();
                userObj._id = userObj._id.toString();
                result[i] = userObj
            })
            return result;
        },
    
        user: async (parent,{name}) => {
            const result = await User.findOne({name});
            const userObj = user.toObject();
                userObj._id = userObj._id.toString();
           
            return userObj;
        }
    },

    Mutation: {
        createUser: async (parent,{name}) => {
            console.log("in mutation")
           const newuser = new User({
               name
           });
           const user = await newuser.save();
           const userObj = user.toObject();
           userObj._id = userObj._id.toString();
           console.log("result", userObj);
           return userObj;
        },

        updateUser: async(parent,{name,newName}) => {
           const user = await User.findOneAndUpdate({name}, {name: newName}, {new: true});
           const userObj = user.toObject();
           userObj._id = userObj._id.toString();
           console.log("result", userObj);
           return userObj;
        }
        
    }

}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
app.use(bodyParser.json());

server.applyMiddleware({app});

app.listen(3001, ()=> {
    console.log("server running in "+server.graphqlPath)
})
