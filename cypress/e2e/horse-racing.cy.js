describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the application correctly', () => {
    cy.contains('Horse Racing').should('be.visible')
    cy.get('.btn-generate').should('contain', 'GENERATE PROGRAM')
    cy.get('.btn-start').should('contain', 'START / PAUSE')
  })

  it('should display horse list with 20 horses', () => {
    cy.get('.horse-list').should('be.visible')
    cy.contains('Horse List (1- 20)').should('be.visible')
    cy.get('.horse-table tbody tr').should('have.length', 20)
    
    // Check first few horses have the expected names
    cy.get('.horse-table tbody tr').first().should('contain', 'Ada Lovelace')
    cy.get('.horse-table tbody tr').eq(1).should('contain', 'Grace Hopper')
    cy.get('.horse-table tbody tr').eq(2).should('contain', 'Margaret Hamilton')
  })

  it('should generate new program when generate button is clicked', () => {
    // Click generate button
    cy.get('.btn-generate').click()
    
    // Should still show 20 horses (they get regenerated)
    cy.get('.horse-table tbody tr').should('have.length', 20)
    
    // Track should show "Program" initially
    cy.get('.round-label').should('contain', 'Program')
  })

  it('should start racing when start button is clicked', () => {
    // Generate program first
    cy.get('.btn-generate').click()
    
    // Start the race
    cy.get('.btn-start').click()
    
    // Button should change to PAUSE
    cy.get('.btn-start').should('contain', 'PAUSE')
    
    // Should show first lap
    cy.get('.round-label').should('contain', '1st Lap - 1200m')
    
    // Should see horses in the lanes
    cy.get('.lane').should('have.length', 10)
    cy.get('.horse').should('have.length', 10)
  })

  it('should display race results after completion', () => {
    // Generate and start race
    cy.get('.btn-generate').click()
    cy.get('.btn-start').click()
    
    // Wait for first race to complete (should be quick)
    cy.get('.result-block', { timeout: 10000 }).should('have.length.at.least', 1)
    
    // Check result structure
    cy.get('.result-block').first().within(() => {
      cy.get('.lap-badge').should('contain', '1ST Lap - 1200m')
      cy.get('.res-table tbody tr').should('have.length', 10)
      cy.get('.res-table tbody tr').first().should('have.class', 'winner')
    })
  })

  it('should complete all 6 rounds', () => {
    // Generate and start race
    cy.get('.btn-generate').click()
    cy.get('.btn-start').click()
    
    // Wait for all races to complete
    cy.get('.result-block', { timeout: 30000 }).should('have.length', 6)
    
    // Check all expected distances
    const expectedDistances = ['1200m', '1400m', '1600m', '1800m', '2000m', '2200m']
    expectedDistances.forEach((distance, index) => {
      cy.get('.result-block').eq(index).within(() => {
        cy.get('.lap-badge').should('contain', distance)
      })
    })
    
    // Button should return to START / PAUSE after completion
    cy.get('.btn-start').should('contain', 'START / PAUSE')
  })

  it('should pause and resume racing', () => {
    // Generate and start race
    cy.get('.btn-generate').click()
    cy.get('.btn-start').click()
    
    // Wait a moment then pause
    cy.wait(1000)
    cy.get('.btn-start').click()
    
    // Button should show START / PAUSE
    cy.get('.btn-start').should('contain', 'START / PAUSE')
    
    // Resume racing
    cy.get('.btn-start').click()
    cy.get('.btn-start').should('contain', 'PAUSE')
  })

  it('should show horse animations during race', () => {
    // Generate and start race
    cy.get('.btn-generate').click()
    cy.get('.btn-start').click()
    
    // Check that horses are visible and have proper styling
    cy.get('.horse').should('be.visible')
    cy.get('.horse-icon').should('contain', '🐎')
    cy.get('.horse-name').should('be.visible')
    cy.get('.horse-condition').should('be.visible')
    
    // Check finish line is visible
    cy.get('.finish-line').should('be.visible')
    cy.get('.finish-label').should('contain', 'FINISH')
  })

  it('should display tabs in results panel', () => {
    cy.get('.results-panel').should('be.visible')
    cy.get('.tab').should('have.length', 2)
    cy.get('.tab').first().should('contain', 'Program').and('have.class', 'active')
    cy.get('.tab').last().should('contain', 'Results')
  })

  it('should show no results message initially', () => {
    cy.get('.no-results').should('contain', 'No results yet')
  })

  it('should handle multiple race generations', () => {
    // Generate first program
    cy.get('.btn-generate').click()
    cy.get('.btn-start').click()
    
    // Wait for some results
    cy.get('.result-block', { timeout: 10000 }).should('have.length.at.least', 1)
    
    // Generate new program (should reset results)
    cy.get('.btn-generate').click()
    
    // Results should be cleared
    cy.get('.no-results').should('contain', 'No results yet')
    
    // Should be able to start new race
    cy.get('.btn-start').click()
    cy.get('.btn-start').should('contain', 'PAUSE')
  })
})
