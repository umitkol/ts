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

    input PersonFilter {
        skip: Int
    }

    input ProjectInput {
        name: String!
        ICTContact: ID
        businessContact: ID
        uxContact: ID
    }

    type Project {
        _id: ID!
        name: String!
        ICTContact: Person
        businessContact: Person
        uxContact: Person
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
        persons( filter: PersonFilter ): [Person]
        tasks: [Task]
        task(id: ID!): Task
    }

    type Mutation {

        addProject(input: ProjectInput!): Project
        updateProject(_id: ID!, input: ProjectInput!): Project
        deleteProject(_id: ID!): Project

        addPerson(input: PersonInput!): Person
        updatePerson(_id: ID!, input: PersonInput!): Person
        deletePerson(_id: ID!): Person  

        addTask(input: TaskInput!): Task
        updateTask(_id: ID!, input: TaskInput!): Task
        deleteTask(_id: ID!): Task

    }
`;