import _ from 'lodash'
// eslint-disable-next-line camelcase
import { getProjects } from './project.api'
// schema
/*
  proj: {
    type: String,
    required: true,
    unique: true
  },

  displayName: {
    type: String,
    required: true,
    unique: true
  },

  builder: {
    type: String // which org build this project
  },
  location: {
    type: String
  },
  baseLonLat: [Number], // lat, lon
  appTitle: {
    type: String
  },
  appSubTitle: {
    type: String
  },
  appIcon: {
    type: String    // base64 encoded data uri
  },

  latlanPos: [Number], // lat/lan of project, should be even counts

  manager: String,

  timePlanbegin: { type: Date, default: Date.now },
  timePlanend: { type: Date, default: Date.now },

  timebegin: { type: Date, default: Date.now },
  timeend: { type: Date },

  org: String, // which orgnization own it
  owner: String, // which org own it

  actived: { type: Number, default: 0 },
  departments: [String],
  //
  hasBranchSensor: { type: Number, default: 0 },
  enableWarning: { type: Number, default: 1 }, // global all trains
  warnToTrain: { type: Number, default: 1 },
  warningInterval: { type: Number, default: 30 }, // time in secs

  sectorWarnStage: { type: [Number], default: [800, 300, 100] },
  speedLimitWarnStage: { type: [Number], default: [800, 300, 100] },
  nearWarnStage: { type: [Number], default: [800, 300, 100] }, //
*/
const state = {
  projects: []
}

const mutations = {
  SET_PROJECT(state, items) {
    if (_.isArray(items)) {
      state.projects = items
    } else if (_.isObject(items)) {
      state.projects.push(items)
    }
  },
  // set project
  ADD_PROJECT(state, item) {
    state.projects.push(item)
  },
  // after logout
  CLEAR_PROJECT(state) {
    _.remove(state.projects, (item) => { return true })
  }
}

const actions = {
  // get projects info
  fetchProjects({ commit, dispatch, state }, url, query) {
    return getProjects(url, query).then((data) => {
      console.log(data)
      commit('SET_PROJECT', data.result)
    })
  }
}

const getters = {
  projects(state) {
    return state.projects
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
