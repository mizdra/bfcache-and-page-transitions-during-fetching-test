import type { MetaFunction } from "@remix-run/node";
import { startTransition, useCallback, useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "2-complex" }];
};

export default function Index() {
  const [isFetchStarted, setIsFetchStarted] = useState(false);
  const [showFakerResponder, setShowFakerResponder] = useState(false);
  const handleFetchResource = useCallback(() => {
    setIsFetchStarted(true);
    startTransition(() => setShowFakerResponder(true));
  }, []);
  const handleFetchResourceAndTransit = useCallback(() => {
    setIsFetchStarted(true);
    startTransition(() => setShowFakerResponder(true));
    location.href = "https://example.com/";
  }, []);
  return (
    <div>
      <div>
        <button onClick={handleFetchResource} disabled={isFetchStarted}>
          Fetch resource
        </button>
      </div>
      <div>
        <button
          onClick={handleFetchResourceAndTransit}
          disabled={isFetchStarted}
        >
          Fetch resource and transit to another page
        </button>
      </div>
      {showFakerResponder && <FakerResponder />}
    </div>
  );
}

const resource: { data: any, promise: null | Promise<any>, error: null | Error } = {
  data: null,
  promise: null,
  error: null,
};
function useFetchData() {
  if (resource.data) {
    return resource.data;
  } if (resource.error) {
    throw resource.error;
  } else if (resource.promise) {
    throw resource.promise;
  } else {
    resource.promise = fetch("https://fakeresponder.com/?sleep=3000")
      .then((res) => res.text())
      .then((text) => {
        resource.data = text;
      }).catch((error) => {
        resource.error = error;
      })
    throw resource.promise;
  }
}

function FakerResponder() {
  const data = useFetchData();
  return (
    <textarea style={{ width: "40em", height: "15em" }}>
      {data}
    </textarea>
  );
}
