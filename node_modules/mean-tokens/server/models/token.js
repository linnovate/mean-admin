'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Token Schema
 */
var TokenSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        trim: true,
        unique: true
    },
    content: {
        type: Object,
        default: {en: ''}
    },
    categories: [{
        type: String,
    }]
});

/**
 * Validations
 */
TokenSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
TokenSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

TokenSchema.statics.search = function(title, cb) {
    this.findOne({
        title: title
    }).exec(cb);
};

TokenSchema.statics.searchByCategory = function(category, cb) {
    this.find({
        categories : { $in: [category ] } 
    }).exec(cb);
};

mongoose.model('Token', TokenSchema);