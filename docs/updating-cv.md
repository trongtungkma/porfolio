# How to update the portfolio CV

The portfolio uses `portfolio/public/cv.pdf` as its downloadable CV and source for automated career-data updates. Updating that file on `master` starts a GitHub Actions workflow that extracts the CV, validates the result, runs the test suite, and opens a pull request. The generated changes are never published without review and merge.

## One-time repository setup

1. Open the repository on GitHub and go to **Settings → Secrets and variables → Actions**.
2. Create a repository secret named `OPENROUTER_API_KEY` containing the OpenRouter API key.
3. Optional: create an Actions variable named `OPENROUTER_CV_MODEL` to select a different extraction model. The default is `openai/gpt-4.1-mini`.
4. Under **Settings → Actions → General**, make sure workflows are allowed to create and approve pull requests.

Never put the API key in the PDF, source code, `.env.example`, a commit, or a pull request.

## Recommended update process

1. Export the updated CV as a text-selectable PDF. Scanned image-only PDFs are not supported without OCR.
2. Name the file `cv.pdf`.
3. Replace `portfolio/public/cv.pdf` in the repository.
4. Commit the replacement directly to `master`. A message such as `Update CV` is sufficient.
5. Open the repository's **Actions** tab and select **Update portfolio from CV**.
6. Wait for the workflow to create or refresh the `automation/update-from-cv` pull request.
7. Review the pull request carefully, especially:
   - Name, email, phone number, and location
   - Employer, role, client, and employment dates
   - Whether a role marked “Present” is accurate as written in the CV
   - Project descriptions, technologies, team sizes, and dates
   - Skills, education, certifications, and language scores
   - Removed or newly featured projects
8. Confirm that validation, unit tests, lint, TypeScript, and the production build pass.
9. Merge the pull request. The updated data will then be used by both the visible portfolio and the Digital Twin.

## Update using Git locally

From the repository root in PowerShell:

```powershell
Copy-Item -LiteralPath 'C:\path\to\updated-cv.pdf' -Destination 'portfolio\public\cv.pdf'
git add portfolio/public/cv.pdf
git commit -m "Update CV"
git push
```

On macOS or Linux:

```bash
cp /path/to/updated-cv.pdf portfolio/public/cv.pdf
git add portfolio/public/cv.pdf
git commit -m "Update CV"
git push
```

## Test an import locally

Requirements:

- Node.js 22.13 or newer
- Poppler with `pdftotext` available on `PATH`
- `OPENROUTER_API_KEY` in `portfolio/.env.local` or the shell environment

From the `portfolio` directory:

```bash
npm ci
npm run cv:import
npm run check
```

The importer writes the extracted information to `content/career.json`. Inspect its Git diff before committing it.

## Protected presentation settings

`portfolio/content/career-overrides.json` is not overwritten by the importer. It controls:

- Which projects appear in the featured project grid
- Project categories and optional public URLs
- Technologies shown in the homepage strip

When a project is renamed or removed, update `featuredProjectIds` and the related maps to use IDs that exist in `career.json`. Validation intentionally fails when a featured ID no longer exists.

## Large intentional removals

The importer stops if more than half of the existing employment entries or projects disappear. This protects the site from incomplete extraction.

For a legitimate large rewrite, manually run the workflow from **Actions → Update portfolio from CV → Run workflow**, enable **Allow removal of more than half the existing jobs or projects**, and review the generated pull request especially carefully.

Locally, the equivalent command is:

```bash
npm run cv:import -- --allow-large-change
```

## Troubleshooting

- **`OPENROUTER_API_KEY is required`**: add the repository secret or configure `portfolio/.env.local` locally.
- **`Could not run pdftotext`**: install Poppler and confirm `pdftotext -v` works in the same terminal.
- **Extracted text is unexpectedly short**: export a text-selectable PDF instead of a scanned image.
- **Featured project IDs are missing**: update `content/career-overrides.json` to reference current project IDs.
- **Identity changed**: confirm that the uploaded PDF belongs to Lê Trọng Tùng and that the name is written correctly.
- **Workflow cannot create a pull request**: enable pull-request creation in the repository's GitHub Actions settings.
- **No data changed**: confirm that the updated PDF was committed at exactly `portfolio/public/cv.pdf` on `master`.
