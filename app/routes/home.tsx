import { Box, Code, Container, HStack, Stack, Text } from "@chakra-ui/react";
import type { Route } from "./+types/home";
import { Avatar } from "../components/ui/avatar";
import { useEffect } from "react";
import { useRevalidator } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "talk" }];
}

export async function loader() {
  const text = await fetch(
    "https://evilinsult.com/generate_insult.php?lang=ja&type=text"
  );

  return text;
}

const list: string[] = [];
export default function Home({ loaderData }: Route.ComponentProps) {
  list.push(loaderData as unknown as string);
  const revalidator = useRevalidator();

  useEffect(() => {
    const intervalId = setInterval(() => {
      revalidator.revalidate();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [revalidator]);

  return (
    <Box>
      <Container>
        <Text>下記APIを3秒ごとに実行して罵倒します</Text>
        <Code>
          https://evilinsult.com/generate_insult.php?lang=ja&type=text
        </Code>
      </Container>
      <Box p={10} bg={"blue.300"} rounded={5} m={5} h={"100%"}>
        <Stack gap={1}>
          {Array.from(new Set(list)).map((text) => (
            <Box p={3} key={text}>
              <HStack>
                <Avatar src="https://bit.ly/broken-link" colorPalette="red" />
                <Container bg={"green.300"} pt={3} pb={3} rounded={10}>
                  <Text>{text}</Text>
                </Container>
              </HStack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
