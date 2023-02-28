/*

    ARTG5330 Visualization Technologies 1
    February 21, 2023
    Spring Semester
    Week 7

    - What is the "./data/gapminder.csv" inside of the parentheses 
    for d3.csv() referring to?

    It is referring to a dataset given in csv filetype provided by
    Gapminder that is stored locally inside the folder called "data".
    You need to provide the exact local path to that csv file to
    fetch it with the d3.csv() method.

    - The parameter named `data` inside of the function expression .then()

    The parameter named `data` binds to the csv file
    you fetch with the d3.csv method. Thus, it refers
    to the gapminder.csv file.

    - What kind of JavaScript data structure is `data`?

    An array of objects.

    - Where does the entire d3.csv().then() pattern
        open and close in this document?

    Use the VSCode interface to locate the opening
    and closing of the d3.csv().then() pattern.

    You may find it useful to examine the contents
    of `data` with console.log(data).

*/

d3.csv("./data/gapminder.csv").then(function(data) {

    /*
    1. DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS

        - What is document.querySelector("#chart") doing?

        The document.querySelector() method is returning the
        FIRST element within your html document that matches the
        specified CSS selector string, i.e., the ID "#chart". 
        See here for more info on CSS selectors: 
        https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors

        - `clientWidth` and `clientHeight` are properties of
            elements in the DOM (Document Object Model).
            What do these properties measure?

        These properties measure the inner width and inner height
        of an HTML element in pixels. In this example, they are 
        measuring the width and height of the div element in the html page
        that encapsulates the chart. Note that these values are calculated
        according to how the chart is displayed in the browser. Thus, the 
        values will change if you resize your browser's window. You can
        test this behavior using console.log() prints.

        Note: document.clientWidth is different from window.innerWidth
        The d
    */

    const width = document.querySelector("#chart").clientHeight;
    const height = document.querySelector("#chart").clientWidth;

    // Initializing the viewport of the SVG canvas
    // An SVG Canvas's Viewport has a "width" and "height"
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", height)
        .attr("height", width);


    /* 
    2. FILTER THE DATA 
    
    This data set is large and includes data from multiple years.

    Let's filter the data to only select data for the United States,
    and then subsequently use those data to draw the bar chart.

    To filter the data, we can use the .filter() method for arrays.

    `.filter()` is a JavaScript array method.
    - What does this method do/how does this method work?
        (What do we get back from using this method?)
    - Inside the parentheses for .filter(), there is
        a function expression with a parameter
        named `d`. What is `d` a reference to?

    The .filter() method returns a new array of objects
    that is a SUBSET of the array of objects stored in `data`. 
    The purpose of the method is to filter out rows of the original
    dataset that do not satisfy a specific "test". This test is
    given here inside the custom function, and it is in the form of an exact 
    equality (===) between two strings (see below). 

    The parameter named `d` is a reference to the rows
    of the input CSV file.
    
    - Does that parameter *have to be* named `d`?
        Can it be named something else?

    No. You can use a different symbol.
    
    - What is the purpose of the statement inside
        the function expression? What is this doing?

        return d.country === 'United States';

    As you access each row of the csv file using the
    `d` paramater, you retrieve the value d.country for
    each row and test if it is (strictly) equal to the
    provided string, `United States`. The row passes the
    test if it is, otherwise it is ignored.

    - Why are we storing the result of data.filter(...)
        inside a variable (filtered_data)?

    We are storing the result in a new variable called
    filtered_data because we want to keep the filtered data
    separate from the original data we have stored in `data`.
    Also, we want to reuse the filtered_data in multiple
    locations in the code (see below).

    */

    let filtered_data = data.filter(function(d) {

        return d.country === 'Thailand';

    });


    /*
    3. DETERMINE MIN AND MAX VALUES OF VARIABLES

    In the following section, we'll use the methods d3.min() and d3.max()
    to calculate minimum and maximum values of the variables in our data set.

    Note that to keep things clean, we're organizing the minimum and maximum
    values inside of objects, and storing those min/max values in properties
    named inside those objects. This helps make it easier to refer to these
    values later in our code.

        - What does d3.min() do? What does d3.max() do?
            What are the 2 arguments we supply to d3.min()/d3.max()?

        The functions d3.min() and d3.max() return the minimum and
        maximum numerical values stored in an array. Here, the first
        argument is the filtered dataset we created just above and the
        second argument is an ACCESSOR function. The purpose of this
        function is to specify which exact column in the dataset
        contains the numerical values we are interested in. So, `d`
        refers to the rows of the filtered dataset, and the function
        accesses each row and returns specifically the value for the
        variable `lifeExp`. Thus, min and max here are the minimum
        and maximum numerical values in the column for `lifeExp`.
        Note, we also coerce the strings into numbers to make this work.
        Remember that d3.csv() loads the data in the form of strings.
        To work with numbers represented as strings, you must explicitly
        cast them back into numbers.

        - In the second argument for both d3.min() and d3.max(),
            the function expression has a parameter named `d`.
            What is `d` a reference to?

        See above answer.

        - Why is there a plus sign (+) in front of d.lifeExp?

        See above answer.

    */

    const pop = {
        
        min: d3.min(filtered_data, function(d) { return +d.pop; }),
        max: d3.max(filtered_data, function(d) { return +d.pop; })

    };

    /*
    4. CREATE SCALES

    We'll use the computed min and max values to create scales for
    our scatter plot.

        - What does d3.scaleLinear() do?

        The .scaleLinear() function in D3 is a JavaScript function that
        accepts an input and returns an output such that the input and output
        are linearly correlated: it establishes a LINEAR MAP between values
        given in one domain, to values given in another domain. For purposes
        of visualization, this function is very common because it helps transform
        data values to visual variables such as position, length, or color. In order
        to use this function properly, you must specify a domain and a range.

        Please refer to these nice explanations/tutorials: 
            https://medium.com/@mbostock/introducing-d3-scale-61980c51545f
            https://jckr.github.io/blog/2011/08/11/d3-scales-and-color/

        - What does d3.scaleBand() do?

        It constructs a band scale. This function is deployed for charts like the one
        we use in this demonstration that consists of ordinal or categorical variables,
        i.e., a fixed set of years. The horizontal axis must be somehow mapped into our 
        screen's range, which is made up of pixels. Thus, we provide a domain in which
        our years are sorted in ascending order and the range is the chart's width in pixels
        that evenly distributes the bars among the years. We also add a `padding` to
        separate the bars by a small gap. You could specify more explicitly the inner padding
        and the outerpadding using the methods .paddingInner() and .paddingOuter().

        - What is the purpose of the .padding() in d3.scaleBand()?

        See above answer. 

        - For each scale below, what does the domain
            represent, and what does the range represent?

        For xScale, the domain represents the input to the bar chart's horizontal
        axis which is a set of specific years. The range is a continuous range
        defined using the variables margin and width we defined above for controlling
        the size and positioning of the chart in the browser.
        For yScale, the domain and range are continuous sets of values.

        - For each scale below, how many values are in
            the domain and range?

        For xScale, the domain contains 12 values and the range is uncountable.
        For yScale, both the domain and range are uncountable.
    */

    const margin = {
        top: 5, 
        left: 100, 
        right: -800, 
        bottom: 1000
    };

    const xScale = d3.scaleLinear()
    .domain([50, pop.max])
    .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
        .domain(["1952","1957","1962","1967","1972","1977","1982","1987","1992","1997","2002","2007"])
        .range([height - margin.bottom, margin.top])
        .padding(0.5);
    /*
    5. DRAW AXES
    
    The following chunks of code draw 2 axes -- an x- an y-axis.

        - The "g" element:

        The "g" element creates a new DOM element that is appended
        to an svg container. This element will contain the axes for
        our visualization.

        - The "transform" attribute:

        To understand the behavior and necessasity of this attribute,
        try to remove it from both the xAxis and the yAxis and see
        what happens to the bar chart visualization. In this way, you
        will understand very quickly why we have to transform the axes
        and by how much we transform them.

        For the xAxis the transformation "pushes" downwards the position of the 
        horizontal axis. The amount of this downward movement is taken by
        calculating the difference between `height` and `margin.bottom`.
        Similarly, for the yAxis the transformation "pushes" the position
        of the vertical axis to the right by a distance equal to margin.left. 
        The role of the transformations here is to position the axis elements
        in the right way within the coordinate space of the bar chart.

        - The d3.axisBottom() and d3.axisLeft() methods:

        The .axisBottom() is a built-in D3 function that draws a bottom
        horizontal axis and the .axisLeft() is a built-in D3 function that
        draws a left vertical axis. D3 axes are made of lines, ticks, and
        labels.

    */


    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));


    /*

    6. DRAW BARS

    In this bar chart, each bar will represent a single year for the United States;
    the horizontal position of the bar will represent the year of data,
    vand the height of the bar will represent the life expectancy for that year.

    The following chunk of code is the standard D3 data join pattern.
        - What is the purpose of the pattern svg.selectAll().data().enter().append()?

        This is one of the patterns for joining data with D3. 
        The purpose of this pattern is to JOIN data with DOM elements, 
        such as SVG basic shapes (e.g., rect). The pattern starts with
        .selectALl() that selects all the currently existing shapes and
        binds them with the provided dataset using .data(). Then,
        you use .enter() to check what ADDITIONAL shapes you must
        create/append to complete the binding. For example, if you
        have NO SHAPES of the type "rect" in the beginning, then
        .enter().append("rect") will append as many rectangles as
        needed to bind all the data points in your dataset. If you have
        1 "rect" and 3 data points, then it will append 2 missing
        "rect" shapes to complete the binding. Essentially, .enter()
        tells you which data points are missing a corresponding DOM
        element and .append() adds just those.
        
        Alternatively, another pattern for joining data with DOM elements in
        D3 uses the .join() method. So the first four lines below
        would become:

        const points = svg.selectAll("rect")
                .data(filtered_data)
                .join("rect")
                
        and then everything else is the same in terms of adding attributes
        to rectangles using the .attr method.

        - Each attribute defined below is defined using things called
            "accessor functions." In each accessor function, what is
            the parameter named `d` a reference to?

        A row in your CSV dataset.

        - Inside each accessor function, what is the purpose of
            each "return ___;" statement?
        
        To return a value that can be associated with the given variable. 
        You need an accessor function in order to go through all the available
        data points and `d` is what a data point stands for each time.

        - What does xScale.bandwidth() compute? How is that value being used here?

        The .bandwidth() method returns the width of each band in your xScale
        and it is used to provide a width to your rectangles. Here, the width
        is a constant value.

        - What is going on with the calculation for the "height" attribute?
            Explain how the expression inside the accessor function for this
            attribute works.
        
        It is a linear expression that determines the height of a rectangle. The
        function yScale() returns the point on the Y axis for each data point. Remember
        that the coordinate system's origin is the top left point of the screen. So,
        a positive y coordinate is taken from top to bottom. You also have a margin
        that provides gaps around your chart (e.g., you put the axes' titles in those
        gaps). If you simply take height - margin.bottom, then the height of each
        rectangle will not take account of margin.bottom. So, you need to subtract
        that value as well so that your rectangle starts from the point you take
        from yScale(d.lifeExp) and extends until it hits the x-axis. 
        
        Tip: Use console.log() to compute and print each of the components of this 
        expression separately, to understand how it works. In particular, try to 
        change the calculation done below for the "height" attribute and see what
        happens to the bar chart as you add or remove the terms of the expression.

    */

    const points = svg.selectAll("rect")
        .data(filtered_data)
        .enter()
        .append("rect")
            .attr("y", function(d) { return yScale(d.year); })
            .attr("x", function(d) { return xScale(d.pop); })
            .attr("width", function(d) { return height - (20,margin.bottom) })
            .attr("height", yScale.bandwidth(),margin.left)
            .attr("fill", "orange");
    
    /*
    7. DRAW AXIS LABELS

    The chunks of code below draw text labels for the axes.

    Examine the yAxisLabel. What is going on with the 
    "transform", "x", and "y" attributes, in terms of
    how their values are computed to control the rotated
    placement of the label?

    For `yAxisLabel`, the tricky point is understanding how
    the coordinate system works. Here, the negative `x` value controls
    how the axis label moves from TOP TO BOTTOM. The positive `y` value
    controls how it moves from LEFT TO RIGHT.

    The `transform` attribute controls the rotation of the axis label
    by taking as the origin the top left point of the screen. Note,
    a rotation by -90 is a clockwise rotation.

    As before, to understand how all of this works use the console.log()
    print method to test each of the calculations separately, especially
    to understand how the x,y positions and the transformations work here.

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

});
