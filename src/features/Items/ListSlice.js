import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ListItem: [
    {
      id: 1,
      ListName:  'שפות',
      itemName: 'C#',
      status: 'פעיל',
    },
    {
      id: 2,
      ListName: 'שפות',
      itemName: 'JAVA',
      status: 'לא פעיל',
    }
  ],
  filterItemValue: '', // ✅ שדה חדש לסינון
};

const ListSlice = createSlice({
  name: 'ListSlice',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: state.ListItem.length + 1,
        ...action.payload,
        status: 'פעיל'
      };
      state.ListItem.push(newItem);
    },
    editItem: (state, action) => {
      const updatedItem = action.payload;
      const index = state.ListItem.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        state.ListItem[index] = updatedItem;
      }
    },
    setFilter: (state, action) => {
      state.filterItemValue = action.payload; // ✅ פעולה חדשה שמעדכנת את הערך המסונן
    }
  }
});

export const { addItem, editItem, setFilter } = ListSlice.actions;
export default ListSlice.reducer;
