"use client";
import { ThreadMessagesPage } from "openai/resources/beta/threads/index.mjs";
// import { Stack, Text, InputField, Button } from "@kiwicom/orbit-components";
import { useEffect, useRef, useState } from "react";
import * as motion from "motion";

// declare global {
//   interface MotionOne {}
// }

function ThirdPartyHtmlComponent({ htmlContent }: { htmlContent: string }) {
  // IMPORTANT: Ensure the HTML content is sanitized to prevent XSS attacks
  // Use a library like DOMPurify to sanitize htmlContent
  // const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

const testObject =
  "{\n  \"html\": \"<div><div id='sun' style='width: 100px; height: 100px; background-color: yellow; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%;'></div><div id='horizon' style='width: 100%; height: 10px; background-color: orange; position: absolute; bottom: 0;'></div></div>\",\n  \"runAnimation\": \"MotionOne.animate({\\n  target: '#sun',\\n  duration: 2000,\\n  delay: 500,\\n  easing: 'easeOutQuint',\\n  keyframes: [\\n    { opacity: 0, scale: 0.25 },\\n    { opacity: 1, scale: 1 }\\n  ]\\n});\\n\\nMotionOne.animate({\\n  target: '#horizon',\\n  duration: 2000,\\n  easing: 'easeOutQuint',\\n  keyframes: [\\n    { width: '0%' },\\n    { width: '100%' }\\n  ]\\n});\"\n}";

export const useDebounce = function <T>(value: T, delay: number) {
  const [innerState, setInnerState] = useState<T>(value);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const id = setTimeout(() => setInnerState(value), delay);

    timeoutId.current = id;
  }, [value, delay, timeoutId]);

  return innerState;
};

export default function Home() {
  const object = JSON.parse(testObject);

  const thirdPartyHtml =
    "<div>Some HTML content from a third-party source</div>";

  console.log({ object });

  motion.animate;

  useEffect(() => {
    const MotionOne = motion;

    setTimeout(() => eval(object.script), 2000);
  }, []);

  return (
    <div>
      Dummy
      <div>
        <div
          id="sun"
          style="
        width: 100px;
        height: 100px;
        background-color: yellow;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      "
        ></div>
        <div
          id="horizon"
          style="
        width: 100%;
        height: 10px;
        background-color: orange;
        position: absolute;
        bottom: 0;
      "
        ></div>
      </div>
    </div>
  );
}
