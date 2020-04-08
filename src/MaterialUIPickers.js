import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "70%"
    }
  },
  textField: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    backgroundColor: "white"
  },
  input: {
    backgroundColor: "white",
    border: "none"
  },
  loc: {
    padding: "0"
  }
}));

export default function MaterialUIPickers() {
  const classes = useStyles();
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} md={6} lg={6}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="When?"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="What time?"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} md={12} lg={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Where?"
              defaultValue=""
              placeholder="Where should we meet?"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-flexible"
              label="Anything to add?"
              multiline
              rows="3"
              defaultValue=""
              placeholder="Enter any other meetup details!"
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Button variant="contained">Default</Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
