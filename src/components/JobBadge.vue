<template>
  <span class="job-badge" :class="shortName" :title="name">
    <span class="job-icon flex-column-i-icon"></span>
    <span class="job-level" :class="{'level-cap': level === 70}">{{level > 0 ? level : '-'}}</span>
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

  .job-icon {
    width: 1.5em;
    height: 1.5em;
  }

  .job-level.level-cap {
    font-weight: 700;
  }
</style>
