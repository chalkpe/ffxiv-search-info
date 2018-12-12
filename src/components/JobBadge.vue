<template>
  <span class="job-badge" :class="shortName" :title="name">
    <span class="flex-column-i-icon"></span>
    <span class="flex-column-job-level">{{level}}</span>
  </span>
</template>

<script>
import shortNames from '../assets/job-names.json'

export default {
  name: 'JobBadge',
  props: ['name', 'level'],
  computed: {
    shortName () {
      return `class-${shortNames[this.name] || this.name.toLowerCase()}`
    }
  }
}
</script>

<style scoped>
  .job-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flex-column-i-icon {
    width: 1.5em;
    height: 1.5em;
  }
</style>
