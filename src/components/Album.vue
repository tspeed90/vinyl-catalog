<template>
  <div class="album-wrapper">
    <h1>{{ record.album }}</h1>
    <div class="album-art-container">
      <img
        class="album-art"
        :src="record.copies[0].thumbUrl"
        :alt="record.album + ' by ' + record.artist"
      />
      <div class="yellow-square"></div>
    </div>
    <ul class="album-details">
      <li>{{ record.artist }}</li>
      <li>Release: {{ record.copies[0].catalogueNo }}</li>
      <li>{{ record.copies[0].played == true ? "Played" : "Unplayed" }}</li>
    </ul>
    <table class="album-condition-details">
      <thead>
        <tr>
          <th colspan="2">Sleeve Condition</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rating</td>
          <td>{{ record.copies[0].condition.sleeve.rating }}</td>
        </tr>
      </tbody>
    </table>
    <table class="album-condition-details">
      <thead>
        <tr>
          <th colspan="2">Media Condition</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rating</td>
          <td>{{ record.copies[0].condition.media.rating }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Album extends Vue {
  @Prop() private record!: object;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  margin: 0 auto;
}

td:first-of-type {
  border-right: 1px solid #333;
}

.album-art {
  height: 200px;
  width: 200px;
  position: absolute;
  top: 20px;
  right: 20px;
}

.album-art-container {
  width: 220px;
  height: 220px;
  margin: 0 auto;
  position: relative;
}
.yellow-square {
  height: 200px;
  width: 200px;
  background-color: #e8d84a;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: -1;
}
</style>
