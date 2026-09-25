import { Component, type ReactNode, type ErrorInfo } from "react";
import i18n from "@/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <Card className="max-w-md text-center">
            <CardContent className="space-y-4 pt-6">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive" aria-hidden="true" />
              <h2 className="text-xl font-bold text-foreground">
                {i18n.t("Something went wrong")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {i18n.t("An unexpected error occurred. Please try again.")}
              </p>
              {this.state.error && (
                <details className="rounded-md bg-muted p-3 text-left text-xs">
                  <summary className="cursor-pointer font-medium">
                    {i18n.t("Error details")}
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words text-muted-foreground">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className="flex justify-center gap-2">
                <Button onClick={this.handleRetry}>{i18n.t("Try Again")}</Button>
                <Button variant="outline" onClick={this.handleReload}>
                  {i18n.t("Reload Page")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
