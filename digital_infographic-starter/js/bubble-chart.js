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
    .attr("font-weight", 700);

  bubbleChart
    .append("text")
    .text("On-demand Video Streams (millions)")
    .attr("x", margin.left - 25)
    .attr("y", margin.top - 20)
    .attr("font-weight", 700);

  const bubblesAreaScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.album_sales_millions)])
    .range([2, 40]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(artists)
    .range(d3.schemeTableau10);

  bubbleChart
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => audioStreamsScale(d.on_demand_audio_streams_millions))
    .attr("cy", (d) => videoStreamScale(d.on_demand_video_streams_millions))
    .attr("r", (d) => bubblesAreaScale(d.album_sales_millions))
    .attr("fill", (d) => colorScale(d.artist));

  const list = d3.select(".legend-color").append("ul");

  const listItems = list
    .selectAll("li")
    .data(data)
    .join("li")
    .attr("class", "bubble-color-legend-item");

  listItems
    .append("span")
    .attr("class", "legend-circle")
    .style("background-color", (d) => colorScale(d.artist));

  listItems
    .append("span")
    .attr("class", "legend-label")
    .text((d) => d.title + ", " + d.artist);

  const salesLegend = d3
    .select(".legend-area")
    .append("svg")
    .attr("viewbox", [0, 0, 150, 100])
    .attr("width", 150)
    .attr("height", 100);

  const circlesGroup = salesLegend
    .append("g")
    .attr("class", "circles-group")
    .attr("fill", "#727a87")
    .attr("fill-opacity", 0.4);
  const linesGroup = salesLegend
    .append("g")
    .attr("class", "lines-group")
    .attr("stroke", "#333")
    .attr("stroke-dasharray", "6 4");
  const lablesGroup = salesLegend.append("g").attr("class", "labels-group");

  circlesGroup.append("circle").attr("cx", 50).attr("cy", 32).attr("r", 27);
  circlesGroup.append("circle").attr("cx", 50).attr("cy", 44).attr("r", 15);
  circlesGroup.append("circle").attr("cx", 50).attr("cy", 50).attr("r", 6);

  linesGroup
    .append("line")
    .attr("x1", 50)
    .attr("y1", 5)
    .attr("x2", 100)
    .attr("y2", 5);
  linesGroup
    .append("line")
    .attr("x1", 50)
    .attr("y1", 30)
    .attr("x2", 100)
    .attr("y2", 30);
  linesGroup
    .append("line")
    .attr("x1", 50)
    .attr("y1", 45)
    .attr("x2", 100)
    .attr("y2", 45);
};
