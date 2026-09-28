# Adam Lau — Executive Online Resume & Growth Dossier

A high-performance, minimalist one-page executive resume built specifically for hosting on **GitHub Pages**.

- **Aesthetic**: Minimalist Swiss Grid, Dark Mode (`#060709`), Electric Blue Accent (`#1D63FF`), Crisp White.
- **Strict Geometric Rule**: **100% Sharp Corners** (`border-radius: 0 !important`). Every button, modal, badge, tag, card, and image frame features 90° precision edges.
- **Zero Build Step**: Pure HTML5, Vanilla CSS, and native JavaScript — no Node.js build process required.

---

## 🚀 Live In-Situ CMS & Admin Features

### 1. Admin Authentication
- Click the **"Admin Login"** button in the top navigation.
- **Default Email**: `adamlau.creatif@gmail.com`
- **Default Password**: `admin123` *(or any password with 4+ characters)*

### 2. User Editable Photo
- When logged in as Admin, hover over your portrait in the Hero section.
- Click **"Upload Image"** to choose any photo from your computer (`.jpg`, `.png`, `.webp`).
- The image updates instantly, crops to the sharp frame, and saves persistently in your browser.
- Click **"Download .jpg"** to export it as `profile.jpg` for your repository folder.

### 3. User Editable Text (Every Single Field)
- When logged in as Admin, **every single text element on the page is directly editable**:
  - Name, Headline, Executive Bio
  - Metric Numbers & Metric Labels
  - Strategic Pillar Titles & Descriptions
  - Career Timeline: Company Names, Roles, Dates, Locations, and Bullet Points
  - Technical Matrix: Skills, Tools, and Framework Tags
  - Education & Certifications
- **Add Bullet Point**: Click `+ Add Bullet Point` under any job card to dynamically insert new achievements.
- **Add Tech Tag**: Click `+ Add Tech Tag` to append tools to any category.
- **Save Changes**: Click **"Save Changes"** in the top dock or press `Cmd+S` / `Ctrl+S`.
- **1-Click Export for GitHub**: Click **"Export HTML for GitHub"** to download the clean production `index.html` with all your edits baked in!

---

## 🌐 How to Deploy to GitHub Pages (3-Step Guide)

1. **Push this folder to a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Deploy Adam Lau executive resume"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** (gear icon) → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Select Branch: `main` and Folder: `/ (root)`.
   - Click **Save**.

3. **Your site is live!**
   - In less than 60 seconds, GitHub Pages will deploy your site at:
     `https://<your-username>.github.io/<your-repo-name>/`

---

## 📁 Repository Structure

```
├── index.html       # Production one-page website (GitHub Pages entry point)
├── style.css        # Minimalist CSS system (0px sharp corners, dark mode, print rules)
├── app.js           # Client engine (In-situ CMS, photo upload, filtering, export)
├── mockup.html      # Standalone single-file prototype preview
└── README.md        # Documentation and deployment instructions
```

---

## 🛠 Interactive Elements Included

- **Role Filter Tabs**: Filter career timeline across `All Roles`, `AI & FDE Roles`, `Fintech & Forex`, `Agency Scale`, and `Foundations`.
- **Skill Tag Highlighting**: Clicking any tech tag in the matrix (e.g., `Ollama`, `n8n`, `Claude`, `RedTrack`, `DV360`) highlights every position where that tool was utilized.
- **Architecture Notes**: Expandable technical dossiers for key engineering & AI infrastructure roles.
- **Quick Action Dock**: One-click Copy Email (`adamlau.creatif@gmail.com`) and Copy Phone (`0123458846`) with toast confirmations.
- **Export PDF**: Printer-optimized styling for instant PDF generation via browser print (`Ctrl+P` / `Cmd+P`).
