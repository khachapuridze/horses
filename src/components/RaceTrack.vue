<template>
  <div class="track">
    <div class="track-header">
      <div class="round-info">
        <span class="round-label">{{ currentRound !== -1 ? `${currentRound + 1}st Lap - ${currentRoundData?.length || trackDistance}m` : 'Program' }}</span>
      </div>
    </div>

    <div class="race-area">
      <div class="lanes">
        <div v-for="(h, idx) in trackHorses" :key="h.id" class="lane">
          <div class="lane-number">{{ idx + 1 }}</div>
          <div class="track-surface">
            <HorseCard :horse="h" :distance="currentRoundData?.length || 1200" :startRaceTrigger="startTrigger" @finished="onHorseFinished(h, $event)" />
            <div class="finish-line"></div>
          </div>
        </div>
      </div>
      <div class="finish-label">FINISH</div>
    </div>
  </div>
</template>

<script>
import HorseCard from './HorseCard.vue';
import { mapState } from 'vuex';

export default {
  components: { HorseCard },
  data() {
    return { 
      startTrigger: 0, 
      localFinishTimes: {}, 
      finishedOrder: [], 
      waitingForRound: false,
      trackDistance: 1200
    };
  },
  computed: {
    ...mapState(['schedule', 'currentRound', 'running']),
    trackHorses() { return this.schedule[this.currentRound]?.horses || []; },
    roundIndexLabel() { return this.currentRound !== -1 ? this.currentRound + 1 : '-'; },
    currentRoundData() { return this.schedule[this.currentRound] || null; }
  },
  watch: {
    currentRound(newIdx, oldIdx) {
      if (newIdx !== -1 && newIdx !== oldIdx) this.startRound();
    }
  },
  methods: {
    startRound() {
      console.log(`Starting round ${this.currentRound + 1} with ${this.trackHorses.length} horses`);
      this.localFinishTimes = {};
      this.finishedOrder = [];
      this.waitingForRound = true;
      
      // Delay trigger increment to allow horses to mount first
      this.$nextTick(() => {
        this.startTrigger++;
        console.log(`Start trigger incremented to: ${this.startTrigger}`);
      });
    },
    onHorseFinished(horse, payload) {
      this.localFinishTimes[horse.id] = payload.timeMs;
      if (Object.keys(this.localFinishTimes).length === this.trackHorses.length) {
        const ordered = [...this.trackHorses].sort((a, b) => this.localFinishTimes[a.id] - this.localFinishTimes[b.id])
          .map((h, index) => ({ position: index + 1, id: h.id, name: h.name }));
        this.$store.dispatch('roundFinished', ordered);
      }
    }
  }
};
</script>

<style scoped>
.track { 
  display: flex; 
  flex-direction: column; 
  height: 100%;
}

.track-header { 
  display: flex; 
  justify-content: center; 
  margin-bottom: 16px; 
  font-weight: 600;
}

.round-label {
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
}

.race-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.lanes { 
  background: #d0d0d0; 
  padding: 16px; 
  border-radius: 8px; 
  display: flex; 
  flex-direction: column; 
  gap: 4px;
  flex: 1;
  position: relative;
}

.lane { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  padding: 4px; 
  background: #f0f0f0; 
  border-radius: 4px;
  border: 1px dashed #999;
  min-height: 50px;
}

.lane-number { 
  width: 32px; 
  height: 40px; 
  background: #4caf50; 
  color: white; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  border-radius: 4px; 
  font-weight: bold;
  font-size: 14px;
}

.track-surface {
  flex: 1;
  position: relative;
  height: 40px;
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    45deg,
    #ff0000,
    #ff0000 8px,
    #ffffff 8px,
    #ffffff 16px
  );
  border-radius: 2px;
}

.finish-label {
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: #ff5722;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
}
</style>