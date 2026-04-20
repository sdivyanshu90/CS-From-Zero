# CS-From-Zero 🚀

A comprehensive, interactive educational platform for learning **Computer Science fundamentals from scratch**. Built with modern web technologies, this project provides structured curriculum covering 10 modules across all major CS domains.

> **"From zeros and ones to full-stack systems"** — A journey through the foundations of computer science.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Tech Stack](#tech-stack)
- [Curriculum Structure](#curriculum-structure)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)

---

## Overview

CS-From-Zero is an interactive learning platform designed for students and professionals who want to understand computer science fundamentals. The curriculum progresses logically from basic digital logic through to advanced topics like databases and networking.

### Key Characteristics
- 📚 **10 Comprehensive Modules** covering all CS fundamentals
- 🎯 **Structured Curriculum** with prerequisites tracking
- 🚀 **Interactive Learning** with visual components and quizzes
- 📱 **Responsive Design** built with Tailwind CSS
- ⚡ **Fast Performance** powered by Vite
- 🎨 **Rich Content** using MDX for flexible content creation

---

## Features

✨ **Core Features:**
- Interactive lessons with multiple topics per module
- Progress tracking for students
- Prerequisite management system
- Visual learning components (diagrams, flowcharts)
- Code examples and quizzes
- Responsive UI for desktop and tablet
- Fast hot module replacement during development
- TypeScript for type safety

---

## Project Architecture

### High-Level System Architecture

```mermaid
graph TB
    Client["🖥️ Client Browser"]
    Router["React Router"]
    Store["Zustand Store<br/>Progress Tracking"]
    Layout["Lesson Layout<br/>Component"]
    MDX["MDX Content<br/>Renderer"]
    Components["UI Components<br/>Quiz, Sidebar,<br/>Progress Bar"]
    
    Client -->|Request Lesson| Router
    Router -->|Navigate| Layout
    Store -->|Read/Write Progress| Layout
    Layout -->|Render| Components
    Layout -->|Load Content| MDX
    MDX -->|Display| Components
    
    style Client fill:#ff6b6b
    style Router fill:#4ecdc4
    style Store fill:#45b7d1
    style Layout fill:#96ceb4
    style MDX fill:#ffeaa7
    style Components fill:#dfe6e9
```

### Data Flow Architecture

```mermaid
graph LR
    A["Content Files<br/>.mdx"] -->|Import.meta.glob| B["Route Loader"]
    B -->|Lazy Load| C["React Component"]
    C -->|Render| D["User UI"]
    E["Syllabus JSON"] -->|Provide Metadata| F["Lesson Layout"]
    F -->|Track Prerequisites| G["Progress Store"]
    G -->|Update| D
    
    style A fill:#ffe5e5
    style B fill:#fff3cd
    style C fill:#d1ecf1
    style D fill:#d4edda
    style E fill:#f8d7da
    style F fill:#e7d4f5
    style G fill:#d1f2eb
```

---

## Tech Stack

### Frontend Technologies

```mermaid
graph TB
    subgraph Core["Core Framework"]
        React["⚛️ React 18.3"]
        TS["📘 TypeScript 5.6"]
        Router["🔀 React Router 7.14"]
    end
    
    subgraph Build["Build & Dev"]
        Vite["⚡ Vite 5.4"]
        ESLint["🔍 ESLint 9.13"]
    end
    
    subgraph Content["Content Processing"]
        MDX["📝 @mdx-js 3.1"]
        Remark["💬 Remark GFM"]
        Rehype["🎨 Rehype Highlight"]
    end
    
    subgraph Styling["Styling"]
        Tailwind["🎨 Tailwind CSS 3.4"]
        PostCSS["🔧 PostCSS 8.5"]
        AutoPrefix["📦 Autoprefixer"]
    end
    
    subgraph State["State Management"]
        Zustand["🏪 Zustand 5.0"]
    end
    
    Build -.-> Core
    Core -.-> Content
    Core -.-> Styling
    Core -.-> State
    
    style React fill:#61dafb
    style TS fill:#3178c6
    style Vite fill:#646cff
    style Tailwind fill:#06b6d4
    style Zustand fill:#333333
```

---

## Curriculum Structure

### 10-Module Learning Path

```mermaid
graph TB
    M1["📊 Module 1<br/>Digital Logic<br/>Gates & Circuits"] 
    M3["🏛️ Module 3<br/>Computer Architecture<br/>CPU & Memory"]
    M4["💾 Module 4<br/>Programming & DS<br/>Data Structures"]
    M5["⚙️ Module 5<br/>Algorithms<br/>Complexity & Design"]
    M6["🔬 Module 6<br/>Theory of Computation<br/>Automata & Turing"]
    M7["🔧 Module 7<br/>Compilers<br/>Parsing & Codegen"]
    M8["🖥️ Module 8<br/>Operating Systems<br/>Processes & Memory"]
    M9["💾 Module 9<br/>Databases<br/>Design & SQL"]
    M10["🌐 Module 10<br/>Networks<br/>Protocols & Communication"]
    
    M1 --> M3
    M3 --> M4
    M4 --> M5
    M5 --> M6
    M4 --> M7
    M8 --> M9
    M8 --> M10
    M5 -.->|Theory| M6
    M1 -.->|Foundation| M3
    M4 -.->|Foundation| M8
    
    style M1 fill:#ff6b6b,color:#fff
    style M3 fill:#ee5a6f,color:#fff
    style M4 fill:#f39c12,color:#fff
    style M5 fill:#e67e22,color:#fff
    style M6 fill:#9b59b6,color:#fff
    style M7 fill:#8e44ad,color:#fff
    style M8 fill:#3498db,color:#fff
    style M9 fill:#2980b9,color:#fff
    style M10 fill:#16a085,color:#fff
```

### Module 1: Digital Logic — The Physics of Code

```mermaid
graph TD
    Start["Start: What Is Information?"] --> BA["Boolean Algebra"]
    BA --> LG["Logic Gates & Truth Tables"]
    LG --> CC["Combinational Circuits"]
    CC --> SC["Sequential Circuits<br/>& Memory Elements"]
    SC --> End["End of Module 1"]
    
    BA -.->|Also uses| Min["Minimization<br/>Karnaugh Maps"]
    LG -.->|Also uses| Min
    Min -.-> CC
    
    Start -.->|Also covers| NS["Number Systems<br/>Binary, Hex, Two's Complement"]
    NS -.->|Leads to| FP["Fixed & Floating Point<br/>IEEE 754"]
    
    style Start fill:#d4edda
    style End fill:#f8d7da
    style BA fill:#cfe2ff
    style LG fill:#cfe2ff
    style CC fill:#cfe2ff
    style SC fill:#cfe2ff
    style Min fill:#e2e3e5
    style NS fill:#e2e3e5
    style FP fill:#e2e3e5
```

### Module 3: Computer Architecture

```mermaid
graph TD
    Start["Module 3:<br/>Computer Architecture"] 
    Start --> G2C["From Gates to a CPU"]
    G2C --> ISA["Instruction Set<br/>Architecture"]
    ISA --> AM["Addressing Modes"]
    ISA --> ADP["ALU & Datapath"]
    ADP --> MH["Memory Hierarchy<br/>Cache & RAM"]
    AM --> IOI["I/O & Interrupts"]
    MH --> PL["Pipeline Hazards"]
    PL --> Pipe["Pipelining"]
    Pipe --> End["Complete Module"]
    
    style Start fill:#d4edda
    style End fill:#f8d7da
    style G2C fill:#cfe2ff
    style ISA fill:#cfe2ff
    style AM fill:#d1ecf1
    style ADP fill:#d1ecf1
    style MH fill:#d1ecf1
    style IOI fill:#d1ecf1
```

### Module 4: Programming & Data Structures

```mermaid
graph TB
    Start["Module 4: Programming & DS"]
    Start --> FP["First Program"]
    FP --> VT["Variables & Types"]
    VT --> P["Pointers"]
    P --> REC["Recursion"]
    
    Start --> AR["Arrays"]
    AR --> LL["Linked Lists"]
    LL --> ST["Stacks"]
    ST --> Q["Queues"]
    Q --> TR["Trees"]
    TR --> BST["Binary Search Trees"]
    BST --> BT["B-Trees"]
    
    Start --> HT["Hash Tables"]
    HT --> H["Heaps"]
    
    Start --> G["Graphs"]
    
    style Start fill:#d4edda
    style FP fill:#d1f2eb
    style VT fill:#d1f2eb
    style P fill:#d1f2eb
    style REC fill:#d1f2eb
    style AR fill:#c3e6cb
    style LL fill:#c3e6cb
    style ST fill:#c3e6cb
    style Q fill:#c3e6cb
    style TR fill:#c3e6cb
    style BST fill:#c3e6cb
    style BT fill:#c3e6cb
    style HT fill:#b1dfbb
    style H fill:#b1dfbb
    style G fill:#a8d5ba
```

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CS-From-Zero.git
   cd CS-From-Zero
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically open the first lesson

### Build for Production

```bash
npm run build
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build locally |

---

## Project Structure

### Directory Organization

```
CS-From-Zero/
├── 📄 README.md                    # This file
├── 📄 package.json                 # Dependencies and scripts
├── 🔧 tsconfig.json                # TypeScript configuration
├── 🔧 tailwind.config.js           # Tailwind CSS setup
├── 🔧 postcss.config.js            # PostCSS configuration
├── 🔧 vite.config.ts               # Vite build configuration
├── 🔧 eslint.config.js             # ESLint rules
│
├── 📁 src/
│   ├── 📄 main.tsx                 # App entry point
│   ├── 📄 index.css                # Global styles
│   ├── 📄 mdx-components.tsx       # MDX custom components
│   ├── 📄 vite-env.d.ts            # Vite type declarations
│   │
│   ├── 📁 components/              # React components
│   │   ├── ConceptLink.tsx         # Links to related concepts
│   │   ├── LessonLayout.tsx        # Main lesson container
│   │   ├── PrerequisiteBadge.tsx   # Prerequisite display
│   │   ├── ProgressBar.tsx         # Progress indicator
│   │   ├── Quiz.tsx                # Interactive quizzes
│   │   └── Sidebar.tsx             # Navigation sidebar
│   │
│   ├── 📁 content/                 # Educational content (MDX)
│   │   ├── 📁 module-1-digital-logic/
│   │   │   ├── boolean-algebra.mdx
│   │   │   ├── logic-gates.mdx
│   │   │   ├── number-systems.mdx
│   │   │   └── ... (more lessons)
│   │   ├── 📁 module-3-architecture/
│   │   ├── 📁 module-4-prog-ds/
│   │   ├── 📁 module-5-algorithms/
│   │   ├── 📁 module-6-theory/
│   │   ├── 📁 module-7-compilers/
│   │   ├── 📁 module-8-os/
│   │   ├── 📁 module-9-dbms/
│   │   └── 📁 module-10-networks/
│   │
│   ├── 📁 data/                    # Static data
│   │   └── syllabus.json           # Curriculum metadata
│   │
│   ├── 📁 router/                  # Routing configuration
│   │   └── index.tsx               # Route definitions
│   │
│   ├── 📁 store/                   # State management
│   │   └── progressStore.ts        # Zustand progress store
│   │
│   └── 📁 assets/                  # Images and media
│
└── 📁 public/                      # Static assets
```

### File Relationships

```mermaid
graph LR
    Main["main.tsx<br/>App Entry"]
    Router["router/index.tsx<br/>Route Config"]
    Content["content/<br/>MDX Lessons"]
    Syllabus["data/syllabus.json<br/>Metadata"]
    Components["components/<br/>UI Elements"]
    Store["store/progressStore<br/>State"]
    
    Main -->|Initialize| Router
    Router -->|Load Dynamically| Content
    Syllabus -->|Provides Metadata| Router
    Components -->|Render| Main
    Store -->|Track Progress| Main
    Content -->|Use| Components
    
    style Main fill:#ffeaa7
    style Router fill:#74b9ff
    style Content fill:#a29bfe
    style Syllabus fill:#fd79a8
    style Components fill:#55efc4
    style Store fill:#fab1a0
```

---

## Development

### Understanding the Content System

The content management uses **Vite's `import.meta.glob`** with lazy loading:

```mermaid
graph LR
    File["MDX File<br/>lesson.mdx"]
    Glob["import.meta.glob<br/>Pattern Matching"]
    Loader["Dynamic Loader<br/>Function"]
    Component["React Component<br/>Lazy"]
    UI["Browser UI"]
    
    File -->|Discovered by| Glob
    Glob -->|Creates| Loader
    Loader -->|Creates| Component
    Component -->|Renders to| UI
    
    style File fill:#fab1a0
    style Glob fill:#a29bfe
    style Loader fill:#74b9ff
    style Component fill:#55efc4
    style UI fill:#ffeaa7
```

### Component Communication Flow

```mermaid
sequenceDiagram
    participant User
    participant Router
    participant LessonLayout
    participant ProgressStore
    participant MDXContent
    participant Components
    
    User->>Router: Click lesson link
    Router->>LessonLayout: Render with params
    LessonLayout->>ProgressStore: Fetch lesson progress
    ProgressStore-->>LessonLayout: Return progress data
    LessonLayout->>MDXContent: Load content dynamically
    MDXContent-->>LessonLayout: Content loaded
    LessonLayout->>Components: Pass props to UI components
    Components-->>User: Render interactive lesson
    User->>Components: Complete quiz/interact
    Components->>ProgressStore: Update progress
    ProgressStore-->>Components: Progress saved
```

### Adding New Content

1. **Create MDX file** in appropriate module folder
   ```bash
   src/content/module-1-digital-logic/new-topic.mdx
   ```

2. **Update syllabus.json** with lesson metadata
   ```json
   {
     "id": "digital-logic/new-topic",
     "title": "New Topic Title",
     "summary": "Brief description",
     "moduleNumber": 1,
     "prerequisites": ["digital-logic/previous-topic"],
     "estimatedMinutes": 10
   }
   ```

3. **Use custom MDX components** in content
   - Use `<Quiz>` for interactive quizzes
   - Use `<ConceptLink>` for cross-references
   - Use `<PrerequisiteBadge>` to show prerequisites

### Component Overview

```mermaid
graph TB
    subgraph Layout["🎨 Layout Components"]
        LL["LessonLayout<br/>Main Container"]
        SB["Sidebar<br/>Navigation"]
        PB["ProgressBar<br/>Course Progress"]
    end
    
    subgraph Content["📚 Content Components"]
        Q["Quiz<br/>Interactive Tests"]
        CL["ConceptLink<br/>Cross References"]
        PRB["PrerequisiteBadge<br/>Prerequisites"]
    end
    
    subgraph Composition["🔧 Composition"]
        LL -->|Contains| SB
        LL -->|Contains| PB
        LL -->|Renders| Content
        Q -.->|Integrated in| LL
        CL -.->|Integrated in| LL
        PRB -.->|Integrated in| LL
    end
    
    style LL fill:#74b9ff
    style SB fill:#0984e3
    style PB fill:#0984e3
    style Q fill:#55efc4
    style CL fill:#55efc4
    style PRB fill:#55efc4
```

### Build Process

```mermaid
graph LR
    TS["TypeScript Files<br/>.ts, .tsx"]
    MDX["MDX Content<br/>.mdx"]
    
    TSC["TypeScript<br/>Compiler"] -->|Check Types| TypeCheck["✓ Type Check"]
    TS -->|Input to| TSC
    
    Vite["Vite Build<br/>Process"]
    TSC -->|Feed to| Vite
    MDX -->|Process via Plugin| Vite
    
    Vite -->|Create| ES["ES Modules"]
    Vite -->|Create| CSS["CSS Bundles"]
    Vite -->|Copy| Assets["Static Assets"]
    
    ES & CSS & Assets -->|Output| Dist["📦 dist/<br/>Production Build"]
    
    style TS fill:#fab1a0
    style MDX fill:#fab1a0
    style TSC fill:#74b9ff
    style Vite fill:#a29bfe
    style Dist fill:#ffeaa7
```

---

## Curriculum Details

### Module Overview Table

| Module | Focus | Topics | Lessons |
|--------|-------|--------|---------|
| **1** | Digital Logic | Gates, circuits, number systems | 10 lessons |
| **3** | Architecture | CPU design, memory, pipelining | 8 lessons |
| **4** | Programming & DS | Data structures, algorithms basics | 14 lessons |
| **5** | Algorithms | Complexity, design paradigms | 11 lessons |
| **6** | Theory | Automata, complexity, decidability | 7 lessons |
| **7** | Compilers | Parsing, code generation | 7 lessons |
| **8** | Operating Systems | Processes, memory management | TBD |
| **9** | Databases | Design, normalization, SQL | TBD |
| **10** | Networks | Protocols, TCP/IP, layers | 9 lessons |

### Learning Path Visualization

```mermaid
graph TD
    A["🚀 Start:<br/>Module 1"] --> B["Foundations Set:<br/>Digital Logic"]
    B --> C["🏗️ Module 3:<br/>Architecture"]
    C --> D["💻 Module 4:<br/>Programming & DS"]
    D --> E["⚙️ Module 5:<br/>Algorithms"]
    D --> F["🔧 Module 7:<br/>Compilers"]
    D --> G["🖥️ Module 8:<br/>OS"]
    E --> H["🔬 Module 6:<br/>Theory"]
    G --> I["💾 Module 9:<br/>Databases"]
    G --> J["🌐 Module 10:<br/>Networks"]
    
    I --> K["✅ Complete:<br/>CS Fundamentals"]
    J --> K
    H --> K
    
    style A fill:#d4edda,color:#155724
    style K fill:#ffeaa7,color:#856404
    style B fill:#cfe2ff,color:#084298
    style C fill:#cfe2ff,color:#084298
    style D fill:#cfe2ff,color:#084298
    style E fill:#cce5ff,color:#084298
    style F fill:#cce5ff,color:#084298
    style G fill:#cce5ff,color:#084298
    style H fill:#d1ecf1,color:#0c5460
    style I fill:#e2e3e5,color:#383d41
    style J fill:#e2e3e5,color:#383d41
```

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Types
- 📝 **New Lessons**: Add MDX content to appropriate module
- 🐛 **Bug Fixes**: Fix issues in components or build process
- 🎨 **UI/UX**: Improve visual design and user experience
- 📚 **Documentation**: Improve README, add comments
- 🧪 **Testing**: Add tests for components and utilities

---

## Architecture Decision Records

### Why Vite?
- ⚡ Fast development server with HMR
- 📦 Optimized production build
- 🔌 Excellent plugin ecosystem

### Why MDX?
- 📝 Write content in Markdown with React components
- 🎨 Rich interactive lessons without backend
- 🚀 Static site generation friendly

### Why Zustand?
- 🪶 Lightweight state management
- 🎯 Simple API for progress tracking
- 💾 Easy persistence to localStorage

---

## Performance & Optimization

```mermaid
graph TB
    subgraph Optimizations["⚡ Performance Strategies"]
        LazyLoad["Lazy Loading<br/>Code splitting by route"]
        TreeShake["Tree Shaking<br/>Remove unused code"]
        CSS["CSS Optimization<br/>Tailwind purging"]
        Images["Image Optimization<br/>Assets minimization"]
    end
    
    subgraph Monitoring["📊 Metrics"]
        BundleSize["Bundle Size<br/>Monitor"]
        LoadTime["Load Time<br/>< 2s target"]
        TTFB["Time to First Byte<br/>< 100ms target"]
    end
    
    Optimizations -->|Achieve| Monitoring
    
    style LazyLoad fill:#55efc4
    style TreeShake fill:#55efc4
    style CSS fill:#55efc4
    style Images fill:#55efc4
```

---

## Roadmap

- [ ] Module 2: (Currently skipped in numbering)
- [ ] Complete Module 8: Operating Systems
- [ ] Complete Module 9: Databases
- [ ] Add interactive coding exercises
- [ ] Implement user accounts and cloud sync
- [ ] Add AI-powered Q&A
- [ ] Mobile app version
- [ ] Multilingual support

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support & Contact

- 📧 Email: support@example.com
- 💬 Discord: [Join our community](#)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/CS-From-Zero/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/yourusername/CS-From-Zero/discussions)

---

## Acknowledgments

- 🎓 Inspired by CS50 and other foundational CS courses
- 🙏 Thanks to all contributors and learners
- 📚 Built on top of amazing open-source projects

---

**Happy Learning! 🚀**
