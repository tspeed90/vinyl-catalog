<template>
  <div class="ratings-container">
    <p>{{type}} rating: {{condition.rating || "Unknown"}}</p>
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