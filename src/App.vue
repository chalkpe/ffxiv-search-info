<template>
  <div id="app">
    <section
      id="result"
      v-if="data && data.length">
      <job-group v-for="(g, i) of data" :jobs="g" :key="i" />

      <footer class="container has-text-centered">
        <a @click="reset">[PRESS TO RESET]</a><br>
        &copy; 2010 - 2018 SQUARE ENIX CO., LTD. All Rights Reserved.<br>
        Published in Korea by EYEDENTITY ENTERTAINMENT CO., LTD. SQUARE ENIX
      </footer>
    </section>

    <fieldset v-else class="container">
      <h2 class="is-size-2">FFXIV Search Info</h2>

      <div class="field has-addons">
        <div class="control is-expanded" :class="{ 'is-loading': isLoading }">
          <input
            v-model="url"
            type="url"
            class="input"
            placeholder="Please enter URL of Markdown file"
            @keydown.enter="search"
            :disabled="isLoading">
        </div>

        <div class="control">
          <button
            class="button is-info"
            :disabled="isLoading"
            @click="search">
            Generate
          </button>
        </div>

      </div>
      <p v-if="error" class="help is-danger">{{ error || 'Unexpected error has occured :(' }}</p>

      <footer>
        <span>&copy; 2018 Chalk</span>
        <a href="https://github.com/ChalkPE/ffxiv-search-info/blob/master/LICENSE">MIT License</a>
        <a href="https://github.com/ChalkPE/ffxiv-search-info">View on GitHub</a>
      </footer>
    </fieldset>
  </div>
</template>

<script>
import parse from './parse'
import JobGroup from './components/JobGroup'

export default {
  name: 'app',
  components: { JobGroup },
  data: () => ({ url: '', isLoading: false, data: null, error: null }),

  methods: {
    search () {
      this.error = null
      this.isLoading = true

      parse(this.url)
        .then(v => {
          this.data = v
          location.hash = btoa(this.url)
        })
        .catch(err => {
          console.error(err)
          this.error = err.message
        })
        .finally(() => {
          this.isLoading = false
          if (!this.data || !this.data.length) {
            this.error = this.error || 'No data found at given URL!'
          }
        })
    },

    reset () {
      location.hash = ''
      location.reload()
    }
  },

  mounted () {
    const code = location.hash.slice(1)
    if (code) this.search(this.url = atob(code))
  }
}
</script>

<style>
  * {
    font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  fieldset {
    border: none;
  }

  html, body {
    color: #ddccbb;
    background-color: #2c2c2c;
    text-shadow: 0 0 0.15em #777064;
    padding: 0.5em;
  }

  #result {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }

  footer {
    padding-top: 0.5em;
  }

  footer > a {
    color: inherit;
  }

  footer > * + *::before {
    content: " · "
  }
</style>
