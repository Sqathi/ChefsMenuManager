import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MenuListScreen() {
  const menuItems: {
  name: string;
  description: string;
  course: string;
  price: number;
}[] = [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Management</Text>
      <Text style={styles.subtitle}>Food Items</Text>

      {menuItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Menu Items Yet</Text>
          <Text style={styles.emptyText}>
            The dishes added by the chef will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Course: {item.course}</Text>
              <Text>Price: R{item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    padding: 24,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#16324F',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#526579',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16324F',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: '#526579',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16324F',
    marginBottom: 8,
  },
});