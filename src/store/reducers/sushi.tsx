import { createReducer } from "@reduxjs/toolkit";
import { getItems, getListMenu } from "../actions/sushi";

export type LayoutState = {
  loading: boolean;
  listMenu: any;
  items: any;
};

const initialState: LayoutState = {
    listMenu: [],
    loading: false,
    items: [],
};

export default createReducer(initialState, (builder) => {
  builder.addCase(getListMenu.fulfilled, (state, actions) => {
    state.listMenu = actions.payload;
    state.loading = false;
  });
  builder.addCase(getListMenu.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getListMenu.rejected, (state) => {
    state.listMenu = null;
    state.loading = false;
  });
  builder.addCase(getItems.fulfilled, (state, actions) => {
    state.items = actions.payload.find((option: any) => option.id === actions.meta.arg).items;
    state.loading = false;
  });
  builder.addCase(getItems.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getItems.rejected, (state) => {
    state.items = null;
    state.loading = false;
  });
});
