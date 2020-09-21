import React, { useEffect } from "react";
import styled from "styled-components";

function App() {
  const checkNotificationsAllowed = async () => {
    await Notification.requestPermission();
  };

  useEffect(() => {
    checkNotificationsAllowed();
  }, []);

  return (
    <Container>
      <Card>
        <Heading>Vapo com vapid</Heading>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  background-color: #1261d1;
  display: flex;
  height: 100vh;
  flex-direction: row;
  width: 100vw;
  justify-content: center;
`;

const Card = styled.div`
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
`;

const Heading = styled.h1`
  font-size: 64px;
  color: #1261d1;
`;

export default App;
