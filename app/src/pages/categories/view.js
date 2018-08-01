import React from "react";
import Component from "@reactions/component";
import { Link } from "react-router-dom";
import { getCategory } from "../../action-creators/categories";
import categoryListItems from "../../components/categoryListItems";
import Typography from "@material-ui/core/Typography";
import { ListItem, Icon, ListItemText, List } from "@material-ui/core";
import { connect } from "react-redux";

const ViewCategory = props => (
  <Component didMount={() => props.getCategory(props.match.params.id)}>
    {() => (
      <React.Fragment>
        {props.match.params.id === props.currentCategory._id ? (
          <ListItem>
            <Icon style={{ color: "grey" }}>{props.currentCategory.icon}</Icon>
            <ListItemText
              primary={props.currentCategory.name}
              secondary={props.currentCategory.shortDesc}
            />
          </ListItem>
        ) : (
          <p>Loading</p>
        )}
      </React.Fragment>
    )}
  </Component>
);

const mapStateToProps = state => {
  return { currentCategory: state.currentCategory };
};

const mapActionToProps = dispatch => {
  return { getCategory: id => dispatch(getCategory(id)) };
};

const connector = connect(
  mapStateToProps,
  mapActionToProps
);

export default connector(ViewCategory);
