import { DRAWER_TOGGLED } from "../constants"

export const drawer = (
  state = {
    open: true
  },
  action
) => {
  switch (action.type) {
    case DRAWER_TOGGLED:
      return { open: !state.open }
    default:
      return state
  }
}
