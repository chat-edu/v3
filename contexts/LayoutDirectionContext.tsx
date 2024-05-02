import React, {createContext, ReactNode, useCallback, useContext, useState} from "react"

import dagre from 'dagre';

import {LayoutDirections} from "@/types/graph/GraphLayout";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

interface LayoutDirectionContextType {
    direction: LayoutDirections,
    toggleDirection: () => void;
}

export const LayoutDirectionContext = createContext<LayoutDirectionContextType>({
    direction: LayoutDirections.Horizontal,
    toggleDirection: () => {},
});

export const useLayoutDirection = () => useContext(LayoutDirectionContext);

interface LayoutDirectionContextProps {
    children: ReactNode;
}

export const LayoutDirectionProvider: React.FC<LayoutDirectionContextProps> = ({ children }) => {

    const [direction, setDirection] = useState<LayoutDirections>(LayoutDirections.Horizontal);

    const toggleDirection = useCallback(() => {
        setDirection((prev) => (prev === LayoutDirections.Vertical ? LayoutDirections.Horizontal : LayoutDirections.Vertical));
    }, []);

    return (
        <LayoutDirectionContext.Provider
            value={{
                direction,
                toggleDirection,
            }}
        >
            {children}
        </LayoutDirectionContext.Provider>
    )
}