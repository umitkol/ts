const {Project, Person, Task} = require('../../db/models');

export default {
  Query: {
	projects: async () => await Project.find().exec(),
	
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
  		doc.save();
  		return doc;
  	}, 
  	updatePerson: (_, {id, input}) => {
  		return input;
  	},
  	createProject: (_, {input}) => {
  		const doc = new Project(input);
  		doc.save();
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