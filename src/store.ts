const items = sessionStorage.getItem('initial_value');

export const initialState = items
  ? JSON.parse(items)
  : {
      role: '',
      username: '',
      image: '',
      id: '',
    };
