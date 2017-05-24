import Vue from 'vue'

export function getRoles(urlPath, query) {
  const uri = '/api' + urlPath
  return Vue.http.get(uri).then(res => res.json())
}
