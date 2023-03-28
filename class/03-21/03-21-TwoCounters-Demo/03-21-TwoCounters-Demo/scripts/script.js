/**
 * Clicking a row should add a circle to it, and remove a circle from the other row. 
 * Double clicking either row should reset the visualization to the original state.
 * 
 * The purpose of this demonstration is to illustrate how D3's data join method
 * works when using a function that generates a stream of data as opposed to 
 * using a reference to a dataset.
 */

const width = document.querySelector("#two-counters").clientWidth;

const LIMIT = 10;

const counters = [
    {id: 0, val: 1}, 
    {id: 1, val: 9}
];

const svg = d3.select("#two-counters")
    .append("svg")
    .attr("width", width)
    .attr("height", counters.length * 75);

function dataJoin(data) {

    // Visualization specification.
    // Notice in the following that opacity and label are now data-driven

    const g = svg.selectAll("g")
        .data(data)
        .join("g")
            .attr("transform", (d, i) => `translate(${width/2 - 240}, ${(i + 1) * 50})`)
            // Multiply opacity by 0.1, so that after 10 'clicks' you reach 1.0 opacity (i.e., 100%)
            .style("opacity", d => d.val * 0.1); 
    
    const circle = g.selectAll("circle")
        /**
         * The data join (selection.data) can not only take an array (as we've done in our 
         * D3 examples so far) but also a function(d, i) {} where d is a datum coming from the 
         * parent element and i is the datum's index in the original array. 
         * See Nesting & Data for more:
         *      https://bost.ocks.org/mike/nest/#data
         * 
         * The method d3.range returns an array of evenly spaced integers.
         * For more information, see:
         *      https://observablehq.com/@d3/d3-range 
         * 
         * The D3 method .schemeTableau10 is used to return ten categorical 
         * colors authored by Tableau as part of Tableau 10.
         * For more information, see:
         *      https://www.geeksforgeeks.org/d3-js-schemetableau10-method/
         */
        .data((d, i) => d3.range(1, d.val + 1)) // You need +1 to go up until 9
        .join("circle")
            .attr("r", 20)
            .attr("cx", (d, i) => d*50)
            .style("fill", (d, i) => d3.schemeTableau10[d]); 

    const label = g.selectAll('text')
        .data((d, i) => d3.range(1, d.val + 1))
        .join('text')
            .style('fill', 'white')
            .style('font', 'bold 1.2em sans-serif')
            .style('text-anchor', 'middle')
            .attr('dy', '0.3em')
            .attr('x', (d, i) => d*50)
            .text((d, i) => d);

    // Event callbacks.
    g.on('click', (event, d) => {
        // TO DO
    });
      
    g.on('dblclick', (event, d) => {
        // TO DO
    });

}

dataJoin(counters);