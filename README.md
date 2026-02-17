# Orbital Command

A visual, space-themed task dashboard for Notion. Tasks orbit around your focus center like satellites around a planet.

![Orbital Command Screenshot](https://via.placeholder.com/800x400/0f172a/6366f1?text=Orbital+Command+Preview)

## Features

- **Orbital Visualization**: Tasks orbit at different distances based on priority (P0-P3)
- **Priority-based Colors**: Critical tasks glow red, high priority amber, normal green, low gray
- **Interactive Hover**: See task details on hover
- **Filter System**: Filter by priority level
- **Live Clock**: Shows current time and date
- **Statistics Dashboard**: Quick overview of task completion status
- **Glassmorphism UI**: Modern, beautiful design with backdrop blur effects

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Cloudflare Pages (deployment)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project deploys to Cloudflare Pages. The GitHub Actions workflow handles automatic deployment on push to main.

Required secrets:
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages deployment permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

## Future Enhancements

- [ ] Real-time Notion API integration
- [ ] Drag-and-drop task reordering
- [ ] Custom orbit animations
- [ ] Task completion from UI
- [ ] Mobile-responsive layout

## License

MIT