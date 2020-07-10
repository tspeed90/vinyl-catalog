<template>
  <div class="collections-container">
    <CollectionsList :catalogData="catalogData" />
    <AlbumsList :records="records" :heading="collectionHeading" />
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import AlbumsList from '@/components/AlbumsList.vue';
import CollectionsList from '@/components/CollectionsList.vue';
import firebase from "firebase/app";
import 'firebase/database';
const database = firebase.database();

let catalogData = Vue.observable({
  collectionTitles: [],
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
    database.ref('/').once('value').then(function(snapshot) {
      catalogData.collectionTitles = snapshot.val().collectionTitles;
      catalogData.albums = snapshot.val().albums;
    });
  }

  get catalogData() {
    return catalogData;
  }

  private get records() {
    const albums = Object.values(catalogData.albums);
    console.log(albums);
    if(this.$route.params.collection) {
      return albums.filter(album => {
        if (album.collections !== undefined)
        return album.collections.includes(this.$route.params.collection)
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
}
</script>