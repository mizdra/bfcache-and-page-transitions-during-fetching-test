import React from "react";

type Props = {
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
  error: unknown;
};
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      const error = this.state.error;
      return (
        <div>
          <h1>Error occurred</h1>
          <pre>
            {typeof error === "object" && error !== null
              ? error.toString()
              : String(error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
