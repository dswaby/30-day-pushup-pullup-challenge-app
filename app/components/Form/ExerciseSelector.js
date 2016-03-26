import React from 'react'
var css = require("!style!css!less!./../../styles/exercise-selector.less");


class ExerciseSelector extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            count: this.props.defaultNumber
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
        this.exerciseEnabled = false;
        this.elId = this.guid();
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
        this.exerciseCount -= 10;
        this.setState( { count: this.exerciseCount } );
        this.handleOptionsChange();
    }
    addTen( e ) {
        this.exerciseCount += 10;
        this.setState( { count: this.exerciseCount } );
        this.handleOptionsChange();
    }
    handleOptionsChange() {
        this.props.updateExercise( this.exerciseId, this.exerciseEnabled, this.exerciseCount )
    }
    toggleSelected() {
        if ( this.exerciseEnabled ) {
            this.el.classList.remove( "selected" );
            this.exerciseEnabled = false;
        } else if ( !this.exerciseEnabled ) {
            this.el.classList.add( "selected" );
            this.exerciseEnabled = true;
        }
        this.handleOptionsChange();
    }

    render() {
        return ( 
            <div id={this.elId} className="exercise-selector">
                <div className="exercise-selector-button" >
                <label className="selector-label">{this.props.exerciseName }</label>
                    <img onClick={this.toggleSelected.bind(this)} src={this.props.img} />
                    <div className="selector-options">
                        <label style={{paddingLeft:5, paddingRight:5}}><div className="focused-text">{ this.state.count }</div></label> 
                        <div className="form-group">
                            <button className="btn augment-btn pull-left" style={{marginRight:5}} onClick={ this.subtractTen.bind( this ) }>
                                -10
                            </button>
                            <button className="btn augment-btn pull-right" onClick={ this.addTen.bind( this ) }>
                                +10
                            </button>
                            <div class="radio" style={{textAlign: 'left'}}>
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked />
                                Daily
                              </label>
                            </div>
                            <br />
                            <div class="radio" style={{textAlign: 'left'}}>
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                                Every Other Day
                              </label>
                            </div>
                        </div>
                        <span className="optional-field">default { this.props.defaultNumber }</span>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ExerciseSelector
