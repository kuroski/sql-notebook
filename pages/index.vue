<template>
  <div class="notebook align-self-start flex-column">
    <Cell
      v-for="cell in cells"
      :key="cell.uuid"
      class="notebook__cell"
      :uuid="cell.uuid"
    />

    <v-row>
      <v-btn @click="addCell">
        <v-icon>mdi-table-plus</v-icon>
      </v-btn>
    </v-row>
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
