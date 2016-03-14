export default function userData( username ) {
    var d = new Date();
    let startDate = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();
    let challengeDates = {};

    // create obj keys as dates for each day of challenge
    for (let i = 0; i < 30; i++) {
        challengeDates[d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear()] = 0;
        d.setTime(d.getTime() + 86400000);
    }

    return {
        "startDate": startDate,
        "push-ups": challengeDates,
        "pull-ups": challengeDates
    }
}


