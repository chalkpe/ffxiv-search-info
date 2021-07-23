<template>
  <div id="app">
    <section v-if="ready">
      <div id="result">
        <job-group v-for="(g, i) of data" :jobs="g" :key="i" />
      </div>

      <footer class="container has-text-centered">
        <a id="reset" @click="reset">[PRESS TO RESET]</a>
        <span>
          &copy; 2010 - {{ new Date().getFullYear() }} SQUARE ENIX CO., LTD. All Rights Reserved.<br>
          Published in Korea by Actoz Soft CO., LTD.
        </span>
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

      <footer class="main">
        <span>&copy; 2018-{{ new Date().getFullYear() }} Chalk</span>
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
    word-break: keep-all;
    font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    color: inherit;
  }

  fieldset {
    border: none;
  }

  html, body {
    height: 100vh;

    color: #ddccbb;
    text-shadow: 0 0 0.15em #777064;
    background: linear-gradient(180deg, #323232 0%, #2c2c2c 50%, #292f29 100%) no-repeat;
  }

  #app {
    padding: 0.5em;
  }

  #result {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }

  #reset {
    padding-bottom: 1.5em;
  }

  footer.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 1.5em;
  }

  footer.main > * + *::before {
    content: " · "
  }
</style>
