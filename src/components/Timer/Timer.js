import React from "react";
import "./style.css";
import Tracker from "../projectTracker"

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStarted: false,
            timerStopped: true,
            hours: 0,
            minutes: 0,
            seconds: 0,

            hourlyPay: 20,
            payAmount: 0,

            captures: []
        };
        this.doMath = this.doMath.bind(this)
    }

    handleTimerStart(e) {
        e.preventDefault();
        if (this.state.timerStopped) {
            this.timer= setInterval(()=> {
                    this.setState({
                        timerStarted: true,
                        timerStopped: false
                    })
                    if(this.state.timerStarted) {
                        this.setState((prevState) => { return {seconds: prevState.seconds +1}});

                        if(this.state.seconds >= 60) {
                            this.setState((prevState) =>{ return { minutes: prevState.minutes + 1, seconds: 0}});
                        }
                        if (this.state.minutes >= 60) {
                            this.setState((prevState) =>{return { hours: prevState.hours + 1, minutes: 0, seconds: 0}});
                        }
                        
                    }
                }, 1000);

        }
    }

    handleTimerStop (e) {
        e.preventDefault();
        this.setState({timerStarted: false, timerStopped: true});
        clearInterval(this.timer);

    }

    handleTimerReset(e){
        e.preventDefault();
        this.setState({
            timerStarted: false,
            timerStopped: true,
            seconds: 0, 
            minutes: 0, 
            hours: 0 })
        clearInterval(this.timer)
    }


    doMath(hrs, mins, secs)  {
        let countAmount = (hrs+mins/60+secs/60/60)*this.state.hourlyPay
        this.setState({payAmount: countAmount })
        return this.state.payAmount
    }

    handleTimeCapture () {
        this.setState((prevState)=>({ captures: [...prevState.captures, this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds]}))
        this.doMath(this.state.hours, this.state.minutes, this.state.seconds)
    }

    render() {
        return (
            <div className="container">
                <Tracker hours={this.state.hours} minutes={this.state.minutes} seconds= {this.state.seconds} hourlyPay={this.state.hourlyPay} payAmount={this.state.payAmount}></Tracker>
                <h2>Timer</h2>
                {/* <div className = "timer-captures">
                 {this.state.captures.map((time, index) => {
                     return <p key={index}>{"capture" + (index + 1) + "--" + time}</p>
                 })} 
                </div>*/}
                <div className="timer-container"
                >
                    {this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds}
                </div>
                <div className="timer-controls">
                    <button className="btn btn-success" onClick={this.handleTimerStart.bind(this)}>Start Timer</button>
                    <button className="btn btn-alert" onClick={this.handleTimerStop.bind(this)}>
                        Stop Timer</button>
                    <button className="btn btn-info" onClick={this.handleTimeCapture.bind(this)}>
                        CalcPayment</button>
                    <button className="btn btn-danger" onClick={this.handleTimerReset.bind(this)}>
                        Reset</button>
                </div>
            </div>
        )
    }
}

export default Timer;