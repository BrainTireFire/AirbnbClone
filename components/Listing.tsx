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
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

type ListingProps = {
  listings: any[];
  category: string;
  isOnRight: boolean;
  refresh: number;
};

const Listing = ({ listings, category, isOnRight, refresh }: ListingProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const listRef = useRef<BottomSheetFlatListMethods | null>(null);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [category, isOnRight]);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

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
      <BottomSheetFlatList
        renderItem={renderItem}
        ref={listRef}
        data={isLoading ? [] : listings}
        ListHeaderComponent={
          <Text style={styles.info}>{listings.length} homes</Text>
        }
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
  info: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listing;
