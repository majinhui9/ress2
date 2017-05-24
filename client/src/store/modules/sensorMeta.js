import _ from 'lodash'
// eslint-disable-next-line camelcase
import { getSensorMetas } from './sensorMeta.api'
/*
  sematic: {
    type: String,
    required: true,
    unique: true
  },
  model: {
    type: String,
    required: true,
    default: ''
  },
  usage: {
    type: String,
    required: true,
    default: ''
  },
  type: {
    type: Number, // 0 analog, 1 digital
    required: true,
    default: 0
  },
  plugin: {
    type: String, // sensor front plugin name, it should exports functions decode/schema/encode to decode fields set
    required: true,
    default: ''
  },
  dual: {
    type: Number, // 0 sigle up direction, 1 sigle down direction, 2 dual direction
    required: true,
    default: 0
  }
*/
const state = {
  sensorMetas: []
}

const mutations = {
  SET_SENSORMETAS(state, items) {
    if (_.isArray(items)) {
      state.sensorMetas = items
    } else if (_.isObject(items)) {
      state.sensorMetas.push(items)
    }
  },
  // set project
  ADD_SENSORMETA(state, item) {
    state.sensorMetas.push(item)
  },
  // after logout
  CLEAR_SENSORMETAS(state) {
    _.remove(state.sensorMetas, (item) => { return true })
  }
}

const actions = {
  // get sensorMetas info
  fetchSensorMetas({ commit, dispatch, state }, url, query) {
    return getSensorMetas(url, query).then((data) => {
      console.log(data)
      commit('SET_SENSORMETAS', data.result)
    })
  }
}

const getters = {
  sensorMetas(state) {
    return state.sensorMetas
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
