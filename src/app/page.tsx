'use client';

import { SafeDump } from '@/components/SafeDump';
import { useIsSafeApp } from '@/hooks/useIsSafeApp';

export default function Page(): React.ReactElement {
  const isSafeApp = useIsSafeApp();

  if (!isSafeApp) {
    return (
      <p>
        This is a Safe App and can only be used in the Safe{'{Wallet}'}{' '}
        interface. In order to use it, add the URL as a custom Safe App.
      </p>
    );
  }

  return <SafeDump />;
}
