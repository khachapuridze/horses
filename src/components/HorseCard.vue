<template>
  <div class="horse-wrapper">
    <div class="horse" :style="horseStyle" ref="horseEl">
      <div class="horse-icon">🐎</div>
      <div class="horse-info">
        <div class="horse-name">{{ horse.name }}</div>
        <div class="horse-condition">{{ horse.condition }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { horse: Object, distance: Number, startRaceTrigger: Number },
  data() { return { startedAt: null, finished: false, progressPct: 0, trackWidth: 0 }; },
  computed: {
    horseStyle() { 
      // Calculate exact pixels to move to finish line
      if (this.trackWidth > 0) {
        const horseWidth = 140; // Approximate horse width
        const maxDistance = this.trackWidth - horseWidth;
        const translatePx = (this.progressPct / 100) * maxDistance;
        return { 
          transform: `translateX(${translatePx}px)`,
          left: '0px',
          background: this.horse.color 
        }; 
      }
      return { 
        transform: 'translateX(0px)',
        left: '0px',
        background: this.horse.color 
      };
    }
  },
  watch: {
    startRaceTrigger(newVal, oldVal) { 
      console.log(`HorseCard ${this.horse.name}: startRaceTrigger changed from ${oldVal} to ${newVal}`);
      if (newVal > 0) {
        this.startAnimation(); 
      }
    }
  },
  methods: {
    startAnimation() {
      console.log(`Starting animation for ${this.horse.name}, distance: ${this.distance}, condition: ${this.horse.condition}`);
      this.finished = false;
      this.progressPct = 0;
      
      const cond = Math.max(1, Math.min(100, this.horse.condition));
      const baseFactor = 6000; // 50% slower animation (4000 * 1.5 = 6000)
      const distanceScale = this.distance / 1200;
      const randomFactor = 0.9 + Math.random() * 0.2; // Reduced random variation
      
      // Reduce the impact of condition on speed to make differences less extreme
      // Instead of (101 - cond) / 100, use a smaller range
      const conditionFactor = 0.7 + (101 - cond) / 100 * 0.5; // Range: 0.7 to 1.2 instead of 0.01 to 1.0
      const duration = (baseFactor * distanceScale * conditionFactor) * randomFactor;
      
      console.log(`Animation duration: ${duration}ms for ${this.horse.name}`);
      
      const start = performance.now();
      const animate = (t) => {
        const elapsed = t - start;
        const p = Math.min(1, elapsed / duration);
        
        // Add subtle easing for smoother movement
        const easeOut = 1 - Math.pow(1 - p, 2); // Quadratic ease-out
        this.progressPct = easeOut * 100;
        
        if (p < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log(`${this.horse.name} finished in ${elapsed}ms`);
          this.$emit('finished', { timeMs: elapsed });
        }
      };
      requestAnimationFrame(animate);
    }
  },
  
  mounted() {
    console.log(`HorseCard mounted for ${this.horse.name}, startRaceTrigger: ${this.startRaceTrigger}`);
    
    // Measure track width for accurate positioning
    this.$nextTick(() => {
      const wrapper = this.$el;
      if (wrapper) {
        this.trackWidth = wrapper.offsetWidth;
        console.log(`Track width for ${this.horse.name}: ${this.trackWidth}px`);
      }
      
      // If the trigger is already > 0 when component mounts, start animation
      if (this.startRaceTrigger > 0) {
        console.log(`Starting animation on mount for ${this.horse.name}`);
        this.startAnimation();
      }
    });
  }
};
</script>

<style scoped>
.horse-wrapper { 
  flex: 1; 
  position: relative; 
  height: 40px; 
  overflow: hidden; /* Hide horses that go outside bounds */
}

.horse { 
  position: absolute; 
  left: 0; 
  top: 0; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  padding: 4px 12px; 
  border-radius: 6px; 
  color: #fff; 
  width: 140px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  border: 2px solid rgba(255,255,255,0.3);
  transition: none; /* Disable CSS transitions during JS animation */
  will-change: transform; /* Optimize for transform animations */
  transform: translateX(0%); /* Default start position */
}

.horse-icon { 
  font-size: 20px; 
}

.horse-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.horse-name { 
  font-weight: 700; 
  font-size: 12px;
  line-height: 1;
}

.horse-condition {
  font-size: 10px;
  opacity: 0.9;
  font-weight: 500;
}
</style>