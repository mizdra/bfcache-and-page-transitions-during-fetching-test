import { Suspense, useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

function onPageshow(event: PageTransitionEvent) {
  if (event.persisted) {
    console.log("This page was restored from the bfcache.");
  }
}

export function App() {
  const [showFakerResponder, setShowFakerResponder] = useState(false);
  const handleFetchResource = useCallback(() => {
    setShowFakerResponder(true);
  }, []);
  const handleFetchResourceAndTransit = useCallback(() => {
    setShowFakerResponder(true);
    location.href = "https://example.com/";
  }, []);
  useEffect(() => {
    window.addEventListener("pageshow", onPageshow);
    return () => window.removeEventListener("pageshow", onPageshow);
  }, []);
  return (
    <ErrorBoundary>
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
      {showFakerResponder && (
        <Suspense fallback="Fetching...">
          <FakerResponder />
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

const resource: {
  data: any;
  promise: null | Promise<any>;
  error: null | Error;
} = {
  data: null,
  promise: null,
  error: null,
};
function useFetchData() {
  if (resource.data) {
    return resource.data;
  }
  if (resource.error) {
    throw resource.error;
  } else if (resource.promise) {
    throw resource.promise;
  } else {
    resource.promise = fetch("https://fakeresponder.com/?sleep=3000")
      .then((res) => res.text())
      .then((text) => {
        resource.data = text;
      })
      .catch((error) => {
        resource.error = error;
      });
    throw resource.promise;
  }
}

function FakerResponder() {
  const data = useFetchData();
  return <textarea style={{ width: "40em", height: "15em" }}>{data}</textarea>;
}
