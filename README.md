# Inu Cho: personal website

A plain HTML/CSS site with no build step and no dependencies. Open any `.html` file in a browser and it works.

```
index.html          Home: about, "now", highlights, interests
research.html       Publications, projects, presentations
cv.html             Full CV (prints cleanly to PDF with Cmd+P)
origami.html        Origami portfolio
goals.html          This year / long term / life list / milestones
assets/
  site.css          All styling (colors at the top)
  portrait.jpg      Headshot
  origami/          Model photography
  favicon.svg
```

## Keeping it growing

| When this happens… | Edit this |
|---|---|
| New semester or new focus | The **"What I'm doing now"** box in `index.html`, plus the date |
| New paper, poster, or project | Copy an `<li>` in `research.html` (there's a commented example) |
| New job, role, award, or certification | Add an `<li>` at the **top** of the right section in `cv.html` |
| Goal progress | Change the goal's `<li class="">` to `doing` or `done` in `goals.html`, and add an entry to **Milestones** |

Also update the "Last updated" line in the footers when you make changes.

**Adding a new page:** copy `goals.html`, change its content, and add a link to the `<nav class="site-nav">` block on every page.

## Preview locally

```sh
cd ~/.gemini/antigravity/scratch/inu-cho-site
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish for free (GitHub Pages)

1. Create a GitHub repo named `<your-username>.github.io`.
2. Push this folder to it.
3. Your site will be live at `https://<your-username>.github.io` within a minute or so.

Netlify Drop (drag the folder onto app.netlify.com/drop) and Cloudflare Pages also work. Berkeley's OCF also offers free student web hosting.
