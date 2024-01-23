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

const getCachedAnimations = (): any => {
  const safeParseJSON = (str: string | null) => {
    if (!str) {
      return null;
    }
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  };
  return safeParseJSON(localStorage.getItem("animations")) || [];
};

const getAnimations = async (reload?: any): Promise<any> => {
  await fetch("/api/animations")
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("animations", JSON.stringify(data));
      if (reload) {
        reload();
      }
    });
  const cache = localStorage.getItem("animations");
  if (cache) {
    return JSON.parse(cache);
  }
  return [];
};

export const Animations = () => {
  const { data, isLoading } = usePromise(() => getAnimations());
  const { data: cache } = usePromise(() => getCachedAnimations());

  if (cache && Array.isArray(cache) && cache.length > 0 && !data) {
    return (
      <Grid.Container gap={2} justify="center" height="100px">
        {cache &&
          Array.isArray(cache) &&
          cache

            // .sort(() => Math.random() - 0.5)
            .map((animation: any) => (
              <Grid xs={12} key={animation.pathname}>
                <AnimationBox prompt={animation.pathname} url={animation.url} />
              </Grid>
            ))}
      </Grid.Container>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid.Container gap={2} justify="center" height="100px">
      {data &&
        Array.isArray(data) &&
        data

          // .sort(() => Math.random() - 0.5)
          .map((animation: any) => (
            <Grid xs={12} key={animation.pathname}>
              <AnimationBox prompt={animation.pathname} url={animation.url} />
            </Grid>
          ))}
    </Grid.Container>
  );
};
