import React from 'react'

class ExerciseSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: this.props.defaultNumber
        }
    }
        componentWillMount() {
            this.exerciseCount = new Number(this.props.defaultNumber).valueOf();
            this.exerciseId = this.props.exerciseName;
        }
        getExercise (exerciseRef) {
            this.exercise = exerciseRef;
            this.handleOptionsChange();
        }
        subtractTen(e) {
            this.exerciseCount -= 10;
            this.setState({ count: this.exerciseCount });
            this.handleOptionsChange();
        }
        addTen(e) {
            this.exerciseCount += 10;
            this.setState({ count: this.exerciseCount });
            this.handleOptionsChange();
        }
        handleOptionsChange() {
            this.props.updateExercise( this.exerciseId, this.exercise.checked, this.exerciseCount  )
        }
        render() {
            return ( 
                <div className="exercise-selector">
                    <div className="form-group">
                        <input type="checkbox" onClick={ this.handleOptionsChange.bind( this ) } ref={ (exerciseRef) => this.getExercise( exerciseRef ) } defaultChecked />
                            <label style={{ paddingLeft:15, paddingRight: 15 }}> {this.props.exerciseName }</label> <br />
                            <label style={{ paddingLeft:28, paddingRight: 15 }}> Daily Goal</label> 
                            <label style={{paddingLeft:5, paddingRight:5}}>{ this.state.count }</label> 
                            <button className="btn" style={{marginRight:5}} onClick={ this.addTen.bind( this ) }>+10</button>
                            <button className="btn" onClick={ this.subtractTen.bind( this ) }>-10</button>
                            <span className="optional-field">default { this.props.defaultNumber }</span>
                    </div>
                </div>
            )
        }
    }

export default ExerciseSelector
