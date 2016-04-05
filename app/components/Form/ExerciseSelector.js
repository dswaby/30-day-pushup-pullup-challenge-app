import React from 'react'
var css = require("!style!css!less!./../../styles/exercise-selector.less");

class ExerciseSelector extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            count: this.props.defaultNumber,
            checked: this.props.checked || false
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
        this.elId = this.guid();
        this.setState({ checked: this.props.enabled })
    }
    componentDidMount() {
        this.el = document.getElementById( this.elId );
    }
    getExercise( exerciseRef ) {
        if ( exerciseRef ) {
            this.exercise = exerciseRef.checked;
        }
        this.handleOptionsChange();
    }
    subtractTen( e ) {
        e.preventDefault();
        this.exerciseCount -= 10;
        this.setState( { count: this.exerciseCount } );
        this.handleOptionsChange();
    }
    addTen( e ) {
        e.preventDefault();
        this.exerciseCount += 10;
        this.setState( { count: this.exerciseCount } );
        this.handleOptionsChange();
    }
    handleOptionsChange() {
        this.props.updateExercise( this.exerciseId, this.state.checked, this.exerciseCount )
    }
    toggleSelected( e ) {

        // this.setState({ checked: e.target.checked })
        if ( this.state.checked ) {
            this.el.classList.remove( "selected" );
            this.setState({ checked: false })
        } else {
            this.el.classList.add( "selected" );
            this.setState({ checked: true })
        }
        this.handleOptionsChange();
    }

    render() {
        return ( 
            <div id={ this.elId } className="exercise-selector">
                <div className="selector-options">
                    <div className="click-block">
                        <div className="exercise-name"> <h2>{this.props.exerciseName}</h2> </div>
                        <div className="event-trapper" onClick={ this.toggleSelected.bind( this ) } >
                            <p>enabled</p>
                            <input 
                                name="checkboxG1" 
                                className="css-checkbox" 
                                type="checkbox" 
                                ref={ (exerciseRef) => this.getExercise( exerciseRef ) }  
                                checked={ this.state.checked } 
                            />
                            <label htmlFor="checkboxG1"></label>
                        </div>
                    </div>
                    <div className="img-wrap">
                        <img className="exercise-example" src={this.props.img} />
                    </div>
                    <div style={{clear:"both"}}></div>

                    <form className="radio-block">
                        <div className="radio" style={{textAlign: 'left'}}>
                          <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked />
                            <span className="frequency-text">every day</span>
                          </label>
                        </div>
                        <br />
                        <div className="radio" style={{textAlign: 'left'}}>
                          <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                            <span className="frequency-text">every other day</span>
                          </label>
                        </div>
                    </form>

                    <div className="counter-select-text">
                    { this.state.count }
                    <button className="btn augment-btn pull-left" style={{marginRight:5}} onClick={ this.subtractTen.bind( this ) }>
                            -10
                        </button>
                        <button className="btn augment-btn pull-right" onClick={ this.addTen.bind( this ) }>
                            +10
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExerciseSelector
