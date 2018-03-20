import mongoose from 'mongoose'

const Coordinate = new mongoose.Schema({
  latitude: { type: Number },
  longitude: { type: Number },
})

const CoordinateModel = mongoose.model('Coordinate', Coordinate)

const SubSite = new mongoose.Schema({
  subsite_name: { type: String },
  edge_points: { type: [CoordinateModel] },
})

const SubsiteModel = mongoose.model('SubSite', SubSite)

const Site = new mongoose.Schema({
  site_name: { type: String },
  subsites: { type: [SubSiteModel] },
})

const SiteModel = mongoose.model('Site', Site)

export default { SubsiteModel, SiteModel }
