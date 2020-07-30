<template>
  <div class="album-wrapper"  v-if="record !== undefined">
    <h1 class="album-heading">{{ record.album }}</h1>
    <div class="album-art-container">
      <img
        v-if="record.copies[0].hasOwnProperty('art')"
        :src="record.copies[0].art"
        class="album-art"
        :alt="record.album + ' by ' + record.artist"
      />
      <img v-else src="../assets/generic_cover.png" class="album-art" alt="generic album cover" />
      <div class="yellow-square"></div>
    </div>
    <ul class="album-details">
      <li class="artist-name">{{ record.artist }}</li>
      <li>Release: {{ record.copies[0].catalogueNo }}</li>
      <li>{{ record.played == true ? "Played" : "Unplayed" }}</li>
    </ul>
    <span class="thumb-rating-container">
      <button class="thumbs-button" v-bind:class="{ active: hasThumbsUp }" v-on:click="onThumbsUp"><font-awesome-icon :icon="['fas', 'thumbs-up']" class="thumbs-icon" title="thumbs up" /></button>
      <button class="thumbs-button" v-bind:class="{ active: hasThumbsDown }" v-on:click="onThumbsDown"><font-awesome-icon :icon="['fas', 'thumbs-down']" class="thumbs-icon" title="thumbs down" /></button>
    </span>
    <Ratings :condition="sleeveCondition" type="Sleeve" />
    <Ratings :condition="mediaCondition" type="Media" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Ratings from '@/components/Ratings.vue';
import { Album as AlbumInterface } from "@/records";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import 'firebase/database';
const database = firebase.database();

library.add(faThumbsUp);
library.add(faThumbsDown);

@Component({
  components: {
    Ratings
  }
})
export default class Album extends Vue {
  @Prop() private record!: AlbumInterface;
  @Prop() private records!: AlbumInterface[];

  private get sleeveCondition() {
    if (this.record.copies[0].condition?.sleeve !== undefined) {
      return this.record.copies[0].condition.sleeve;
    } else {
      return {};
    }
  }
  private get mediaCondition() {
    if (this.record.copies[0].condition?.media !== undefined) {
      return this.record.copies[0].condition.media;
    } else {
      return {};
    }
  }

  private get hasThumbsUp() {
    return this.record.collections && this.record.collections.includes('thumbs-up');
  }

  private get hasThumbsDown() {
    return this.record.collections && this.record.collections.includes('thumbs-down');
  }

  onThumbsUp() {
    if (this.hasThumbsUp) {
      this.removeCollectionFromRecord('thumbs-up');
    } else {
      this.addCollectionToRecord('thumbs-up');
    }
  } 

  onThumbsDown() {
    if (this.hasThumbsDown) {
      this.removeCollectionFromRecord('thumbs-down');
    } else {
      this.addCollectionToRecord('thumbs-down');
    }
  }

  addCollectionToRecord(title) {
    let updates = this.record.collections || [];
    if (!updates.includes(title)) {
      updates.push(title);
      database.ref('/albums/' + this.$route.params.id + '/collections').set(updates);
      this.updateCollectionTitles(title);
    }
  }

  removeCollectionFromRecord(title) {
    let updates = [...this.record.collections];
    updates.splice(this.record.collections.indexOf('title'), 1);
    database.ref('/albums/' + this.$route.params.id + '/collections').set(updates);
  }

  updateCollectionTitles(title, belongsTo = "") {
    database.ref('/collectionTitles').once('value').then(function(snapshot) {
      const existingCollectionTitles = Object.keys(snapshot.val());
      if (!existingCollectionTitles.includes(title)) {
        const updates = {
          displayName: title,
          belongsTo: belongsTo
        };
        database.ref('/collectionTitles/' + title).set(updates);
      }
    });
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.album-heading {
  text-transform: lowercase;
  width: 50%;
  font-size: 24px;
  margin: 0 auto 15px auto;
}
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
  top: 15px;
  right: 15px;
}

.album-art-container {
  width: 220px;
  height: 220px;
  margin: 0 auto;
  position: relative;
}
.yellow-square {
  height: 190px;
  width: 190px;
  background-color: $theme-color;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: -1;
}

.artist-name {
  font-size: 20px;
  text-transform: lowercase;
  font-weight: bolder;
}

.thumbs-button {
  background-color: #fafafa;
  border: 2px solid $theme-color;
  border-radius: 50%;
  padding: 15px;
  margin: 10px;
}

.thumbs-icon {
  font-size: 26px;
  color: #444;
}

.thumbs-separator {
  font-size: 36px;
}

.active {
  background-color:$theme-color;
}
@media screen and (min-width: 800px) {
  .album-heading {
    width: 30%;
  }
}
</style>
