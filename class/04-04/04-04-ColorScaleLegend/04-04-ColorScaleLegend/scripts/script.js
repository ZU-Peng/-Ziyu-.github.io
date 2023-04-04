/**
 *
 *   ARTG5330 Visualization Technologies 1
 *   April 4, 2023
 *   Spring Semester
 *   Week 10
 *
 *   - Adding Color Gradients to a Bar Chart and a Legend
 *
 */

// 1. Dimensions and Containers
//
// Specify the width/height dimensions of the SVG canvas that
// contains the chart and the top, left, right, bottom margins.

const margin = {
    top: 50, 
    left: 100, 
    right: 50, 
    bottom: 100
};

const width = 1300 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// Specify the position and dimensions of the linear Gradient scale.
// We use the ID attribute of HTML objects to select the elements.

var scale = svg.select("#scale")
        .attr("transform", "translate(" + margin.left + ", " + height + ")");

scale.select("#scaleRect")
    .attr("width", 278)
    .attr("height", 18);

// 2. LOAD THE DATASET IN D3.js
//
// NOTE: In D3.js, the methods for loading data return a <promise> object which needs
//       to be fullfilled first before we can use it as a dataset.

const fileName = "./data/gapminder.csv";

Promise.all([d3.csv(fileName)]).then(function(results){
    // Once data are loaded successfully, call the function that creates and displays the chart
    createChart(results[0]);
});

// FUNCTION THAT CREATES AND DISPLAYS: Bar Chart, Gradient Scale, and Legend

function createChart(data) {

    /**
     *  3. FILTER THE DATASET
     * 
     * 
     *  NOTE:
     * 
     *  Try different country names to filter the data to see the resulting color gradients
     *  in relation to the life expectancy of the selected country.
     * 
     *  For example, try:
     *              "United States"
     *              "Canada"    
     *              "Mexico"
     *              "Italy"
     *              "Greece"
     *              "China"
     *              "India"
     *              "Taiwan"
     *              "United Kingdom"
     * 
     *  You can use console.log(data) to see what other possible country names you can use.
     * 
     * The variable `countryString` is also used down below for plotting the countrys on the chart.
     */
    let countryString = "United States"

    let filtered_data = data.filter(function(d) {

        return d.country === countryString;

    });

    /**
     *  4. DETERMINE MIN AND MAX VALUES OF VARIABLES
     */

    const lifeExp = {
        
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })

    };

    /**
     *  5. CREATE SCALES
     * 
     *    Here, we frequently use the D3 method .nice() that automatically
     *    creates rounded domain values for us. This is especially useful for this
     *    dataset as country life expectancy values are all over the place and this
     *    can make our charts and scales look a bit untidy. 
     * 
     *              https://www.d3indepth.com/scales/#nice
     */

    const xScale = d3.scaleBand()
        .domain(["1952","1957","1962","1967","1972","1977","1982","1987","1992","1997","2002","2007"])
        .range([margin.left, width - margin.right])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        // We adjust our Y-Axis domain based on minimum and maximum life expectancy values
        .domain([lifeExp.min, lifeExp.max]).nice()
        .range([height - margin.bottom, margin.top]);

    /**
     * The following lines of code are for specifying a color scale
     * and define the Linear Gradient Stops. The actual assignment of
     * colors needs a function that computes an interpolation between
     * two colors. There are many such "interpolator functions". We can
     * define our own interpolation function, such as the following
     * function called rainbowColors(), or use one of the many built-in
     * interpolator functions in D3.js, such as the d3.interpolateViridis.
     * 
     * Documentation for interpolator functions in D3:
     *          https://github.com/d3/d3-scale-chromatic
     */

    // For every country, we grab the minimum life expectancy which we use
    // to define our color scales.
    let colorRangeOffset = lifeExp.min;

    function rainbowColors(t) {
        return d3.hsl(t * 360, 1, 0.5) + "";
      }

    // d3.interpolateViridis

    var colorScale = d3.scaleSequential(d3.interpolateViridis)
            .domain([colorRangeOffset, lifeExp.max]);

    // Note: We define this gradient stops range as [0, 1.1] in order to obtain the values:
    //                          0, 0.1, 0.2, 0.3, ..., 0.9, 1.0
    //       If we don't use 1.1, then we won't reach to 1.0 in the range. Try it with console.log().
    var gradientStopsData = d3.range(0.0, 1.1, 0.1);

    /**
     * Implements the linear interpolation formula:
     *      x0 + t * (x1 - x0)
     */
    function lerp(t, x0, x1) {
        return x0 + t * (x1 - x0);
    }

    svg.select("#colorGradient").selectAll("stop")
            .data(gradientStopsData)
            .enter()
                // We are appending a gradient "stops" attribute programmatically with JavaScript
                // Look at the index.html file we created in "04-04-Gradients" demonstration.
                .append("stop")
                .attr("offset", function(d) {
                    return d * 100 + "%";
                })
                .attr("stop-color", function(d) {
                    // We are using the scaling formula: 
                    //     x0 + t * (x1 - x0)
                    // which is otherwise called linear interpolation
                    return colorScale( lerp(d, colorRangeOffset, lifeExp.max) );
                });

    // AND ALSO, AN AXIS FOR OUR GRADIENT COLOR SCALE
    var colorScaleAxis = d3.scaleLinear()
              .domain([colorRangeOffset, lifeExp.max]).nice()
              .range([0, 278]);
    
    var scaleAxis = d3.axisBottom(colorScaleAxis);

    scale.select("#scaleAxis")
            .attr("transform", "translate(" + 0 + ", " + 18 + ")")
            .call(scaleAxis);

    /**
     *  6. DRAW AXES
     */

    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    /**
     *  7. DRAW BARS WITH COLOR GRADIENT INFORMATION
     */

    const bars = svg.selectAll(".bars")
        .data(filtered_data)
        .enter()
        .append("rect")
            // Put the rectangles of the bar chart into their own separate class
            // so you don't mix them up with other rectangles in the visualization
            .attr("class", "bars")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", function(d) { return yScale(d.lifeExp); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - (margin.bottom + yScale(d.lifeExp)) })
            // Here, instead of using a single color for the bars we are controlling the color
            // using the gradient color scale we defined previously.
            .attr("fill", function(d){
                return colorScale(d.lifeExp)}
            );
    
    /**
     *  8. DRAW AXIS LABELS
     */

    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Year");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -height/2)
        .attr("y", margin.left/2)
        .text("Life Expectancy (Years)");

    const countryText = svg.append("text")
        .attr("class", "otherAxisText")
        .attr("x", width/2)
        .attr("y", margin.top)
        .text(countryString);

    /** 
     *  9. ADDING A LEGEND
     *
     * When creating visualizations with D3, we don't automatically
     * get legends for encodings like color and size. We have to
     * make these ourselves.
     *
     * Making a legend with D3 and SVG requires a mixture of
     * plain JavaScript, drawing basic SVG shapes, and some
     * creativity with CSS. The following demonstration is one
     * example of one approach to adding legends for encodings
     * in a visualization.
     * 
     * NOTE: There is a lot of clutter when it comes to handling
     *       x and y positions of legend elements including text.
     *       The best way to understand all the different variables
     *       and values used below, especially for positioning, is to
     *       play with the different values available and observe results.
    */

    const legendWH = 30; // square shape: width = height
    const legendMargin = 40;
    const legendSpacing = 90;

    const colorLegend = d3.select("#legend")
        // .append("svg")
        .attr("width", legendWH)
        .attr("height", 150);

    colorLegend.append("text")
        .attr("class", "legend--title")
        .attr("x", width/2 + 7*legendWH)
        .attr("y", height + 10)
        .text("Legend");

    /**
     * Next, we iterate over each of the values for which
     * we want to display a legend, using ARRAY.forEach().
     * 
     * The method .map() returns an array.
     *
     * Here, we'll create a color legend that shows the
     * exact life expectancy each color bar represents.
     * 
     * NOTE: In this particular case, the data values are
     *       sorted. In other cases, you may need to sort
     *       the resulting array using.
     */

    var legendData = filtered_data.map(function(d) {
        return d.lifeExp;
    });

    // Convert the one-dimensional array above into a two-dimensional one
    // that consists of 2 rows and 6 columns
    //               12 entries -> 2 x 6 entries
    var legend2DArray = [
        [legendData[0], legendData[1], legendData[2], legendData[3], legendData[4], legendData[5]],
        [legendData[6], legendData[7], legendData[8], legendData[9], legendData[10], legendData[11]]
    ];

    // These variables are for positioning the legend
    let legendPositionX = width/2;
    let legendPositionY = height + 40;

    var legendRowA = colorLegend.selectAll(".legendRects--A")
            .data(legend2DArray[0])
            .enter()
                .append("rect")
                .attr("class", "legendRects--A")
                .attr("x", function(d, i){
                    return legendPositionX + i * legendSpacing;
                })
                .attr("y", legendPositionY)
                .attr("fill", colorScale)
                .attr("width", legendWH)
                .attr("height", legendWH);

    var legendRowB = colorLegend.selectAll(".legendRects--B")
            .data(legend2DArray[1])
            .enter()
                .append("rect")
                .attr("class", "legendRects--B")
                .attr("x", function(d, i){
                    return legendPositionX + i * legendSpacing;
                })
                .attr("y", legendPositionY + legendMargin)
                .attr("fill", colorScale)
                .attr("width", legendWH)
                .attr("height", legendWH);

    var legendTextRowA = colorLegend.selectAll(".legendRowA--label")
            .data(legend2DArray[0])
            .enter()
                .append("text")
                .attr("class", "legendRowA--label")
                .style("text-anchor", "start")
                .style("dominant-baseline", "middle")
                .attr("x", function(d, i){
                    // this expression looks weird, but experiment with the values to observe results
                    return legendPositionX + i * legendSpacing + legendWH + 3;
                })
                .attr("y", legendPositionY + legendWH/2)
                .text(d => d);
    
    var legendTextRowB = colorLegend.selectAll(".legendRowB--label")
            .data(legend2DArray[1])
            .enter()
                .append("text")
                .attr("class", "legendRowB--label")
                .style("text-anchor", "start")
                .style("dominant-baseline", "middle")
                .attr("x", function(d, i){
                    // this expression looks weird, but experiment with the values to observe results
                    return legendPositionX + i * legendSpacing + legendWH + 3;
                })
                .attr("y", legendPositionY + legendMargin + legendWH/2)
                .text(d => d);

}
