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

export function formatChartData( data ) {
    var pullups, pushups = [];
    var opts = data.options || null;
    var chartDates = [];
    var max = 0;
    var d = new Date();
    var index = todaysIndex ( opts.challengeStart ); 

    d.setTime( opts.challengeStart );


    if (opts && opts.pushups.count && opts.pullups.count ) {
        if (opts.pushups.count >= opts.pullups.count){
            max = opts.pushups.count;
        }else {
            max = opts.pullups.count;
        }
    }

    if (index > 30) {
        index = 30;
    }
   if ( data && data.options && data.options.pushups && data.options.pushups.enabled ) {
        pushups = data.pushups.slice(0, (index +1));
    }
    if ( data && data.options && data.options.pullups && data.options.pullups.enabled ){
        pullups = data.pullups.slice(0, (index +1));
    }
    // get dates for displaying on x axis
    for (let i = 0; i < (index + 1); i++) {
        chartDates.push(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate());
        d.setTime(d.getTime() + 86400000);
    }
    pushups.unshift("pushups");
    pullups.unshift("pullups");
    chartDates.unshift("x");
    return {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            chartDates,
            pushups,
            pullups
        ]
    }
}

export default function userEntries( opts ) {
    var d = new Date();
    let startDate = d.getTime();
    let zeroArray = [];
    let defaults = {
        "challengeStart": today(),
        "challengeEnd": today() + 2592000000,
        "pushups": {
            "enabled": true,
            "count": 300
        },
        "pullups": {
            "enabled": true,
            "count": 200
        },
        "squats": {
            "enabled": true,
            "count": 200
        }
    };
    let config = Object.assign(defaults, opts);

    for (let i = 0; i < 30; i++) {
        // fill array with zeros
        zeroArray.push(0);
    }

    return {
        "squats": zeroArray,
        "pushups": zeroArray,
        "pullups": zeroArray,
        "options": config
    }
}




