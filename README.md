# 📝 Prompt Posting Generator PWA

Progressive Web App untuk generate prompts Facebook posting dengan 7 modules berbeza.

## ✨ Features

- 🔵 **7 Modules**: Politik, Sosial, Viral, Geopolitik, Konspirasi, Response, Cerita Kelakar
- 📱 **Fully Responsive**: Works on iPhone, iPad, Android phones & tablets
- 💾 **Offline Capable**: Boleh guna tanpa internet selepas first load
- ⚡ **Fast & Lightweight**: Instant loading, minimal data usage
- 💾 **Save Favorites**: Save prompts for reuse
- 📋 **One-Click Copy**: Copy prompt terus ke clipboard
- 🎨 **Clean UI**: Modern, dark theme interface

---

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"New repository"**
3. Repository name: `prompt-posting-generator` (or any name you prefer)
4. Set to **Public**
5. Click **"Create repository"**

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop ALL files and folders:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `css/` folder
   - `js/` folder
   - `icons/` folder (after creating icons - see below)
3. Click **"Commit changes"**

**Option B: Using Git Command Line**

```bash
# Navigate to the prompt-posting-generator folder
cd /path/to/prompt-posting-generator

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Prompt Posting Generator PWA"

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/prompt-posting-generator.git

# Push
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"**
3. Scroll down to **"Pages"** in left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**
7. Wait 1-2 minutes for deployment

### Step 4: Access Your App

Your app will be live at:
```
https://YOUR-USERNAME.github.io/prompt-posting-generator/
```

Example: If your username is `azizmohamad`, the URL will be:
```
https://azizmohamad.github.io/prompt-posting-generator/
```

---

## 🎨 Creating Icons (IMPORTANT!)

The app needs two icon files. Here's how to create them:

### Option 1: Use Online Tool (Easiest)

1. Go to [favicon.io](https://favicon.io/favicon-generator/)
2. Settings:
   - Text: **📝** (or "PP" or "PG")
   - Background: **Rounded** 
   - Font Family: Any
   - Font Size: 80-100
   - Background Color: `#1a1a2e`
   - Font Color: `#ffffff`
3. Click **"Download"**
4. Extract the downloaded zip
5. Rename files:
   - Rename `android-chrome-192x192.png` → `icon-192.png`
   - Rename `android-chrome-512x512.png` → `icon-512.png`
6. Upload both files to `icons/` folder in your repository

### Option 2: Use Any Image Editor

1. Create two PNG images:
   - **icon-192.png**: 192x192 pixels
   - **icon-512.png**: 512x512 pixels
2. Design: Simple icon with "📝" emoji or "PP" text
3. Background color: `#1a1a2e` (dark blue)
4. Save as PNG
5. Upload to `icons/` folder

### Option 3: Quick Placeholder (Temporary)

If you want to deploy immediately without proper icons:

1. Create any 192x192 and 512x512 PNG images (even solid color)
2. Name them `icon-192.png` and `icon-512.png`
3. Upload to `icons/` folder
4. Replace with proper icons later

---

## 📱 Installing as App

### On iPhone/iPad:

1. Open the app URL in **Safari**
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"**
5. App icon will appear on home screen

### On Android:

1. Open the app URL in **Chrome**
2. Tap the **menu** (three dots)
3. Tap **"Add to Home Screen"** or **"Install app"**
4. Tap **"Add"** or **"Install"**
5. App icon will appear on home screen

---

## 🔧 Configuration & Customization

### Updating Prompts

Edit `js/prompts.js` to modify prompt templates.

### Changing Colors

Edit `css/styles.css` - look for `:root` section at the top:

```css
:root {
    --primary-color: #1a1a2e;      /* Main background */
    --secondary-color: #16213e;    /* Cards background */
    --accent-color: #0f3460;       /* Buttons, accents */
    --success-color: #27ae60;      /* Success/primary action */
    /* ... */
}
```

### Adding More Modules

1. Add module template in `js/prompts.js`
2. Add module card in `index.html`
3. Update `MODULE_INFO` in `js/app.js`
4. Update form configuration logic

---

## 🐛 Troubleshooting

### App not loading offline

1. Clear browser cache
2. Visit app online once to re-cache
3. Check service worker registration in browser console

### Icons not showing

1. Verify icon files exist in `icons/` folder
2. Check file names exactly: `icon-192.png` and `icon-512.png`
3. Clear cache and reload

### Can't install as app

1. Ensure you're using HTTPS (GitHub Pages uses HTTPS by default)
2. Use Safari on iOS or Chrome on Android
3. Check manifest.json is properly uploaded

### Prompt not copying

1. Allow clipboard permissions in browser
2. Try using desktop/laptop browser first
3. Check browser console for errors

---

## 📊 File Structure

```
prompt-posting-generator/
│
├── index.html              # Main app interface
├── manifest.json           # PWA configuration
├── sw.js                   # Service worker (offline support)
│
├── css/
│   └── styles.css         # All styling
│
├── js/
│   ├── app.js             # Main application logic
│   └── prompts.js         # Prompt templates
│
└── icons/
    ├── icon-192.png       # App icon 192x192
    └── icon-512.png       # App icon 512x512
```

---

## 🎯 How to Use

1. **Select Module**: Choose from 7 different posting types
2. **Fill Form**: Enter topic, select settings (bahasa, tone, length)
3. **Generate**: Click "Generate Prompt"
4. **Copy**: Copy the generated prompt
5. **Paste to AI**: Paste in Claude.ai or ChatGPT
6. **Get Result**: AI will research and write your post

---

## 💡 Tips

- **Save Favorites**: Save frequently used prompts for quick access
- **Offline Mode**: After first visit, app works without internet
- **Settings Matter**: Experiment with different tone/length settings
- **Module 6**: Best for responding to viral posts
- **Module 7**: Great for personal, relatable stories

---

## 🔄 Updates

To update the app after deployment:

1. Make changes to files locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
3. GitHub Pages will auto-deploy (wait 1-2 minutes)
4. Clear cache on devices to see changes

---

## 📝 Notes

- App stores favorites in browser's localStorage
- Clearing browser data will delete saved favorites
- Export important prompts before clearing data
- Service worker caches files for offline use
- First load requires internet connection

---

## 👨‍💻 Developer

**© 2025 Aziz Mohamad**  
*Personal Development Division*

---

## 📄 License

Personal use only. All rights reserved.

---

## 🆘 Support

For issues or questions:
1. Check troubleshooting section above
2. Review browser console for errors
3. Ensure all files are uploaded correctly
4. Verify GitHub Pages is enabled

---

## ✅ Checklist Before Going Live

- [ ] Create icons (icon-192.png and icon-512.png)
- [ ] Upload all files to GitHub
- [ ] Enable GitHub Pages
- [ ] Test app URL loads correctly
- [ ] Test offline functionality
- [ ] Test on mobile device (iPhone/Android)
- [ ] Test install as PWA
- [ ] Verify all 7 modules work
- [ ] Test copy to clipboard
- [ ] Test save favorites feature

---

**Ready to deploy? Follow the steps above and you'll have your PWA live in minutes!** 🚀
