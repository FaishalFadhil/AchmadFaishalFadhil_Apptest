import {Dialog, Text} from '@rneui/themed';
import React from 'react';

export default function DialogComponent({
  isVisible,
  onBackdropPress,
  title,
  text,
  isInfo,
  actFunc,
  actNoFunc,
  isLoading,
}) {
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onBackdropPress ?? actNoFunc}>
      {isLoading ? (
        <Dialog.Loading />
      ) : (
        <>
          <Dialog.Title title={title} />
          <Text>{text}</Text>
          <Dialog.Actions>
            <Dialog.Button title={isInfo ? 'Ok' : 'Yes'} onPress={actFunc} />
            {!isInfo && <Dialog.Button title="No" onPress={actNoFunc} />}
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );
}
