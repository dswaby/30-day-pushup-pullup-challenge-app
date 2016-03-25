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

export default function userEntries( opts ) {
    var d = new Date();
    let startDate = d.getTime();
    let zeroArray = [];
    let defaults = {
        "pushups": {
            "enabled": true,
            "count": 300
        },
        "pullups": {
            "enabled": true,
            "count": 200
        }
    };
    let config = Object.assign(defaults, opts);

    // create obj keys as dates for each day of challenge
    for (let i = 0; i < 30; i++) {
        // challengeDates[d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear()] = 0;
        // d.setTime(d.getTime() + 86400000);
        // fill array with zeros
        zeroArray.push(0);
    }

    return {
        "challengeStart": today(),
        "challengeEnd": today() + 2592000000,
        "pushups": zeroArray,
        "pullups": zeroArray,
        "options": config
    }
}




