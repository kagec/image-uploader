import styled from "styled-components";

const Footer = () => {
  return (
    <FooterSign>
      created by <span>kagec</span>- devChallenges.io
    </FooterSign>
  );
};

const FooterSign = styled.footer`
  color: #a9a9a9;
  font-family: "Montserrat";
  font-size: 14px;

  > span {
    font-weight: 700;
    border-bottom: solid 1px;
  }
`;

export default Footer;
