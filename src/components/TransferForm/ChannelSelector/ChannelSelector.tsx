import { Button, Card, CardBody, CardHeader, Select, Text } from "grommet";

export const ChannelSelector = () => {
  return (
    <Card background="background">
      <CardHeader pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small" weight="bold">
          Channel
        </Text>
      </CardHeader>
      <CardBody
        pad={{ horizontal: "small", vertical: "xsmall" }}
        direction="row"
        gap="xsmall"
      >
        <Select options={["channel-1"]} />
      </CardBody>
    </Card>
  );
};
