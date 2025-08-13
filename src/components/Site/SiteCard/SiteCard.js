import React from "react";
import {
  Card,
  ImageContainer,
  Image,
  Content,
  Title,
  Description,
  Category,
} from "./styles";

const SiteCard = ({ site }) => {
  console.log("site card", site);

  return (
    <Card
      as="a"
      href={site.siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ImageContainer>
        {site.coverImage ? (
          <Image src={site.coverImage} alt={site.title} />
        ) : (
          <span>🌐</span>
        )}
      </ImageContainer>
      <Content>
        <Title>{site.title}</Title>
        <Description>{site.description}</Description>
        <Category>{site.category}</Category>
      </Content>
    </Card>
  );
};

export default SiteCard;
