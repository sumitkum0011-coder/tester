# Git Setup and Push Guide

This guide will help you push your iOS-style calculator project to GitHub.

## Prerequisites
- GitHub account (create at https://github.com if you don't have one)
- Git installed on your system (already done)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ios-calculator-flask-supabase` (or your preferred name)
3. Description: "iOS-style calculator web app with Python Flask backend and Supabase database integration"
4. Keep it Public (or Private if preferred)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push to GitHub

### Option A: HTTPS Method (Recommended for beginners)

```bash
# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
# Replace REPOSITORY_NAME with your actual repository name
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Option B: SSH Method (More secure)

If you have SSH keys set up with GitHub:

```bash
# Add your GitHub repository as remote (SSH)
git remote add origin git@github.com:YOUR_USERNAME/REPOSITORY_NAME.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 3: Verify Push

After running the commands, you should see:
- "Enumerating objects..."
- "Counting objects..."
- "Writing objects..."
- "Branch 'main' set up to track remote branch 'main' from 'origin'"

## Step 4: View Your Repository

Visit `https://github.com/YOUR_USERNAME/REPOSITORY_NAME` to see your project online!

## Future Updates

For any future changes:

```bash
# Make changes to your files
# Then stage, commit, and push
git add .
git commit -m "Your descriptive commit message"
git push
```

## Troubleshooting

### If you get "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
```

### If you get authentication issues
- For HTTPS: Use GitHub personal access token instead of password
- For SSH: Ensure your SSH key is added to your GitHub account

### If you need to change remote URL
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/NEW_REPOSITORY_NAME.git
```

## Repository Structure After Push

Your GitHub repository will contain:
- ✅ Python Flask backend (`app.py`, `db_connection.py`)
- ✅ Frontend files (`index.html`, `styles.css`, `script.js`)
- ✅ Configuration files (`.env.example`, `requirements.txt`)
- ✅ Documentation (`README.md`, `DEPLOYMENT.md`, `GIT_SETUP.md`)
- ✅ Database schema (`supabase-schema.sql`)

## Next Steps After Push

1. **Set up GitHub Pages** (optional) for frontend hosting
2. **Add collaborators** if working with a team
3. **Create issues** for bug tracking and feature requests
4. **Set up GitHub Actions** for CI/CD (see DEPLOYMENT.md for advanced deployment)

## Example Commands (Replace with your details)

```bash
# Example - replace these values:
git remote add origin https://github.com/johndoe/ios-calculator-flask-supabase.git
git push -u origin main
```

Your project is now ready to be shared with the world! 🎉