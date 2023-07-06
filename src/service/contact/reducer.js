const initialState = {
  contacts: [],
  contact: {},
  loading: false,
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACT':
      return {...state, loading: true, error: null};
    case 'FETCH_CONTACT_SUCCESS':
      return {...state, loading: false, contacts: action.payload};
    case 'FETCH_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload};
    case 'FETCH_CONTACT_ID':
      return {...state, loading: true, error: null};
    case 'FETCH_CONTACT_ID_SUCCESS':
      return {...state, loading: false, contact: action.payload};
    case 'FETCH_CONTACT_ID_FAILURE':
      return {...state, loading: false, error: action.payload};
    case 'CREATE_CONTACT':
      return {...state, loading: true, error: null};
    case 'CREATE_CONTACT_SUCCESS':
      return {...state, loading: false};
    case 'CREATE_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload};
    case 'UPDATE_CONTACT':
      return {...state, loading: true, error: null};
    case 'UPDATE_CONTACT_SUCCESS':
      return {...state, loading: false};
    case 'UPDATE_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload};
    case 'DELETE_CONTACT':
      return {...state, loading: true, error: null};
    case 'DELETE_CONTACT_SUCCESS':
      return {...state, loading: false};
    case 'DELETE_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default contactReducer;
