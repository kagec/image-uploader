import styled from "styled-components";
import ImageUploader from "./components/ImageUploader";

const App = () => {
  return (
    <AppContainer>
      <ImageUploader />
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
`;

export default App;
