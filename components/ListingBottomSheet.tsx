import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Listing from "./Listing";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  listings: any[];
  category: string;
  isOnRight: boolean;
}

const ListingsBottomSheet = ({ listings, category, isOnRight }: Props) => {
  const [refresh, setRefresh] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "100%"], []);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      enablePanDownToClose={false}
      style={styles.sheetContainer}
    >
      <View style={styles.contentContainer}>
        <Listing
          listings={listings}
          category={category}
          isOnRight={isOnRight}
          refresh={refresh}
        />
        <View style={styles.absoluteView}>
          <TouchableOpacity style={styles.btn} onPress={showMap}>
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Map</Text>
            <Ionicons name="map" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
