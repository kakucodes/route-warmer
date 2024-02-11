import * as yup from "yup";

export type TransferInputs = {
  sourceChain: { chainName: string; chainId: string };
  destinationChain: { chainName: string; chainId: string };
  channel: string;
  asset: {
    denom: string;
    amount: string;
  };
};

export const transferFormSchema = yup.object().shape({
  sourceChain: yup.object().shape({
    chainName: yup.string().required(),
    chainId: yup.string().required(),
  }),
  destinationChain: yup.object().shape({
    chainName: yup.string().required(),
    chainId: yup.string().required(),
  }),
  channel: yup
    .string()
    .matches(/channel-\d+/, "Channel must follow the format channel-<number>")
    .required(),
  asset: yup.object().shape({
    denom: yup.string().required(),
    amount: yup.string().required(),
  }),
});
