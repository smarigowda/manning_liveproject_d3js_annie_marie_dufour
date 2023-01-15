const topRockSongs = [
  { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
  { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
  { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
  {
    artist: "Journey",
    title: "Don't Stop Believin'",
    sales_and_streams: 1497000,
  },
  { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 },
];

const topSongsSection = d3.select("#top-songs");

topSongsSection.append("h3").text("Top Rock Songs");

const chartWidth = 650;
const chartHeight = 200;

const circlesChart = topSongsSection
  .append("svg")
  .attr("width", chartWidth)
  .attr("height", chartHeight);

circlesChart
  .append("line")
  .attr("x1", 0)
  .attr("y1", chartHeight / 2)
  .attr("x2", chartWidth)
  .attr("y2", chartHeight / 2)
  .attr("stroke", "#333")
  .attr("stroke-width", 2);

const circlesChartGroup = circlesChart
  .selectAll("circle")
  .data(topRockSongs)
  .join("g");

const circleScale = d3
  .scaleSqrt()
  .domain([0, d3.max(topRockSongs, (d) => d.sales_and_streams)])
  .range([0, 40]);

circlesChartGroup
  .append("circle")
  .attr("r", (d) => circleScale(d.sales_and_streams))
  .attr("cx", (d, i) => 50 + 130 * i)
  .attr("cy", () => chartHeight / 2)
  .attr("fill", "#fe3");

circlesChartGroup
  .append("text")
  .text((d) => d.sales_and_streams / 1000000 + " M")
  .attr("x", (d, i) => 50 + 130 * i)
  .attr("text-anchor", "middle")
  .attr("y", (d) => chartHeight / 4);

circlesChartGroup
  .append("text")
  .text((d) => d.title)
  .attr("x", (d, i) => 50 + 130 * i)
  .attr("text-anchor", "middle")
  .attr("y", (d) => (chartHeight / 4) * 3.5);
