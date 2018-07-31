import React from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import withDrawer from "../components/withDrawer"

const Home = () => (
  <div style={{ padding: 48 }}>
    <center>
      <img alt="home icon" src="/tcvsn-ico.png" />
      <div style={{ paddingTop: 12 }}>
        <Typography variant="display1">
          Welcome to Veteran Support Resources App
        </Typography>
      </div>
      <div style={{ paddingTop: 12 }}>
        <Button variant="raised" color="primary">
          Categories
        </Button>
      </div>
    </center>
  </div>
)

export default withDrawer(Home)
