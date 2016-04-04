import React from 'react'
import Rebase from 're-base'
import { hashHistory } from 'react-router'
import c3 from 'c3'
import { todaysIndex, formatChartData } from './../utils/helpers'

const css = require("!style!css!less!./../styles/progress-summary.less");
const base = Rebase.createClass('https://30day.firebaseio.com/');

class ProgressSummary extends React.Component {
	constructor(props) {
        super(props)
    }

    componentDidMount(){
    	const selfie = this;
    	const authData = base.getAuth();
        if (authData && authData.uid) {
            base.fetch( `challenge/${authData.uid}`, {
            	context: this,
            	asArray: false,
            	then( data ){
                	var chartData = formatChartData( data );
                	selfie.drawChart( chartData );
                }
          });
        }
        else {
			const path = "/" ;
            hashHistory.replace(path);
        }
    }
    drawChart( data ) {
        var chart = c3.generate( {
            data,
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            },
            tooltip: {
                show: true
                // contents: function( d, defaultTitleFormat, defaultValueFormat, color ) {
                //     `<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/Untitled_3.jpg" height=50 width=50 style="position:absolute;top:0;left:0;" />`
                // }
            }
        } );
    }

    shouldComponentUpdate() {
    	return false;
    }
	render() {
		return (
			<div className="row">
			<div className="progress-summary">
					<div id="chart"></div>
			</div>
			</div>
		)
	}
}

export default ProgressSummary