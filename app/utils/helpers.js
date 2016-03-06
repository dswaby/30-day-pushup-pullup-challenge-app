import Rebase from 're-base'

const base = Rebase.createClass('https://30day.firebaseio.com/')

function initializeUserData( username ) {
    var d = new Date();
    let startDate = d.getMonth()+"-"+d.getDate()+"-"+d.getFullYear();
    let challengeDates = {};

    // create obj keys as dates for each day of challenge
    for (let i = 0; i < 30; i++) {
        challengeDates[d.getMonth()+"-"+d.getDate()+"-"+d.getFullYear()] = 0;
        d.setTime(d.getTime() + 86400000);
    }

    base.post(username, {
		data: {
	    	"startDate": startDate,
	    	"push-ups": challengeDates,
	    	"pull-ups": challengeDates
	  	},
	  	then: function() {
	  		var date = new Date();
	  		return { docLookup: date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear() }
	  	}
	})
}

export default function verifyUser( username ) {
    base.fetch(username, {
        context: {},
        asArray: false,
        then(data) {
            var date = new Date();
            if (!data) {
                return initializeUserData( username )
            }
            return { docLookup: date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() }
        }
    })
}

