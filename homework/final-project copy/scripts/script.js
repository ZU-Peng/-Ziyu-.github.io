d3.csv("./data/PPP.csv").then(function(datavis) {


    const width = 800;
    const height = 500;

    const tooltip = d3.select("#chart")
    .append("div")
    .attr("class", "tooltip");

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    const freq = {
        
        min: d3.min(datavis, function(z) { return +z.Frequncy; }),
        max: d3.max(datavis, function(z) { return +z.Frequncy; })

    };
   


    const margin = {
        top: 50, 
        left: 100, 
        right: 50, 
        bottom: 100
    };

    const xScale = d3.scaleBand()
        .domain(["Top1","Top2","Top3","Top4","Top5"])
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([50, freq.max])
        .range([height - margin.bottom, margin.top]);


    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));


    
console.log(freq)
    const points = svg.selectAll("rect")
        .data(datavis)
        .enter()
        .append("rect")
            .attr("x", function(z) { return xScale(z.Rank); })
            .attr("y", function(z) { return yScale(z.Frequncy); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(z) { return height - (margin.bottom + yScale(z.Frequncy)) })
            .attr("fill", "orange");
    


    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Rank");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -height/2)
        .attr("y", margin.left/4)
        .text("Frequncy");



    points.on("mouseover", function(e, z) {

    let x = +d3.select(this).attr("cx") + 20;
    let y = +d3.select(this).attr("cy") + 20;

    let displayValue = d3.format(",")(z.Frequncy);
    
    tooltip.style("visibility", "visible")
        .style("top", `${y}px`)
        .style("left", `${x}px`)
        .html(`<p><b>${"Description:"+datavis.Content}</b><br><em>${"Requlation:"+z.Regulations}</em><br>#: ${"Frequncy:"+displayValue}</p>`);


    points.attr("opacity", 0.1);
    d3.select(this)
        .attr("opacity", 1)
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .raise();

}).on("mouseout", function() {

    tooltip.style("visibility", "hidden");
    points.attr("opacity", 1);

});
});
