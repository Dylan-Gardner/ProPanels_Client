import React from "react"
import {
    Scheduler,
    WeekView,
    AllDayPanel,
    DayView,
    MonthView,
    ViewSwitcher,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
    AppointmentTooltip,
    AppointmentForm
} from "@devexpress/dx-react-scheduler-material-ui"
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler'
import { withStyles } from '@material-ui/core/styles';
import {fade} from "@material-ui/core/styles";


const style = theme => ({
    todayCell: {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.14),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.main, 0.16),
        },
    },
    weekendCell: {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        '&:hover': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.14),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.16),
        },
    },
});

const TimeTableCellBase = ({ classes, ...restProps }) => {
    const { startDate } = restProps;
    const date = new Date(startDate);
    if (date.getDate() === new Date().getDate()) {
        return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
    } if (date.getDay() === 0 || date.getDay() === 6 || date.getHours() < 8 || date.getHours() >= 17) {
        return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
    } return <WeekView.TimeTableCell {...restProps} />;
};

const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);

class ScheduleView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: props.events,
            currentViewName: 'Week',
            currentDate: Date.now()
        };
        this.currentViewNameChange = (currentViewName) => {
            this.setState({currentViewName});
        };
        this.currentDateChange = (currentDate) => {
            this.setState({ currentDate });
        }
    }

    render() {
        return(
        <Paper>
            <Scheduler
            data={this.state.events}
            height={window.innerHeight - 124}>
                <ViewState
                    defaultCurrentDate={Date.now()}
                    defaultCurrentViewName={this.state.currentViewName}
                    onCurrentViewNameChange={this.currentViewNameChange}
                    onCurrentDateChange={this.currentDateChange}/>
                <DayView
                    startDayHour={8}
                    endDayHour={19}/>
                <WeekView
                name={"Work Week"}
                startDayHour={7}
                endDayHour={19}
                excludedDays={[0,6]}/>
                <WeekView
                startDayHour={7}
                endDayHour={19}
                cellDuration={30}
                timeTableCellComponent={TimeTableCell}/>
                <MonthView/>
                <Toolbar/>
                <Appointments/>
                <AppointmentTooltip
                showCloseButton
                showOpenButton/>
                <AppointmentForm
                readOnly/>
                <DateNavigator/>
                <TodayButton/>
                <ViewSwitcher/>
                <AllDayPanel/>
            </Scheduler>
        </Paper>
        )
    }
}
export default ScheduleView