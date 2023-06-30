const { createApp } = Vue;

const myApp = createApp({
  data() {
    return {
      stateDay: true, // true = sun and false = moon
      image: "./images/sun.jpg",
    };
  },
  watch: {
    stateDay(newValue) {
      this.image = newValue ? "./images/sun.jpg" : "./images/moon.jpg";
    },
  },
  computed: {
    labelButtonText() {
      return this.stateDay ? "Anochecer" : "Amanecer";
    },
    labelStateDayText() {
      return this.stateDay ? "Buenos días!" : "Buenas noches!";
    },
  },
  template: `
  <div class="container" :class="{ sun: stateDay, moon: !stateDay }">
      <img :src="image">
      <p>{{ labelStateDayText }}</p>
      <button @click="stateDay = !stateDay">{{ labelButtonText }}</button>
  </div>
  `,
}).mount("#app");
