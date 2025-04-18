// stores/navigationStore.js
import { defineStore } from 'pinia';

export const useNavStore = defineStore('nav', {
  state: () => ({
    targetSection: null, // La sezione di destinazione
    executeCustomLogic: false, // Flag per eseguire logica personalizzata
  }),
  actions: {
    setTargetSection(section, shouldExecuteLogic = false) {
      this.targetSection = section;
      this.executeCustomLogic = shouldExecuteLogic;
    },
    resetState() {
      this.targetSection = null;
      this.executeCustomLogic = false;
    },
  },
});