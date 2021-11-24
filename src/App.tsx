import styled from "styled-components";
import Footer from "./components/Footer";
import ImageUploader from "./components/ImageUploader";

const App = () => {
  return (
    <AppContainer>
      <ImageUploader />
      <Footer />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  letter-spacing: -0.035em;

  > footer {
    bottom: 24px;
  }
`;

export default App;
