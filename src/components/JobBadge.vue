<template>
  <span class="job-badge" :class="shortName" :title="name">
    <span class="job-icon flex-column-i-icon"></span>
    <span class="job-level" :cap="level === cap">{{level > 0 ? level : '-'}}</span>
  </span>
</template>

<script>
import shortNames from '../assets/job-names.json'

export default {
  name: 'JobBadge',
  props: ['name', 'level'],
  computed: {
    shortName () {
      const name = this.name.toLowerCase()
      return `class-${shortNames[name] || name}`
    },

    cap () {
      return this.name === '청마도사' ? 60 : 70
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

  .job-icon {
    width: 1.5em;
    height: 1.5em;
  }

  .job-level[cap] {
    color: #df9620;
  }
</style>
