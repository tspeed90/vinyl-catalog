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
import catalogData from '../../utils/albums.json';

@Component({
  components:{
    CollectionsList,
    AlbumsList
  }
})

export default class Collections extends Vue {
  get catalogData() {
    return catalogData;
  }

  private get records() {
    if(this.$route.params.collection) {
      return catalogData.albums.filter(album => {
        return album.collections.includes(this.$route.params.collection)
      })
    } else {
      return catalogData.albums;
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