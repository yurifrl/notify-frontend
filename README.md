<img src="https://github.com/yurifrl/notify-frontend/raw/master/src/assets/image.png">

[![Build Status](https://travis-ci.org/yurifrl/notify-frontend.svg?branch=master)](https://travis-ci.org/yurifrl/notify-frontend)
# example

> Notification show case

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Build With Docker

``` bash
# create the shared volumes
docker volume create --name=node_modules

# install dependencies
docker-compose run --rm web npm install

# start everything
# 127.0.0.1:8080 -> example page
# 127.0.0.1:9876 -> karma
# 127.0.0.1:9877 -> coverege
docker-compose -f docker-compose.test.yml up
```

## Build to production

```bash
# build for production with minification
docker-compose run --rm web npm run build

# create image
docker-compose -f production.yml build

# to run like production
docker-compose -f production.yml up

# visit https://127.0.0.1
```

## How to use
```html
<template>
  <div id="app">
    <notify :notes="notes"></notify>
    <button class="btn" :action="createNotification">New Notification</button>
  </div>
</template>

<script>
import Notify from './components/Notify'
export default {
  name: 'app',
  components: {
    Notify
  },
  methods: {
    createNotification () {
      const data = {
        header: "Hello",
        body: "I'm a notification, and at this level i will be gonne pretty soon",
        duration: 90,
        level: "info"
      }
      this.notes.push(data)
    }
  }
}
</script>
```html

