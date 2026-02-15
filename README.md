# My Dearest Valentine

This project is a romantic, interactive Valentine's Day website. It's built with HTML, CSS, and JavaScript, designed to be easily customized and deployed.

## 1. Customization

All the content—text, photos, dates, and messages—is located in one file: **`config.js`**.

1.  Open `config.js` in a text editor (like VS Code or Notepad).
2.  Change the `partnerName`, `greeting`, and `photos` array.
3.  Update the `timeline` with your own special dates.
4.  Write your own heartfelt reasons in `loveReasons`.
5.  Change the `finalMessage` to something personal.

**Tip:** For photos, you can upload them to [Imgur](https://imgur.com/) or just use the direct link if they are already online.

## 2. Testing Locally

Just extract the zip file (or open the folder) and double-click `index.html`. It works right in your browser!

## 3. Deploying to Vercel (Free)

This is the easiest way to put your site online forever.

### Option A: Via GitHub (Recommended)
1.  Create a new repository on [GitHub](https://github.com/new).
2.  Push this folder to your new repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```
3.  Go to [Vercel](https://vercel.com) and log in.
4.  Click **Add New...** -> **Project**.
5.  Select your GitHub repository and click **Import**.
6.  Click **Deploy**. Done!

### Option B: Local Command Line
If you have node installed, you can use the Vercel CLI:
1.  Open your terminal in this folder.
2.  Run `npx vercel`.
3.  Follow the prompts (press Enter for defaults).
4.  It will give you a live URL instantly!
