import { useState } from 'react';
import { router} from 'expo-router'
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  
  View,
} from 'react-native';

type Course = 'Starter' | 'Main Course' | 'Dessert';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

const courses: Course[] = ['Starter', 'Main Course', 'Dessert'];

export default function Index() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Main Course');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const addDish = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Missing information', 'Please complete the dish name, description and price.');
      return;
    }

    const numericPrice = Number(price.replace(',', '.'));

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      Alert.alert('Invalid price', 'Please enter a price greater than R0.00.');
      return;
    }

    const newDish: MenuItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: numericPrice,
    };

    setMenuItems((currentItems) => [...currentItems, newDish]);
    setDishName('');
    setDescription('');
    setCourse('Main Course');
    setPrice('');

    Alert.alert('Success', `${newDish.name} has been added to the menu.`);
  };
  const router = useRouter();

  return (
    showWelcome ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>MENU MANAGEMENT</Text>
        <Text style={styles.welcomeSubtitle}>
          Manage your restaurant menu with ease.
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-menu')}
        >
          <Text style={styles.addButtonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#173F35" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CHEF'S WORKSPACE</Text>
          <Text style={styles.title}>Menu Management</Text>
          <Text style={styles.subtitle}>
            Create and manage your restaurant menu.
          </Text>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Add a new dish</Text>
            <Text style={styles.helper}>
              Enter the details below to add a menu item.
            </Text>

            <Text style={styles.label}>Dish Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Creamy Chicken Pasta"
              placeholderTextColor="#89938D"
              value={dishName}
              onChangeText={setDishName}
              maxLength={60}
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Describe the dish and its ingredients"
              placeholderTextColor="#89938D"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              maxLength={250}
            />

            <Text style={styles.label}>Course *</Text>
            <View style={styles.courseRow}>
              {courses.map((item) => {
                const selected = course === item;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.courseButton,
                      selected && styles.courseButtonSelected,
                    ]}
                    onPress={() => setCourse(item)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                  >
                    <Text
                      style={[
                        styles.courseText,
                        selected && styles.courseTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Price (R) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 85.00"
              placeholderTextColor="#89938D"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addDish}
              accessibilityRole="button"
            >
              <Text style={styles.addButtonText}>+  Add Dish</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuHeading}>
            <View>
              <Text style={styles.sectionTitle}>Your Menu</Text>
              <Text style={styles.helper}>
                All dishes added during this session.
              </Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{menuItems.length}</Text>
            </View>
          </View>

          {menuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🍽️</Text>
              <Text style={styles.emptyTitle}>Your menu is empty</Text>
              <Text style={styles.emptyText}>
                Add your first dish using the form above. It will appear here.
              </Text>
            </View>
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.dishCard}>
                  <View style={styles.dishTopRow}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.dishPrice}>
                      R{item.price.toFixed(2)}
                    </Text>
                  </View>
                  <Text style={styles.dishDescription}>
                    {item.description}
                  </Text>
                  <View style={styles.courseTag}>
                    <Text style={styles.courseTagText}>{item.course}</Text>
                  </View>
                </View>
              )}
            />
          )}

          <Text style={styles.footer}>
            Menu Management • Chef's Menu Manager
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
):
}

const styles = StyleSheet.create({ container: {
  flex: 1,
  backgroundColor: '#F5F3EC',
},
welcomeContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
},
welcomeTitle: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#245C43',
  textAlign: 'center',
  marginBottom: 16,
},
welcomeSubtitle: {
  fontSize: 16,
  color: '#555555',
  textAlign: 'center',
  marginBottom: 32,
},
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F3EC',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: '#173F35',
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  eyebrow: {
    color: '#C6DCCB',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
  },
  subtitle: {
    color: '#E0EAE2',
    fontSize: 14,
    marginTop: 7,
    lineHeight: 21,
  },
  content: {
    padding: 18,
    paddingBottom: 35,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E7E7DD',
  },
  sectionTitle: {
    color: '#173F35',
    fontSize: 20,
    fontWeight: '800',
  },
  helper: {
    color: '#727C75',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  label: {
    color: '#263B31',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 17,
    marginBottom: 8,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#D9DED7',
    backgroundColor: '#FCFCF9',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    color: '#1D2E26',
    fontSize: 15,
  },
  descriptionInput: {
    minHeight: 90,
  },
  courseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  courseButton: {
    borderWidth: 1,
    borderColor: '#CBD5CB',
    borderRadius: 9,
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  courseButtonSelected: {
    backgroundColor: '#173F35',
    borderColor: '#173F35',
  },
  courseText: {
    color: '#365347',
    fontSize: 12,
    fontWeight: '600',
  },
  courseTextSelected: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#C58A42',
    minHeight: 51,
    borderRadius: 11,
    marginTop: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  menuHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  countBadge: {
    backgroundColor: '#DDE9DF',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#173F35',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7DD',
  },
  emptyIcon: {
    fontSize: 34,
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#173F35',
    fontSize: 17,
    fontWeight: '800',
  },
  emptyText: {
    color: '#727C75',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 7,
  },
  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E7E7DD',
    padding: 16,
    marginBottom: 12,
  },
  dishTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  dishName: {
    flex: 1,
    color: '#173F35',
    fontSize: 16,
    fontWeight: '800',
  },
  dishPrice: {
    color: '#9B6327',
    fontSize: 15,
    fontWeight: '800',
  },
  dishDescription: {
    color: '#657168',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  courseTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F0E9',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 12,
  },
  courseTagText: {
    color: '#285340',
    fontSize: 11,
    fontWeight: '700',
  },
  footer: {
    color: '#89938D',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 25,
  },
});
