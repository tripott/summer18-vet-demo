import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import withDrawer from '../../components/withDrawer'
import MenuAppBar from '../../components/menuAppBar'
import CategoryListItems from '../../components/categoryListItems'

const Categories = () => (
  <React.Fragment>
    <MenuAppBar title="Categories" />
    <CategoryListItems />
  </React.Fragment>
)

export default withDrawer(Categories)
