import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DeliveryButton from "../DeliveryButton/DeliveryButton";

interface DeliveryBtnListType {
  id: number;
  deliveryName: string;
  deliveryType: string;
  deliveryPrice: number;
  deliveryInfo: string;
}

const DeliveryBtnList = () => {
  const [deliveryData, setdeliveryData] = useState<DeliveryBtnListType[]>([]);
  const [deliveryInfoText, setDeliveryInfoText] = useState<string>();

  useEffect(() => {
    const getData = async () => {
      await axios.get("/data/data.json").then((res) => {
        setdeliveryData(res.data.deliveryFee);
      });
    };
    getData();
  }, []);

  useEffect(() => {}, [deliveryInfoText]);

  const ChangeDeliveryInfoText = (id: number) => {
    const infoText = deliveryData.filter((delivery) => {
      return delivery.id === id;
    });
    setDeliveryInfoText(infoText[0].deliveryInfo);
  };

  return (
    <DeliveryBtnListComponent>
      <DeliveryBtnListTitle>배송 종류</DeliveryBtnListTitle>
      <DeliveryBtnListBox>
        {deliveryData.map((delivery) => {
          return (
            <DeliveryButton
              key={delivery.id}
              id={delivery.id}
              deliveryName={delivery.deliveryName}
              ChangeDeliveryInfoText={ChangeDeliveryInfoText}
            />
          );
        })}
      </DeliveryBtnListBox>
      <DeliveryBtnInfoText>{deliveryInfoText}</DeliveryBtnInfoText>
    </DeliveryBtnListComponent>
  );
};

export default DeliveryBtnList;

const DeliveryBtnListComponent = styled.section`
  width: 100%;
`;

const DeliveryBtnListTitle = styled.p`
  font-weight: bold;
  margin-bottom: 1em;
`;

const DeliveryBtnListBox = styled.ul`
  display: flex;
`;

const DeliveryBtnInfoText = styled.p`
  margin: 1em 0;
`;
