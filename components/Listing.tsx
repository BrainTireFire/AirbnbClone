import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Listing as ListingType } from "@/types/listing";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";

type ListingProps = {
  listings: any[];
  category: string;
  isOnRight: boolean;
};

const Listing = ({ listings, category, isOnRight }: ListingProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const listRef = useRef<FlatList | null>(null);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [category, isOnRight]);

  const renderItem: ListRenderItem<ListingType> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={isOnRight ? FadeInRight : FadeInLeft}
          exiting={isOnRight ? FadeOutLeft : FadeOutRight}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image}></Image>
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontWeight: "bold" }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>

          <Text>{item.room_type}</Text>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontWeight: "bold" }}>{item.price}$</Text>
            <Text>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        renderItem={renderItem}
        ref={listRef}
        data={isLoading ? [] : listings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default Listing;
