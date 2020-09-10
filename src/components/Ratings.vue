<template>
  <div class="ratings-container">
    <span :title="condition.notes">{{type}} rating: {{condition.rating || "Unknown"}}</span>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Condition} from '@/records';

  @Component 
  export default class Ratings extends Vue {
    @Prop() private condition!: Condition;
    @Prop() private type!: String;
  }
</script>