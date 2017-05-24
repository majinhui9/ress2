import _ from 'lodash'
// eslint-disable-next-line camelcase
import { getSensors } from './sensor.api'
// Schema
/*
  serial: {
    type: String,
    // unique: true,
    required: true
  },
  sematic: {
    type: String, // sensormeta
    required: true
  },
  usage: {
    type: String, // override usage of sensormeta
    default: ''
  },
  bindType: String, // pos, gps, posGps, user, train, device
  pos: Number, // fixed pos will has pos
  latiLon: [Number], // fixed gps will has latiLon, posGps will has both pos and gps
  bindLable: String // bindLable help to show this bind
*/
const state = {
  sensors: []
}

const mutations = {
  SET_SENSORS(state, items) {
    if (_.isArray(items)) {
      state.sensors = items
    } else if (_.isObject(items)) {
      state.sensors.push(items)
    }
  },
  // set project
  ADD_SENSOR(state, item) {
    state.sensors.push(item)
  },
  // after logout
  CLEAR_SENSORS(state) {
    _.remove(state.sensors, (item) => { return true })
  }
}

const actions = {
  // get sensors info
  fetchSensors({ commit, dispatch, state }, url, query) {
    return getSensors(url, query).then((data) => {
      console.log(data)
      commit('SET_SENSORS', data.result)
    })
  }
}

const getters = {
  sensors(state) {
    return state.sensors
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
