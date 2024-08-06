import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";

type ListingProps = {
  listings: any[];
  category: string;
};

const Listing = ({ listings, category }: ListingProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const listRef = useRef<FlatList | null>(null);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [category]);

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`}>
      <TouchableOpacity>
        <View style={styles.listing}>
          <Image source={{ uri: item.medium_url }}></Image>
        </View>
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
  },
});

export default Listing;
