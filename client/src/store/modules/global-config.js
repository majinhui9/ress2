import Vue from 'vue'
import _ from 'lodash'
import { lang, pageLimit } from '../../stored'
import { save } from '../../storage'
import { STORE_KEY_CONFIG_LANG, STORE_KEY_CONFIG_PAGE_LIMIT } from '../../constants'

const state = {
  lang: lang,
  // value see http://stackoverflow.com/questions/5580876/navigator-language-list-of-all-languages
  langs: [{
    label: '中文',
    value: 'zh-CN'
  }, {
    label: 'English',
    value: 'en'
  }],
  pageLimit: pageLimit,
  navs: [{
    index: '/project',
    lable: 'menu.projects',
    localized: false
  }, {
    index: '/org',
    lable: 'menu.orgs',
    localized: false
  }, {
    index: '/user',
    lable: 'menu.users',
    localized: false
  }, {
    index: '/role',
    lable: 'menu.roles',
    localized: false
  }, {
    index: '/sensormeta',
    lable: 'menu.sensormetas',
    localized: false
  }, {
    index: '/sensor',
    lable: 'menu.sensors',
    localized: false
  }, {
    index: '/front',
    lable: 'menu.fronts',
    localized: false
  }]
}

const mutations = {
  UPDATE(state, config) {
    state.lang = config.lang || state.lang
    state.pageLimit = config.pageLimit || state.pageLimit
  },
  UPDATE_LANG(state, lang) {
    state.lang = lang || state.lang
  },
  UPDATE_NAVS(state, navs) {
    if (_.isArray(navs)) {
      state.navs = navs
    } else if (_.isObject(navs)) {
      state.navs.push(navs)
    }
  }
}

const actions = {
  changeLang({ commit }, lang) {
    Vue.config.lang = lang
    commit('UPDATE_LANG', lang)
    save(STORE_KEY_CONFIG_LANG, lang)
  },
  updateGlobalConfig({ commit, state, dispatch }, config) {
    if (config.lang !== state.lang) {
      Vue.config.lang = config.lang
      save(STORE_KEY_CONFIG_LANG, config.lang)
    }
    commit('UPDATE', config)
    save(STORE_KEY_CONFIG_LANG, state.lang)
    save(STORE_KEY_CONFIG_PAGE_LIMIT, state.pageLimit)
  }
}

const getters = {
  globalConfig(state) {
    return state
  },
  navs(state) {
    return state.navs
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
