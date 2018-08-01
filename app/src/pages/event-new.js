import React from "react"
import withDrawer from "../components/withDrawer"
import MenuAppBar from "../components/menuAppBar"
import CustomSnackBar from "../components/customSnackBar"
import { connect } from "react-redux"
import { createNewEvent } from "../action-creators/events"
import { NEW_EVENT_FORM_UPDATED } from "../constants"

import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"

const styles = theme => ({
  input: {
    width: "50%",
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

/*
{
    name: "Veteran Bike Week",
    shortDesc: "Ride from Myrtle Beach to Hilton Head",
    primaryPhone: "843-727-4525",
    eventDateTime: "2018-08-04T08:00:00-05:00"
  }
  */

class EventNew extends React.Component {
  componentDidMount() {
    // this.props.isSubmitActive()
  }
  render() {
    const { name, shortDesc, primaryPhone, eventDateTime } = this.props.event

    const { isError, isSaving, errorMsg } = this.props

    const { classes } = this.props

    return (
      <div>
        <MenuAppBar title="Add Event" />
        <form
          style={{ marginTop: 50 }}
          autoComplete="off"
          onSubmit={this.props.createEvent(this.props.history)}
        >
          <TextField
            label="Name"
            value={name}
            onChange={e => {
              this.props.onChange("name", e.target.value)
            }}
            margin="normal"
            required
            className={classes.input}
          />
          <TextField
            label="Short Description"
            value={shortDesc}
            onChange={e => {
              this.props.onChange("shortDesc", e.target.value)
            }}
            margin="normal"
            required
            className={classes.input}
            multiline
          />

          <TextField
            label="Phone"
            value={primaryPhone}
            onChange={e => {
              this.props.onChange("primaryPhone", e.target.value)
            }}
            margin="normal"
            required
            className={classes.input}
            multiline
          />

          <TextField
            label="Event Date"
            value={eventDateTime}
            onChange={e => {
              this.props.onChange("eventDateTime", e.target.value)
            }}
            margin="normal"
            required
            className={classes.input}
            multiline
          />
          <Button
            fab
            color="primary"
            type="submit"
            aria-label="add"
            className="fab-button"
            disabled={this.props.isActive}
          >
            <SaveIcon />
          </Button>
        </form>
        {isError && <CustomSnackBar message={errorMsg} snackType="error" />}
        {isSaving && <CustomSnackBar message="Saving..." snackType="info" />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  event: state.newEvent.data,
  isError: state.newEvent.isError,
  isSaving: state.newEvent.isSaving,
  errorMsg: state.newEvent.errorMsg
})

const mapActionsToProps = dispatch => {
  return {
    onChange: (field, value) => {
      dispatch({
        type: NEW_EVENT_FORM_UPDATED,
        payload: { [field]: value }
      })
    },
    createEvent: history => e => {
      e.preventDefault()
      dispatch(createNewEvent(history))
    }
  }
}

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default withDrawer(connector(withStyles(styles)(EventNew)))
