import _ from 'lodash'
// eslint-disable-next-line camelcase
import { getFronts } from './front.api'
// schema
/*
  proto: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  },
  // Dtu may may has same meta with sensor, which means sensor and senor stu are one
  sensorDtuMeta: {
    type: String,
    required: true
  },
  sensorMeta: {
    type: String,
    required: true
  }
*/
const state = {
  fronts: []
}

const mutations = {
  SET_FRONTS(state, items) {
    if (_.isArray(items)) {
      state.fronts = items
    } else if (_.isObject(items)) {
      state.fronts.push(items)
    }
  },
  // set project
  ADD_FRONT(state, item) {
    state.fronts.push(item)
  },
  // after logout
  CLEAR_FRONTS(state) {
    _.remove(state.fronts, (item) => { return true })
  }
}

const actions = {
  // get fronts info
  fetchFronts({ commit, dispatch, state }, url, query) {
    return getFronts(url, query).then((data) => {
      console.log(data)
      commit('SET_FRONTS', data.result)
    })
  }
}

const getters = {
  fronts(state) {
    return state.fronts
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
