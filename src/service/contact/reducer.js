const initialState = {
  contacts: [],
  contact: null,
  loading: false,
  error: null,
  status: '',
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACT':
      return {...state, loading: true, error: null, status: '', contacts: []};
    case 'FETCH_CONTACT_SUCCESS':
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        status: 'success',
      };
    case 'FETCH_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload, status: 'error'};
    case 'FETCH_CONTACT_ID':
      return {...state, loading: true, error: null, status: '', contact: null};
    case 'FETCH_CONTACT_ID_SUCCESS':
      return {
        ...state,
        loading: false,
        contact: action.payload,
        status: 'success',
      };
    case 'FETCH_CONTACT_ID_FAILURE':
      return {...state, loading: false, error: action.payload, status: 'error'};
    case 'CREATE_CONTACT':
      return {...state, loading: true, error: null, status: ''};
    case 'CREATE_CONTACT_SUCCESS':
      return {...state, loading: false, status: 'success'};
    case 'CREATE_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload, status: 'error'};
    case 'UPDATE_CONTACT':
      return {...state, loading: true, error: null, status: ''};
    case 'UPDATE_CONTACT_SUCCESS':
      return {...state, loading: false, status: 'success'};
    case 'UPDATE_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload, status: 'error'};
    case 'DELETE_CONTACT':
      return {...state, loading: true, error: null, status: ''};
    case 'DELETE_CONTACT_SUCCESS':
      return {...state, loading: false, status: 'success'};
    case 'DELETE_CONTACT_FAILURE':
      return {...state, loading: false, error: action.payload, status: 'error'};
    default:
      return state;
  }
};

export default contactReducer;
