<template>
  <div class="app">
    <header class="topbar">
      <h1>Horse Racing</h1>
      <div class="controls">
        <button class="btn-generate" @click="generateAll">GENERATE PROGRAM</button>
        <button class="btn-start" @click="startOrPause">{{ running ? 'PAUSE' : 'START / PAUSE' }}</button>
      </div>
    </header>

    <div class="main">
      <aside class="left">
        <HorseList />
      </aside>

      <section class="center">
        <RaceTrack />
      </section>

      <aside class="right">
        <ResultsPanel />
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HorseList from './components/HorseList.vue';
import RaceTrack from './components/RaceTrack.vue';
import ResultsPanel from './components/ResultsPanel.vue';

export default {
  components: { HorseList, RaceTrack, ResultsPanel },
  computed: { ...mapState(['running']) },
  methods: {
    generateAll() {
      this.$store.dispatch('generateHorses');
      this.$store.dispatch('generateSchedule');
    },
    startOrPause() {
      if (this.running) this.$store.dispatch('stopTournament');
      else this.$store.dispatch('startTournament');
    }
  },
  mounted() { this.generateAll(); }
};
</script>

<style scoped>
.app { 
  font-family: Arial, sans-serif; 
  height: 100vh; 
  display: flex; 
  flex-direction: column; 
  background: #f5f5f5;
}

.topbar { 
  background: #ef9a9a; 
  padding: 12px 20px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.topbar h1 {
  margin: 0;
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

.main { 
  display: flex; 
  flex: 1; 
  gap: 12px; 
  padding: 12px; 
  min-height: 0;
}

.left { 
  width: 280px; 
  overflow: auto; 
  background: #fff; 
  border-radius: 8px; 
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.center { 
  flex: 1; 
  background: #e8e8e8; 
  padding: 16px; 
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 0;
}

.right { 
  width: 320px; 
  overflow: auto; 
  background: #fff; 
  padding: 16px; 
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.controls {
  display: flex;
  gap: 12px;
}

.controls button { 
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-generate {
  background: #90a4ae;
  color: white;
}

.btn-generate:hover {
  background: #78909c;
}

.btn-start {
  background: #81c784;
  color: white;
}

.btn-start:hover {
  background: #66bb6a;
}
</style>