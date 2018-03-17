var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Coordinate = new Schema({
    latitude: {type: Number},
    longitude: {type: Number}
});

var CoordinateModel = mongoose.model('Coordinate',Coordinate);

var SubSite = new Schema({
    _subsite_id: {type: mongoose.Model.ObjectId},
    subsite_name: {type: String},
    edge_points: {type: [CoordinateModel]}
});

var SubSiteModel = mongoose.model('SubSite',SubSite);

var Site = new Schema({
    _site_it: {type: mongoose.Model.ObjectId},
    site_name: {type: String},
    subsites: {type: [SubSiteModel]}
});

var SiteModel = mongoose.model('Site',Site);

var SiteTypes = {SubSiteModel, SiteModel};

module.exports = SiteTypes;