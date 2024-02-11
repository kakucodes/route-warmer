import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type TxHistory = {
  source: {
    address: string;
    chainId: string;
    chainName: string;
  };
  destination: {
    address: string;
    chainId: string;
    chainName: string;
  };
  txHash: string;
  code: number;
  timestamp: string;
  channel: string;
  asset: {
    symbol?: string;
    amount: string;
    denom: string;
  };
};

type TxHistoryInterface = {
  txHistory: TxHistory[];
  recordTx: (tx: TxHistory) => void;
  clearHistory: () => void;
};

const TxHistoryContext = createContext<TxHistoryInterface>({
  txHistory: [],
  recordTx: () => {},
  clearHistory: () => {},
});

const TX_HISTORY_KEY = "txHistory";

export const TxHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [txHistory, setTxHistory] = useState<TxHistory[]>(
    localStorage.getItem(TX_HISTORY_KEY)
      ? JSON.parse(localStorage.getItem(TX_HISTORY_KEY) as string)
      : []
  );

  /**
   * Records a transaction to the tx history so that
   * it can be displayed in the TxHistorySidebar
   */
  const recordTx = useCallback(
    (tx: TxHistory) => {
      console.log("Recording tx", tx);
      setTxHistory((txHistory) => [tx, ...txHistory]);
      localStorage.setItem(TX_HISTORY_KEY, JSON.stringify([tx, ...txHistory]));
    },
    [txHistory]
  );

  /**
   * Clears the tx history and removes it from local storage
   */
  const clearHistory = useCallback(() => {
    setTxHistory([]);
    localStorage.setItem(TX_HISTORY_KEY, JSON.stringify([]));
  }, []);

  return (
    <TxHistoryContext.Provider value={{ txHistory, recordTx, clearHistory }}>
      {children}
    </TxHistoryContext.Provider>
  );
};

export const useTxHistory = () => useContext(TxHistoryContext);
