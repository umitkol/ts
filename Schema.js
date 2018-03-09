export default `
    enum Task_Status {
        OPEN
        CLOSED
        PENDING
        INPROGRESS
    }

    input PersonInput {
        firstName: String
        lastName: String
    }

    type Person {
        _id: ID!
        firstName: String
        lastName: String
        fullName: String
    }

    input ProjectInput {
        name: String!
        ICTContact: ID!
        businessContact: ID!
        uxContact: ID!
    }

    type Project {
        id: ID!
        name: String!
        ICTContact: Person!
        businessContact: Person!
        uxContact: Person!
    }

    input TaskInput {
        title: String!
        description: String!
        project: ID!
        person: ID!
        urls: [Url]
        status: Task_Status!
        requestDate: Date!
        openDate: Date!
        closeDate: Date!
        deadlineDate: Date!
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        project: Project!
        person: Person!
        urls: [Url]
        status: Task_Status!
        requestDate: Date!
        openDate: Date!
        closeDate: Date!
        deadlineDate: Date!
    }

    scalar Url
    scalar Date

    type Query {
        projects: [Project]
        person(_id: ID!): Person
        persons: [Person]
        tasks: [Task]
        task(id: ID!): Task
    }

    type Mutation {

        createProject(input: ProjectInput!): Project
        updateProject(id: ID!, input: ProjectInput!): Project
        deleteProject(id: ID!): Project

        createPerson(input: PersonInput!): Person
        updatePerson(id: ID!, input: PersonInput!): Person
        deletePerson(id: ID!): Person

        createTask(input: TaskInput!): Task
        updateTask(id: ID!, input: TaskInput!): Task
        deleteTask(id: ID!): Task

    }
`;