<template>
  <h2 test-id="title">{{ getTitle }}</h2>
  <p> {{ counter }} <sup>2</sup> = {{squareCounter}} </p>
  <p data-testid="counter"> {{ counter }} </p>
  <div>
      <button v-on:click="increaseCounter" test-id="increase">+1</button>
      <button @click="decreaseCounter" test-id="decrease">-1</button>
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
            return this.title || 'Counter'
        }
    }
}
</script>

<style>

button {
    margin: 0 5px;
}

</style>