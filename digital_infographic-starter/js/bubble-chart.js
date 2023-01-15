d3.csv("./data/top_albums.csv", (d) => d).then((data) => {
  createBubbleChart(data);
});

const createBubbleChart = (data) => {
  console.log(data);
  const metrics = [
    "total_album_consumption_millions",
    "album_sales_millions",
    "song_sales",
    "on_demand_audio_streams_millions",
    "on_demand_video_streams_millions",
  ];
  const artists = [];
  data.forEach((datum) => {
    metrics.forEach((metric) => {
      datum[metric] = parseFloat(datum[metric]); // Convert strings to numbers
    });
    artists.push(datum.artist); // Populate the artists array
  });
  console.log(artists);
  console.log(data);

  const width = 1160;
  const height = 380;
  const margin = { top: 40, right: 0, bottom: 60, left: 40 };

  const bubbleChart = d3
    .select("#bubble-chart")
    .append("svg")
    .attr("viewbox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

  const audioStreamsScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.on_demand_audio_streams_millions)])
    .range([0, width - margin.left - margin.right]);

  const videoStreamScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.on_demand_video_streams_millions + 300)])
    .range([height - margin.top - margin.bottom, 0]);

  bubbleChart
    .append("g")
    .call(d3.axisBottom(audioStreamsScale))
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`);

  bubbleChart
    .append("g")
    .call(d3.axisLeft(videoStreamScale))
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  bubbleChart
    .append("text")
    .text("On-demand Audio Streams (millions)")
    .attr("x", width - margin.right)
    .attr("y", height - margin.bottom + 50)
    .attr("text-anchor", "end")
    .attr('font-weight', 700)

  bubbleChart
    .append("text")
    .text("On-demand Video Streams (millions)")
    .attr("x", margin.left - 25)
    .attr("y", margin.top - 20)
    .attr("font-weight", 700);
};
