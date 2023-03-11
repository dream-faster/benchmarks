import { Router } from 'next/router';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { useState } from 'react';
 
import Example from '@/layouts/dashboard';


type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  wide: boolean;
};

export const Main = (props: IMainProps) => {
  const [script, setScript] = useState(
    <Script
      src="https://cdn.counter.dev/script.js"
      data-id="4652b1fe-0a4c-4510-ab82-1036a5f6f75f"
      data-utcoffset="1"
    />
  );

  const handleRouteChange = () =>
    setScript(
      <Script
        src="https://cdn.counter.dev/script.js"
        data-id="4652b1fe-0a4c-4510-ab82-1036a5f6f75f"
        data-utcoffset="1"
      />
    );
  Router.events.on('routeChangeComplete', handleRouteChange);

  return (
    <div className="h-full min-h-screen w-screen overflow-hidden bg-zinc-100 text-gray-700 antialiased dark:bg-slate-800">
      {script}
      {props.meta}
      <Example> 
      {props.children}
      </Example>
    </div>
  );
};