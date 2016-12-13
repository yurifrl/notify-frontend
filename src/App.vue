<template>
  <div id="app">
    <img src="./assets/logo.png">
    <notify :notes="notes"></notify>
    <form class="form-wrapper" @submit.prevent="createNotification">
      <div class="form-item">
        <input type="text" v-model="header">
      </div>
      <div class="form-item">
        <textarea v-model="body"></textarea>
      </div>
      <div class="form-item">
        <select v-model="level">
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="info">Info</option>
        </select>
      </div>
      <div class="form-item">
        <input type="number" v-if="level === 'info'" v-model.number="duration">
      </div>
      <div class="form-item">
        <button class="btn" type="submit">New Notification</button>
      </div>
    </form>
  </div>
</template>

<script>
import Notify from './components/Notify'

export default {
  name: 'app',
  components: {
    Notify
  },
  data () {
    return {
      notes: [],
      header: 'Header lorem',
      body: 'Body lorem',
      duration: 90,
      level: 'warning'
    }
  },
  methods: {
    createNotification () {
      const data = {
        header: this.header,
        body: this.body,
        duration: this.duration,
        level: this.level
      }
      this.notes.push(data)
    }
  }
}
</script>

<style lang="less">
  @border_color: #e2e2e2;
  * {
    box-sizing: border-box;
  }

  .form-wrapper {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .form-item {
    position: relative;
    margin-bottom: 1em;
    width: 100%;
  }

  input[type='text'],
  input[type='password'],
  input[type='date'],
  input[type='datetime'],
  input[type='datetime-local'],
  input[type='month'],
  input[type='week'],
  input[type='email'],
  input[type='number'],
  input[type='search'],
  input[type='tel'],
  input[type='time'],
  input[type='url'],
  input[type='color'],
  textarea,
  select,
  legend {
    line-height: normal;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 50px;
    padding: 0.5rem;
    /*color: $input-text-color;*/
    border-width: 1px;
    border-style: solid;
    border-color: @border_color;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.08);
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    transition: background-color .2s ease-in-out,
                box-shadow .2s ease-in-out,
                border .2s ease-in-out;

    &:focus {
      outline: none;
      box-shadow: 0 0 20px 0 rgba(0,0,0,.15);
    }
  }

  select {
    -webkit-appearance: menulist;
    -moz-appearance: menulist;
    -ms-appearance: menulist;
    -o-appearance: menulist;
  }

  textarea {
    max-width: 100%;
    min-width: 100%;
    min-height: 10rem;
    max-height: 300px;
  }


  .btn {
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    letter-spacing: .05em;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    display: block;
    outline: 0;
    padding: 0 2rem;
    text-transform: uppercase;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    transition: .2s box-shadow ease-out,
                .2s background-color ease-out;

    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: #26a76b;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    color: #ffffff;


    &:hover, &:focus {
      background-color: #2dc17d;
      box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18),0 4px 15px 0 rgba(0,0,0,0.15);
    }

  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  @media only screen and (min-width: 600px) {

  }
</style>
