<template>
  <div class="albums-list-container">
    <ul>
      <li v-for="(record, index) in records" v-bind:key="record">
        <router-link :to="{ name: 'Album Details', params: { id: index } }">{{ record.album }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AlbumsList extends Vue {
  @Prop() private records!: Array<{}>;
}
</script>

<style scoped lang="scss">
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
  padding: 5px;
}
a {
  margin: 10px 0;
  color: #444;
  text-decoration: none;
  text-transform: lowercase;
}

a:hover {
  background-color: #e8d84a;
  padding: 5px;
}
</style>
