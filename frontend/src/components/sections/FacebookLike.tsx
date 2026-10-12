"use client";

import { useEffect, useState } from "react";

const FACEBOOK_PAGE_URL = "https://www.facebook.com/NekojitaPunk";
const FACEBOOK_SDK_SRC =
  "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (root?: HTMLElement | null) => void;
      };
    };
  }
}

export default function FacebookLike() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const parse = () => {
      window.FB?.XFBML.parse();
      setReady(true);
    };

    const existing = document.getElementById("facebook-sdk");
    if (existing) {
      parse();
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-sdk";
    script.src = FACEBOOK_SDK_SRC;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = parse;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-xs font-black uppercase tracking-widest text-neutral-500">
        Seguinos en Facebook
      </span>
      {!ready && (
        <span className="text-sm text-neutral-500">Cargando botón…</span>
      )}
      <div
        className="fb-like"
        data-href={FACEBOOK_PAGE_URL}
        data-layout="button_count"
        data-action="like"
        data-size="small"
        data-share="false"
      />
    </div>
  );
}
