import { useAccount, useSigner } from 'hooks';
import { useMemo } from 'react';
import { getChainId } from 'utils/chains';
import { useClient } from 'wagmi';

export function useChain() {
  // const selfManagedChainId = useAppSelector((state) => state.chains.chainId);
  // const { chain: { id: chainId } = { id: selfManagedChainId } } = useNetwork();
  // const chainId = useAppSelector((state) => state.chains.chainId);

  const chainId = useMemo(() => getChainId(), []);
  const { data: signer } = useSigner();
  const client = useClient();
  const provider = useMemo(() => {
    if (chainId && typeof client.config.provider === 'function') return client.config.provider({ chainId });
    return client.provider;
  }, [chainId, client.config, client.provider]);

  const { address: account, isConnected } = useAccount();

  return { chainId, signer, provider, account, isConnected };
}
