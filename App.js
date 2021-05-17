import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

const listData = [
  {
    id: 0,
    title: 'Milk',
  },
  {
    id: 1,
    title: 'Coffee',
  },
  {
    id: 2,
    title: 'Oranges',
  },
  {
    id: 3,
    title: 'Bread',
  },
  {
    id: 4,
    title: 'Butter',
  },
];

const App = () => {
  const [search, setSearch] = useState('');
  const [dataList, setDataList] = useState(listData);
  const [filteredDataList, setFilteredDataList] = useState(listData);

  const searchText = text => {
    if (text) {
      const newData = dataList.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataList(newData);
      setSearch(text);
    } else {
      setFilteredDataList(dataList);
      setSearch(text);
    }
  };

  const randomStringGenerator = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  const onPressPlus = () => {
    Keyboard.dismiss();
    const id = dataList.length;
    const title = randomStringGenerator();
    setDataList(prevDataList => [...prevDataList, {id, title}]);
    setFilteredDataList(prevDataList => [...prevDataList, {id, title}]);
  };

  const renderItem = ({item}) => (
    <Text style={styles.itemStyle} onPress={() => getItem(item)}>
      {item.title.toUpperCase()}
    </Text>
  );

  const itemSeparatorView = () => <View style={styles.itemSeparatorView} />;

  const getItem = item => alert(`Title : ${item.title}`);

  const searchContainer = () => (
    <View style={styles.searchContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => searchText(text)}
          value={search}
          placeholder={'Search'}
          placeholderTextColor={'#a7a6a6'}
          underlineColorAndroid={'transparent'}
        />
      </View>
      <TouchableOpacity style={styles.plusTouchable} onPress={onPressPlus}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {searchContainer()}
      <FlatList
        data={filteredDataList}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={itemSeparatorView}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  textInputContainer: {
    flex: 0.85,
    borderRightWidth: 2,
  },
  plusTouchable: {
    flex: 0.15,
    alignItems: 'center',
  },
  plusText: {
    fontSize: 40,
  },
  itemStyle: {
    padding: 10,
  },
  itemSeparatorView: {
    height: 0.5,
    marginHorizontal: 10,
    backgroundColor: '#a7a6a6',
  },
  textInputStyle: {
    borderRadius: 5,
    borderWidth: 2,
    paddingLeft: 20,
    margin: 5,
    color: '#a7a6a6',
    borderColor: '#095ff3',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
