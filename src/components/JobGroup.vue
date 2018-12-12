<template>
  <div class="job-group">
    <job-badge
      v-for="job of jobs"
      :key="job.name"
      :name="job.name"
      :level="job.level" />
  </div>
</template>

<script>
import JobBadge from './JobBadge'
export default {
  name: 'JobGroup',
  components: { JobBadge },
  props: ['jobs']
}
</script>

<style scoped>
  .job-group {
    display: flex;
    margin: 0.75em;
  }
</style>
