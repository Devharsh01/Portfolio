# Portfolio-v2 - Complete UI Implementation Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Design System](#design-system)
5. [Layout & Navigation](#layout--navigation)
6. [Page Components](#page-components)
7. [Animation System](#animation-system)
8. [AI Chat System](#ai-chat-system)
9. [UI Components Library](#ui-components-library)
10. [Responsive Design](#responsive-design)
11. [Key Features](#key-features)

---

## 🎯 Project Overview

**Portfolio-v2** is a modern, full-stack portfolio website built with Next.js 13.2.3, featuring a sophisticated UI with advanced animations, an AI-powered chat system, and comprehensive project showcase capabilities. The portfolio belongs to Dev Harsh Agarwal, a Full Stack Engineer.

**Live Features:**
- Dynamic preloader with text animations
- Interactive cursor effects (Blobity)
- Smooth scroll animations with Framer Motion
- AI-powered chatbot for portfolio queries
- Advanced email contact system
- Project filtering and search
- Responsive design across all devices

---

## 🛠 Tech Stack

### Core Framework
- **Next.js** 13.2.3 (React 18.2.0)
- **TypeScript** for type safety
- **React** 18.2.0

### Styling
- **Tailwind CSS** with custom configurations
- **PostCSS** for CSS processing
- **Custom CSS** for animations
- **Tailwind Scrollbar** plugin
- **@tailwindcss/line-clamp** plugin

### Fonts
- **Syne** (Google Font) - Primary font
- **Mona Sans** - Custom font for hero sections

### Animation Libraries
- **Framer Motion** 10.6.1 - Primary animation library
- **GSAP** 3.11.5 - Advanced animations
- **Blobity** 0.2.3 - Interactive cursor effects
- **Scroller Motion** 1.2.3
- **React Intersection Observer** 9.4.3

### UI/UX Libraries
- **Lucide React** 0.541.0 - Icon library
- **React Icons** 5.5.0 - Additional icons
- **FontAwesome** (React + SVG Core) 6.3.0

### AI/Chat Features
- **LangChain** ecosystem (@langchain/core, @langchain/community)
- **@langchain/google-genai** 0.0.10
- **@langchain/openai** 0.1.3
- **@langchain/pinecone** 0.0.9
- **@langchain/tavily** 0.1.5
- **@pinecone-database/pinecone** 1.1.3

### Content Management
- **MDX** (@next/mdx, @mdx-js/loader) for blog content
- **Gray Matter** 4.0.3 - Markdown frontmatter parser
- **Marked** 17.0.1 - Markdown parser
- **React Markdown** 10.1.0

### Backend/API
- **Nodemailer** 7.0.5 - Email functionality
- **JWT** (jsonwebtoken) 9.0.2
- **DOMPurify** 3.3.1 - HTML sanitization
- **dotenv** 16.6.1

### Utilities
- **clsx** 2.1.1 - Conditional classNames
- **LocalForage** 1.10.0 - Client-side storage
- **Sharp** 0.32.0 - Image optimization
- **Resize Observer Polyfill** 1.5.1

### Analytics
- **@vercel/analytics** 0.1.11

---

## 📁 Project Structure

```
Portfolio-v2/
├── app/                          # Next.js 13 App Router
│   ├── about-section/           # About section components
│   ├── animations/              # Animation components & configs
│   │   ├── PreLoader/          # Preloader animation
│   │   ├── AnimatedWords.tsx   # Word-by-word animations
│   │   ├── AnimatedTitle.tsx   # Title animations
│   │   ├── AnimatedBody.tsx    # Body text animations
│   │   └── animate.css         # Custom CSS animations
│   ├── api/                     # API routes
│   ├── blog-section/           # Blog grid component
│   ├── contact/                # Contact form & email system
│   │   ├── Contact.tsx         # Main contact section
│   │   └── EmailForm.tsx       # Email form with AI generation
│   ├── contexts/               # React contexts
│   │   ├── NavigationContext.tsx
│   │   └── BlobityProvider.tsx
│   ├── fonts/                  # Custom font configs
│   ├── footer/                 # Footer component
│   ├── hero-section/           # Hero/landing section
│   │   └── Hero.tsx
│   ├── projects/               # Projects page & components
│   │   ├── page.tsx            # Projects listing page
│   │   ├── DetailedProjectCard.tsx
│   │   ├── SearchBar.tsx       # Project search
│   │   └── [slug]/            # Dynamic project pages
│   ├── reviews-section/        # Reviews/testimonials
│   ├── utils/                  # Utility functions
│   ├── work-section/           # Work/projects section
│   │   ├── Work.tsx
│   │   └── ProjectGrid.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
│
├── components/                  # Reusable components
│   ├── common/                 # Common components
│   │   ├── NavBar.tsx          # Navigation bar
│   │   └── ScrollToTop.tsx     # Scroll to top button
│   ├── tools/                  # Tool components
│   │   ├── ai-chat-modal.tsx   # AI chat interface
│   │   ├── ai-chat-cards.tsx   # Chat card components
│   │   ├── ai-chat/           # Chat utilities
│   │   └── emailTemplates.tsx
│   └── ui/                     # UI components
│       ├── alert.tsx           # Alert/notification system
│       ├── ai-chat-animation.tsx
│       ├── flip-words.tsx
│       ├── navbar-menu.tsx
│       ├── sparkles.tsx
│       ├── text-hover-effect.tsx
│       ├── TextGenerationEffect.tsx
│       └── timeline.tsx
│
├── constants/                   # Constants & data
│   ├── projectDetails.ts       # Project data
│   ├── prompt-data.ts          # AI chat prompts
│   └── [other constants]
│
├── contents/                    # Content files (MDX/Markdown)
├── lib/                        # Library configurations
├── public/                     # Static assets
│   ├── projects/              # Project images
│   ├── hero.jpg               # Hero background
│   ├── profile1.jpeg          # Profile image
│   └── [other assets]
│
├── scripts/                    # Utility scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
└── package.json               # Dependencies
```

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Background: `#0E1016` (Dark navy/black)
- Primary Text: `#e4ded7` (Off-white/cream)
- Accent: Gradient overlays

**Opacity Variations:**
- Text secondary: `#e4ded7/80`
- Text tertiary: `#e4ded7/60`
- Borders: `#e4ded7/20` to `#e4ded7/30`
- Backgrounds: `#e4ded7/10` to `#e4ded7/20`

**Additional Colors:**
- Cards/Sections: `#212531` (Slightly lighter than background)
- Success: Green tones
- Error: Red tones (`text-red-400`, `text-red-300`)
- Warning: Yellow tones (`text-yellow-400`, `text-yellow-300`)
- Info: Blue tones (`text-blue-400`, `text-blue-300`)

### Typography

**Font Families:**
- Primary: `Syne` (Google Font)
  - Weights: 400, 500, 600, 700, 800
  - Display: block
- Secondary: `Mona Sans` (Custom font for hero)

**Font Sizes:**
```css
/* Headings */
h1: text-4xl (font-bold)
h2: text-3xl (font-bold)
h3: text-2xl (font-bold)
h4: text-xl (font-semibold)
h5: text-lg (font-semibold)
h6: text-sm (font-semibold)

/* Hero Title */
- Mobile: 40px
- Small: 45px
- Medium: 60px
- Large: 80px

/* Section Titles */
- Mobile: 36px
- Medium: 42px
- Large: 72px

/* Body Text */
- Base: 16px
- Medium: 18-20px
- Large: 24px
```

### Spacing System

**Breakpoints:**
```javascript
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
3xl: 1600px (custom)
```

**Common Spacing:**
- Section padding: `py-16 md:py-20 lg:py-20`
- Container width: `w-[90%]` with `lg:max-w-[1440px]` or `lg:max-w-[1200px]`
- Gaps: `gap-4`, `gap-6`, `gap-10`, `gap-20`

### Border Radius
- Small buttons/inputs: `rounded-md` (6px)
- Cards: `rounded-lg` (8px) to `rounded-3xl` (24px)
- Pills/full round: `rounded-full`

### Shadows & Effects
- Backdrop blur: `backdrop-blur-sm` or `backdrop-blur-md`
- Shadow on hover: `hover:shadow-lg hover:shadow-[#e4ded7]/20`
- Gradient overlays: `bg-gradient-to-r from-[color] to-[color]`

---

## 🧭 Layout & Navigation

### Root Layout (`layout.tsx`)

**Structure:**
```tsx
<html lang="en">
  <body className={syne.className + " scroll-smooth scrollbar-thin scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]"}>
    <NavigationProvider>
      <BlobityProvider>
        {children}
      </BlobityProvider>
    </NavigationProvider>
    <Analytics />
  </body>
</html>
```

**Features:**
- Custom font application (Syne)
- Smooth scrolling enabled
- Custom scrollbar styling
- Navigation context provider
- Blobity interactive cursor provider
- Vercel Analytics integration

**Metadata:**
- Title: "Dev Harsh Agarwal — Full Stack Engineer"
- Description: Full Stack Engineer profile
- Open Graph tags for social sharing
- Twitter card support
- Robots configuration
- Keywords: freelance developer, frontend, react, MERN stack, etc.

### Navigation Bar (`NavBar.tsx`)

**Position:** Fixed bottom navigation (mobile-first approach)
- Fixed at: `bottom-10`
- Z-index: `z-50`
- Background: `bg-[#07070a]/90` with backdrop blur

**Layout:**
- Centered horizontally
- Responsive width:
  - Home page: `w-[306px] sm:w-[383.3px] lg:w-[391.3px]`
  - Other pages: `w-[200px] sm:w-[240px] lg:w-[260px]`

**Navigation Items (Home Page):**
1. **Resume Button** (PDF icon)
   - Links to Google Drive resume
   - FontAwesome PDF icon
   - Tooltip: "View Resume"

2. **Home Link**
   - Smooth scroll to `#home`
   - Text: "Home"

3. **Work Link**
   - Smooth scroll to `#work`
   - Text: "Work"

4. **About Link**
   - Smooth scroll to `#about`
   - Text: "About"

5. **Contact Link**
   - Smooth scroll to `#contact`
   - Text: "Contact"

**Other Pages Navigation:**
- Shows "Return to Home" button instead
- Links back to homepage

**Features:**
- Smooth scroll behavior on section links
- Blobity magnetic effects disabled on nav items
- Dynamic rendering based on current page
- Consistent padding and spacing

---

## 📄 Page Components

### Home Page (`page.tsx`)

**Structure:**
```tsx
<>
  {getPreloaderFlag() && <PreLoader />}
  <NavBar />
  
  <main>
    <Hero />
    <Work />
    <About />
    <Contact />
    <Footer />
  </main>

  {/* AI Chat Button (Fixed) */}
  <button className="fixed bottom-6 right-6">
    {/* Chat Icon SVG */}
  </button>

  {/* AI Chat Modal */}
  <AIChatModal isOpen={isChatOpen} onClose={...} />
</>
```

**Components Order:**
1. PreLoader (conditional)
2. NavBar (fixed)
3. Hero Section
4. Work Section (Featured Projects)
5. About Section
6. Contact Section
7. Footer
8. AI Chat Button (fixed bottom-right)
9. AI Chat Modal (overlay)

**State Management:**
- `isChatOpen`: Controls AI chat modal visibility
- Scroll to top on mount

---

### Hero Section (`Hero.tsx`)

**Layout:**
- Full viewport height: `h-[85vh] sm:h-[90vh] md:h-[100vh] 3xl:h-[85vh]`
- Background: Hero image (`hero.jpg`) with dark overlay
- Positioned sections: Top, Center, Bottom

**Top Section:**
- Positioned: `absolute top-10`
- Width: `sm:w-[90%] lg:max-w-[1440px]`

**Left Side:**
- "LET'S TALK" button
- Links to WhatsApp: `wa.me/919456658136`
- Hidden on mobile, visible on sm+
- Styling: Border outline button with `border-[#e4ded7]`

**Right Side:**
- Social links: GitHub, LinkedIn, LeetCode
- Display as abbreviations: "GH", "LN", "LT"
- Font: `text-[16px] font-bold`
- Gap between links: `gap-10 sm:gap-12 md:gap-14`

**Center Section:**
- Main title: "DEV HARSH_AGARWAL"
- Font: Mona Sans custom font
- Animated word-by-word appearance
- Profile image below title:
  - Width: `w-[150px] md:w-[200px] lg:w-[245px]`
  - Rounded corners: `rounded-[16px] md:rounded-[32px]`
  - Grayscale with hover color effect
  - Position: `absolute bottom-[-110px]` (relative to title)

**Bottom Section:**
- Positioned: `absolute bottom-10`
- Two text blocks (responsive layout)

**Left Text Block:**
- Max width: `max-w-[350px] md:max-w-[400px] lg:max-w-[400px]`
- Text: Full Stack Engineer description
- Mentions previous work at Deloitte (linked)
- Font: `text-[16px] md:text-[20px]`
- Centered on mobile, left-aligned on desktop

**Right Text Block (Desktop only):**
- Hidden on mobile: `hidden lg:block`
- Max width: `lg:max-w-[420px]`
- Text: "Focused on interfaces and experiences, working from India"
- Right-aligned text

**Animations:**
- Framer Motion for entrance animations
- Image animation (zoom/fade in)
- Body text animation (fade in from bottom)

---

### Work Section (`Work.tsx`)

**Layout:**
- Background: `bg-[#0E1016]`
- Padding: `py-16 md:py-20 lg:py-20`
- Centered content

**Section Title:**
- Text: "Featured Work"
- Hidden on mobile: `hidden`
- Font size: `text-[36px] md:text-[42px] lg:text-[72px]`
- Color: `text-[#e4ded7]`
- Margin bottom: `mb-10 md:mb-16 lg:mb-16`

**Content:**
- `<ProjectGrid count={3} />` - Shows first 3 projects

**All Projects Button:**
- Positioned below grid with `mt-16`
- Gradient background effect
- Icon: Arrow right (animated on hover)
- Hover effects:
  - Gradient shift
  - Arrow translation
  - Shadow glow
- Links to `/projects` page

**Styling:**
```tsx
className="group relative overflow-hidden rounded-lg 
bg-gradient-to-r from-[#e4ded7]/10 to-[#e4ded7]/5 
px-8 py-4 font-medium text-[#e4ded7]"
```

---

### Projects Page (`projects/page.tsx`)

**Layout:**
- PreLoader (conditional)
- NavBar
- Main section with full project grid
- ScrollToTop button

**Header Section:**
- HOME button (top-left)
  - Position: `absolute top-8 left-8`
  - Responsive positioning
  - Border button style
- Title: "Featured Work"
  - Same styling as Work section

**Search Bar:**
- Custom SearchBar component
- Filters projects by technology keywords
- Centered below title
- State: `searchTerm`

**Project Grid:**
- `<ProjectGrid searchTerm={searchTerm} />`
- Shows all projects (or filtered subset)
- Responsive grid layout

**Features:**
- Search functionality by skills/technologies
- Scroll to top on mount
- Return to home button

---

### About Section (`About.tsx`)

**Layout:**
- Background: `bg-[#0E1016]`
- Padding: `pt-16 md:pt-20 lg:pt-20`
- Container: `w-[90%] lg:max-w-[1212.8px]`

**Main Title:**
- Text: "I MAKE INTERFACES STUNNING, BACKENDS STRONG AND EXPERIENCES UNFORGETTABLE."
- Font size: `text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`
- Font weight: Bold
- Leading: `leading-[0.9em]`
- Animated title component

**Content Layout:**
- Flexbox: `flex-col lg:flex-row`
- Gap on desktop: `lg:gap-20`

**Left Column (Main Content):**
- Width: `w-[100%] lg:max-w-[90%]`
- Font: `text-[18px] md:text-[20px] lg:text-[24px]`
- Color: `text-[#e4ded7]`
- Line height: Relaxed

**Paragraphs:**
1. Introduction to full stack development and MERN stack
2. Personal interests (movies, anime, music)
3. Philosophy on building software

**Right Column (Skills):**
- Width: `w-[100%] lg:max-w-[30%]`
- Font: `text-[18px] md:text-[16px] lg:text-[18px]`
- Color: `text-[#e4ded7]/80`

**Skills Categories:**
1. **Programming Languages**
   - C, Python, Java, HTML, CSS, JavaScript, TypeScript

2. **Web Development**
   - React.js, Express.js, Next.js, TailwindCSS, Node.js, REST APIs

3. **Database Management**
   - MySQL, PostgreSQL, NoSQL, MongoDB, Database Design

4. **Developer Tools & OS**
   - Git, VS Code, Google Colab, Linux, Postman, Jupyter Notebooks

**Bottom Element:**
- Song Carousel component
- Positioned: `absolute bottom-5`
- Animated scrolling effect

---

### Contact Section (`contact/Contact.tsx`)

**Layout:**
- Background: `bg-[#0E1016]`
- Full section with multiple interaction modes

**Main Title:**
- Animated title component
- Centered layout

**Email Form Component:**
- Two modes: Manual and AI-assisted
- Multi-step form:
  1. Details step (name, email, subject)
  2. Compose step (email content)

**Features:**
- AI email generation using prompts
- Email templates selection
- Form validation
- Success/error alerts
- Security measures (automated click detection)
- Status island notification

**Status Notification:**
- Animated island expansion
- Shows success/error state
- Auto-hides after 3 seconds
- Icons: CheckCircle (success), XCircle (error)

**Alert System:**
- Custom alert component
- Types: success, error, warning, info
- Auto-close functionality
- Smooth animations

---

### Footer Component (`footer/Footer.tsx`)

**Layout:**
- Height: `h-[15vh] md:h-[20vh] lg:h-[10vh]`
- Border top: `border-t-[3px] border-[#e4ded7]/30`
- Padding: `pt-10 md:py-16 lg:pt-6`

**Content:**
- Full width container: `w-[90%] lg:max-w-[1440px]`
- Flex layout: Space between
- Text: `text-[12px] md:text-[14px]`
- Color: `text-[#e4ded7]`
- Font: Bold uppercase

**Left Side:**
- Copyright text with dynamic year
- AnimatedBody component

**Right Side:**
- Text: "Design & Development by"
- Link to GitHub profile
- Developer name: "Dev Harsh Agarwal"
- Underline on hover

---

### Project Components

#### ProjectGrid (`work-section/ProjectGrid.tsx`)

**Props:**
- `count`: Number of projects to show (default: all)
- `searchTerm`: Filter projects by technology

**Layout:**
- Grid: `grid-cols-1 gap-y-10 gap-x-6`
- Width: `w-[90%] lg:max-w-[1200px]`

**Filtering:**
- Uses `useMemo` for performance
- Filters by keywords array
- Case-insensitive search

**Empty State:**
- Message when no projects match
- Text: "No projects found matching..."

#### DetailedProjectCard (`projects/DetailedProjectCard.tsx`)

**Layout:**
- Card height: `h-[400px] sm:h-[450px] md:h-[420px] lg:h-[380px]`
- Background: `#212531`
- Border radius: `rounded-3xl`
- Overflow hidden for image placement

**Image Placement:**
- Positioned absolute at bottom
- Width: `w-[65%] sm:w-[75%] md:w-[55%] lg:max-w-[50%]`
- Alternates left/right based on project ID (even/odd)

**Action Buttons (Top):**
- Positioned opposite to image
- GitHub icon button (FontAwesome)
- Live demo button (Link icon)
- Or "Coming soon" badge if not available
- Background: White circles with dark icons
- Size: `w-[18px] md:w-[20px] lg:w-[22px]`

**Content Section:**
- Positioned opposite to action buttons
- Vertical spacing from top: `top-20 lg:top-24`

**Project Name:**
- Animated title
- Font: `text-[32px] md:text-[36px] lg:text-[40px]`
- Color: White
- Max width: `max-w-[90%] lg:max-w-[450px]`

**Description:**
- Animated body text
- Truncated to 120 characters with ellipsis
- Font: `text-[14px] font-medium`
- Color: `text-[#95979D]` (gray)
- Max width: `max-w-[500px]`

**Technologies:**
- Shows first 3 technologies
- Font: `text-[12px] md:text-[13px] lg:text-[14px]`
- Style: Bold uppercase
- Color: `text-[#e4ded7]/80`
- If more than 3, shows "+X more" indicator
- Flex wrap with gap

**View Details Button:**
- Links to individual project page
- Positioned below technologies

**Project Data Structure:**
```typescript
type ProjectProps = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  keywords: string[];
  github: string;
  demo: string;
  image: string;
  available: boolean;
};
```

#### SearchBar (`projects/SearchBar.tsx`)

**Layout:**
- Width: `w-full max-w-md mx-auto mb-8`
- Relative positioning for icons

**Input Field:**
- Background: `bg-[#e4ded7]/10` with backdrop blur
- Border: `border-[#e4ded7]/20`
- Focus states with opacity changes
- Padding: `px-4 py-3 pl-12 pr-12`
- Rounded: `rounded-lg`

**Search Icon (Left):**
- Position: `absolute left-0 pl-3`
- SVG magnifying glass
- Color: `text-[#e4ded7]/60`

**Clear Button (Right):**
- Shows only when search term exists
- Position: `absolute right-0 pr-3`
- SVG X icon
- Hover color transition

**Props:**
- `onSearch`: Callback function for search changes
- `placeholder`: Custom placeholder text

---

## 🎭 Animation System

### Preloader (`animations/PreLoader/PreLoader.tsx`)

**Display:**
- Shows on first page load
- Controlled by `getPreloaderFlag()` utility
- Full screen overlay

**Content:**
- Three animated words: "Developer," "Dreamer," "Disruptor."
- Font: Extrabold
- Color: `text-[#e4ded7]`
- Initial opacity: 0

**Animation:**
- Custom CSS animations (`preloader.css`)
- GSAP timeline animations
- Words appear sequentially
- Fades out after sequence completes

**CSS Class:**
```css
.preloader {
  gap: 5px (sm: 10px);
  overflow: hidden;
  font-size: 14px (sm: 16px, md: 18px, lg: 20px);
}
```

### AnimatedWords (`animations/AnimatedWords.tsx`)

**Purpose:** Animate hero title letter by letter

**Props:**
- `title`: Text to animate
- `style`: CSS classes

**Animation:**
- Uses Framer Motion
- Uses Intersection Observer
- Trigger: When 10% visible
- Trigger once: true

**Effect:**
- Initial: `opacity: 0, y: 150`
- Animate: `opacity: 1, y: 0`
- Delay: 6 seconds (for preloader)
- Duration: 1 second
- Easing: Custom cubic bezier

**Stagger:**
- Children stagger effect
- Delay between characters

### AnimatedTitle (`animations/AnimatedTitle.tsx`)

**Purpose:** Animate section titles character by character

**Props:**
- `text`: Title text
- `className`: Styling
- `wordSpace`: Space between words
- `charSpace`: Space between characters

**Animation:**
- Intersection Observer based
- Threshold: 10%
- Trigger once: true

**Character Animation:**
- Hidden: `opacity: 0, y: 0.25em`
- Visible: `opacity: 1, y: 0`
- Transition: Ease with custom duration

**Render:**
- Splits text into words and characters
- Each character wrapped in motion.span
- Word spacing controlled by props

### AnimatedBody (`animations/AnimatedBody.tsx`)

**Purpose:** Animate body text paragraphs

**Props:**
- `text`: Body text
- `className`: Optional styling
- `wordSpace`: Optional word spacing
- `charSpace`: Optional character spacing

**Animation:**
- Similar to AnimatedTitle
- Intersection Observer trigger
- Hidden: `opacity: 0, y: 1em`
- Visible: `opacity: 1, y: 0em`

**Difference from AnimatedTitle:**
- Larger Y offset (1em vs 0.25em)
- Different easing curves
- Typically used for paragraphs

### AnimatedWords2 (`animations/AnimatedWords2.tsx`)

**Purpose:** Alternative word animation style

**Use Case:** Contact section and other specific areas

**Animation Style:**
- Word-by-word instead of character-by-character
- Different timing and easing

### Motion Animations (`animations/animations.ts`)

**Common Animation Variants:**

1. **imageAnimation:**
   - Scale from 0 to 1
   - Opacity 0 to 1
   - Delay and duration configurable

2. **bodyAnimation:**
   - Y translation
   - Opacity fade
   - Custom easing

3. **Stagger Animations:**
   - Parent-child stagger effects
   - Delay between children

---

## 🧩 UI Components Library

### Alert Component (`components/ui/alert.tsx`)

**Props:**
- `type`: 'success' | 'warning' | 'info' | 'error'
- `title`: Optional title
- `message`: Alert message
- `isVisible`: Control visibility
- `onClose`: Callback on close
- `autoClose`: Auto-dismiss (default: true)
- `autoCloseDelay`: Delay in ms (default: 3000)

**Layout:**
- Fixed position (top-center or custom)
- Island expansion animation
- Icon + message layout

**Icons:**
- Success: CheckCircle
- Warning: AlertTriangle
- Info: Info
- Error: XCircle

**Colors:**
- Background: `bg-[#0E1016]/90`
- Border: `border-[#e4ded7]/30`
- Icon colors vary by type
- Text colors vary by type

**Animation:**
- Width animation (island effect)
- Opacity fade in/out
- Auto-close timer
- Smooth transitions

### Text Generation Effect (`components/ui/TextGenerationEffect.tsx`)

**Purpose:** Typewriter effect for AI responses

**Features:**
- Character-by-character reveal
- Configurable speed
- Smooth cursor animation
- Supports formatting

**Props:**
- `text`: Text to animate
- `speed`: Animation speed (default: 50ms)
- `className`: Custom styling

**Implementation:**
- Uses state for current position
- useEffect for character reveal
- Timeout-based animation

### Flip Words (`components/ui/flip-words.tsx`)

**Purpose:** Rotating word animation

**Use Cases:**
- Hero section dynamic text
- Emphasis on multiple concepts

**Props:**
- `words`: Array of words to flip
- `duration`: Time per word
- `className`: Styling

**Animation:**
- Fade in/out
- Slide up/down
- Rotation effect

### Sparkles (`components/ui/sparkles.tsx`)

**Purpose:** Decorative particle effects

**Features:**
- Random particle generation
- Animated movement
- Opacity variations
- Configurable colors

**Props:**
- `count`: Number of particles
- `colors`: Array of color options

### Text Hover Effect (`components/ui/text-hover-effect.tsx`)

**Purpose:** Interactive text animations on hover

**Effects:**
- Color shift
- Underline animation
- Scale transform
- Smooth transitions

**Props:**
- `text`: Text content
- `hoverColor`: Color on hover
- `className`: Additional styling

### Timeline (`components/ui/timeline.tsx`)

**Purpose:** Vertical timeline for experience/education

**Features:**
- Dot markers
- Connecting lines
- Content cards
- Responsive layout

**Props:**
- `items`: Array of timeline items
- Each item:
  - `date`: Date/period
  - `title`: Main title
  - `description`: Details

**Styling:**
- Vertical line: `border-l-2 border-[#e4ded7]/20`
- Dots: `bg-[#e4ded7]` circles
- Cards: Standard card styling

## 📱 Responsive Design

### Mobile-First Strategy
All components designed mobile-first with progressive enhancement.

### Breakpoint Usage Patterns

**Navigation:**
- Mobile: Simplified nav with essential links
- Desktop: Full navigation with all sections

**Typography:**
- Mobile: Smaller fonts (16-20px)
- Tablet: Medium fonts (20-24px)
- Desktop: Large fonts (24-32px)
- Hero titles: 40px → 80px

**Layout:**
- Mobile: Single column (`flex-col`)
- Desktop: Multi-column (`lg:flex-row`)

**Spacing:**
- Mobile: Compact padding (16px)
- Tablet: Medium padding (20px)
- Desktop: Generous padding (20px+)

**Images:**
- Mobile: Full width or reduced size
- Desktop: Fixed widths with max constraints

**Hero Section:**
- Mobile: Stacked layout, centered
- Desktop: Spread layout with multiple sections

**About Section:**
- Mobile: Text stacks vertically
- Desktop: Text + Skills side-by-side

**Project Cards:**
- Mobile: Full width, smaller images
- Desktop: Larger cards with bigger images

**Contact Form:**
- Mobile: Full width inputs
- Desktop: Optimized widths

### Hidden/Show Classes

**Common Patterns:**
```css
/* Show on mobile, hide on desktop */
sm:hidden

/* Hide on mobile, show on desktop */
hidden sm:block
hidden lg:block

/* Different layouts per breakpoint */
flex-col lg:flex-row
```

### Container Widths

**Standard Pattern:**
```css
w-[90%]                    /* Mobile: 90% width */
lg:max-w-[1200px]         /* Desktop: Max 1200px */
lg:max-w-[1440px]         /* Large: Max 1440px */
```

### Font Scaling

**Example (Section Titles):**
```css
text-[36px]               /* Mobile */
md:text-[42px]           /* Medium */
lg:text-[72px]           /* Large */
```

### Touch Targets
- Minimum 44x44px for mobile buttons
- Adequate spacing between clickable elements
- Hover states on desktop only

---

## 🌟 Key Features

### 1. Interactive Cursor (Blobity)

**Implementation:**
- BlobityProvider wraps entire app
- Custom configuration in `utils/BlobityConfig.ts`
- Magnetic effects on interactive elements
- Tooltips on hover

**Data Attributes:**
```html
data-blobity                    <!-- Enable blobity -->
data-blobity-tooltip="Text"     <!-- Tooltip text -->
data-blobity-magnetic="true"    <!-- Magnetic effect -->
data-blobity-radius="32"        <!-- Radius -->
```

**Features:**
- Smooth cursor following
- Magnetic attraction to elements
- Size changes on hover
- Tooltip display

### 2. Smooth Scrolling

**Implementation:**
- Global: `scroll-smooth` on body
- Programmatic: `scrollIntoView({ behavior: 'smooth' })`
- Links: `onClick` handlers for smooth scroll

**Navigation Scroll:**
```typescript
const handleScroll = (e: React.MouseEvent) => {
  e.preventDefault();
  const href = e.currentTarget.href;
  const targetId = href.replace(/.*\#/, "");
  const elem = document.getElementById(targetId);
  elem?.scrollIntoView({ behavior: "smooth" });
};
```

### 3. Dynamic Project Filtering

**Search Implementation:**
- SearchBar component with controlled input
- Real-time filtering with useMemo
- Searches across project keywords array
- Case-insensitive matching

**Filter Logic:**
```typescript
const filteredProjects = useMemo(() => {
  if (!searchTerm.trim()) return devProjects;
  
  return devProjects.filter((project) =>
    project.keywords.some((tech) =>
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}, [searchTerm]);
```

### 4. Email System

**Features:**
- Manual email composition
- AI-assisted email generation
- Email templates
- Form validation
- Security measures
- Status notifications

**AI Generation:**
- Sends prompt to `/api/generate-email`
- Streams response
- Typewriter effect display
- Error handling with user feedback

**Validation:**
- Email format check
- Required fields
- Character limits
- Real-time validation feedback

### 5. Preloader

**Trigger:**
- First page load
- Controlled by localStorage flag
- Can be reset

**Sequence:**
1. Show preloader overlay
2. Animate text words
3. Fade out
4. Remove from DOM
5. Show main content

**Flag Management:**
```typescript
getPreloaderFlag(): boolean
setPreloaderFlag(value: boolean): void
```

### 6. Context Providers

**NavigationContext:**
- Manages navigation state
- Current section tracking
- Scroll position awareness

**BlobityProvider:**
- Initializes Blobity cursor
- Provides instance to window
- Configuration management

### 7. Dynamic Imports

**Code Splitting:**
```typescript
const Work = dynamic(() => import("./work-section/Work"));
const About = dynamic(() => import("./about-section/About"));
const Blog = dynamic(() => import("./blog-section/BlogGrid"));
const Contact = dynamic(() => import("./contact/Contact"));
const Footer = dynamic(() => import("./footer/Footer"));
```

**Benefits:**
- Faster initial page load
- Progressive enhancement
- Better performance

### 8. Scroll to Top

**Component:** `ScrollToTop.tsx`
- Shows when scrolled down
- Fixed position button
- Smooth scroll to top
- Fade in/out animation

### 9. MDX/Blog System

**Features:**
- MDX content support
- Gray matter for frontmatter
- Markdown rendering
- Blog grid layout
- Individual blog pages

### 10. Analytics

**Vercel Analytics:**
- Integrated with `@vercel/analytics`
- Page view tracking
- Performance monitoring
- No configuration needed

### 11. Custom Scrollbar

**Styling:**
```css
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-track-[#0E1016] {
  scrollbar-color: #212531 #0E1016;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #0E1016;
}

::-webkit-scrollbar-thumb {
  background: #212531;
  border-radius: 3px;
}
```

### 12. Accessibility Features

**ARIA Labels:**
- All interactive elements
- Navigation items
- Buttons and links
- Form inputs

**Keyboard Navigation:**
- Tab order
- Focus states
- Skip links (potential addition)

**Semantic HTML:**
- Proper heading hierarchy
- Section elements
- Nav elements
- Main landmark

### 13. Performance Optimizations

**Image Optimization:**
- Next.js Image component
- Lazy loading
- Responsive images
- Sharp for processing

**Code Splitting:**
- Dynamic imports
- Route-based splitting
- Component-level splitting

**Caching:**
- LocalForage for client storage
- localStorage for flags
- Browser caching

**Font Optimization:**
- Google Font optimization
- Font display: block
- Preloaded fonts

---

## 🎨 Animation Patterns

### Entrance Animations

**Pattern:**
1. Initial state: Hidden (opacity 0, translated)
2. Trigger: Intersection Observer
3. Animate: Visible (opacity 1, normal position)
4. Trigger once: Prevent re-animation

**Common Initial States:**
- Opacity: 0
- Y translation: 50-150px down
- Scale: 0.8-0.95

**Common Animate States:**
- Opacity: 1
- Y translation: 0
- Scale: 1

### Hover Animations

**Pattern:**
```css
transition-all duration-300
hover:scale-105
hover:shadow-lg
```

**Common Effects:**
- Scale increase (1.05-1.1)
- Shadow enhancement
- Color shifts
- Underline animations

### Loading States

**Patterns:**
- Pulsing animations
- Skeleton screens
- Progress indicators
- Spinner animations

**Implementation:**
```css
animate-pulse
animate-spin
animate-bounce
```

### Stagger Effects

**Pattern:**
```typescript
staggerChildren: {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
}
```

**Use Cases:**
- List items
- Grid items
- Character animations
- Multiple sections

---

## 🔧 Utility Functions

### Preloader Flag Management
```typescript
getPreloaderFlag(): boolean
setPreloaderFlag(value: boolean): void
```

### Email Validation
```typescript
validateEmail(email: string): boolean
```

### Trusted Click Detection
```typescript
isTrustedClick(event: MouseEvent): boolean
```

### Scroll Management
```typescript
scrollToTop(): void
scrollToElement(id: string): void
```

---

## 📦 Build & Deployment

**Scripts:**
- `npm run dev`: Development server (localhost:3000)
- `npm run build`: Production build
- `npm start`: Start production server
- `npm run lint`: Run ESLint

**Environment Variables:**
- API keys for AI services
- Email service credentials
- Analytics tokens
- Other secrets in `.env`

**Deployment:**
- Optimized for Vercel
- Automatic deployment on push
- Environment variables in dashboard
- Analytics included

---

## 🎯 Design Principles

1. **Mobile-First:** All designs start with mobile layout
2. **Progressive Enhancement:** Desktop features added progressively
3. **Performance:** Code splitting, lazy loading, optimization
4. **Accessibility:** ARIA labels, keyboard navigation, semantic HTML
5. **Animation:** Meaningful, not decorative
6. **User Experience:** Smooth transitions, feedback, responsiveness
7. **Consistency:** Uniform spacing, colors, typography
8. **Simplicity:** Clean, minimal design
9. **Dark Theme:** Consistent dark color scheme
10. **Interactivity:** Engaging without overwhelming

---

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Graceful degradation of advanced features
- Polyfills for necessary features

---

## 📝 Content Management

### Project Data
- Stored in `constants/projectDetails.ts`
- TypeScript interfaces for type safety
- Easy to add/update projects
- Includes all metadata

### Blog Content
- MDX files in `contents/` directory
- Frontmatter for metadata
- Rich content support
- Dynamic routing

---

## 🔮 Future Enhancements

Potential areas for expansion:
1. Blog section completion
2. Dark/Light theme toggle
3. More AI chat capabilities
4. Project detail pages
5. Testimonials section
6. Case studies
7. Interactive portfolio pieces
8. More animations

---

## 📚 Additional Notes

### Custom CSS Classes
Many custom animations defined in `app/animations/animate.css`

### FontAwesome Configuration
Configured in `lib/fontawesome.ts` with specific icons

### TypeScript
Strict type checking enabled with comprehensive interfaces

### SEO Optimization
- Meta tags in layout
- Open Graph tags
- Twitter cards
- Structured data (potential addition)

---

**Document Version:** 1.0  
**Last Updated:** December 26, 2025  
**Project:** Portfolio-v2 by Dev Harsh Agarwal
