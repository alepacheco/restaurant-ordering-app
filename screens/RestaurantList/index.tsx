import React from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { RestaurantEntry } from './RestaurantEntry';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c5453605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f54534-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '534555-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c5354605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-5345345471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c345341b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-54543c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '5844-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export class RestaurantList extends React.Component<{}> {
  render() {
    return (
      <SafeAreaView>
        <Text>List</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <RestaurantEntry title={item.title} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}
