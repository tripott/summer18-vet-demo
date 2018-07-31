import React from 'react'
import { map } from 'ramda'
import { connect } from 'react-redux'
import { SET_RESOURCES } from '../../constants'
import List from '@material-ui/core/List'
import MenuAppBar from '../../components/menuAppBar'
import withDrawer from '../../components/withDrawer'
import ResourceListItem from '../../components/resourceListItem'

const Resources = props => (
  <div style={{ paddingTop: 56 }}>
    <MenuAppBar title="Resources" />
    <List>{map(resource => ResourceListItem(resource), props.resources)}</List>
  </div>
)

const mapStateToProps = state => ({
  resources: state.resources
})

const connector = connect(mapStateToProps)

export default withDrawer(connector(Resources))
