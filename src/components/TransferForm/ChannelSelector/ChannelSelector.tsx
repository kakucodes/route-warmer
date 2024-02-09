import { Button, Card, CardBody, CardHeader, Select, Text } from "grommet";
import { Refresh } from "grommet-icons";

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
      >
        <Select options={["channel-1"]} />{" "}
        <Button icon={<Refresh size="small" />} hoverIndicator />
      </CardBody>
    </Card>
  );
};
