# Muntasir Hossain - Portfolio Website

A modern, interactive portfolio website showcasing software engineering expertise with a unique terminal-inspired UI.

## Features

### 🎨 Design
- **Modern & Minimalist**: Clean, professional design with blackish color grading
- **Dark/Light Mode**: Seamless theme switching with persistent preference
- **Terminal UI**: Unique terminal-style elements for a developer vibe
- **Responsive**: Fully responsive design that works on all devices

### ✨ Interactions
- **Custom Cursor**: Interactive cursor that follows mouse movement with smooth animations
- **Hover Effects**: Dynamic UI elements that respond to cursor interaction
- **Typing Animation**: Terminal command typing effect in hero section
- **Smooth Scrolling**: Buttery smooth navigation between sections
- **Parallax Effects**: Subtle parallax scrolling on hero section
- **Fade-in Animations**: Elements animate in as you scroll
- **Ripple Effects**: Click ripple effects on buttons

### 🔧 Technical Features
- **Performance Optimized**: Minimal JavaScript, CSS animations, smooth 60fps
- **Accessibility**: Semantic HTML, keyboard navigation (press 'T' to toggle theme)
- **SEO Ready**: Proper meta tags and semantic structure
- **No Dependencies**: Pure vanilla JavaScript, HTML, CSS - no frameworks needed
- **Local Storage**: Theme preference saved between sessions

## File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All styling including themes
├── script.js           # Interactive features
├── profile.jpg         # Profile photo
└── README.md          # This file
```

## How to Use

### Local Development
1. Open `index.html` in your browser
2. No build process or server required!

### Deploy to Production

#### Option 1: GitHub Pages (Free)
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial portfolio commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

#### Option 2: Cloudflare Pages (Free)
1. Create a Cloudflare account
2. Go to Pages and create a new project
3. Connect your GitHub repository or upload files directly
4. Deploy - your site will be live on `your-site.pages.dev`

#### Option 3: Netlify (Free)
1. Create a Netlify account
2. Drag and drop the `portfolio` folder to Netlify
3. Your site is live instantly!

#### Option 4: Vercel (Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd portfolio
vercel
```

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --accent-primary: #00ff88;  /* Main accent color */
    --accent-secondary: #00ccff; /* Secondary accent */
    /* ... other variables */
}
```

### Add More Projects
Edit the projects section in `index.html`. Copy an existing project card and modify:
```html
<div class="project-card">
    <div class="project-header">
        <span class="project-tag">🏷️ Your Tag</span>
    </div>
    <h3 class="project-title">Project Name</h3>
    <p class="project-description">Description...</p>
    <!-- ... -->
</div>
```

### Update Information
Replace content in `index.html`:
- Personal info in About section
- Skills in Skills section
- Work experience in Experience section
- Contact details in Contact section

### Theme Customization
Toggle between dark and light mode by clicking the sun/moon icon in the top-right corner, or press 'T' on your keyboard.

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+

## Keyboard Shortcuts
- `T` - Toggle dark/light theme
- `Ctrl/Cmd + Click` on links - Open in new tab

## Easter Eggs
- Open browser console to see a special message
- Hover over different elements to see unique interactions
- Watch the terminal typing animation cycle through commands

## Credits
- **Design & Development**: Muntasir Hossain
- **Fonts**: Fira Code (monospace), Inter (sans-serif) - Google Fonts
- **Icons**: Hand-coded SVG icons
- **Built with**: Vanilla JavaScript, HTML5, CSS3

## License
© 2026 Muntasir Hossain. All rights reserved.

Feel free to use this portfolio as inspiration, but please don't copy it directly. Build your own unique portfolio!

## Contact
- **Email**: cto.nector.iot@gmail.com
- **GitHub**: [@MdMuntasir](https://github.com/MdMuntasir)
- **LinkedIn**: [muntasir27](https://www.linkedin.com/in/muntasir27)

---

