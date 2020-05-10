import Vue from 'vue'
import * as R from 'ramda'
import { uuid } from 'uuidv4'

const Cell = () => ({
  uuid: uuid(),
  query: '',
  data: null,
  error: ''
})

export const state = () => ({
  cells: []
})

export const mutations = {
  addCell(state) {
    Vue.set(state, 'cells', [...state.cells, Cell()])
  },
  updateCell(state, { uuid, payload }) {
    const index = state.cells.findIndex((cell) => cell.uuid === uuid)
    const properties = R.mergeDeepRight(state.cells[index], payload)
    Vue.set(state.cells, index, properties)
  }
}
