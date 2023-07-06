import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchContactList, deleteContact} from '../service/contact/actions';
import {Card, Icon, SpeedDial, Text} from '@rneui/themed';
import DialogComponent from '../component/dialog';
import {isUrl} from '../helper/isUrl';

const HomeScreen = ({
  contacts,
  fetchContactList,
  deleteContact,
  contactState,
  navigation,
}) => {
  const [open, setOpen] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [dialogState, setDialogState] = useState({
    title: '',
    text: '',
    isInfo: false,
    type: '',
    id: '',
  });
  const [deleteList, setDeleteList] = useState(false);
  const scrollViewRef = useRef();

  const toggleDialog = () => {
    setDeleteList(!deleteList);
    setIsDialog(!isDialog);
  };

  const toggleDialogFetch = () => {
    setDeleteList(!deleteList);
    setIsDialog(!isDialog);
    fetchContactList();
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const setDelete = () => {
    deleteContact(dialogState.id);
  };

  const setDeleteDialog = (id, name) => {
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
    fetchContactList();
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
    <>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        {contacts ? (
          contacts.map(d => (
            <TouchableOpacity
              key={d.id}
              style={styles.option}
              onPress={() =>
                navigation.navigate('Profile Contact', {id: d.id})
              }>
              <Card containerStyle={styles.container}>
                <View style={styles.user}>
                  <View style={styles.bioCont}>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{
                        uri:
                          !d.photo || !isUrl(d.photo)
                            ? 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4'
                            : d.photo,
                      }}
                    />
                    <View style={styles.bio}>
                      <Text h4 h4Style={styles.name}>
                        {`${d.firstName} ${d.lastName}`}
                      </Text>
                      <Text style={styles.age}>{`${d.age} years old`}</Text>
                    </View>
                  </View>
                  {deleteList && (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() =>
                        setDeleteDialog(d.id, `${d.firstName} ${d.lastName}`)
                      }>
                      <Icon name="trash" type="entypo" />
                    </TouchableOpacity>
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <Text>Loading contacts...</Text>
          </View>
        )}
      </ScrollView>
      <SpeedDial
        isOpen={open}
        icon={{name: 'edit', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add"
          onPress={() => {
            setOpen(false);
            navigation.navigate('Create', {data: null});
          }}
        />
        <SpeedDial.Action
          icon={{name: 'delete', color: '#fff'}}
          title="Delete"
          onPress={() => {
            setDeleteList(true);
            setOpen(false);
          }}
        />
      </SpeedDial>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  scrollView: {
    marginVertical: 15,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  bioCont: {
    flexDirection: 'row',
  },
  bio: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
  },
  age: {
    fontSize: 16,
  },
  option: {
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  contacts: state.contact.contacts,
  contactState: state.contact,
});

const mapDispatchToProps = {
  fetchContactList,
  deleteContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
