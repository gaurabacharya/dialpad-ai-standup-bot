# Dialpad AI Standup Assistant

A prototype feature for Dialpad AI that automatically generates standup summaries by aggregating data from various work tools and platforms.

## Overview

This prototype demonstrates an AI-powered standup assistant that integrates with common workplace tools to automatically generate comprehensive standup summaries. Instead of manually collecting and writing standup updates, the assistant pulls data from multiple sources and uses AI to create meaningful summaries.

### Data Sources
- Jira: Task updates, ticket status changes
- GitHub: Pull requests, commits, code reviews
- Notion: Document updates, meeting notes
- Slack: Important messages and updates

## Features

- 🤖 AI-powered standup summary generation
- 📊 Multi-source data aggregation
- 💬 Chat-like interface matching Dialpad's design
- 🔄 Real-time updates
- 📝 Structured summaries with:
  - Completed tasks
  - Work in progress
  - Blockers
  - Action items

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- A Gemini API key from Google AI Studio

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dialpad-standup-app.git
cd dialpad-standup-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Usage

1. The app opens with a Dialpad-style interface showing a sidebar and chat area
2. Type "run standup" in the chat input to generate a standup summary
3. The AI will process the aggregated data and generate a structured summary
4. Summaries include:
   - Updates per team member
   - Completed work
   - Ongoing tasks
   - Any blockers
   - Action items

## Technical Details

- Built with React + TypeScript
- Uses Vite for fast development
- Integrates with Google's Gemini AI for summary generation
- Styled with Tailwind CSS
- Matches Dialpad's design system

## Current Limitations

This is a prototype that currently:
- Uses mock data instead of real integrations
- Demonstrates the UI and AI capabilities
- Shows the potential of automated standup summaries

## Future Enhancements

- Real integrations with workplace tools
- Custom data source configurations
- Team member preferences
- Meeting scheduling integration
- Historical standup tracking
- Analytics and insights

## Contributing

This is a prototype for a potential Dialpad feature. Feel free to:
- Submit issues for bugs or feature suggestions
- Create pull requests for improvements
- Share ideas for additional integrations

## License

This project is proprietary and intended as a prototype for Dialpad features.

## Acknowledgments

- Dialpad Design System
- Google Gemini AI
- The open-source community
