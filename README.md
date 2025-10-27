# Horse Racing Game - Interactive Vue.js Application

An interactive horse racing simulation game built with Vue.js 3, Vuex, and Vite. This project demonstrates modern front-end development practices with component-based architecture, state management, and comprehensive testing.

## 🏇 Features

- **20 Unique Horses**: Each horse has a unique name (famous women in computing), condition score (1-100), and color
- **6 Racing Rounds**: Progressive distances from 1200m to 2200m
- **Animated Racing**: Smooth horse animations with realistic speed based on condition scores
- **Real-time Results**: Live results display with winner highlighting
- **Responsive Design**: Modern UI matching the provided design specifications
- **State Management**: Vuex store for centralized state management
- **Component Architecture**: Modular Vue components for maintainability

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (use `nvm use 20` if you have nvm installed)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
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

### Component Structure
```
src/
├── components/
│   ├── HorseList.vue      # Displays all 20 horses with their stats
│   ├── RaceTrack.vue      # Main racing area with lanes and animations
│   ├── HorseCard.vue      # Individual horse animation component
│   └── ResultsPanel.vue   # Results display with tabs
├── store.js               # Vuex store for state management
├── App.vue               # Main application component
└── main.js               # Application entry point
```

### State Management (Vuex)
- **Horses**: 20 horses with unique properties
- **Schedule**: 6 rounds with 10 randomly selected horses each
- **Racing State**: Current round, running status, results
- **Actions**: Generate horses/schedule, start/stop tournament, handle race completion

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

### Technical Requirements Met
✅ Vue.js framework  
✅ Component-based design  
✅ Vuex state management  
✅ 20 horses with unique colors and conditions  
✅ 6 rounds with specified distances  
✅ 10 horses per round (randomly selected)  
✅ Animated horse movement  
✅ Sequential race execution  
✅ Results display  
✅ Clean, maintainable code structure  
✅ Unit tests  
✅ E2E tests  

## 🎨 Design Features

- **Modern UI**: Clean, professional design matching specifications
- **Responsive Layout**: Three-panel layout (horses, track, results)
- **Visual Feedback**: Color-coded elements, hover effects, animations
- **Accessibility**: Proper contrast, readable fonts, intuitive navigation
- **Performance**: Optimized animations and efficient state updates

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:e2e     # Open Cypress E2E tests
```

## 🏆 Performance Considerations

- **Efficient Animations**: RequestAnimationFrame for smooth 60fps animations
- **State Optimization**: Minimal re-renders with computed properties
- **Memory Management**: Proper cleanup of animation timers
- **Component Reusability**: Modular components for maintainability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Horse names honor pioneering women in computer science
- Design inspired by classic horse racing interfaces
- Built with modern web development best practices
