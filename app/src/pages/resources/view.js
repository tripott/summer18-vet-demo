import React from 'react'
import { head, pathOr, isEmpty } from 'ramda'
import { connect } from 'react-redux'
import { getCurrentResource } from '../../action-creators/resources'
import Component from '@reactions/component'
import MenuAppBar from '../../components/menuAppBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Favorite } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const Spinner = props => <CircularProgress />
const NoAddresses = () => (
  <img src="https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2013/06/monkey-scratching-head.jpg" />
)

const ViewResource = props => (
  <Component didMount={() => props.getCurrentResource(props.match.params.id)}>
    {() => {
      return (
        <React.Fragment>
          {props.match.params.id === props.currentResource._id ? (
            <div style={{ paddingTop: 56 }}>
              <MenuAppBar
                history={props.history}
                backArrow={true}
                title={props.currentResource.name}
                style={{ padding: 56 }}
              />

              {/*<Card className={classes.card} style={{ marginBottom: 32 }}><CardMedia className={classes.media}>
          <iframe
            title={props.data.formalName}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.REACT_APP_MAP
            }&q=${encodeURI(props.data.formalName)}`}
            allowFullScreen
          />
        */}

              <Card>
                <CardMedia>
                  {isEmpty(props.addresses) ? (
                    <NoAddresses />
                  ) : (
                    <iframe
                      title={`${head(props.addresses).street}`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=${
                        process.env.REACT_APP_API_KEY
                      }&q=${encodeURI(`${head(props.addresses).street}`)}`}
                      allowFullScreen
                    />
                  )}
                </CardMedia>

                <CardContent>
                  <Typography gutterBottom variant="headline">
                    {props.currentResource.name}
                  </Typography>
                  <Typography component="p">
                    {props.currentResource.purpose}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button>
                    <Favorite style={{ color: 'grey' }} />
                  </Button>
                  <a
                    className="no-underline"
                    href={`https:${props.currentResource.website}`}
                  >
                    <Button>WEBSITE</Button>
                  </a>
                </CardActions>
              </Card>
            </div>
          ) : (
            <Spinner />
          )}
        </React.Fragment>
      )
    }}
  </Component>
)

const mapStateToProps = state => ({
  currentResource: state.currentResource,
  addresses: state.currentResource.addresses,
  isFetching: state.fetching.isFetching
})

const mapActionToProps = dispatch => ({
  getCurrentResource: id => dispatch(getCurrentResource(id))
})

const connector = connect(
  mapStateToProps,
  mapActionToProps
)

export default connector(ViewResource)
