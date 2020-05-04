import Vue from 'vue'

export const state = () => ({
  host: null,
  username: null,
  password: null,
  database: null,
  port: null
})

export const mutations = {
  setHost(state, host) {
    Vue.set(state, 'host', host)
  },
  setUsername(state, username) {
    Vue.set(state, 'username', username)
  },
  setPassword(state, password) {
    Vue.set(state, 'password', password)
  },
  setDatabase(state, database) {
    Vue.set(state, 'database', database)
  },
  setPort(state, port) {
    Vue.set(state, 'port', port)
  }
}
