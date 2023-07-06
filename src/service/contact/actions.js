export const fetchContactList = () => ({
  type: 'FETCH_CONTACT',
});

export const fetchContactListSuccess = data => ({
  type: 'FETCH_CONTACT_SUCCESS',
  payload: data,
});

export const fetchContactListFailure = error => ({
  type: 'FETCH_CONTACT_FAILURE',
  payload: error,
});

export const fetchContactById = id => ({
  type: 'FETCH_CONTACT_ID',
  payload: id,
});

export const fetchContactByIdSuccess = data => ({
  type: 'FETCH_CONTACT_ID_SUCCESS',
  payload: data,
});

export const fetchContactByIdFailure = error => ({
  type: 'FETCH_CONTACT_ID_FAILURE',
  payload: error,
});

export const createContact = body => ({
  type: 'CREATE_CONTACT',
  payload: body,
});

export const createContactSuccess = data => ({
  type: 'CREATE_CONTACT_SUCCESS',
  // payload: data,
});

export const createContactFailure = error => ({
  type: 'CREATE_CONTACT_FAILURE',
  payload: error,
});

export const updateContact = (id, body) => ({
  type: 'UPDATE_CONTACT',
  payload: {id, body},
});

export const updateContactSuccess = data => ({
  type: 'UPDATE_CONTACT_SUCCESS',
  // payload: data,
});

export const updateContactFailure = error => ({
  type: 'UPDATE_CONTACT_FAILURE',
  payload: error,
});

export const deleteContact = id => ({
  type: 'DELETE_CONTACT',
  payload: id,
});

export const deleteContactSuccess = data => ({
  type: 'DELETE_CONTACT_SUCCESS',
  // payload: data,
});

export const deleteContactFailure = error => ({
  type: 'DELETE_CONTACT_FAILURE',
  payload: error,
});
