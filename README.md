# Teacher's Personality Professional Direction Assessment

An interactive web-based psychological assessment tool based on the E.I. Rogov method for evaluating teachers' professional personality traits.

## Features

- 50-question personality assessment
- Interactive UI with progress tracking
- Real-time scoring and visualization
- Radar chart profile display
- Detailed analysis of 4 key dimensions:
  - **Sociability** (Communicator Teacher)
  - **Organization** (Organiser Teacher)
  - **Focus on Subject** (Subject Teacher)
  - **Intelligence** (Intelligence Teacher)
- Validity check (Motivation of Approval scale)
- Responsive design for mobile and desktop

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select the main branch as source
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to project directory
3. Run `vercel` and follow prompts
4. Your site will be deployed automatically

Or use Vercel's GitHub integration:
1. Push code to GitHub
2. Import repository on vercel.com
3. Deploy automatically

### Netlify

1. Drag and drop the project folder to netlify.com/drop
2. Or connect your GitHub repository
3. Deploy automatically

## Local Development

Simply open `index.html` in a web browser. No build process required!

## Project Structure

```
teacher-personality-test/
├── index.html          # Main HTML structure
├── styles.css          # Styling
├── questions.js        # Questions and scoring data
├── app.js             # Application logic
└── README.md          # Documentation
```

## Scoring System

Each dimension is scored from 0-10:
- **0-3**: Low level
- **4-7**: Normal level
- **8-10**: High level

If the Motivation of Approval score exceeds 7, results may be unreliable due to social desirability bias.

## Technologies Used

- HTML5
- CSS3 (with gradients and animations)
- Vanilla JavaScript
- Chart.js for radar chart visualization

## License

Free to use for educational and research purposes.

## Credits

Based on the E.I. Rogov psychological assessment method.
