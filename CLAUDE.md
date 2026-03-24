@AGENTS.md

# ITVision Academy - Coming Soon Site

## Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Runtime:** Node.js 22

## Infrastructure
- **Server:** AWS Lightsail (Ubuntu 24.04, 2 vCPU, ~911MB RAM, 38GB disk)
- **Server IP:** 34.201.0.137 (static IP may change on reboot — update Cloudflare DNS + `SERVER_HOST` GitHub secret if it does)
- **SSH Key:** `LightsailDefaultKey-us-east-1.pem` (in Documents folder)
- **SSH User:** ubuntu
- **Process Manager:** PM2 (app name: `itvision`, working dir: `/home/ubuntu/itvision`)
- **Reverse Proxy:** Nginx → localhost:3000
- **SSL:** Let's Encrypt via Certbot (auto-renews)
- **CDN/DNS:** Cloudflare (domain: `new.itvisionacademy.com`)
- **Swap:** 2GB swapfile at `/swapfile` (required — server only has 911MB RAM)

## CI/CD
- **GitHub Repo:** nijanthan-elangovan/ITVisonacademy-WEB
- **Branch:** master
- **Workflow:** `.github/workflows/deploy.yml`
- **How it works:** Build runs in GitHub Actions (server RAM is too low for `npm run build`). Built artifacts are tarred, SCP'd to the server, extracted, then `pm2 restart itvision`.
- **GitHub Secrets:** `SSH_PRIVATE_KEY`, `SERVER_HOST`, `SERVER_USER`

## Important Notes
- **NEVER run `npm run build` on the server** — it will OOM and crash the instance. All builds must happen in GitHub Actions.
- If the server IP changes, update both the Cloudflare DNS A record and the `SERVER_HOST` GitHub secret.
- Cloudflare SSL mode should be set to **Full**.
- Lightsail firewall must have ports 22, 80, and 443 open.
