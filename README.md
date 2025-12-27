# Throtl - Launching Soon Page

A premium, dark-themed "launching soon" landing page for Throtl, a motorcycle ride tracking app.

## Features

- 🎨 **Premium Dark Theme** - Elegant dark color scheme with gradient accents
- 🖱️ **Custom Cursor** - Interactive custom cursor with smooth animations
- ✨ **Particle Background** - Animated particle system for visual appeal
- 🌈 **Gradient Orbs** - Floating gradient orbs with parallax effects
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🎭 **Smooth Animations** - Letter-by-letter reveal animation for "Launching Soon"
- 💫 **Interactive Elements** - Hover effects, ripple animations, and more
- 🚀 **GitHub Pages Ready** - Static site, ready to deploy

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to your repository settings
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select the branch (usually `main` or `master`)
5. Select the folder (usually `/ (root)`)
6. Click "Save"
7. Your site will be available at `https://yourusername.github.io/repository-name/`

## Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b35;
    --secondary-color: #f7931e;
    --accent-color: #00d4ff;
    /* ... */
}
```

### Content
Edit the HTML in `index.html` to customize:
- Brand name and logo
- Feature cards
- Social media links
- Footer text

### Animations
Adjust animation timings and effects in `styles.css` and `script.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Throtl. All rights reserved.

