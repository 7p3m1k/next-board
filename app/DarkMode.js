"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode() {
  let router = useRouter();

  useEffect(() => {
    let cookieValue = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];
    if (cookieValue == "") {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);

  return (
    <span
      className="darkModeBtn"
      onClick={() => {
        let cookieValue = ("; " + document.cookie)
          .split(`; mode=`)
          .pop()
          .split(";")[0];
        if (cookieValue == "light") {
          document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
          router.refresh();
        } else {
          document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
          router.refresh();
        }
      }}
    >
      {document.cookie == "mode=light" ? <span>☀️</span> : <span>🌙</span>}
    </span>
  );
}
