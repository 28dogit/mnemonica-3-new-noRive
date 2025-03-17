import { ref } from 'vue'

export const useFixedSection = () => {
  // Stato condiviso tra i componenti
  const isfixedSection = ref(true)
  
  // Funzioni per modificare lo stato
  const setFixedSection = (value) => {
    isfixedSection.value = value
  }
  
  return {
    isfixedSection,
    setFixedSection
  }
}