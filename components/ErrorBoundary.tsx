'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center p-8">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Une erreur inattendue s'est produite</p>
            <p className="text-xs text-gray-500 mt-1">Actualisez la page ou réessayez dans un instant.</p>
          </div>
          <button
            onClick={this.reset}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
          >
            <RefreshCw size={14} />
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
