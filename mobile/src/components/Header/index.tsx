import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from './styles';

interface IProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<IProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  const handleNavigateToAppHomepage = useCallback(() => {
    navigation.navigate("OrphanagesMap");
  }, []);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleNavigateToAppHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;
