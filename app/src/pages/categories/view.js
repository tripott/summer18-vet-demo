import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { getCategory } from "../../action-creators/categories"
import {
  Icon,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { connect } from "react-redux"
import classnames from "classnames"

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
})

class ViewCategory extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  componentDidMount() {
    this.props.getCategory(this.props.match.params.id)
    // props.getCategory(props.match.params.id)
  }

  render() {
    const { classes, currentCategory, match } = this.props

    return (
      <React.Fragment>
        {match.params.id === currentCategory._id ? (
          <Card>
            <CardHeader
              avatar={
                <Icon aria-label={currentCategory.name}>
                  {currentCategory.icon}
                </Icon>
              }
              title={currentCategory.name}
              subheader={currentCategory.shortDesc}
            />

            <CardActions disableActionSpacing>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{currentCategory.desc}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ) : (
          <p>Loading</p>
        )}
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return { currentCategory: state.currentCategory }
}

const mapActionToProps = dispatch => {
  return { getCategory: id => dispatch(getCategory(id)) }
}

const connector = connect(
  mapStateToProps,
  mapActionToProps
)

export default withStyles(styles)(connector(ViewCategory))
