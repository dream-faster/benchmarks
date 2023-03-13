import { Router } from 'next/router';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { useState } from 'react';
 
import { Nav } from '@/layouts/nav';


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
  Router.events.on("routeChangeComplete", handleRouteChange);

  return (
    <div className="min-h-full">
      {script}
      {props.meta}
      <Nav/>
      {/* <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"> */}
        {props.children}
      {/* </div> */}
    </div>
  );
};
