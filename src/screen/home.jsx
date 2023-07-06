import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchContactList} from '../service/contact/actions';
import {Card, Icon, SpeedDial, Text} from '@rneui/themed';

const HomeScreen = ({data, fetchContactList}) => {
  const [open, setOpen] = useState(false);
  const [deleteList, setDeleteList] = useState(false);
  useEffect(() => {
    fetchContactList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {data ? (
        data.map(d => (
          <Card key={d.id} containerStyle={styles.container}>
            <View style={styles.user}>
              <View style={styles.bioCont}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={{
                    uri:
                      !d.photo || d.photo === 'N/A'
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
                <View style={styles.option}>
                  <Icon name="trash" type="entypo" />
                </View>
              )}
            </View>
          </Card>
        ))
      ) : (
        <View>
          <Text>Loading data...</Text>
        </View>
      )}
      <SpeedDial
        isOpen={open}
        icon={{name: 'edit', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add"
          onPress={() => console.log('Add Something')}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
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
  data: state.contact.contacts,
});

const mapDispatchToProps = {
  fetchContactList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
