import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {fetchContactList} from '../service/contact/actions';

const HomeScreen = ({data, fetchContactList}) => {
  useEffect(() => {
    fetchContactList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <View>
      {data ? (
        data.map(d => (
          <View>
            <Text>
              Data: {d.firstName} {d.lastName}
            </Text>
          </View>
        ))
      ) : (
        <View>
          <Text>Loading data...</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  data: state.contact.contacts,
});

const mapDispatchToProps = {
  fetchContactList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
