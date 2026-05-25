# EngineAI Co-Pilot

MVP for EngineAI Co-Pilot, a desktop application for real-time technical interview guidance.

## Project Structure
- `backend/`: FastAPI backend with OpenAI integration.
- `desktop/`: Electron desktop application.
- Root: Next.js landing page (moved from `landing/`).

## Deployment Plan
- **Backend**: Deploy to AWS App Runner or Render.
- **Landing**: Deploy to Vercel.
- **Desktop**: Distribute via GitHub Releases or AWS S3.
