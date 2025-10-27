import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import storeConfig from '../store.js'

describe('Vuex Store', () => {
  let store

  beforeEach(() => {
    store = createStore(storeConfig)
  })

  describe('Horse Generation', () => {
    it('should generate 20 horses with unique names', () => {
      store.dispatch('generateHorses')
      const horses = store.state.allHorses
      
      expect(horses).toHaveLength(20)
      expect(horses[0].name).toBe('Ada Lovelace')
      expect(horses[1].name).toBe('Grace Hopper')
      
      // Check all horses have required properties
      horses.forEach(horse => {
        expect(horse).toHaveProperty('id')
        expect(horse).toHaveProperty('name')
        expect(horse).toHaveProperty('condition')
        expect(horse).toHaveProperty('color')
        expect(horse.condition).toBeGreaterThanOrEqual(1)
        expect(horse.condition).toBeLessThanOrEqual(100)
      })
    })

    it('should generate horses with unique IDs', () => {
      store.dispatch('generateHorses')
      const horses = store.state.allHorses
      const ids = horses.map(h => h.id)
      const uniqueIds = [...new Set(ids)]
      
      expect(uniqueIds).toHaveLength(20)
    })
  })

  describe('Schedule Generation', () => {
    beforeEach(() => {
      store.dispatch('generateHorses')
    })

    it('should generate 6 rounds with correct distances', () => {
      store.dispatch('generateSchedule')
      const schedule = store.state.schedule
      const expectedDistances = [1200, 1400, 1600, 1800, 2000, 2200]
      
      expect(schedule).toHaveLength(6)
      schedule.forEach((round, index) => {
        expect(round.length).toBe(expectedDistances[index])
        expect(round.horses).toHaveLength(10)
      })
    })

    it('should select 10 unique horses per round', () => {
      store.dispatch('generateSchedule')
      const schedule = store.state.schedule
      
      schedule.forEach(round => {
        const horseIds = round.horses.map(h => h.id)
        const uniqueIds = [...new Set(horseIds)]
        expect(uniqueIds).toHaveLength(10)
      })
    })

    it('should reset results and current round when generating schedule', () => {
      store.commit('APPEND_RESULT', [{ position: 1, name: 'Test' }])
      store.commit('SET_CURRENT_ROUND', 2)
      
      store.dispatch('generateSchedule')
      
      expect(store.state.results).toHaveLength(0)
      expect(store.state.currentRound).toBe(-1)
      expect(store.state.running).toBe(false)
    })
  })

  describe('Tournament Management', () => {
    beforeEach(() => {
      store.dispatch('generateHorses')
      store.dispatch('generateSchedule')
    })

    it('should set running state when starting tournament', async () => {
      expect(store.state.running).toBe(false)
      
      // Start tournament but don't wait for completion
      store.dispatch('startTournament')
      
      expect(store.state.running).toBe(true)
    })

    it('should stop tournament when requested', () => {
      store.commit('SET_RUNNING', true)
      store.dispatch('stopTournament')
      
      expect(store.state.running).toBe(false)
    })
  })

  describe('Mutations', () => {
    it('should set horses correctly', () => {
      const testHorses = [
        { id: 1, name: 'Test Horse', condition: 50, color: '#ff0000' }
      ]
      
      store.commit('SET_HORSES', testHorses)
      
      expect(store.state.allHorses).toEqual(testHorses)
    })

    it('should append results correctly', () => {
      const result = [
        { position: 1, id: 1, name: 'Winner' },
        { position: 2, id: 2, name: 'Runner-up' }
      ]
      
      store.commit('APPEND_RESULT', result)
      
      expect(store.state.results).toHaveLength(1)
      expect(store.state.results[0]).toEqual(result)
    })

    it('should reset all state correctly', () => {
      // Set some state
      store.commit('SET_HORSES', [{ id: 1, name: 'Test' }])
      store.commit('SET_CURRENT_ROUND', 2)
      store.commit('SET_RUNNING', true)
      store.commit('APPEND_RESULT', [{ position: 1, name: 'Test' }])
      
      // Reset all
      store.commit('RESET_ALL')
      
      expect(store.state.allHorses).toHaveLength(0)
      expect(store.state.schedule).toHaveLength(0)
      expect(store.state.currentRound).toBe(-1)
      expect(store.state.running).toBe(false)
      expect(store.state.results).toHaveLength(0)
    })
  })

  describe('Getters', () => {
    it('should return horses pool correctly', () => {
      const testHorses = [{ id: 1, name: 'Test' }]
      store.commit('SET_HORSES', testHorses)
      
      expect(store.getters.horsesPool).toEqual(testHorses)
    })

    it('should return correct round count', () => {
      expect(store.getters.roundCount).toBe(6)
    })
  })
})
