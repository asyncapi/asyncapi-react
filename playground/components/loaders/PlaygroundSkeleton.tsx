import React from 'react';
import {
    NavigationSkeleton,
    TabsSkeleton,
    CodeEditorSkeleton,
    DocumentationSkeleton,
} from './skeletonComponents';

export const PlaygroundSkeleton: React.FC = () => (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
        <NavigationSkeleton />
        <div className="flex-1 flex">
            {/* Left Panel - Code Editors */}
            <div className="w-1/2 border-r border-slate-600 flex flex-col">
                <TabsSkeleton />
                <div className="flex-1">
                    <CodeEditorSkeleton />
                </div>
            </div>

            {/* Right Panel - Documentation */}
            <div className="w-1/2">
                <DocumentationSkeleton />
            </div>
        </div>
    </div>
);