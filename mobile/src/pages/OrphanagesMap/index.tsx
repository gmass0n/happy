import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { mapMarkerImg } from "../../images";

import { api } from "../../services";

import styles from "./styles";

interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => setOrphanages(response.data));
  }, []);

  const handleNavigateToOrphanageDetails = useCallback((id: number) => {
    navigation.navigate("OrphanageDetails", { id });
  }, []);

  const handleNavigateToSelectMapPosition = useCallback(() => {
    navigation.navigate("SelectMapPosition");
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -22.9051436,
          longitude: -47.1743094,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapMarkerImg}
            calloutAnchor={{
              x: 3,
              y: 0.85,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToSelectMapPosition}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
};

export default OrphanagesMap;
