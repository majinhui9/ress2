import Vue from 'vue'
// projects resource
export const project = Vue.resource('project{/_id}')
  // users resource
export const user = Vue.resource('user{/_id}', {}, {
  changePassword: { method: 'put', url: 'user{/id}/password' }
})

export const org = Vue.resource('org{/_id}')
export const front = Vue.resource('front{/_id}')
export const sensorMeta = Vue.resource('sensormeta{/_id}')
export const sensor = Vue.resource('sensor{/_id}')
export const role = Vue.resource('role{/_id}')
