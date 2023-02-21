// PART 1: LOADING DATA WITH D3 FROM EXTERNAL FILES

// 2. Load a CSV file and print its content

// The following line loads a CSV file and prints its content using
// the same callback function as before. 

d3.csv("dataset0221/five years data.csv").then(businessname);

// NOTE 1: In CSV files, the first row of the file is expected 
//         to be the key/names for each data point.
// NOTE 2: When a CSV file is loaded, all values paired with keys 
//         are converted into strings.


// 3. Load a JSON file and print its content

// JSON file: JavaScript Object Notation.
// The structure of this filetype is analogous to JavaScript objects,
// defined with pairs of keys/names and values but it can also contain more
// complex things like functions, arrays, and even other JavaScript objects.

// d3.json("datasets/countrycode-sm.json").then(parseLOG);


// 4. Loading Data from a Public API

// Examples of Public APIs:
// https://datausa.io/about/api/
// https://github.com/public-apis/public-apis/blob/master/README.md
// https://www.kaggle.com/datasets

// let urlJSON = "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest";

// d3.json(urlJSON).then(parseLOG);


// Loading Data from a REALTIME Public API with a fixed time period for fetching/displaying data

// let urlRealTime = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";

// function loadData() {

//     d3.json(urlRealTime).then(parseLOG);

// }

// setInterval(loadData, 1000);



// PART 2: MANIPULATING (TRANSFORMING) DATA

// We can PREPROCESS the data directly with d3 so that before
// the data are loaded, we can do the following kinds of things:
//     - Rename columns to more user-friendly names
//     - Select only a slice of columns to include
//     - Coerce values to different types (e.g., string to number)
//     - Calculate new values and columns
//
// The following demonstration uses a dataset given in a CSV file.

// We can manipulate (transform) a dataset by accessing the original 
// rows of the CSV file within the .then() callback method.  

// NOTE: Notice that throughout the function(data) {...} the input argument "data"
//       references your csv file, so that you can perform multiple alternations
//       using the same reference to the dataset (i.e., that is why "data" is defined
//       only once as an input argument). Changes are cumulative, that is, every
//       change you make at one point acts on the data it receives from a change
//       in a previous point.  

d3.csv("dataset0221/five years data.csv").then(function(data){
    
    // This accesses the first row of the csv dataset

    console.log(data[0]);

    // Change values using the .forEach() method that loops
    // through the rows of the dataset. In this way, you 
    // can alter values of individual keys selectively.

    //  Here, we are casting strings into numbers (i.e., the strings
    //  that represent numbers but are loaded as strings).
    //  We can do that in several ways. For example, two methods are:
    //      a. Use the built-in parseFloat() javascript function
    //      b. Use the unary operator +
    //  The following function uses method (b).

    //data.forEach( function(d) {

    //     // Here, we alter the keys "population" and "land area" only.
    //     // Thus, we leave "city" and "state" as they are.
     //   d.population = +d.population;
       // d["land area"] = +d["land area"];

    //});

    // Filtering Data 
    
    // In the following, we use the JS .filter() method to return a row 
    // filled with elements that pass a particular test provided by a 
    // custom function.

  //  let filtered_data = data.filter(function(d) {

    //     // Return the object iff its key is equal to a specified string
    //    return d.state === "NY";

   // })

  //  console.log(filtered_data);

    // Finding MINIMUM or MAXIMUM value of a numerical variable

    // Here, the methods d3.min() and d3.max() require 2 arguments:
    // the array/object to be analyzed and an "accessor" function that
    // returns the object key value to be used for the analysis.

  //  function getValue(d) {
        // Retrieves only the value in the column "population"
  //      return +d.population;
  //  }

  //  const min_pop = d3.min(data, getValue);
  //  const max_pop = d3.max(data, getValue);

  //  console.log(min_pop, max_pop);

    // GROUPING DATA

    // In the following, we use the JS .group method for arrays.
    // The method groups values by a particular key. It returns a map from 
    // key to the corresponding array of values from the input.

    // Here, we group the data by "city".

   // let grouped_data = d3.group(data, function(d) {

   //    return d.city;

  //  });

    // // Returns a Map
   // console.log(grouped_data);

    // // Then, you can query the map for a particular group.
//     console.log(grouped_data.get("boston"));

});
