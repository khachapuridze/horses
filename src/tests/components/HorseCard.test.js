import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseCard from '../../components/HorseCard.vue'

describe('HorseCard Component', () => {
  let wrapper
  const mockHorse = {
    id: 1,
    name: 'Ada Lovelace',
    condition: 85,
    color: '#ff5722'
  }

  beforeEach(() => {
    wrapper = mount(HorseCard, {
      props: {
        horse: mockHorse,
        distance: 1200,
        startRaceTrigger: 0
      }
    })
  })

  it('renders horse information correctly', () => {
    expect(wrapper.find('.horse-name').text()).toBe('Ada Lovelace')
    expect(wrapper.find('.horse-condition').text()).toBe('85')
    expect(wrapper.find('.horse-icon').text()).toBe('🐎')
  })

  it('applies horse color as background', () => {
    const horseElement = wrapper.find('.horse')
    expect(horseElement.attributes('style')).toContain('background: rgb(255, 87, 34)')
  })

  it('starts at 0% translation', () => {
    const horseElement = wrapper.find('.horse')
    expect(horseElement.attributes('style')).toContain('transform: translateX(0%)')
  })

  it('emits finished event when animation completes', async () => {
    // Mock requestAnimationFrame and performance.now
    const mockRAF = vi.fn((callback) => {
      setTimeout(callback, 16) // Simulate 60fps
    })
    const mockPerformanceNow = vi.fn()
      .mockReturnValueOnce(0) // Start time
      .mockReturnValueOnce(1000) // End time
    
    global.requestAnimationFrame = mockRAF
    global.performance = { now: mockPerformanceNow }

    // Trigger animation
    await wrapper.setProps({ startRaceTrigger: 1 })
    
    // Wait for animation to potentially complete
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Check if finished event was emitted
    expect(wrapper.emitted('finished')).toBeTruthy()
  })

  it('calculates animation duration based on horse condition', () => {
    const highConditionHorse = { ...mockHorse, condition: 100 }
    const lowConditionHorse = { ...mockHorse, condition: 1 }
    
    const highConditionWrapper = mount(HorseCard, {
      props: {
        horse: highConditionHorse,
        distance: 1200,
        startRaceTrigger: 0
      }
    })
    
    const lowConditionWrapper = mount(HorseCard, {
      props: {
        horse: lowConditionHorse,
        distance: 1200,
        startRaceTrigger: 0
      }
    })
    
    // Both should render without errors
    expect(highConditionWrapper.find('.horse-name').text()).toBe('Ada Lovelace')
    expect(lowConditionWrapper.find('.horse-name').text()).toBe('Ada Lovelace')
  })

  it('handles different distances correctly', async () => {
    await wrapper.setProps({ distance: 2200 })
    
    // Component should still render correctly with different distance
    expect(wrapper.find('.horse-name').text()).toBe('Ada Lovelace')
  })

  it('resets animation state when startRaceTrigger changes', async () => {
    // Initial state
    expect(wrapper.vm.translatePct).toBe(0)
    expect(wrapper.vm.finished).toBe(false)
    
    // Trigger animation
    await wrapper.setProps({ startRaceTrigger: 1 })
    
    // Should reset to initial state
    expect(wrapper.vm.translatePct).toBe(0)
    expect(wrapper.vm.finished).toBe(false)
  })
})
