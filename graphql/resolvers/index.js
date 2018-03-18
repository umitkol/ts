const {Project, Person, Task} = require('../../db/models');

export default {
    Query: {
        projects: async () => {
            const projects = await Project.find().exec()
            if ( !projects ) {
            throw new Error("Document not found!")
            }
            return projects;
        },

        persons: async () => await Person.find().exec(),
        person: async ( _, { _id } ) => {
            const person = await Person.findOne({ _id }).exec();
            if ( !person ) {
            throw new Error("Document not found!")
            }
            return person;
        },

        tasks: async () => await Task.find().exec(),
        task: async ( _id ) => await Task.find({ _id }).exec(),
    },
    Mutation: {
        createPerson: (_, {input}) => {
            const doc = new Person(input);
            doc.save(( err ) => {
                console.log(err)
            });
            return doc;
        }, 
        updatePerson: (_, {_id, input}) => {
            console.log(_id, input)
            return Person.update({ _id }, input);
        },
        createProject: (_, {input}) => {
            const doc = new Project(input);
            doc.save(( err ) => {
                console.log(err)
            });
            return doc;
        },
    }, 
    Person: {
        fullName: ( person ) => `${person.firstName} ${person.lastName}`
    },
    Task: {
        person: (task) => persons.find(person => person.id == task.person) 
    }
}