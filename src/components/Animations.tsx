"use client";
import { Button, Card, Grid, Loading, Text } from "@geist-ui/core";
import { usePromise } from "../hooks/usePromise";
import { useCallback, useEffect } from "react";
import * as motion from "motion";

function ThirdPartyHtmlComponent({ htmlContent }: { htmlContent: string }) {
  // IMPORTANT: Ensure the HTML content is sanitized to prevent XSS attacks
  // Use a library like DOMPurify to sanitize htmlContent
  // const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

const AnimationBox = ({ prompt, url }: { prompt: string; url: string }) => {
  const { data, isLoading } = usePromise(async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

  const runAnimation = useCallback(() => {
    if (data && "runAnimation" in data && "html" in data) {
      setTimeout(() => {
        const MotionOne = motion;
        const stagger = motion.stagger;

        eval(data.runAnimation);
      }, 0);
    }
  }, [data]);
  console.log({ data, prompt, url });

  if (!isLoading && data && "runAnimation" in data && "html" in data) {
    return (
      <Card>
        <Text h1>{prompt.substring(0, 40)}</Text>
        <ThirdPartyHtmlComponent htmlContent={data.html} />
        <Card.Footer>
          <Button placeholder="play" onClick={runAnimation}>
            Play
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  return (
    <Card>
      <Loading />
    </Card>
  );
};

const getAnimations = async (reload?: any): Promise<any> => {
  const cache = localStorage.getItem("animations");

  if (cache) {
    fetch("/api/animations")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("animations", JSON.stringify(data));
        if (reload) {
          reload();
        }
      });
    return JSON.parse(cache);
  }
  return [];
};

export const Animations = () => {
  const { data, isLoading } = usePromise(() => getAnimations());

  if (isLoading) {
    return <Loading />;
  }

  console.log({ data });

  return (
    <Grid.Container gap={2} justify="center" height="100px">
      {data &&
        Array.isArray(data) &&
        data

          .sort(() => Math.random() - 0.5)
          .map((animation: any) => (
            <Grid key={animation.id} xs={12}>
              <AnimationBox prompt={animation.pathname} url={animation.url} />
            </Grid>
          ))}
    </Grid.Container>
  );
};
