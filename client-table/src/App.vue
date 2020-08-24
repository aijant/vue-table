<template>
  <div id="app">
    <h1>Our clients</h1>
    <button
      @click="toggleComponentOne"
      type="button"
      class="btn-outline-primary btn-sm mb-3 badge-pill"
    >
      Show clients
    </button>
    <VueTable v-if="showComponentOne" :usersData="USERS" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueTable from "./components/table/VueTable";
export default {
  name: "App",
  components: {
    VueTable,
  },
  data() {
    return {
      showComponentOne: false,
    };
  },
  computed: {
    ...mapGetters(["USERS"]),
  },
  methods: {
    ...mapActions(["GET_USERS"]),
    toggleComponentOne() {
      this.showComponentOne = !this.showComponentOne;
    },
  },
  mounted() {
    this.GET_USERS();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
