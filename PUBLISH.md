# Putting Coach Board online with GitHub Pages

You are uploading five files. Nothing needs to be installed, and there is no build step —
GitHub just serves the files as a website.

**Files in this folder**

| File | What it is |
|---|---|
| `index.html` | The whole app. Everything is in this one file. |
| `manifest.webmanifest` | Lets phones install it to the home screen |
| `icon-192.png` | App icon |
| `icon-512.png` | App icon, larger |
| `sw.js` | Keeps a copy on each phone so the app opens with no signal |

**What is in the app**

- **Lineup** — formations, up to three boards side by side, saved line-ups
- **Drills** — 67 sessions with animated playback, plus your own, drawn on whichever
  pitch suits them: blank grass, a full pitch, either half, two-thirds or the final third
- **Squad** — your players: numbers, positions, goals/assists/saves, and two-way transfer to a line-up

Your drills, line-ups and squad are saved in the browser on the device you are using.
**Save** writes one date-stamped file holding all of it; **Open** on another device adds it
without replacing what is already there.

---

## One-time setup — about 5 minutes

**1. Get a GitHub account**
Go to <https://github.com/signup> and sign up. Free is all you need.
Write down the username you pick — it becomes part of your web address.

**2. Make a repository**
Once signed in, go to <https://github.com/new>.

- **Repository name:** `coach-board`
- **Public** — this must be Public. Free GitHub Pages only works on public repos.
- Leave everything else alone and click **Create repository**.

**3. Upload the four files**
On the page that appears, click the **uploading an existing file** link
(it is in the line "…or push an existing repository from the command line" — the upload link
sits just above it).

Drag all five files from this folder into the box. Do **not** drag the folder itself — drag the
files. Then click **Commit changes** at the bottom.

**4. Turn on Pages**
In the repository, click **Settings** (top right of the repo, not your account settings), then
**Pages** in the left sidebar.

- Under **Source**, choose **Deploy from a branch**
- **Branch:** `main`, folder: `/ (root)`
- Click **Save**

**5. Wait about a minute, then open your link**

```
https://YOUR-USERNAME.github.io/coach-board/
```

Replace `YOUR-USERNAME` with the username from step 1. The first build can take up to two
minutes; if you get a 404, wait a bit and refresh. That address is permanent — send it to
your staff.

---

## Sending it to your coaches

Text or email them the link. Tell them to add it to their home screen so it opens
full-screen like an app:

- **iPhone:** open the link in Safari → tap the Share button (square with an arrow) →
  **Add to Home Screen**
- **Android:** open the link in Chrome → tap the three-dot menu → **Add to Home screen**
  (or **Install app**)

After that it opens from the home screen with no browser bar, and it works with no signal —
once the page has loaded, everything runs on the phone itself.

---

## Sharing an actual lineup or drill

The link above gives everyone the *app*. To send someone *a specific board* — tonight's
starting XI, a drill with your own arrows on it — use the **Share** button inside the app.
That makes a longer link with the whole board packed into it. They open it and see exactly
what you saw.

Two things worth knowing:

- A share link is a **snapshot**. If you change the board afterwards, send a new link.
- Coaches do not edit the same board at the same time. Everyone works on their own copy.
  For a shared season file, use **Save** to get a `.json` and pass that around instead.

---

## Updating the app later

1. Go to your repository on GitHub
2. **Add file → Upload files** and drop in the new `index.html`
3. **Commit changes**

Two things to watch:

- Your browser probably saved the download as `index (1).html`. **Rename it to exactly
  `index.html` before you upload it**, or GitHub adds it as a second file and the live site
  never changes. After committing, the repo should still show only five files.
- Only `index.html` normally changes. Leave the other four alone unless you are told otherwise.

The live site updates within a minute or so, and everyone's link stays the same.

### Checking it worked

Open the site and look at the bottom-right of the screen: it shows a build stamp, e.g.
`build 2026-08-18 · multi-board`. If that is the build you were given, the new file is live.
It is also shown in **Help**.

If a phone is stuck on an old version, open **Help → Force refresh from the site**. That
clears the stored copy and reloads. Deleting and re-adding the home-screen icon does the
same thing.

---

## A note on privacy

The repository is public, which means anyone who finds the address can open the app. That is
fine — the app is just the tool.

**No player names are ever stored on GitHub.** Rosters exist only in two places: the link in
your own address bar, and any `.json` file you save. Neither is uploaded anywhere. If you
share a link containing a lineup, treat it like any other message with player names in it.
