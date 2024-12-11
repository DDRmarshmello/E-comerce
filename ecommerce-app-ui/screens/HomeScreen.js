import { Entypo, Ionicons } from '@expo/vector-icons';
import CategoryItem from 'components/CategoryItem';
import ImageSlideShow from 'components/ImageSlideShow';
import ProductCard from 'components/ProductCard';
import ScreenComponent from 'components/ScreenComponent';
import SearchBar from 'components/SearchBar';
import Typo from 'components/Typo';
import colors from 'config/colors';
import { radius, spacingX, spacingY } from 'config/spacing';
import FilterModal from 'model/FilterModal';
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { products, categories } from 'utils/data';
import { normalizeY } from 'utils/normalize';

function HomeScreen({ navigation }) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selected, setSelected] = useState('All');
  const [data, setData] = useState(products);
  const [key, setKey] = useState(0);
  const [search, setSearch] = useState('');

  // Función para aplicar los filtros combinados
  const applyFilters = (searchText, category) => {
    let filteredProducts = products;

    // Filtrar por categoría
    if (category !== 'All') {
      filteredProducts = filteredProducts.filter((item) => item.category === category);
    }

    // Filtrar por búsqueda
    if (searchText.trim() !== '') {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setData(filteredProducts);
  };

  // Manejo del filtro por categoría
  const handleFilter = (category) => {
    setSelected(category);
    applyFilters(search, category);
  };

  // Manejo de la búsqueda
  const handleSearch = (text) => {
    setSearch(text);
    applyFilters(text, selected);
  };

  return (
    <ScreenComponent style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBg}>
          <Entypo name="grid" size={24} color="black" />
        </View>
        <TouchableOpacity
          style={styles.iconBg}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <SearchBar onPress={() => setFilterModalVisible(true)}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          value={search}
          onChangeText={handleSearch}
        />
      </SearchBar>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacingY._60 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageSlideShow />

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isSelected = selected === item.name;
            return (
              <CategoryItem
                item={item}
                onPress={() => handleFilter(item.name)}
                isSelected={isSelected}
                index={index}
                key={index}
                keyValue={key}
              />
            );
          }}
        />
        <View style={styles.headingContainer}>
          <Typo size={18} style={{ fontWeight: '600' }}>
            Special For You
          </Typo>
          <Typo style={{ color: colors.gray }}>See all</Typo>
        </View>
        {data.length > 0 && (
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              gap: spacingX._20,
              paddingHorizontal: spacingX._20,
              paddingTop: spacingY._15,
            }}
            columnWrapperStyle={{ gap: spacingX._20 }}
            renderItem={({ item, index }) => (
              <Animated.View
                key={`${key}-${index}`}
                entering={FadeInDown.delay(index * 100)
                  .duration(600)
                  .damping(13)
                  .springify()}
              >
                <ProductCard item={item} />
              </Animated.View>
            )}
          />
        )}
      </ScrollView>
      {/* <FilterModal visible={filterModalVisible} setVisible={setFilterModalVisible} /> */}
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacingY._20,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    borderRightWidth: 1.2,
    paddingRight: spacingX._10,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: spacingX._20,
    padding: spacingY._5,
    justifyContent: 'space-between',
  },
  iconBg: {
    backgroundColor: colors.lighterGray,
    padding: spacingY._7,
    borderRadius: radius._20,
  },
  catContainer: {
    paddingHorizontal: spacingX._10,
    marginTop: spacingY._10,
  },
  catImg: {
    height: normalizeY(50),
    width: normalizeY(50),
    borderRadius: radius._30,
    backgroundColor: colors.lighterGray,
    borderWidth: normalizeY(2),
    marginBottom: spacingY._5,
  },
  catName: {
    textAlign: 'center',
    fontWeight: '500',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacingY._20,
    marginHorizontal: spacingX._15,
  },
});

export default HomeScreen;
