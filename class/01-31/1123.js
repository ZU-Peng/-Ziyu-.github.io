function returnsSq(val) {
    if (isNaN(val)) {
        console.log("Not a number.")
    } else {
        return Math.sqrt(val);
    }
    // a function without a return will
    // print "undefined" in the console
}

function decreasing(val) {
    if (isNaN(val)) {
        console.log("Not a number.");
    } else {
        // There are a few different ways to implement this.
        // The following is a simple implementation with a for loop

        for (let i=val; i >= 0; i--) {
            console.log(i);
        }
    }
    // a function without a return will
    // print "undefined" in the console
}

function sumAB(A,B){
    return A+B;
}

function randomPosition(){

    return Math.random() * 148 + 70;
}