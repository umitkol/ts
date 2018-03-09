var mongoose = require('mongoose');
var { ProjectSchema, TaskSchema, PersonSchema } = require('../schemas');

module.exports = {
    Project: mongoose.model( 'Project', ProjectSchema ),
    Task: mongoose.model( 'Task', TaskSchema),
    Person: mongoose.model( 'Person', PersonSchema )
}