<template>
  <div>
    <h1 class="collection-heading">all albums</h1>
    <div
      v-for="(discography, artist) in recordsByArtist"
      v-bind:key="artist"
      class="albums-list-container"
    >
      <h2>{{ artist }}</h2>
      <ul>
        <li v-for="record in discography" v-bind:key="record.id">
          <router-link :to="{ name: 'Album Details', params: { id: record.id } }">
            <img
              v-if="record.copies[0].hasOwnProperty('art')"
              :src="record.copies[0].art"
              class="album-art"
              :alt="record.album + ' by ' + record.artist"
            />
            <img
              v-else
              src="../assets/generic_cover.png"
              class="album-art"
              alt="generic album cover"
            />
            <p>{{ record.album }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Album } from "../records";

@Component
export default class AlbumsList extends Vue {
  @Prop() private records!: Album[];

  get recordsByArtist() {
    const artistsSorted: { [key: string]: Album[] } = {};
    this.records.forEach((record: Album) => {
      if (artistsSorted[record.artist] === undefined) {
        artistsSorted[record.artist] = [record];
      } else {
        const currentArtist: Album[] = artistsSorted[record.artist];
        currentArtist.push(record);
      }
    });
    return artistsSorted;
  }
}
</script>

<style scoped lang="scss">
.collection-heading {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 40px;
  border-bottom: 2px solid #333;
  position: relative;
}
.collection-heading::after {
  content: "";
  width: 100%;
  display: block;
  margin: 0 auto;
  border-bottom: 10px solid #e8d84a;
}

@media screen and (min-width: 800px) {
  .collection-heading {
    width: 20%;
  }
}
.albums-list-container {
  padding: 10px;
}
h2 {
  font-size: 18px;
  width: 100%;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 10px;
  border-bottom: #e8d84a 4px solid;
  text-transform: lowercase;
}
ul {
  margin: 0 auto;
  display: flex;
  padding: 0;
  flex-direction: column;
  text-align: left;
}
li {
  list-style-type: none;
  display: flex;
  border-bottom: 2px solid #fff;
  margin-bottom: 3px;
}
a {
  color: #444;
  text-decoration: none;
  text-transform: lowercase;
  display: flex;
  align-items: center;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
}

img {
  height: 90px;
  width: 90px;
  margin-right: 15px;
}

@media screen and (min-width: 700px) {
  ul {
    max-width: 40%;
    padding: 5px;
  }
  h2 {
    max-width: 40%;
  }
}
</style>
