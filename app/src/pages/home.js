import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import withDrawer from '../components/withDrawer'
import MenuAppBar from '../components/menuAppBar'
import { Link } from 'react-router-dom'

const Home = () => (
  <div
    style={{
      padding: 75
    }}
  >
    <MenuAppBar title="Home" />
    <center>
      <img alt="home icon" src="/tcvsn-ico.png" />
      <div style={{ paddingTop: 12 }}>
        <Typography variant="display1">
          Welcome to Veteran Support Resources App
        </Typography>
      </div>
      <div style={{ paddingTop: 12 }}>
        <Button
          component={Link}
          to="/categories"
          variant="raised"
          color="primary"
        >
          Categories
        </Button>
      </div>
    </center>
  </div>
)

export default withDrawer(Home)
