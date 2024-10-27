import {
  Html,
  Link,
  Text,
  Preview,
  Body,
  Container,
} from "@react-email/components";
export default function WelcomeTemplate({ name }) {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Body style={body}>
        <Container>
          <Text>Hello {name}, how are you doing!</Text>
          <Link href="https://blaqkouture.com">www.blaqkouture.com</Link>
          <Link href="https://blaqkouture.com">www.blaqkouture.com</Link>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  background: "#ccc",
};
