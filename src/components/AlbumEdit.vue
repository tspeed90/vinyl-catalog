<template>
  <div class="album-wrapper"  v-if="record !== undefined">
    <span class="edit-field">
      Album name: <input class="edit-heading" v-model.lazy="record.album" />
    </span>
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
    <div class="album-details">
      <span class="edit-field">
        Artist name:  <input v-model.lazy="record.artist" />
      </span>
      <span class="edit-field">
        Catalogue no.: <input v-model.lazy="record.copies[0].catalogueNo" />
      </span>
      <span class="edit-field">
        <label>
          <input type="checkbox" v-model.lazy="record.played"/>
          Played
        </label>
      </span>
    </div>
    <span class="thumb-rating-container">
      <button class="thumbs-button" v-bind:class="{ active: hasThumbsUp }" v-on:click="onThumbsUp"><font-awesome-icon :icon="['fas', 'thumbs-up']" class="thumbs-icon" title="thumbs up" /></button>
      <button class="thumbs-button" v-bind:class="{ active: hasThumbsDown }" v-on:click="onThumbsDown"><font-awesome-icon :icon="['fas', 'thumbs-down']" class="thumbs-icon" title="thumbs down" /></button>
    </span>
    <RatingsEdit :condition="sleeveCondition" type="Sleeve" />
    <RatingsEdit :condition="mediaCondition" type="Media" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import RatingsEdit from '@/components/RatingsEdit.vue';
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
    RatingsEdit
  }
})

export default class Album extends Vue {
  @Prop() private record!: AlbumInterface;
  @Prop() private records!: AlbumInterface[];

  private get sleeveCondition() {
    if (this.record.copies[0].condition?.sleeve == undefined) {
      this.record.copies[0].condition.sleeve = {rating: "", notes: ""};
    }
    return this.record.copies[0].condition.sleeve;
  }
  private get mediaCondition() {
    if (this.record.copies[0].condition?.media == undefined) {
      return this.record.copies[0].condition.media = {rating: "", notes: ""};
    } 
      return this.record.copies[0].condition.media;
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

  updateCollectionTitles(title) {
    database.ref('/collectionTitles').once('value').then(function(snapshot) {
      const existingCollectionTitles = snapshot.val();
      if (!existingCollectionTitles.includes(title)) {
        const updates = [...existingCollectionTitles];
        updates.push(title);
        database.ref('/collectionTitles/').set(updates);
      }
    });
  }

  @Watch('record', {deep: true})
  onRecordChanged(value: AlbumInterface, oldValue: AlbumInterface) {
    database.ref('/albums/' + this.$route.params.id).set(value);
  }
}
</script>

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


//edit specific styling

.edit-field {
  display: block;
  margin: 0 auto;
}

.edit-heading {
  margin-bottom: 15px;
}

@media screen and (min-width: 800px) {
  .album-heading {
    width: 30%;
  }
}
</style>
