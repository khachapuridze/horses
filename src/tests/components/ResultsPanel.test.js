import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import ResultsPanel from '../../components/ResultsPanel.vue'
import storeConfig from '../../store.js'

describe('ResultsPanel Component', () => {
  let store
  let wrapper

  beforeEach(() => {
    store = createStore(storeConfig)
    wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store]
      }
    })
  })

  it('renders panel tabs correctly', () => {
    const tabs = wrapper.findAll('.tab')
    expect(tabs).toHaveLength(2)
    expect(tabs[0].text()).toBe('Program')
    expect(tabs[1].text()).toBe('Results')
    expect(tabs[0].classes()).toContain('active')
  })

  it('shows no results message when no results exist', () => {
    expect(wrapper.find('.no-results').text()).toBe('No results yet')
  })

  it('displays race results correctly', () => {
    // Setup test data
    const mockResults = [
      [
        { position: 1, id: 1, name: 'Ada Lovelace' },
        { position: 2, id: 2, name: 'Grace Hopper' },
        { position: 3, id: 3, name: 'Margaret Hamilton' }
      ]
    ]
    
    const mockSchedule = [
      { id: 0, length: 1200, horses: [] }
    ]
    
    store.commit('SET_SCHEDULE', mockSchedule)
    store.commit('APPEND_RESULT', mockResults[0])
    
    // Re-mount to get updated state
    wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store]
      }
    })
    
    expect(wrapper.find('.no-results').exists()).toBe(false)
    
    const resultBlocks = wrapper.findAll('.result-block')
    expect(resultBlocks).toHaveLength(1)
    
    const lapBadge = wrapper.find('.lap-badge')
    expect(lapBadge.text()).toBe('1ST Lap - 1200m')
    
    const rows = wrapper.findAll('.res-table tbody tr')
    expect(rows).toHaveLength(3)
    
    // Check first place
    const firstRow = rows[0]
    expect(firstRow.classes()).toContain('winner')
    expect(firstRow.find('.position').text()).toBe('1')
    expect(firstRow.find('.name').text()).toBe('Ada Lovelace')
  })

  it('displays multiple race results', () => {
    // Setup multiple results
    const mockSchedule = [
      { id: 0, length: 1200, horses: [] },
      { id: 1, length: 1400, horses: [] }
    ]
    
    const result1 = [
      { position: 1, id: 1, name: 'Ada Lovelace' },
      { position: 2, id: 2, name: 'Grace Hopper' }
    ]
    
    const result2 = [
      { position: 1, id: 3, name: 'Margaret Hamilton' },
      { position: 2, id: 1, name: 'Ada Lovelace' }
    ]
    
    store.commit('SET_SCHEDULE', mockSchedule)
    store.commit('APPEND_RESULT', result1)
    store.commit('APPEND_RESULT', result2)
    
    wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store]
      }
    })
    
    const resultBlocks = wrapper.findAll('.result-block')
    expect(resultBlocks).toHaveLength(2)
    
    const lapBadges = wrapper.findAll('.lap-badge')
    expect(lapBadges[0].text()).toBe('1ST Lap - 1200m')
    expect(lapBadges[1].text()).toBe('2ST Lap - 1400m')
  })

  it('renders table headers correctly', () => {
    // Add a result to show the table
    store.commit('SET_SCHEDULE', [{ id: 0, length: 1200, horses: [] }])
    store.commit('APPEND_RESULT', [{ position: 1, id: 1, name: 'Test' }])
    
    wrapper = mount(ResultsPanel, {
      global: {
        plugins: [store]
      }
    })
    
    const headers = wrapper.findAll('.res-table th')
    expect(headers[0].text()).toBe('Position')
    expect(headers[1].text()).toBe('Name')
  })

  it('applies correct CSS classes', () => {
    expect(wrapper.find('.results-panel')).toBeTruthy()
    expect(wrapper.find('.panel-header')).toBeTruthy()
    expect(wrapper.find('.results-content')).toBeTruthy()
  })
})
