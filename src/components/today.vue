<template>
  <p class="toDay">{{ toLocaleDate }}</p>
</template>

<script>
export default {
  name: "Today",
  data: function() {
    return {
      today: new Date()
    };
  },
  computed: {
    toLocaleDate: function() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return this.today.toLocaleDateString("en-GB", options);
    }
  }
};
</script>

<style scoped>
.toDay {
  color: #d46bdf;
  text-align: center;
  position: relative;
  margin: 0;
  font-style: italic;
  width: 100%;
}
.toDay::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: -30px 0 0 0 rgba(0, 0, 0, 0.1), 30px 0 0 0 rgba(0, 0, 0, 0.1);
  left: 0;
  bottom: -15px;
}
</style>
