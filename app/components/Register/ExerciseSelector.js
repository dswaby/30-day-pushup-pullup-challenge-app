import React from 'react'
var css = require("!style!css!less!./../../styles/exercise-selector.less");

class ExerciseSelector extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            count: this.props.defaultNumber,
            frequency: this.props.frequency,
            startDayOf: true
        }
    }
    guid() {
        function s4() {
            return Math.floor( ( 1 + Math.random() ) * 0x10000 )
                .toString( 16 )
                .substring( 1 );
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    componentWillMount() {
        this.exerciseCount = new Number( this.props.defaultNumber ).valueOf();
        this.exerciseId = this.props.exerciseName.replace( " ", "" ).toLowerCase();
        this.elId = this.exerciseId + this.guid();
        this.enabled = false;
        this.setState({ checked: this.props.enabled })
    }
    componentDidMount() {
        this.el = document.getElementById( this.elId );
        this.exerciseBlock = this.el.querySelector( ".exercise-block");
        this.closeToggle = this.el.querySelector(".icon-cancel-circle");
        this.frequencyOptionEl = this.el.querySelector(".over-other-day-toggle");
    }
    getExercise( exerciseRef ) {
        if ( exerciseRef ) {
            this.exercise = exerciseRef.checked;
        }
        // this.handleAddExercise();
    }
    getFrequency( frequencyRef ) {
        if ( frequencyRef && frequencyRef.checked ) {
            this.frequency = frequencyRef.value;
        }
        // this.handleAddExercise();
    }
    toggleFrequency ( freq ) {
        if ( freq && freq !== this.state.frequency ) {
            ( freq === "daily") 
                ? this.frequencyOptionEl.classList.remove("visible")
                : this.frequencyOptionEl.classList.add("visible");
            this.setState({
                frequency: freq
            });
        }
        
    }
    subtractTen( e ) {
        e.preventDefault();
        this.exerciseCount -= 10;
        this.setState( { count: this.exerciseCount } );
        // this.handleAddExercise();
    }
    addTen( e ) {
        e.preventDefault();
        this.exerciseCount += 10;
        this.setState( { count: this.exerciseCount } );
        // this.handleAddExercise();
    }

    toggleEnabled( e ) {

        // this.setState({ checked: e.target.checked })
        if ( this && this.enabled ) {
            this.exerciseBlock.classList.remove("enabled");
            // this.setState({ checked: true })
            this.enabled = false;
            // this.handleAddExercise();
        } 
        else if (this && !this.enabled)
        {
            this.exerciseBlock.classList.add("enabled");
            this.enabled = true;
            // this.handleAddExercise();
        }
    }
    toggleStartDate( freq ){
        if ( this.state.startDayOf ) {
            this.setState({ startDayOf: false })
        } else {
            this.setState({ startDayOf: true })
        }
    }
    removeExerciseBox(){
        this.exerciseBlock.classList.add("hidden");
    }
    //TODO - possibly: restoreExerciseBox()
    handleAddExercise() {
        this.exerciseBlock.classList.add("completed");

        var exercise = {
            id: this.exerciseId,
            enabled: this.enabled,
            count: this.exerciseCount,
            frequency: this.state.frequency,
            startDayOf: this.state.startDayOf
        };
        this.props.updateExercise( exercise );
        window.setTimeout(this.removeExerciseBox.bind(this), 450);
    }

    render() {
        return ( 
            <div id={ this.elId } className="row" >
              <div className="exercise-item-block">
                <div className="exercise-block">
                <div className="selector-top">
                    <div className="header">
                        {this.props.exerciseName}
                        <span className="closeicon-btn white-text" onClick={this.toggleEnabled.bind( this )}></span>
                    </div>
                     <img className="exercise-img" src={this.props.img} onClick={this.toggleEnabled.bind(this) }/>
                  </div>
                  <hr className="exercise-image-divider" />
                  <div className="exercise-options">
                    
                    <div className="counter-buttons">
                      <button className="btn augment-btn pull-left" onClick={this.subtractTen.bind(this)}>
                          -10
                       </button>
                      <button className="btn augment-btn pull-right" onClick={this.addTen.bind(this)}>
                         +10
                      </button>
                    </div>
                    <h3>{ this.state.count + " " } 
                        { this.props.exerciseName.toLowerCase()}
                        <br />
                        {this.enabled && this.state.frequency === "daily" && <span> daily</span>}
                        {this.enabled && this.state.frequency === "everyOtherDay" && <span> every other day</span>}
                        <span> for 30 days </span>
                    </h3>
                  </div>
                  <div className="frequency-toggle" >
                        <div className="frequency-cell selected" onClick={ this.toggleFrequency( "daily" ) }>
                            Daily
                        </div>
                        <div className="frequency-cell">
                            Every Other Day
                        </div>
                        <div className="over-other-day-toggle">
                            <label htmlFor="checkboxG1">Starting Today</label>
                            <input
                                onChange={  this.toggleStartDate.bind( this )}
                                name="checkboxG1" 
                                className="css-checkbox" 
                                type="checkbox"
                                checked={ this.state.startDayOf }
                            />
                        </div>
                    </div>
                    <div className="submit" onClick={ this.handleAddExercise.bind( this ) }>
                        Add {this.props.exerciseName.toLowerCase()}
                    </div>
                </div>
              </div>
            </div>
        )
    }
}

export default ExerciseSelector
