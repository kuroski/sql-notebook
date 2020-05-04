<template>
  <div>
    <el-row v-for="cell in cells" :key="cell">
      <el-col>
        <Cell />
      </el-col>
    </el-row>
    <el-button @click="addCell"><i class="el-icon-circle-plus"></i></el-button>
  </div>
</template>

<script>
import Cell from '~/components/Cell'

export default {
  components: {
    Cell
  },
  data: () => ({
    cells: []
  }),
  methods: {
    addCell() {
      this.cells.push(this.cells.length + 1)
    }
  }
}
</script>
