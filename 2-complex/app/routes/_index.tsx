import type { MetaFunction } from "@remix-run/node";
import { startTransition, useCallback, useState } from "react";
import useSWR from "swr";

const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

export const meta: MetaFunction = () => {
  return [{ title: "2-complex" }];
};

export default function Index() {
  const [showFakerResponder, setShowFakerResponder] = useState(false);
  const handleFetchResource = useCallback(() => {
    startTransition(() => setShowFakerResponder(true));
  }, []);
  const handleFetchResourceAndTransit = useCallback(() => {
    startTransition(() => setShowFakerResponder(true));
    location.href = "https://example.com";
  }, []);
  return (
    <div>
      <div>
        <button onClick={handleFetchResource} disabled={showFakerResponder}>
          Fetch resource
        </button>
      </div>
      <div>
        <button
          onClick={handleFetchResourceAndTransit}
          disabled={showFakerResponder}
        >
          Fetch resource and transit to another page
        </button>
      </div>
      {showFakerResponder && <FakerResponder />}
    </div>
  );
}

function FakerResponder() {
  const { data } = useSWR("https://fakeresponder.com/?sleep=3000", fetcher, {
    suspense: true,
  });
  return (
    <textarea style={{ width: "40em", height: "15em" }}>
      {JSON.stringify(data, null, 2)}
    </textarea>
  );
}
