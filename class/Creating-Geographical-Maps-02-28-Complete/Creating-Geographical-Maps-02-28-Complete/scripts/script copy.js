const width = window.innerWidth, height = window.innerHeight;

const svg = d3.select("#viz")
            .attr("width", width)
            .attr("height", height);

const map = svg.select("#map");

d3.select("#ocean")
  .attr("width", width)
  .attr("height", height);

d3.json("data/Boston_Neighborhoods.geojson").then(function(ditu) {

 console.log(ditu)
    var proj = d3.geoMercator().fitSize([width, height], ditu);

    var path = d3.geoPath().projection(proj);

    map.selectAll("path")
        .data(ditu.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#FCEDDA")
        .attr("vector-effect", "non-scaling-stroke")
        .attr("stroke", "#FC766AFF")
        .attr("stroke-width", "0.1px");
    
    
    var points = [
      
        {"name": "London", "coords": [-0.1278, 51.5074]}
    ];

  

    var circleRadius = 4;

    map.selectAll("circle")
        .data(points)
        .enter().append("circle")
        .attr("r", circleRadius)
        .attr("fill", "#201E20")
        .attr("transform", function(d) {
            return "translate(" + proj(d.coords) + ")";
        });


    function zoomed(e) {
        map.attr("transform", e.transform);
    };

   
    let zoom = d3.zoom()
       
        .translateExtent([[0, 0], [width, height]])

        .scaleExtent([1, 15])
        .on("zoom", zoomed);

    svg.call(zoom);

});