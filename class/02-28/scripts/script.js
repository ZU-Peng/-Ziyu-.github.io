// 1. Grab the dimensions of the open window in the browser.
// Our geographical map will extend throughout the window.

const width = window.innerWidth, height = window.innerHeight;

// Try to use these two variables for `width` and `height` instead and
// notice what happens to the size of the map visualization. Can you tell why?

// const width = document.querySelector("#viz").clientWidth;
// const height = document.querySelector("#viz").clientHeight;

// 2. We initialize variables for the svg container that holds all
// of our visualization elements. And we also initialize a variable
// to store just the element that holds our map; this element is a group
// that in HTML tags is given by "g". See the index.html for more information.

const svg = d3.select("#viz")
            .attr("width", width)
            .attr("height", height);

const map = svg.select("#map");

// 3. Because we are creating a map, we also want to add some kind of "ocean". This is going
// to be just a rectangle that has an ID called #ocean. See the index.html

d3.select("#ocean")
  .attr("width", width)
  .attr("height", height);

// 4. Here start building the geographical map by first loading a TopoJSON file.

d3.json("data/world-alpha3.json").then(function(world) {

    /** 
     * 5.
     * This function converts the loaded TopoJSON object to GeoJSON
     * It creates an array of JavaScript objects where each object stores:
     * (a) Geometry (e.g., polygons) defined by a list of coordinates.
     * (b) ID, which in this case is the ISO code of a country
     * (c) Properties, in this case `name` and `iso`. e.g., name: "Argentina", iso: "ARG"
    */

    // TO DO
    
    // 6.
    // Filtering Out Polygons: We are removing the JavaScript object that stores the features
    // of Antarctica because we will hide Antarctica from the specific map we are making.

    // TO DO

    /**
     * 7. Map Projections
     * 
     * Just like we set up a linear scale for mapping data values to pixel positions
     * in a bar chart or scatter plot (e.g., with linearScale), we need to create a
     * function that maps raw coordinate values given in the geoJSON file into screen
     * pixels. There is no one way of using projections for creating maps. In general,
     * the visible size of a countries boundary shape depends on the projection used
     * to make it visible. See this: https://www.thetruesize.com
     * 
     * In the following we will set up a "flat" map projection otherwise known as
     * spherical Mercator projection (an equirectangular projection).
     * 
     * For more information on projections that d3 implements, see:
     * https://github.com/d3/d3-geo#azimuthal-projections
    */

    // TO DO

    /**
     * 8. Geographical Path Constructor
     * 
     * 
     */

    // TO DO
    
    /**
     * 9. Plotting on the Geographical Map
     * 
     * Plot two circles on the geographical map to denote the location 
     * of particular cities. The location of a city is given by the 
     * coordinates for latitude and longitude. Once you get the
     * coordinates, you use the projection function defined previously,
     * e.g., the Mercator projection, and you pass in those coordinates
     * in the function to project them onto the map as pixel positions.
     */

    // NOTE: The coordinates for a city are given as: [longitude, latitude]
    //       because that is how the projection function wants them.

    // TO DO

    // 10. The following is a D3 join pattern for adding
    // SVG circle shapes. 
    //
    // Here, notice how we transform the circles using
    // the projection function we defined previously. Essentially, the
    // projection is just a function that requires an input argument, 
    // namely the coordinates of a point.

    // TO DO

    /**
     * 11. D3 Zoom and Pan
     * 
     * D3 provides a method called .zoom() that adds zoom and pan behaviour to an
     * HTML or SVG element. 
     * 
     * For more information, see: https://www.d3indepth.com/zoom-and-pan/
     * 
     * Documentation: https://github.com/d3/d3-zoom
     */

    // TO DO

});