import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {deleteContact, fetchContactById} from '../service/contact/actions';
import {Card, Icon, Text} from '@rneui/themed';
import DialogComponent from '../component/dialog';
import {isUrl} from '../helper/isUrl';

const ProfileScreen = ({
  contact,
  fetchContactById,
  deleteContact,
  contactState,
  navigation,
  route,
}) => {
  const {id} = route.params;
  const [isDialog, setIsDialog] = useState(false);
  const [dialogState, setDialogState] = useState({
    title: '',
    text: '',
    isInfo: false,
    type: '',
    id: '',
  });

  const toggleDialog = () => {
    setIsDialog(!isDialog);
  };

  const toggleDialogFetch = () => {
    setIsDialog(!isDialog);
    if (contactState.status === 'success') {
      navigation.navigate('Home');
    }
  };

  const setDelete = () => {
    deleteContact(dialogState.id);
  };

  const setDeleteDialog = name => {
    setDialogState({
      title: 'Delete Contact',
      text: `Do you want do Delete ${name}`,
      isInfo: false,
      type: 'delete',
      id,
    });
    toggleDialog();
  };

  useEffect(() => {
    fetchContactById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!contactState.loading && contactState.status === 'success') {
      setDialogState({
        title: 'Delete Success',
        text: 'You successfully delete a contact',
        isInfo: true,
        type: 'info',
        id: '',
      });
    } else if (!contactState.loading && contactState.status === 'error') {
      setDialogState({
        title: 'Error',
        text: 'Error while deleting, Try again next time',
        isInfo: true,
        type: 'info',
        id: '',
      });
    }
  }, [contactState.loading, contactState.status]);

  return (
    <View style={styles.container}>
      {contact ? (
        <Card containerStyle={styles.card}>
          <View style={styles.user}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri:
                  !contact.photo || !isUrl(contact.photo)
                    ? 'https://i1.sndcdn.com/avatars-000437232558-yuo0mv-t500x500.jpg'
                    : contact.photo,
              }}
            />
            <Text h4 h4Style={styles.name}>
              {`${contact.firstName} ${contact.lastName}`}
            </Text>
            <Text style={styles.age}>{`${contact.age} years old`}</Text>
            <View style={styles.iconCont}>
              <TouchableOpacity
                style={styles.option}
                onPress={() =>
                  setDeleteDialog(`${contact.firstName} ${contact.lastName}`)
                }>
                <Icon name="trash" type="entypo" iconStyle={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate('Edit', {data: contact})}>
                <Icon
                  name="user-edit"
                  type="font-awesome-5"
                  iconStyle={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      ) : (
        <View>
          <Text>Loading contact...</Text>
        </View>
      )}
      <DialogComponent
        isVisible={isDialog}
        onBackdropPress={toggleDialog}
        title={dialogState.title}
        text={dialogState.text}
        isInfo={dialogState.isInfo}
        actFunc={dialogState.type === 'delete' ? setDelete : toggleDialogFetch}
        actNoFunc={toggleDialog}
        isLoading={contactState.loading}
      />
    </View>
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
  name: {
    fontSize: 25,
  },
  age: {
    fontSize: 22,
    marginBottom: 25,
  },
  option: {
    justifyContent: 'center',
  },
  iconCont: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around',
  },
  icon: {
    fontSize: 40,
  },
});

const mapStateToProps = state => ({
  contact: state.contact.contact,
  contactState: state.contact,
});

const mapDispatchToProps = {
  fetchContactById,
  deleteContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
