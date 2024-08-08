import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import listingData from "@/assets/data/airbnb-listings.json";
import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";
import ListingBottomSheet from "@/components/ListingBottomSheet";

const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const [isOnRight, seIsOnRight] = useState<boolean>(false);
  const items = useMemo(() => listingData as any, []);

  const onDataChanged = (
    category: string,
    previousIndex: number,
    currentIndex: number
  ) => {
    setCategory(category);
    seIsOnRight(previousIndex < currentIndex);
  };

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsMap listings={listingDataGeo} />
      <ListingBottomSheet
        listings={items}
        category={category}
        isOnRight={isOnRight}
      />
    </View>
  );
};

export default Page;
