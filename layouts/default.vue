<template>
  <el-container>
    <el-header>
      <Connection />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import Connection from '~/components/Connection'

export default {
  components: {
    Connection
  }
}
</script>
