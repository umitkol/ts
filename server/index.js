import express from 'express';
import graphqlHTTP from 'express-graphql';
import typeDefs from '../Schema';
import { makeExecutableSchema } from 'graphql-tools';

import Resolvers from '../graphql/resolvers';

var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongots', (err) => {
    if (err) throw new Error( err );
});

const PORT = 8080;

const app = express();

const persons = [
{ id: 1, firstName: 'Tom', lastName: 'Coleman' },
{ id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
{ id: 3, firstName: 'Mikhail', lastName: 'Novikov' }, 
];
const posts = [
{ id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
{ id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
{ id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
{ id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];
const tasks = [
{ id: 1, person: 1, title: 'Introduction to GraphQL', description: 'Introduction to GraphQL', urls: [], status: "OPEN", openDate: new Date(), closeDate: new Date(), deadlineDate: new Date(), requestDate: new Date() },
{ id: 2, person: 2, title: 'Welcome to Meteor', description: 'Introduction to GraphQL', urls: [], status: "OPEN", openDate: new Date(), closeDate: new Date(), deadlineDate: new Date(), requestDate: new Date() },
{ id: 3, person: 2, title: 'Advanced GraphQL', description: 'Introduction to GraphQL', urls: [], status: "OPEN", openDate: new Date(), closeDate: new Date(), deadlineDate: new Date(), requestDate: new Date() },
{ id: 4, person: 3, title: 'Launchpad is Cool', description: 'Introduction to GraphQL', urls: [], status: "OPEN", openDate: new Date(), closeDate: new Date(), deadlineDate: new Date(), requestDate: new Date() },
];
const projects = [
{ id: 1, ICTContact: 1, businessContact: 1, uxContact: 1, name: 'Introduction to GraphQL' },
{ id: 2, ICTContact: 1, businessContact: 1, uxContact: 1, name: 'Welcome to Meteor' },
{ id: 3, ICTContact: 2, businessContact: 1, uxContact: 1, name: 'Advanced GraphQL' },
{ id: 4, ICTContact: 3, businessContact: 1, uxContact: 1, name: 'Launchpad is Cool' },
];

const resolvers = {
    Query: {
        projects: () => projects,
        person: (id) => persons.find(person => person.find == id),
        persons: () => persons,
        task: (id) => tasks.find(task => task.find == id),
        tasks: () => tasks,
    },
    Mutation: {
        createPerson: (_, {input}) => {
            const doc = new Person(input);
            doc.save();
            return doc;
        }, 
        updatePerson: (_, {id, input}) => {
            return input;
        },
        addProject: (_, {input}) => {
            const doc = new Project(input);
            doc.save();
            return doc;
        },
        updateProject: (_, {_id, input}) => {
            Model.findOneAndUpdate({ _id }, { ...input } (err, doc) {
                if ( err ) {
                    throw new Error( err );
                }
            });
            const doc = new Project(input);
            doc.save();
            return doc;
        },

    }, 
    Person: {
        fullName: (person) => `${person.firstName} ${person.lastName}`
    },
    Project: {
        ICTContact: (project) => persons.find(person => person.id == project.ICTContact),
        businessContact: (project) => persons.find(person => person.id == project.businessContact),
        uxContact: (project) => persons.find(person => person.id == project.uxContact),
    },
    Task: {
        person: (task) => persons.find(person => person.id == task.person) 
    }
};


app.use('/graphql', graphqlHTTP({ 	
    schema: makeExecutableSchema({
        typeDefs,
        resolvers: Resolvers,
    }),
    graphiql: true
}));


app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));