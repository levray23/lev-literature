# Lev’s Literature

A free literary archive built with **Jekyll** (supported by GitHub Pages) and managed through **Pages CMS** in your browser.
After the one-time setup below, you add, edit and delete pieces from Pages CMS. No code, no Markdown files, no image paths.

> **Honest status:** this project has been written and its design has been tested as a browser preview (`levs-literature-preview.html`), but the Jekyll site itself has **not yet been built, published or connected**. I had no Jekyll, internet access, or GitHub account to test with. Part 1, step 7 is how you confirm each piece works on your own account, and Part 8 lists what to check if something fails.

## Two zip files

- **`lev-literature-site-clean.zip`**: the site with no sample writing. Use this for your real site.
- **`lev-literature-site.zip`**: the same site plus 51 clearly labeled placeholder pieces and images, for exploring how it fills out.

## What you get

| Page | What it shows |
|---|---|
| Home | Photo hero, introduction to the archive, a **Featured** carousel, a showcase and carousel for every shelf, recently added writings, an About teaser |
| Poems · Prose · Fiction · Nonfiction · Fragments | A dedicated archive: introduction, photograph, a Featured carousel, and the full archive with search, language filter and pagination |
| Each piece | Its own reading page with photograph, byline “By Lev”, date, category, language, the complete text, previous/next, and a “More in …” carousel |
| About Lev | Introduction, portrait, pull quote, literary philosophy, purpose of the archive |

Carousels show four cards at a time on desktop (fewer on smaller screens) with arrows, page dots, an “1–4 of 11” counter and swipe on touch screens. They are never limited to four writings. Each shelf’s archive page lists everything, eight at a time, with page numbers.

Everything is built from the entries you save in Pages CMS. Navigation, counts, carousels and archives update by themselves.

---

## Part 1. One-time setup (about 20–30 minutes)

### 1. Create a free GitHub account

Go to github.com and sign up. **Privacy tip:** your GitHub username appears in your site address (for example `username.github.io`), and commits show the account name. To stay anonymous as Lev, create the account with a pen-name username and keep your email private (GitHub Settings → Emails → “Keep my email addresses private”).

### 2. Create the repository

1. Click **+** (top right) → **New repository**.
2. **Repository name:** best is `YOUR-USERNAME.github.io` (site at `https://YOUR-USERNAME.github.io`). Any other name also works (see step 4).
3. Choose **Public** (GitHub Pages is free for public repositories). The repository, including everything you save, is publicly visible.
4. Click **Create repository**.

### 3. Upload the project files

1. Unzip the project folder on your computer.
2. Two files start with a dot (`.pages.yml` and `.gitignore`). Windows shows them; on Mac press **Cmd + Shift + .** in Finder.
3. In your new repository click **uploading an existing file**.
4. Select **everything inside** the unzipped folder (not the folder itself) and drag it into the browser. Wait for the upload, then **Commit changes**.
5. **Check the repository front page.** You must see `.pages.yml`, `_config.yml`, `_layouts`, `_works`, `assets` and `index.html`. If `.pages.yml` is missing: **Add file → Create new file**, name it exactly `.pages.yml`, paste in the contents of `setup/pages.yml.txt`, commit.

(Large uploads can be easier with the free GitHub Desktop app: add the folder as a repository and push it.)

### 4. Tell the site its address (only if the repository is NOT named `username.github.io`)

Open `_config.yml`, click the pencil, change `baseurl: ""` to `baseurl: "/your-repository-name"` and commit.

### 5. Turn on GitHub Pages

1. Repository → **Settings** → **Pages**.
2. **Source:** **Deploy from a branch**. Branch **main**, folder **/ (root)**. **Save**.
3. Wait 1–3 minutes, refresh; a green box shows your live address.

**Why no workflow file?** With “Deploy from a branch”, GitHub builds Jekyll sites automatically on every change to the repository, including changes Pages CMS saves. Watch builds in the **Actions** tab (“pages build and deployment”).

### 6. Connect Pages CMS

1. Go to **app.pagescms.org** and sign in with GitHub.
2. When asked, allow the Pages CMS GitHub app and give it access to **this repository only**.
3. Open your repository. You should see **Literary Works**, **About Page**, **Site Text** and the photograph library.

“No configuration found” means `.pages.yml` is missing from the root (step 3.5).

### 7. Test the first publish

1. Open **Literary Works** (empty with the clean zip; 51 placeholders with the demo zip).
2. **Add an entry**: title, category, language, a photograph, a few lines of text, and tick **Show on the Home page**. **Save**.
3. Wait for the latest “pages build and deployment” run in the **Actions** tab to finish (usually 1–3 minutes).
4. Open your site and hard-refresh (Ctrl/Cmd+Shift+R). The piece should appear in its shelf, in the Featured carousel and in “Recently added”.

---

## Part 2. Everyday workflow

1. Open **app.pagescms.org**, sign in with GitHub, open your repository → **Literary Works** → **Add an entry**.
2. Fill in **Title**, optional **Subtitle**, **Category**, **Language**, **Featured photograph** (and a short description of it), optional **Photograph caption**, optional **Short excerpt for cards**, optional **Publication date**, **Show on the Home page**, and the **Text**.
3. **Save**, wait 1–3 minutes, refresh your site.

**Edit:** open the piece, change it, Save. **Delete:** open it and use Delete.

### Writing tips

- **Poems:** Enter once for a new line, twice for a new stanza. The site keeps your line breaks and stanza spacing.
- **Layouts differ by shelf:** poems sit beside a tall photograph; fiction uses book-style paragraphs; nonfiction opens with a larger first paragraph; fragments are set large and centered.
- **Cards:** if you leave the excerpt empty, the first words of the text are used.
- **Photographs:** about 1600 px on the long edge and under 1 MB is plenty (shrink phone photos first, for example with squoosh.app). Cards crop to a consistent portrait shape; reading pages show a wide crop (poems show a tall one). Put the subject near the center. No photograph? A typographic placeholder is shown.
- **Dates:** pieces are listed newest first by Publication date; undated pieces come after dated ones.
- **The web address** of a piece comes from its title the first time you save it (`/writing/moonlit-hours/`) and does not change if you rename the piece.
- **Everything you save is public** after the rebuild. There is no draft mode.

### Other things you can edit in Pages CMS

- **About Page:** introduction, portrait, pull quote, literary philosophy, purpose of the archive.
- **Site Text:** tagline, Home photograph and caption, archive statement and introduction, About invitation, footer note, contact link.

## Part 3. Things you must configure by hand (once)

- [ ] Create the GitHub account and public repository
- [ ] Upload the files and confirm `.pages.yml` arrived
- [ ] Set `baseurl` if the repository is not named `username.github.io`
- [ ] Settings → Pages → Deploy from a branch → `main` / `(root)`
- [ ] Sign in to Pages CMS and authorize it for this repository
- [ ] (Demo zip only) remove the placeholder pieces before publishing for real

**Rare changes that need a code edit (not part of normal publishing):**
- The introduction text and photograph for each shelf live in `_data/categories.yml`. Edit once, on GitHub (pencil icon).
- Adding a sixth category: add it to `.pages.yml` (select options), `_data/categories.yml`, `_data/navigation.yml`, and copy a category page such as `poetry.md`.

## Part 4. How it works

- Each piece is a small file in `_works/`; Pages CMS creates it from the form.
- Photographs are stored in `assets/uploads/` in the same repository, so no image host is needed.
- Jekyll reads the folder, groups pieces by category, builds every reading page and archive, and GitHub Pages publishes the result. Delay: usually 1–3 minutes after Save.
- Very large archives: the category archive pages load all of a shelf’s cards and page through them in the browser. This is comfortable for hundreds of pieces per shelf.

## Part 5. Optional: preview on your own computer

Needs Ruby. Not required.
```
bundle install
bundle exec jekyll serve
```
Open http://localhost:4000.

## Part 6. Cost

GitHub Pages and Pages CMS are free for this use. Fonts come from free Google Fonts, with Georgia and system fonts as fallbacks. Avoid very large uploads: GitHub Pages has a soft size limit of about 1 GB.

## Part 7. Project map

```
.pages.yml            Pages CMS configuration
_config.yml           Jekyll settings (baseurl lives here)
_works/               one file per piece (managed by Pages CMS)
_layouts/ _includes/  page templates (home, archives, reading pages, carousel, cards)
_data/                Site Text, navigation, shelf introductions
assets/css, assets/js styling; carousel, search, pagination scripts
assets/site/          site images (home, shelves, About)
assets/uploads/       photographs (managed by Pages CMS)
poetry.md … about.md  the shelf pages and About
setup/pages.yml.txt   a plain copy of .pages.yml for easy pasting
```

## Part 8. Troubleshooting

- **Saved but the site did not change:** check the Actions tab for a red “pages build and deployment” run; wait a few minutes; hard-refresh.
- **Unstyled site or missing images:** `baseurl` in `_config.yml` is probably wrong (step 4).
- **A piece is missing from its shelf:** its Category must be one of the five exact names.
- **No collections in Pages CMS:** `.pages.yml` is missing or not in the repository root.
- **Build failed:** open the failed run in Actions; it names the file and line. Re-save the piece in Pages CMS.
- **Carousel or archive buttons do nothing:** the script `assets/js/site.js` did not load; usually the same `baseurl` problem.
- **Pages CMS screens differ from this guide:** it is a third-party service; see pagescms.org/docs.
