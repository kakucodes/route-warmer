import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  Text,
  TextInput,
} from "grommet";

export const AssetSelector = () => {
  return (
    <Card background="background">
      <CardHeader pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small" weight="bold">
          Asset
        </Text>
      </CardHeader>
      <CardBody
        pad={{ horizontal: "small", vertical: "xsmall" }}
        direction="row"
        gap="xsmall"
        justify="between"
      >
        <Box width="50%">
          <Select options={["Newt"]} />
        </Box>

        <Box width="50%">
          <TextInput textAlign="end" placeholder="0" />
        </Box>
      </CardBody>
      <CardFooter pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small">Balance: 0.0000</Text>
      </CardFooter>
    </Card>
  );
};
