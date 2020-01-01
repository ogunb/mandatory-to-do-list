<template>
  <p class="today">{{ localeDate }}</p>

</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import useLocaleDate from '@/hooks/useLocaleDate'

export default createComponent({
  name: 'Today',

  setup () {
    let today = ref<Date>(new Date())
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const localeDate = useLocaleDate(today, dateOptions)
    return {
      localeDate
    }
  }
})
</script>

<style scoped>
.today {
  color: #42b883;
  text-align: center;
  position: relative;
  margin: 0;
  font-style: italic;
  width: 100%;
}
.today::after {
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
