import React, { useEffect, useState } from "react";
import { HeaderEnviarInfo } from "../HeaderEnviarInfo";
import * as S from "./style";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { CartProps } from "../CardVertical";
import { Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const { getItem } = useAsyncStorage("@saveinfo:personalinfo");

export function InfoConfirm() {
  const navigation = useNavigation();

  function openScreen() {
    navigation.navigate("Formulario");
  }

  // const [info, setInfo] = useState([]);
  const [name, setName] = useState<string>("lmao");
  const [cpf, setCpf] = useState<string>("lmao");
  const [email, setEmail] = useState<string>("lmao");
  const [cep, setCep] = useState<string>("lmao");
  const [smartphone, setSmartphone] = useState<string>("lmao");

  async function seeInfo() {
    const response = await getItem();
    const personalInfo = response ? JSON.parse(response) : [];
    setName(personalInfo.name);
    setCpf(personalInfo.cpf);
    setEmail(personalInfo.email);
    setCep(personalInfo.cep);
    setSmartphone(personalInfo.smartphone);
    // console.log(personalInfo)
  }

  useFocusEffect(() => {
    seeInfo();
  });


  return (
    <S.Container>
      <HeaderEnviarInfo title="Informações de Contato"/>
      <S.ContainerInfo>
        <S.Nome>Nome: {name}</S.Nome>
        <S.CPF>CPF/CNPJ: {cpf}</S.CPF>
        <S.Email>E-mail: {email}</S.Email>
        <S.CEP>CEP: {cep}</S.CEP>
        <S.Telefone>Telefone: {smartphone}</S.Telefone>
      </S.ContainerInfo>

      <S.ContainerButton>
        <S.AtualizarInfo onPress={openScreen}>
          <S.TextAtualizarinfo>Atualizar Info</S.TextAtualizarinfo>
        </S.AtualizarInfo>
      </S.ContainerButton>
      {/* <Button
            title="lmao"
            onPress={seeInfo}
            
            /> */}
    </S.Container>
  );
}