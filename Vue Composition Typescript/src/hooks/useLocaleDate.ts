import { computed, Ref } from '@vue/composition-api'

interface dateOptions {
  weekday: string,
  year: string,
  month: string,
  day: string
}

export default function useLocaleDate (date: Ref<Date>, options: dateOptions): Readonly<Ref<string>> {
  const localeDate = computed(() => {
    return date.value.toLocaleDateString(navigator.language, options)
  })

  return localeDate
}
