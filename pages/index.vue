<template>
  <div class="notebook align-self-start flex-column">
    <Cell
      v-for="cell in cells"
      :key="cell.uuid"
      class="notebook__cell"
      :uuid="cell.uuid"
    />

    <v-btn
      id="cy-add-cell-button"
      fixed
      dark
      fab
      bottom
      right
      small
      color="purple"
      @click="addCell"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Cell from '~/components/Cell'

export default {
  components: {
    Cell
  },
  computed: {
    ...mapState('notebook', {
      cells: 'cells'
    })
  },
  methods: {
    ...mapMutations('notebook', ['addCell'])
  }
}
</script>

<style scoped>
.notebook {
  width: 100%;
}

.notebook__cell:not(:first-child) {
  margin-top: 1rem;
}
</style>
