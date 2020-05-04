<template>
  <div>
    <el-form label-width="0">
      <el-form-item>
        <prism-editor v-model="query" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="executeQuery">Query</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-if="tableData.length"
      :data="tableData"
      stripe
      style="width: 100%; margin-bottom: 1rem;"
    >
      <el-table-column
        v-for="column in columns"
        :key="column"
        :prop="column"
        :label="column"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    query: 'SELECT * FROM `users`;',
    tableData: [],
    columns: []
  }),
  methods: {
    executeQuery() {
      this.$axios
        .$post('query', {
          query: this.query,
          connection: this.$store.state.connection
        })
        .then(
          (result) => {
            this.tableData = result.results
            this.columns = Object.keys(result.results[0])
          },
          (error) => {
            this.$notify.error({
              title: 'Error',
              message: error.message
            })
          }
        )
    }
  }
}
</script>
