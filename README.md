# EurOrbit

EurOrbit is a web application that provides a 7-day weather forecast for major European cities, powered by the [7Timer!](http://www.7timer.info/) API.

## Features

- Select from a list of European cities to view their weather forecast.
- Beautiful, responsive UI with a video background.
- Weather icons and temperature highs/lows for each day.
- Powered by open data and [7Timer!](http://www.7timer.info/).

## Project Structure

```
city_coordinates.csv
index.html
css/
  master.css
images/
  (weather icons and background video)
js/
  main.js
```

## Getting Started

1. **Clone the repository**  
   ```
   git clone https://github.com/yourusername/EurOrbit.git
   cd EurOrbit
   ```

2. **Install dependencies**  
   No dependencies required. All libraries are loaded via CDN.

3. **Run locally**  
   Open `index.html` in your browser.  
   For best results, use a local server (e.g. VS Code Live Server extension) to avoid CORS issues with local files.

## Usage

- Select a city from the dropdown menu.
- The 7-day weather forecast will appear below, with icons and temperature details.

## Data Sources

- City coordinates: [`city_coordinates.csv`](city_coordinates.csv)
- Weather data: [7Timer! API](http://www.7timer.info/doc.php?lang=en)
- Weather icons: [`images/`](images/)

## Credits

- Weather data by [7Timer!](http://www.7timer.info/)
- Icons and background video from open/free sources.

## License

MIT License. See [LICENSE](LICENSE) for details.
