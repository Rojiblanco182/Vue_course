<template>
  <h2>{{ getTitle }}</h2>
  <p> {{ counter }} <sup>2</sup> = {{squareCounter}} </p>
  <div>
      <button v-on:click="increaseCounter">+1</button>
      <button @click="decreaseCounter">-1</button>
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        start: {
            type: Number,
            //required: true,
            default: 1,
            validator(value) {
                return value > 0
            }
        }
    },
    data() {
        return {
            counter: this.start
        }
    },
    methods: {
        increaseCounter() {
            this.counter++
        },
        decreaseCounter() {
            this.counter--
        }
    },
    computed: {
        squareCounter() {
            return this.counter * this.counter
        },
        getTitle() {
            return this.title || 'Default title'
        }
    }
}
</script>

<style>

button {
    margin: 0 5px;
}

</style>