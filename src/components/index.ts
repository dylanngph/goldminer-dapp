import dynamic from 'next/dynamic';

export { default as BaseModal } from './BaseModal';
export { default as CurrencyInputPanel } from './CurrencyInputPanel';
export { default as Logo } from './Logo';
export { default as CurrencyLogo } from './CurrencyLogo';
export { default as BlockNumberProvider } from './BlockNumberProvider';
export { default as TransactionConfirmationModal } from './TransactionConfirmationModal';
export { default as ListLogo } from './ListLogo';
export { default as TransactionSettings } from './TransactionSettings';
export { default as Switch } from './Switch';

export const ConnectButton = dynamic(() => import('./ConnectButton'), {
  ssr: false,
});
