# Horse Racing Game - Interactive Vue.js Application


## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (use `nvm use 20` if you have nvm installed)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/khachapuridze/horses.git
cd horse-racing

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5174`

## 🎮 How to Play

1. **Generate Program**: Click "GENERATE PROGRAM" to create 20 horses and 6 race rounds
2. **Start Racing**: Click "START / PAUSE" to begin the tournament
3. **Watch Races**: Observe animated horses racing across 6 rounds with different distances
4. **View Results**: See real-time results in the right panel as each race completes
5. **Pause/Resume**: Use the "PAUSE" button to control race progression

## 🏗️ Architecture

### Key Technologies
- **Vue.js 3**: Composition API and reactive components
- **Vuex 4**: Centralized state management
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with animations and responsive design

## 🧪 Testing

### Unit Tests
Run comprehensive unit tests for components and store:
```bash
npm run test
```

### E2E Tests
Run end-to-end tests with Cypress:
```bash
# Install dependencies first
npm install

# Open Cypress test runner
npm run test:e2e
```

### Test Coverage
- **Store Tests**: Horse generation, schedule creation, tournament management
- **Component Tests**: Rendering, props, events, user interactions
- **E2E Tests**: Complete user workflows, race simulation, UI interactions

## 📋 Game Rules & Specifications

### Horse Specifications
- **Total Horses**: 20 unique horses
- **Condition Range**: 1-100 (affects racing speed)
- **Unique Colors**: Each horse has a distinct color
- **Names**: Famous women in computing history

### Race Specifications
- **Total Rounds**: 6 races per tournament
- **Horses per Race**: 10 randomly selected horses
- **Distances**: 1200m, 1400m, 1600m, 1800m, 2000m, 2200m
- **Animation**: Condition-based speed calculation with randomization


## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:e2e     # Open Cypress E2E tests
```


## 🙏 Acknowledgments

- Horse names honor pioneering women in computer science
- Design inspired by classic horse racing interfaces
- Built with modern web development best practices
