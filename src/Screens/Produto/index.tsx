import React, { useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { StatusBar } from "../../components/StatusBar";
import {
  MaterialIcons,
  Entypo,
  Feather
} from '@expo/vector-icons';
import { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";


import * as S from './style';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { CardVertical } from "../../components/CardVertical";
import { CardHorizontal } from "../../components/CardHorizontal";
import api from "../../../services/api";
import { Sheets } from "../Inicio";
import { useNavigation, useRoute } from "@react-navigation/native";
import { v4 } from "uuid";

type RouteParams = {
  item: Sheets
}

export function Produto() {

  const route = useRoute();
  const { item } = route.params as RouteParams


  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  

  const [produtoNome, SetProdutoNome] = useState<string>();
  const [produtoDesc, SetProdutoDesc] = useState<string>();
  const [produtoPreco, SetProdutoPreco] = useState<number>();
  const [produtoImg, SetProdutoImg] = useState<string>();

  const id = v4();

  const newProduct = {
    id,
    produtoNome,
    produtoDesc,
    produtoPreco,
    produtoImg
  }
  

  
  const [title, setTitle] = useState<Sheets[]>([]);
  useEffect(() => {
    async function getStoreData() {
      const response = await api.get('/getRows').then(function (response) {

        // console.log(response.data);
        const { results } = response.data;
        let arr = response.data;
        let test: Sheets[] = [];
        return arr.map(function(item: Sheets) {
          test.push(item);
          setTitle(response.data);  
          // console.log(item)
        })
      })    
    }
    getStoreData();
  }, []);


  // console.log(newProduct);

  const navigation = useNavigation();

  function openScreen() {
    navigation.navigate('Produto')

  }

  return (

    <S.Container>
      <StatusBar />

      <S.ScrollContainer>

        <S.Carrosel>
          <S.Image
            source={{ uri: `https://powdermix.com.br/wp-content/uploads/2022/05/quem-somos-1024x684.jpg` }}
          ></S.Image>
          <S.ButtonLeft>
            <MaterialIcons name="arrow-back-ios" size={24} color="red" />
          </S.ButtonLeft>
          <S.ButtonRight>
            <MaterialIcons name="arrow-forward-ios" size={24} color="red" />
          </S.ButtonRight>
        </S.Carrosel>

        <S.ThreeDots>
          <Entypo name="dot-single" size={24} color="red" />
          <Entypo name="dot-single" size={24} color="white" />
          <Entypo name="dot-single" size={24} color="white" />
        </S.ThreeDots>

        <S.Prices>
          <S.OriginalPrice>R$ {item[3]},00</S.OriginalPrice>
          <S.PromocionalPrice>R$ {item[3]},00</S.PromocionalPrice>
        </S.Prices>

        <S.Name>
          <S.Title>Nome:</S.Title>
          <S.BigName>{item[1]}</S.BigName>
        </S.Name>

        <S.ContainerButton>

          <S.ButtonBuy>
            <S.TextButton>
              Adicionar ao carrinho
            </S.TextButton>
            <Feather name="plus" size={25} style={{ left: 12 }} color="white" />
            <Feather name="shopping-cart" size={30} style={{ left: 8 }} color="white" />
          </S.ButtonBuy>
        </S.ContainerButton>
        <S.Description>
          <S.TitleDesc>DESCRIÇÃO:</S.TitleDesc>
          <S.TextDesc>
          {item[2]}
            </S.TextDesc>
        </S.Description>

        <S.Video>
          <YoutubePlayer
            height={260}
            play={playing}
            videoId={"lvkyaRVKcZk"}
            onChangeState={onStateChange}
          />

        </S.Video>
        <S.Hyperlink>Confira o manual desse item clicando aqui! ↗</S.Hyperlink>

        <S.CardContainer>
      <S.ScrollHorizontal
       horizontal={true}
       data={title}
       keyExtractor={(item: { toString: () => any; }[]) => item[0].toString()}
       renderItem={({ item }) =>
         <CardHorizontal  
          data={item}
          onPress={() => openScreen()}

          />
       }>
   

      </S.ScrollHorizontal>
      </S.CardContainer>

      </S.ScrollContainer>

    </S.Container>

  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});


