'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoleSchema = new Schema({
    role: {
        type: String
    }
});

RoleSchema.path('role').validate(function(role) {
    return !!role;
}, 'Role name cannot be blank!');

mongoose.model('Role', RoleSchema);
