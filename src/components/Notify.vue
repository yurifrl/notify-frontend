<template>
  <div class="notifications">
    <div @click="toggle" class="notification-icon">
      <svg viewBox="0 0 18 21"><path d="M7.01,19.01C7.01,20.11,7.9,21,9,21s1.99-0.89,1.99-1.99H7.01z M15.88,14.82V9c0-3.25-2.25-5.97-5.29-6.69V1.59 C10.59,0.71,9.88,0,9,0S7.41,0.71,7.41,1.59v0.72C4.37,3.03,2.12,5.75,2.12,9v5.82L0,16.94V18h18v-1.06L15.88,14.82z"/></svg>
      <div class="notifications-number" :class="{'active' : parsedNotes.length > 0 }">{{ parsedNotes.length }}</div>
    </div>
    <div v-show="active">
      <div v-for="(note, index) in parsedNotes" :class="['note', note.level]">
        <span class="close" @click="dismiss(index)">&times;</span>
        <h3>{{ note.header }}</h3>
        <p>{{ note.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: true,
      interval: 0,
      mappedNotes: []
    }
  },
  props: {
    baseMultiplier: {
      type: Number,
      default: 1000
    },
    notes: {
      type: Array,
      required: true,
      default: []
    }
  },
  methods: {
    toggle () {
      this.active = !this.active
    },
    dismiss (index) {
      this.notes.splice(index, 1)
    }
  },
  computed: {
    parsedNotes () {
      this.active = true
      return this.notes.reverse()
    }
  },
  watch: {
    notes (value) {
      this.$el.scrollTop = 0
      this.mappedNotes = []
      this.notes.forEach((note, index) => {
        if (note.level !== 'info') { return }
        this.mappedNotes.push({
          id: index,
          expires: Date.now() + note.duration * this.baseMultiplier
        })
      })
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.mappedNotes.forEach((note, index) => {
        if (note.expires < Date.now()) { this.dismiss(note.id) }
      })
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="less" scoped>
  @border_color: #e2e2e2;
  @info_color: #b8deff;
  @warning_color: #ffffba;
  @error_color: #ffb8b8;

  .notifications {
    position: fixed;
    top:   0;
    right: 10px;
    overflow: auto;
    max-height: 70%;
    box-shadow: 0 0 10px rgba(0,0,0,.20);
    border-bottom-left-radius:  4px;
    border-bottom-right-radius: 4px;
    padding: 5px 5px 0 5px;
    background-color: #ffffff;
    z-index: 1;

    .note {
      border: 1px solid @border_color;
      width: 200px;
      background-color: #ededed;
      border-radius: 4px;
      padding:  8px 5px;
      margin-bottom: 5px;
      text-align: left;
      position: relative;
      opacity: .8;
      transition: opacity .2s ease-in-out;
      cursor: pointer;
      color: red;

      &:hover {
        opacity: 1;

        .close {
          opacity: .2;
          transition: opacity .2s ease-in-out;

          &:hover {
            opacity: 1;
          }
        }
      }

      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 23px;
        opacity: .2;
        cursor: pointer;
        color: red;
        opacity: 0;
        text-align: center;
        font-weight: bold;
      }

      &.info    { background-color: @info_color; }
      &.warning { background-color: @warning_color; }
      &.error   { background-color: @error_color; }

      p {
        margin: 0;
      }
    }
  }

  h3 {
    font-size: 1.1em;
    margin-top: 0;
    margin-bottom: .5em;
  }

  .notification-icon {
    cursor: pointer;
    padding: 8px;
    display: block;
    text-align: right;
    position: relative;

    svg {
      fill: #2dc17d;
      width: 15px;
    }
  }

  .notifications-number {
    position: absolute;
    padding: 0px;
    color: #ffffff;
    top: 3px;
    border-radius: 100%;
    font-weight: bold;
    font-size: 10px;
    width: 14px;
    text-align: center;
    right: 18px;
    background-color: #cacaca;

    &.active {
      background-color: red;
    }
  }

  @media only screen and (min-width: 600px) {
    .notifications {
      top:   0;
      border-top-left-radius:  0px;
      border-top-right-radius: 0px;
    }
  }
</style>
