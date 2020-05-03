<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="Query">
        <el-input v-model="query" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="executeQuery">Query</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%">
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
      this.$axios.$post('query', { query: this.query }).then(
        (result) => {
          this.tableData = result.results
          this.columns = Object.keys(result.results[0])
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
