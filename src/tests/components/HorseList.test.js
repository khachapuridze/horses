import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import HorseList from '../../components/HorseList.vue'
import storeConfig from '../../store.js'

describe('HorseList Component', () => {
  let store
  let wrapper

  beforeEach(() => {
    store = createStore(storeConfig)
    store.dispatch('generateHorses')
    
    wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    })
  })

  it('renders horse list title correctly', () => {
    expect(wrapper.find('.list-title').text()).toBe('Horse List (1- 20)')
  })

  it('displays all 20 horses', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(20)
  })

  it('displays horse information correctly', () => {
    const firstRow = wrapper.find('tbody tr')
    const cells = firstRow.findAll('td')
    
    expect(cells[0].text()).toBe('Ada Lovelace') // Name
    expect(cells[1].text()).toMatch(/^\d+$/) // Condition (number)
    expect(cells[2].find('.color-swatch')).toBeTruthy() // Color swatch
  })

  it('displays table headers correctly', () => {
    const headers = wrapper.findAll('thead th')
    expect(headers[0].text()).toBe('Name')
    expect(headers[1].text()).toBe('Condition')
    expect(headers[2].text()).toBe('Color')
  })

  it('applies correct CSS classes', () => {
    expect(wrapper.find('.horse-list')).toBeTruthy()
    expect(wrapper.find('.horse-table')).toBeTruthy()
    expect(wrapper.find('.color-swatch')).toBeTruthy()
  })

  it('handles empty horse list gracefully', () => {
    store.commit('SET_HORSES', [])
    
    const emptyWrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    })
    
    const rows = emptyWrapper.findAll('tbody tr')
    expect(rows).toHaveLength(0)
  })
})
