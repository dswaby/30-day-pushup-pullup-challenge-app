import React from 'react'

const Info = () => {
    return (
        <div className="main-container">
            <div className="info-section">
                <div className="container">
                    <div className="col-sm-12" style={{marginTop: 30, paddingBottom: 100}}>
                        <h1 className="text-center" style={{padding:50}}>What is the 30 day challenge?</h1>
                        <p className="text-center"> The 30 day challenge is pushing yourself to do a certain ammount of a specific exercise/exercises for 30 days.</p>
                        <p>Note: I built this webapp after clicking on a youtube video that motivated me to try the challenge but before I really understandood the difficulty of a pull-up. If you find pull-ups extremely hard, your not alone, and don't call it quits just yet, I found <a href="https://www.youtube.com/watch?v=cVJUCKx9oE8" target="_blank">this</a> video that shows you exercises to help strengthen your back muscles and will lead you to.</p>
                        <div className="col-sm-6" style={{ paddingTop: 100}}>
                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/XeaCEJujA-M" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div className="col-sm-6 " style={{ paddingTop: 100}}>
                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/4jngYvurlDo" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info
