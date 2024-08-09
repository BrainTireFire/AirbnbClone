import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/types/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Location from "expo-location";

type ListingsMapProps = {
  listings: any;
};

const INITAIL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ListingsMap = memo(({ listings }: ListingsMapProps) => {
  const router = useRouter();
  const mapRef = useRef<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  useEffect(() => {
    onLocateMe();
  }, []);

  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text
            style={{ color: "#000", textAlign: "center", fontWeight: "bold" }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  const onLocateMe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 7,
      longitudeDelta: 7,
    };

    mapRef.current?.animateToRegion(region);
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        // showsMyLocationButton
        initialRegion={INITAIL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
            onPress={() => onMarkerSelected(item)}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>${item.properties.price}</Text>
            </View>
          </Marker>
        ))}

        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          >
            <View style={styles.currentLocationMarker}>
              <Ionicons name="person-circle" size={24} color={Colors.dark} />
            </View>
          </Marker>
        )}
      </MapView>
      <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
        <Ionicons name="navigate" size={24} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 10 },
  },
  markerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  currentLocationMarker: {
    backgroundColor: "rgba(0,150,255,0.7)",
    padding: 6,
    borderRadius: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 10 },
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default ListingsMap;
