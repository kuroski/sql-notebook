<template>
  <div>
    <el-row v-for="cell in cells" :key="cell.uuid">
      <Cell :uuid="cell.uuid" />
    </el-row>
    <el-button @click="addCell">
      <i class="el-icon-circle-plus" />
    </el-button>
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
