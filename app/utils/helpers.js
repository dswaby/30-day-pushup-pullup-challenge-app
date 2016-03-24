// numeric start of today
function today () {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today.getTime();
}

// get index of array for current date
export function todaysIndex ( startDate ) {
    var todaysDate = today();
    return (todaysDate - startDate)/86400000;
}

export default function userEntries( exercises ) {
    var d = new Date();
    let startDate = d.getTime();
    let zeroArray = [];
    let initialData = {
        exercises:[],
        "challengeStart": today(),
        "challengeEnd": today() + 2592000000
    };
    var exerciseObj = {};

    // create obj keys as dates for each day of challenge
    for (let i = 0; i < 30; i++) {
        // challengeDates[d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear()] = 0;
        // d.setTime(d.getTime() + 86400000);
        // fill array with zeros
        zeroArray.push(0);
    }
    for ( var key in exercises) {
        if (exercises.hasOwnProperty(key) && exercises[key].enabled) {
            initialData.exercises.push([key, exercises[key].count, zeroArray])
            initialData[key] = zeroArray;
        } 
    }
    return initialData;
}




