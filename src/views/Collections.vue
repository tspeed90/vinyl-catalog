<template>
  <div class="collections-container">
    <CollectionsList :catalogData="catalogData" />
    <AlbumsList :records="records" :heading="collectionHeading" />
     <router-link :to="{ name: 'Album Details', params: { id: randomAlbum.id } }" class="roulette-icon">
      <p class="roulette-text">Roulette!</p>
      <font-awesome-icon :icon="['fas', 'record-vinyl']" class="record-icon" title="select a random album from this collection" />
    </router-link>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import AlbumsList from '@/components/AlbumsList.vue';
import CollectionsList from '@/components/CollectionsList.vue';
import firebase from "firebase/app";
import 'firebase/database';
const database = firebase.database();
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";

library.add(faRecordVinyl);

let catalogData = Vue.observable({
  collectionTitles: {},
  albums: {}
})

@Component({
  components:{
    CollectionsList,
    AlbumsList
  }
})

export default class Collections extends Vue {
  created () {
    database.ref('/').on('value', function(snapshot) {
      catalogData.collectionTitles = snapshot.val().collectionTitles;
      catalogData.albums = snapshot.val().albums;
    });
  }


  get catalogData() {
    return catalogData;
  }

  private get records() {
    let albums = Object.values(catalogData.albums);
    albums.sort((a,b) => a.artist > b.artist ? 1 : -1);
    if(this.$route.params.collection) {
      return albums.filter(album => {
        if (album.collections !== undefined) {
          return album.collections.includes(this.$route.params.collection);
        } 
      })
    } else {
      return albums;
    }
  }  
  private get collectionHeading() {
    if (this.$route.params.collection) {
      return this.$route.params.collection;
    }
    else return 'all albums';
  }

   get randomAlbum() {
    const index = Math.floor(Math.random() * this.records.length);
    return this.records[index];
  }
}
</script>

<style scoped lang="scss">
.collections-container {
  display: flex;
  flex-direction: column;
}

.roulette-icon {
  width: 5%;
  position: absolute;
  top: 40px;
  right: 40px;
  display: flex;
  flex-direction: column;
}

.record-icon {
  font-size: 60px;
  color: #444;
  margin: 5px 0;
}

.roulette-text {
  padding: 0;
  margin: 0;
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

@media screen and (min-width: 800px) {
  .collections-container {
    flex-direction: row;
    justify-content: flex-start;
  }
}

</style>