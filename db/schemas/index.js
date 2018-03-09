var mongoose = require('mongoose');
var { Projet, Person } = require('../models');

var PersonSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
});

var ProjectSchema = mongoose.Schema({
    name : String,
    ICTContact: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person'
    },
    businessContact: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person'
    },
    uxContact: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person'
    }
});

var ProjectSchemaPreFind = function( next ) {
    this.populate('ICTContact businessContact uxContact');
    next();
};

ProjectSchema.pre('find', ProjectSchemaPreFind);
ProjectSchema.pre('findOne', ProjectSchemaPreFind);

var TaskSchema = mongoose.Schema({
    title : String,
    description : String,
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    },
    person: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person'
    },
    urls : Array,
    capabilities: {
        type: String,
        enum: ['OPEN', 'CLOSED', 'PENDING', 'INPROGRESS'],
        default: ['OPEN']
    },
    requestDate: mongoose.Schema.Types.Date,
    openDate: mongoose.Schema.Types.Date,
    closeDate: mongoose.Schema.Types.Date,
    deadlineDate: mongoose.Schema.Types.Date
});

module.exports = {
    PersonSchema,
    ProjectSchema,
    TaskSchema
}