<template>
  <div class="collections-container">
    <CollectionsList :catalogData="catalogData" />
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CollectionsList from '@/components/CollectionsList.vue';
import catalogData from '../../utils/albums.json';

@Component({
  components:{
    CollectionsList
  }
})

export default class Collections extends Vue {
  get catalogData() {
    return catalogData;
  }
}
</script>