# Personal Website · Deep-Blue Minimal Edition

A zero-dependency static personal website. No build step, no `npm install`, no framework — three files that open straight in a browser and can be deployed as-is.

```
my-site/
├── index.html    Page content (the file you'll edit most)
├── styles.css    Deep-blue theme (the palette lives in :root at the top)
├── script.js     Scroll reveal + nav highlighting (rarely needs changing)
└── README.md     This file
```

---

## 1. Preview it locally

**Quickest**: double-click `index.html` and it opens in your browser.

**Closer to production** (recommended — resolves relative paths correctly). From inside the `my-site` directory, start a local server:

```bash
# With Python
python -m http.server 8000

# With Node.js
npx serve .

# In VS Code: install the Live Server extension, right-click index.html → Open with Live Server
```

Then visit `http://localhost:8000`.

---

## 2. Editing the content

Open `index.html`. **There are no placeholders left** — every line is real content now.

**Content currently on the page** (use this table to locate things when editing):

| Location | Current value |
|---|---|
| Name | `Rainy` (title, nav, hero, footer — 4 places) |
| Hero eyebrow | `Hello, I'm` |
| Hero subtitle | `Welcome to my world` |
| Hero description | `And I deeply appreciate you wanting to get to know me.` |
| About body | "This is a static site I built out of boredom as a high school senior…" |
| Email | `rzy_rainy_rain@outlook.com` |
| GitHub | `https://github.com/rainy-rain` |
| Douyin / QQ | `56493507964` / `398223912` (display only, not clickable) |

**Changing the palette**: open `styles.css` — every colour lives in `:root` at the very top:

```css
--bg:      #0a1420;   /* page background — darker feels more restrained */
--surface: #0f1e2e;   /* card background */
--border:  #1c344c;   /* borders */
--text:    #e8f0fa;   /* primary text */
--muted:   #8ba3c0;   /* secondary text */
--accent:  #4f9cf9;   /* accent — change this one to restyle the whole site */
```

Changing just `--accent` shifts the entire mood: teal `#4fd1c5`, purple `#a78bfa`, and so on.

**The projects section is currently removed** (there's no project content yet). The `.cards` / `.card` styles are still in `styles.css`. Once you have projects, paste this into `<main>` in `index.html` (between "About" and "Contact"):

```html
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="cards">
        <a class="card" href="PROJECT_URL" target="_blank" rel="noopener">
          <h3 class="card-title">Project name</h3>
          <p class="card-desc">One sentence on what this project does.</p>
          <span class="card-tag">Tech stack</span>
        </a>
      </div>
    </div>
  </section>
```

Also add `<a href="#projects">Projects</a>` to the `<nav>`. For more cards, copy the whole `<a class="card">` block — the grid reflows automatically.

---

## 3. Deploying for free (pick one)

### Option A: Netlify Drop — fastest, good for a first look

1. Open <https://app.netlify.com/drop>
2. **Drag the entire `my-site` folder into the page**
3. A few seconds later you get a public `https://xxxx.netlify.app` address anyone can visit

You can try it before registering (sign up for a free account to keep the site). To update it later, drag the folder again.

### Option B: GitHub Pages — free and stable long-term (recommended)

1. Sign up for / sign in to GitHub
2. Create a new **public** repository
   - For the address `https://<username>.github.io` → the repo name must be **exactly** your username, e.g. `zhangsan.github.io`
   - For `https://<username>.github.io/<repo>` → any name, e.g. `mysite`
3. Upload `index.html`, `styles.css`, `script.js`
   - In the browser: repo page → **Add file** → **Upload files** → drag the three files in → **Commit changes**
4. Go to the repo's **Settings** → **Pages** in the left sidebar
5. Under **Source**, choose `Deploy from a branch`; pick branch `main` and folder `/ (root)`, then **Save**
6. Wait 1–2 minutes, refresh the Pages page, and your address appears at the top

> `README.md` doesn't need to be uploaded (it's harmless if you do — Pages ignores it).
> To update the site later, re-upload and overwrite the same filenames; it goes live within a minute.

### Option C: Vercel

1. Push the files to a GitHub repository
2. Open <https://vercel.com> and sign in with GitHub
3. **Add New → Project**, select the repository, and Deploy (choose framework `Other`; no build command or output directory needed)

---

## 4. Using your own domain (optional)

All three platforms support a custom domain for free (the domain itself costs money — on the order of tens of yuan per year):

- **Netlify**: Site settings → Domain management → Add custom domain, then add the CNAME record it shows you at your registrar
- **Vercel**: Project → Settings → Domains
- **GitHub Pages**: repo Settings → Pages → Custom domain; at your registrar, point a CNAME at `<username>.github.io`

HTTPS is one click and free on all three (Let's Encrypt issues the certificate automatically).

---

## 5. What's already built in

- **Responsive**: single column on phones, automatically
- **Dark by design**: it *is* a dark theme, so no extra work is needed
- **Accessible**: a clear focus ring for keyboard Tab; animations switch off when the OS "reduce motion" setting is on
- **Progressive enhancement**: if JavaScript fails to load, the content is still fully visible — no blank page
- **No external dependencies**: no CDN, font, or analytics requests, so the page renders completely and leaks no visitor data

---

## 6. Possible additions later

Nice-to-haves, all optional:

- A blog (needs a Markdown-driven approach if you actually want to write posts)
- A dark/light theme toggle button
- Images on project cards
- A real `favicon.ico` (browsers currently show the default icon)
