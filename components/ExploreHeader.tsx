import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Heptics from "expo-haptics";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

type ExploreHeaderProps = {
  onCategoryChanged: (
    category: string,
    previousIndex: number,
    currentIndex: number
  ) => void;
};

const ExploreHeader = ({ onCategoryChanged }: ExploreHeaderProps) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const selectCategory = (index: number) => {
    const previousIndex = activeIndex;
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({
        x: x - 16,
        y: 0,
        animated: true,
      });
    });

    Heptics.impactAsync(Heptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name, previousIndex, index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontWeight: "bold" }}>Where to?</Text>
                <Text style={{ color: Colors.grey }}>Anywhere * Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
              }
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons
                size={24}
                name={item.icon as any}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 130,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    flex: 1,
    padding: 14,
    backgroundColor: "#fff",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  categoryBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoryBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
