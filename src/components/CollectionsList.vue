<template>
    <div class="collections-list-container">
        <button v-for="title in catalogData.collectionTitles" v-bind:key="title">{{title}}</button>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class CollectionsList extends Vue {
  @Prop() private catalogData!;
}
</script>