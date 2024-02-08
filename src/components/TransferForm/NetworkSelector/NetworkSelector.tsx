import { Button, Card, CardBody, CardHeader, Select, Text } from "grommet";
import { Shift, Switch } from "grommet-icons";

export const NetworkSelector = () => {
  return (
    <Card background="background">
      <CardHeader pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small" weight="bold">
          Networks
        </Text>
      </CardHeader>
      <CardBody
        pad={{ horizontal: "small", vertical: "xsmall" }}
        direction="row"
        gap="xsmall"
      >
        <Select options={["cosmoshub"]} />
        <Button icon={<Shift />} />
        <Select options={["osmosis"]} />
      </CardBody>
    </Card>
  );
};
