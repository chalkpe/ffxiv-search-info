<template>
  <div id="app">
    <section
      id="result"
      v-if="ready">
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
            @keydown.enter="request"
            :disabled="isLoading">
        </div>

        <div class="control">
          <button
            class="button is-info"
            :disabled="isLoading"
            @click="request">
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
  computed: {
    ready () {
      return Array.isArray(this.data) && this.data.length > 0
    }
  },

  methods: {
    reset () {
      location.hash = ''
    },

    request () {
      location.hash = btoa(this.url)
    },

    async update () {
      this.data = this.error = null

      const code = location.hash.slice(1)
      if (!code) {
        this.url = ''
        this.data = null
        return
      }

      try {
        this.isLoading = true
        this.data = await parse(this.url = atob(code))
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
        if (!this.error && !this.ready) this.error = 'No data found at given URL!'
      }
    }
  },

  mounted () {
    this.update()
    window.addEventListener('hashchange', () => this.update())
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
    height: 100vh;
    padding: 0.5em;

    color: #ddccbb;
    text-shadow: 0 0 0.15em #777064;
    background: linear-gradient(180deg, #323232 0%, #2c2c2c 50%, #292f29 100%) no-repeat;
  }

  #result {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }

  footer {
    padding-top: 1.5em;
  }

  footer > a {
    color: inherit;
  }

  footer > * + *::before {
    content: " · "
  }
</style>
