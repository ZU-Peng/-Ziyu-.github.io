/**

    ARTG5330 Visualization Technologies 1
        February 21, 2023
        Spring Semester
        Week 9

        TOOLTIP implementation.
        Re: Based on the Gapminder dataset used on 02-21 to create a scatterplot
                "Life Expectancy over GDP per capita over, Year 2007"
*/

/**
    1. DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
*/

const width = document.querySelector("#chart").clientWidth;
const height = document.querySelector("#chart").clientHeight;

const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

/* 
    ADDING A TOOLTIP
        
    We begin by creating a new div element inside the #chart container, 
    giving it class 'tooltip'; note that this newly created div inherits 
    (receives) the CSS properties defined by the .tooltip { ... } rule 
    in the stylesheet.

    This tooltip variable is used later in the code to implement the actual tooltip.
*/

const tooltip = d3.select("#chart")
    .append("div")
    .attr("class", "tooltip");


// Load the Gapminder dataset
// REMINDER: d3.csv(), and all other data loading methods in D3 v7, return a "promise" object not a dataset/

// Put the d3.csv() method inside an array because the static method Promise.all() below
// requires an "iterable" object as input argument.
let promise = [d3.csv("./data/gapminder.csv")];

/**
 * When all the data have been loaded, we call the function that draws the scatterplot
 * 
 * Experiment with console.log() to see how d3.csv load files.
 * Promises have three states: pending, fulfilled, and rejected
 * What you want is to have all primises being fulfilled before you move forward
 * with working with the data you loaded.
 * 
 * Promise.all() is a static method that waits for all promises to be fullfilled.
 * 
 * For more information on JavaScript promises, see:
 *      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */

Promise.all(promise).then(function(results){
    // So you need to specify [0], so the functions works with the dataset not an array
    drawScatterPlot(results[0]);
})

function drawScatterPlot(data) {

    /**
        2. FILTER THE DATA 
    */

    let filtered_data = data.filter(function(d) {
        return d.year === '2007';
    });

    /**
        3. DETERMINE MIN AND MAX VALUES OF VARIABLES
    */

    const gdpPercap = {
        min: d3.min(filtered_data, function(d) { return +d.gdpPercap; }),
        max: d3.max(filtered_data, function(d) { return +d.gdpPercap; })
    };

    const lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };

    const pop = {
        min: d3.min(filtered_data, function(d) { return +d.pop; }),
        max: d3.max(filtered_data, function(d) { return +d.pop; })
    };

    /**
        4. CREATE SCALES

        We'll use the computed min and max values to create scales for
        our scatter plot.
    */

    const margin = {top: 50, left: 100, right: 50, bottom: 100};

    const xScale = d3.scaleLinear()
        .domain([gdpPercap.min, gdpPercap.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, lifeExp.max])
        .range([height-margin.bottom, margin.top]);

    const rScale = d3.scaleSqrt()
        .domain([pop.min, pop.max])
        .range([1, 15]);

    const fillScale = d3.scaleOrdinal()
        .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
        .range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e']);


    /**
        5. DRAW AXES
        
        The following chunks of code draw 2 axes -- an x- an y-axis.
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
        6. DRAW POINTS

        In this scatter plot, each circle will represent a single country;
        the horizontal position of the circle will represent GDP per capita,
        vertical position will represent life expectancy, color will represent
        continent, and radius will represent population

        The following chunk of code is the standard D3 data join pattern.
    */

    const points = svg.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.gdpPercap); })
            .attr("cy", function(d) { return yScale(d.lifeExp); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return fillScale(d.continent); });

    /**
        7. DRAW AXIS LABELS

        The chunks of code below draw text labels for the axes.
    */

    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("GDP per Capita");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Life Expectancy (Years)");

    const otherText = svg.append("text")
        .attr("class", "chartText")
        .attr("x", width/2)
        .attr("y", margin.top)
        .text("Year 2007");

    /**
        BRUSH Interactivity Implementation

        D3.js brush() function 
        See:
                https://github.com/d3/d3-brush
                https://www.geeksforgeeks.org/d3-js-brush-function/

        The following implementation is using the .map function over
        the initial dataset to create a new dataset that has one additional
        variable/column called "selected" which is a Boolean value (true/false).
        This new variable determines if a circle is selected or not based on 
        our brushes selected region / window on the scatterplot.
        
        For a different implementation of brushes, one that uses the .classed() function
        along with a separate CSS class, see:
                 https://d3-graph-gallery.com/graph/interactivity_brush.html
    */

    const brush = d3.brush() // // Add the brush feature using the d3.brush function
        // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .extent([[margin.left,margin.top], [width-margin.right,height-margin.bottom]])
        // Can be shortened to .on('start brush end', brushed)
        // Each time the brush selection changes, triggers the 'brushed' function
        .on("start", brushed)
        .on("brush", brushed)
        .on("end", brushed);
    
    // Like all event listeners, this one receive the "event" as the first parameter. 
    // As a custom event, however, it has some non-standard properties with the underlying 
    // input event stored in `event.sourceEvent. See https://github.com/d3/d3-brush#brush-events for more.
    // 
    // The following function uses the d3 selection.classed() function to set a specific
    // class to the selected circles in the scatterplot.
    // See:
    //      https://www.geeksforgeeks.org/d3-js-selection-classed-function/
    function brushed(event) {
        const coords = event.selection;
        if (coords) {
            const brushedData = filtered_data.map(
                d => {
                    return {
                        // The three dots (...) are called a spread syntax operator
                        // It's very common when working with arrays: https://codeburst.io/what-are-three-dots-in-javascript-6f09476b03e1
                        ...d,//保留你data set里面已经有的东西
                        selected: isBrushed(coords, xScale(d.gdpPercap), yScale(d.lifeExp))
                    };
                });
            
            // D3 Data Join:
            //      Update circle's fill style based on whether a circle is "selected" or not
            svg.selectAll("circle")
                .data(brushedData)
                .join(
                    function(enter){
                        // nothing to add
                    },
                    function(update){
                        return update
                            .style("fill", d => d.selected ? fillScale(d.continent) : "lightgray")
                            .style("stroke", d => d.selected ? "black" : "none")
                            .style("stroke-width", d => d.selected ? "0.8px" : "none");
                    },
                    function(exit){
                        // nothing to remove
                    }
                );
        }
    }

    /**
     * Function that returns TRUE or FALSE depending on whether a circle in the graph
     * is in the selected region or not.
     * @param {*} brush_coords The coordinates of the user's selection
     * @param {*} xs The x coordinate on the graph's x-axis
     * @param {*} ys The y coordinate on the graph's y-axis
     * @returns True or False
     */
    function isBrushed(brush_coords, xs, ys) {
        // [[x0, y0], [x1, y1]] for 2D brushes; [x0, x1] or [y0, y1] for 1D brushes
        const [[x0, y0], [x1, y1]] = brush_coords;
        // This return TRUE or FALSE depending on if the points is in the selected area
        return x0 <= xs && xs < x1 && y0 <= ys && ys < y1;
    }

    // Add the brush to the graph's svg container
    // Important: You must append "g" first and then call the brush function
    svg.append("g")
        .attr("class", "d3-brush")
        .call(brush);
}
