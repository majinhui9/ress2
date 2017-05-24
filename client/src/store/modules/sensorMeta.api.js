import Vue from 'vue'

export function getSensorMetas(urlPath, query) {
  const uri = '/api' + urlPath
  return Vue.http.get(uri).then(res => res.json())
}
