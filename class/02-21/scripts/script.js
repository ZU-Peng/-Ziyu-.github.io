d3.csv("./data/gapminder.csv").then(fuction(data)){


// const width = window.innerWidth;
// const height = window.innerHeight;

const width = document.querySelector("#chart").clientWidth;
const height = document.querySelector("#chart").clientHeight;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

let filtered_data = data.filter(fuction(d){
    return d.country === 'United States';

d3.min(filtered_data, fuction(d){return +d.lifeExp; })
d3.max(filtered_data, fuction(d){return +d.lifeExp; })

const lifeExp = { 
    min: d3.min(filtered_data, fuction(d){return +d.lifeExp; }),
    max: d3.max(filtered_data, fuction(d){return +d.lifeExp; })
}

console.log(lifeExp.min,lifeExp.max)

});
    
};
