import React from "react";
import { Flex } from "@chakra-ui/react";
import CardTypo from "components/Typography/CardTypo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Selector = styled.p`
  color: #625ff5;
  font-size: 1rem;
  cursor: pointer;
  margin: 0;
`;

const ClaimButton = styled.button`
  outline: none;
  border: 0;
  color: white;
  border-radius: 12px;
  box-shadow: 5px 5px 20px 6px rgba(226, 226, 226, 0.5);
  background: #625ff5;
  font-size: 18px;
  width: 120px;
  height: 40px;
  transition: transform 0.2s ease-in;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

export default function StakeClaim({ data, title, claim, post, t }) {
  const onClaimHandler = async () => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API + "index/dex/receive",
        { type: post }
      );
      if (res.data.code === "200") {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex h="100%" w="100%">
      <Flex w="85%" direction="column" mt="30px" pl="30px">
        <CardTypo color="#333330" size="16px" weight="600">
          {title}
        </CardTypo>
        <Flex w="100%" mt="calc(1.5rem + 10px)" mb="30px">
          {data.map((item, index) => {
            return item.select ? (
              <Selector key={index}>{t().claim[item.title]}</Selector>
            ) : (
              <CardTypo
                key={index}
                w={item.width}
                align={item.align}
                color={item.color}
              >
                {t().claim[item.title]}
              </CardTypo>
            );
          })}
        </Flex>
        {Array.isArray(claim) ? (
          claim.map((item, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <Flex w="100%" key={index} mb="35px">
                <Flex w="10%" align="center">
                  <LazyLoadImage
                    alt=""
                    src={`/StakeIcon/${item.instrument}Form.png`}
                    style={{
                      width: "22px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                  <CardTypo color="#333330" weight="600">
                    {item.instrument}
                  </CardTypo>
                </Flex>
                <CardTypo color="#333330" weight="600" w="8%">
                  {Number(item.apy.toFixed(2))}%
                </CardTypo>
                <CardTypo color="#333330" weight="600" w="17%" align="center">
                  {Number(item.PledgePool.toFixed(2))}
                </CardTypo>
                <CardTypo color="#333330" weight="600" w="17%" align="center">
                  {Number(item.personalPledgePool.toFixed(2))}
                </CardTypo>
                <CardTypo color="#333330" weight="600" w="20%" align="center">
                  {Number(item.ratio.toFixed(2))}%
                </CardTypo>
                <CardTypo color="#333330" weight="600" w="14%" align="center">
                  {item.block}
                </CardTypo>
                <CardTypo color="#333330" weight="600" w="14%" align="center">
                  {Number(item.reward)}
                </CardTypo>
              </Flex>
            );
          })
        ) : !isNaN(claim.reward) ? (
          <Flex w="100%" mb="35px">
            <CardTypo color="#333330" weight="600" w="10%">
              {Number(claim.apy.toFixed(2))}%
            </CardTypo>
            {claim.tradeNum || !isNaN(claim.tradeNum) ? (
              <CardTypo color="#333330" weight="600" w="12%" align="center">
                {Number(claim.tradeNum.toFixed(2))}
              </CardTypo>
            ) : (
              <CardTypo color="#333330" weight="600" w="12%" align="center">
                {Number(claim.stableNum.toFixed(2))}
              </CardTypo>
            )}
            {claim.personalTradeNum ? (
              <CardTypo color="#333330" weight="600" w="18%" align="center">
                {Number(claim.personalTradeNum)}
              </CardTypo>
            ) : (
              <CardTypo color="#333330" weight="600" w="18%" align="center">
                {Number(claim.personalStableNum)}
              </CardTypo>
            )}
            <CardTypo color="#333330" weight="600" w="20%" align="center">
              {Number(claim.ratio.toFixed(2))}%
            </CardTypo>
            <CardTypo color="#333330" weight="600" w="17%" align="center">
              {claim.block}
            </CardTypo>
            <CardTypo color="#333330" weight="600" w="17%" align="center">
              {Number(claim.reward)}
            </CardTypo>
          </Flex>
        ) : (
          <Flex w="100%" mb="35px">
            <CardTypo color="#333330" w="20%" align="center">
              {Number(claim.reward.GALA)}
            </CardTypo>
            <CardTypo color="#333330" w="20%" align="center">
              {Number(claim.reward.ETH)}
            </CardTypo>
            <CardTypo color="#333330" w="20%" align="center">
              {Number(claim.reward.BTC)}
            </CardTypo>
            <CardTypo color="#333330" w="20%" align="center">
              {Number(claim.reward.BNB)}
            </CardTypo>
          </Flex>
        )}
      </Flex>
      <Flex w="15%" justify="center" h="100%" align="center">
        <ClaimButton onClick={onClaimHandler}>{t().claim.claim}</ClaimButton>
      </Flex>
    </Flex>
  );
}
