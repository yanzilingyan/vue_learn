<template>
  <div id="app">
    <!--<vPagination :total="total" :current-page='current' :pagegroup="pagegroup" @pagechange="pagechange" v-if="isShowPagination"></vPagination>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      total: 1,
      current: 1,
      pagegroup: 10,
      isShowPagination: true
    }
  },
  methods: {
    pagechange(currentPage) {
      console.log('currentPage=',currentPage);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
