import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  createContact,
  updateContact,
  fetchContactList,
} from '../service/contact/actions';
import {Button, Card, Icon, Input, Text} from '@rneui/themed';
import DialogComponent from '../component/dialog';
import {isUrl} from '../helper/isUrl';

const FormScreen = ({
  createContact,
  updateContact,
  fetchContactList,
  contactState,
  navigation,
  route,
}) => {
  const {data} = route.params;
  const [isDialog, setIsDialog] = useState(false);
  const [dialogState, setDialogState] = useState({
    title: '',
    text: '',
    isInfo: false,
    type: '',
    id: '',
  });
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });

  const setValue = (key, value) => {
    setFormState({
      ...formState,
      [key]: `${value}`,
    });
  };

  const toggleDialog = () => {
    setIsDialog(!isDialog);
  };

  const toggleDialogFetch = () => {
    setIsDialog(!isDialog);
    if (contactState.status === 'success') {
      fetchContactList();
      navigation.navigate('Home');
    }
  };

  const setCreate = () => {
    createContact(formState);
  };

  const setEdit = () => {
    updateContact(data.id, formState);
  };

  const setCreateDialog = name => {
    setDialogState({
      title: data ? 'Edit Contact' : 'Create Contact',
      text: data
        ? `Do you want to edit ${formState.firstName} ${formState.lastName} contact?`
        : `Do you want to ${formState.firstName} ${formState.lastName} into your contact?`,
      isInfo: false,
      type: data ? 'edit' : 'create',
    });
    toggleDialog();
  };

  useEffect(() => {
    if (data) {
      setFormState({
        firstName: data.firstName,
        lastName: data.lastName,
        age: `${data.age}`,
        photo: data.photo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!contactState.loading && contactState.status === 'success') {
      setDialogState({
        title: data ? 'Edit Success' : 'Create Success',
        text: data
          ? 'You successfully edit a contact'
          : 'You successfully create a contact',
        isInfo: true,
        type: 'info',
        id: '',
      });
    } else if (!contactState.loading && contactState.status === 'error') {
      setDialogState({
        title: 'Error',
        text: data
          ? 'Error while editing, Try again next time'
          : 'Error while creating, Try again next time',
        isInfo: true,
        type: 'info',
        id: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactState.loading, contactState.status]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {formState.photo && isUrl(formState.photo) && (
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{
              uri: formState.photo,
            }}
          />
        )}
        <Card containerStyle={styles.card}>
          <Card.Title h4>{data ? 'Edit Form' : 'Create Form'}</Card.Title>
          <View style={styles.user}>
            <Input
              label="First Name"
              placeholder="Input First Name Here"
              onChangeText={value => setValue('firstName', value)}
              value={formState.firstName}
              inputStyle={styles.input}
            />
            <Input
              label="Last Name"
              placeholder="Input Last Name Here"
              onChangeText={value => setValue('lastName', value)}
              value={formState.lastName}
              inputStyle={styles.input}
            />
            <Input
              label="Age"
              placeholder="Input Age Here"
              onChangeText={value => setValue('age', value)}
              value={formState.age}
              keyboardType="numeric"
              inputStyle={styles.input}
            />
            <Input
              label="Photo"
              placeholder="Input Photo Url Here"
              onChangeText={value => setValue('photo', value)}
              value={formState.photo}
              inputStyle={styles.input}
            />
            <View style={styles.iconCont}>
              {formState.firstName &&
                formState.lastName &&
                Number(formState.age) &&
                isUrl(formState.photo) && (
                  <Button
                    radius={'sm'}
                    type="solid"
                    buttonStyle={styles.button}
                    onPress={() => setCreateDialog()}>
                    Save
                    <Icon name="save" color="white" />
                  </Button>
                )}
            </View>
          </View>
        </Card>
        <Text style={styles.text}>
          Submit button will shown after you correct fill the form
        </Text>
        <Text style={styles.text}>Photo must be URL or link to image</Text>
        <DialogComponent
          isVisible={isDialog}
          onBackdropPress={toggleDialog}
          title={dialogState.title}
          text={dialogState.text}
          isInfo={dialogState.isInfo}
          actFunc={
            dialogState.type === 'edit'
              ? setEdit
              : dialogState.type === 'create'
              ? setCreate
              : toggleDialogFetch
          }
          actNoFunc={toggleDialog}
          isLoading={contactState.loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 300,
    minHeight: 300,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 25,
  },
  input: {
    fontSize: 18,
  },
  iconCont: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around',
  },
  icon: {
    fontSize: 40,
  },
  button: {backgroundColor: 'rgba(39, 39, 39, 1)'},
  text: {
    fontSize: 12,
    marginTop: 5,
  },
});

const mapStateToProps = state => ({
  contactState: state.contact,
});

const mapDispatchToProps = {
  createContact,
  updateContact,
  fetchContactList,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
