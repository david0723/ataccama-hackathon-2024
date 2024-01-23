"use client";
import { ThreadMessagesPage } from "openai/resources/beta/threads/index.mjs";
// import { Stack, Text, InputField, Button } from "@kiwicom/orbit-components";
import { use, useEffect, useRef, useState } from "react";
import * as motion from "motion";
import {
  GeistProvider,
  CssBaseline,
  Card,
  Grid,
  Input,
  Button,
  Loading,
  Text,
} from "@geist-ui/core";
import { Animations } from "@/src/components/Animations";

const presets = [
  {
    id: 1,
    description:
      "Glowing Firefly: A single firefly glowing and flying in a small loop.",
  },
  {
    id: 2,
    description: "Bouncing Ball: A ball bouncing up and down continuously.",
  },
  {
    id: 3,
    description:
      "Rotating Earth: A view of the Earth slowly rotating on its axis.",
  },
  {
    id: 4,
    description:
      "Fluttering Butterfly: A butterfly flapping its wings while hovering in place.",
  },
  {
    id: 5,
    description: "Swinging Pendulum: A pendulum swinging back and forth.",
  },
  { id: 6, description: "Floating Clouds: Clouds drifting across a blue sky." },
  {
    id: 7,
    description:
      "Blooming Flower: A flower opening and closing its petals in a cycle.",
  },
  {
    id: 8,
    description:
      "Beating Heart: A heart expanding and contracting rhythmically.",
  },
  {
    id: 9,
    description:
      "Spinning Windmill: A windmill with its blades spinning continuously.",
  },
  { id: 10, description: "Waving Hand: A cartoon hand waving back and forth." },
  {
    id: 11,
    description:
      "Flickering Candle: A candle flame flickering in a light breeze.",
  },
  { id: 12, description: "Rising Sun: A sun rising and setting over a hill." },
  {
    id: 13,
    description:
      "Falling Snow: Snowflakes gently falling and looping back to the top.",
  },
  { id: 14, description: "Wagging Dog Tail: A happy dog wagging its tail." },
  {
    id: 15,
    description:
      "Dripping Water Faucet: Water dripping from a faucet in a steady rhythm.",
  },
  {
    id: 16,
    description: "Turning Gears: Interlocking gears turning in unison.",
  },
  {
    id: 17,
    description:
      "Jumping Fish: A fish leaping out of water and diving back in.",
  },
  {
    id: 18,
    description:
      "Floating Balloon: A balloon gently rising and falling in the air.",
  },
  {
    id: 19,
    description: "Blinking Neon Sign: A neon sign blinking on and off.",
  },
  {
    id: 20,
    description: "Rolling Waves: Waves rolling onto a beach and receding back.",
  },
];

const randomDescription = () => {
  const index = Math.floor(Math.random() * presets.length);
  return presets[index].description;
};

const placeholder = randomDescription();

let x = false;

const runAnime = () => {
  // animate the title
  const title = document.getElementById("title");
  if (title) {
    motion.animate(
      title,
      { color: ["blue", "yellow", "red", "black"] },
      { duration: 10, repeat: Infinity, easing: "ease-in-out" }
    );
  }
};

const Sun = () => (
  <div
    className="sun"
    style={{
      width: "30px",
      height: "30px",
      borderRadius: "25%",
      backgroundColor: "yellow",
      margin: "10px",
    }}
  ></div>
);

function ThirdPartyHtmlComponent({ htmlContent }: { htmlContent: string }) {
  // IMPORTANT: Ensure the HTML content is sanitized to prevent XSS attacks
  // Use a library like DOMPurify to sanitize htmlContent
  // const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default function Home() {
  const [sceneDescription, setSceneDescription] = useState<string>(placeholder);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [animation, setAnimation] = useState<{
    html: string;
    script: string;
  }>();
  // const [runId, setRunId] = useState<string>();

  useEffect(() => {
    if (!x) {
      setTimeout(() => {
        x = true;
        runAnime();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (animation) {
      setTimeout(() => {
        const MotionOne = motion;
        const stagger = motion.stagger;
        eval(animation.script);
      }, 2000);
    }
  }, [animation]);

  return (
    <GeistProvider>
      <Grid.Container gap={2} justify="center" height="100px">
        <Grid xs={12}>
          <Card shadow width="100%">
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Text h1>
                  <span id="title" style={{ color: "#FF0080" }}>
                    Animate
                  </span>{" "}
                  your imagination
                </Text>

                <Input
                  disabled={isLoading}
                  crossOrigin={true}
                  //   label="Scene description"
                  placeholder={placeholder}
                  //   help="Describe your scene in a few words"
                  value={sceneDescription}
                  onChange={(event) =>
                    setSceneDescription(event.currentTarget.value)
                  }
                  width={"90%"}
                />
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  placeholder={sceneDescription}
                  onClick={async () => {
                    setIsLoading(true);

                    const response = await fetch(
                      `/api/animate?scene=${sceneDescription}`
                    );

                    const parsedResponse = await response.json();

                    setIsLoading(false);

                    const { animation } = parsedResponse;

                    const { html, runAnimation } = JSON.parse(animation);

                    // save animation in localstorage
                    let db = localStorage.getItem("animations") as any;
                    if (db) {
                      db = JSON.parse(db);
                    }
                    if (!db) {
                      // localStorage.setItem("animations", JSON.stringify([]));
                      db = [];
                    }

                    // localStorage.setItem(
                    //   "animations",
                    //   JSON.stringify([
                    //     ...db,
                    //     {
                    //       prompt: sceneDescription,
                    //       animation: { html, script: runAnimation },
                    //     },
                    //   ])
                    // );

                    setAnimation({ html, script: runAnimation });

                    // setThreadId(thread.id);
                    // setRunId(run.id);

                    // checkStatus(thread.id, run.id);
                  }}
                >
                  Generate
                </Button>

                {animation ? (
                  <ThirdPartyHtmlComponent htmlContent={animation.html} />
                ) : (
                  // Frame
                  <div
                    id="base-frame"
                    style={{
                      width: "500px",
                      height: "500px",
                      border: "1px solid black",
                    }}
                  ></div>
                )}
              </div>
            </div>
          </Card>
        </Grid>
        <Grid xs={24}>
          <Animations />
        </Grid>
      </Grid.Container>
    </GeistProvider>
  );
}
