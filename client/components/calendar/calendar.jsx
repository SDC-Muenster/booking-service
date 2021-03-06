import React, { Component } from 'react';
import moment from 'moment';
import '../css/calendar.css';

import Week from './week.jsx';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: [],
      month: '',
      year: moment().month(moment().month()).format('YYYY'),
      incrementMonth: 0,
    };

    this.dateRight = this.dateRight.bind(this);
    this.dateLeft = this.dateLeft.bind(this);
    this.renderWeeks = this.renderWeeks.bind(this);
  }

  componentDidMount() {
    this.renderWeeks(moment().month());
  }

  async dateRight() {
    await this.setState({
      incrementMonth: this.state.incrementMonth + 1,
    });

    await this.setState({
      year: moment().month(moment().month() + this.state.incrementMonth).format('YYYY'),
    });

    this.renderWeeks(moment().month() + this.state.incrementMonth);
  }

  async dateLeft() {
    await this.setState({
      incrementMonth: this.state.incrementMonth - 1,
    });

    await this.setState({
      year: moment().month(moment().month() + this.state.incrementMonth).format('YYYY'),
    });

    this.renderWeeks(moment().month() + this.state.incrementMonth);
  }

  renderWeeks(curMonth) {
    const month = [];
    const startOfMonthDay = moment().month(curMonth).startOf('month').format('d');
    const daysInMonth = moment().month(curMonth).daysInMonth();

    // create first array with appropriate amount of empty strings
    let week = [];

    for (let i = 0; i < startOfMonthDay; i++) {
      week.push('');
    }

    for (let i = 1; i <= 7 - startOfMonthDay; i++) {
      week.push(i);
    }

    month.push(week);

    let count = 0;
    week = [];

    for (let i = 8 - startOfMonthDay; i <= daysInMonth; i++) {
      count++;

      week.push(i);

      if (count === 7) {
        month.push(week);
        week = [];
        count = 0;
      }
    }

    month.push(week);

    // push remaining weeks into month array
    this.setState({
      weeks: month,
      month: moment().month(curMonth).format('MMMM'),
    });
  }

  render() {
    const weeksArray = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
      <div className="main">
        <div className="row">
          <button className="button-left" onClick={this.dateLeft}>←</button>
          <strong>
            {this.state.month}
            {' '}
            {this.state.year}
          </strong>
          <button className="button-right" onClick={this.dateRight}>→</button>
        </div>
        <table className="table">
          <tbody>
            <tr>
              {weeksArray.map((day, i) => <td key={i} className="calendar-text">{day}</td>)}
            </tr>
            {this.state.weeks.map((week, i) => <Week unavailableDates={this.props.unavailableDates} checkIn={this.props.checkIn} checkOut={this.props.checkOut} calType={this.props.calType} getDate={this.props.getDate} key={i} dates={week} incrementMonth={this.state.incrementMonth} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
