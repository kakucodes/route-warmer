import { Box, Header, Image, Text } from "grommet";

export const AppHeader = () => {
  return (
    <Box
      tag="header"
      background="brand"
      elevation="medium"
      direction="row"
      justify="between"
      pad="small"
      align="center"
    >
      <Box gap="small" direction="row" align="center">
        <Image
          height="55"
          width="55"
          src={`${process.env.PUBLIC_URL}/kakulogo.png`}
        />
        <Header>
          <Text weight="bold" size="large">
            Kaku's Route Warmer
          </Text>
        </Header>
      </Box>
    </Box>
  );
};
