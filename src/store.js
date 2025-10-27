import { createStore } from 'vuex';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateColor(i) {
  return `hsl(${(i * 137.5) % 360} 70% 50%)`;
}

export default createStore({
  state: {
    allHorses: [],
    schedule: [],
    currentRound: -1,
    running: false,
    results: [],
  },
  getters: {
    horsesPool: (s) => s.allHorses,
    roundCount: () => 6,
  },
  mutations: {
    SET_HORSES(state, horses) { state.allHorses = horses; },
    SET_SCHEDULE(state, schedule) { state.schedule = schedule; },
    SET_CURRENT_ROUND(state, idx) { state.currentRound = idx; },
    SET_RUNNING(state, v) { state.running = v; },
    APPEND_RESULT(state, result) { state.results.push(result); },
    RESET_RESULTS(state) { state.results = []; },
    RESET_ALL(state) {
      state.schedule = [];
      state.currentRound = -1;
      state.running = false;
      state.results = [];
      state.allHorses = [];
    }
  },
  actions: {
    generateHorses({ commit }) {
      const horseNames = [
        'Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke',
        'Katherine Johnson', 'Dorothy Vaughan', 'Mary Jackson', 'Hedy Lamarr',
        'Radia Perlman', 'Barbara Liskov', 'Frances Allen', 'Carol Shaw',
        'Roberta Williams', 'Adele Goldberg', 'Jean Bartik', 'Betty Holberton',
        'Marlyn Meltzer', 'Ruth Teitelbaum', 'Kathleen Olsen', 'Fran Bilas'
      ];
      
      const horses = [];
      for (let i = 0; i < 20; i++) {
        horses.push({
          id: i + 1,
          name: horseNames[i],
          condition: randomInt(1, 100),
          color: generateColor(i),
        });
      }
      commit('SET_HORSES', horses);
    },
    generateSchedule({ state, commit }) {
      const lengths = [1200, 1400, 1600, 1800, 2000, 2200];
      const pool = [...state.allHorses];
      const schedule = lengths.map((len, idx) => {
        const chosen = [];
        while (chosen.length < 10) {
          const cand = pool[Math.floor(Math.random() * pool.length)];
          if (!chosen.some(h => h.id === cand.id)) chosen.push(cand);
        }
        return { id: idx, length: len, horses: chosen };
      });
      commit('SET_SCHEDULE', schedule);
      commit('RESET_RESULTS');
      commit('SET_CURRENT_ROUND', -1);
      commit('SET_RUNNING', false);
    },
    async startTournament({ commit, state, dispatch }) {
      if (!state.schedule.length) return;
      commit('SET_RUNNING', true);

      for (let i = 0; i < state.schedule.length; i++) {
        if (!state.running) break;
        commit('SET_CURRENT_ROUND', i);
        const result = await dispatch('runRound', state.schedule[i]);
        commit('APPEND_RESULT', result);
        await new Promise(r => setTimeout(r, 700));
      }

      commit('SET_RUNNING', false);
      commit('SET_CURRENT_ROUND', -1);
    },
    runRound(_, round) {
      return new Promise((resolve) => {
        window.__CURRENT_ROUND_RESOLVER = resolve;
      });
    },
    roundFinished({}, result) {
      if (window.__CURRENT_ROUND_RESOLVER) {
        window.__CURRENT_ROUND_RESOLVER(result);
        window.__CURRENT_ROUND_RESOLVER = null;
      }
      return Promise.resolve();
    },
    stopTournament({ commit }) {
      commit('SET_RUNNING', false);
    }
  }
});