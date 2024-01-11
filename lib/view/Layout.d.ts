import * as React from "react";
import { DockLocation } from "../DockLocation";
import { I18nLabel } from "../I18nLabel";
import { Action } from "../model/Action";
import { BorderNode } from "../model/BorderNode";
import { Model } from "../model/Model";
import { Node } from "../model/Node";
import { TabNode } from "../model/TabNode";
import { TabSetNode } from "../model/TabSetNode";
import { Rect } from "../Rect";
import { IJsonTabNode } from "../model/IJsonModel";
export declare type CustomDragCallback = (dragging: TabNode | IJsonTabNode, over: TabNode, x: number, y: number, location: DockLocation) => void;
export declare type DragRectRenderCallback = (content: React.ReactElement | undefined, node?: Node, json?: IJsonTabNode) => React.ReactElement | undefined;
export declare type FloatingTabPlaceholderRenderCallback = (dockPopout: () => void, showPopout: () => void) => React.ReactElement | undefined;
export declare type NodeMouseEvent = (node: TabNode | TabSetNode | BorderNode, event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
export declare type ShowOverflowMenuCallback = (node: TabSetNode | BorderNode, mouseEvent: React.MouseEvent<HTMLElement, MouseEvent>, items: {
    index: number;
    node: TabNode;
}[], onSelect: (item: {
    index: number;
    node: TabNode;
}) => void) => void;
export declare type TabSetPlaceHolderCallback = (node: TabSetNode) => React.ReactNode;
export declare type IconFactory = (node: TabNode) => React.ReactNode;
export declare type TitleFactory = (node: TabNode) => ITitleObject | React.ReactNode;
export interface ILayoutProps {
    model: Model;
    factory: (node: TabNode) => React.ReactNode;
    font?: IFontValues;
    fontFamily?: string;
    iconFactory?: IconFactory;
    titleFactory?: TitleFactory;
    icons?: IIcons;
    onAction?: (action: Action) => Action | undefined;
    onRenderTab?: (node: TabNode, renderValues: ITabRenderValues) => void;
    onRenderTabSet?: (tabSetNode: TabSetNode | BorderNode, renderValues: ITabSetRenderValues) => void;
    onModelChange?: (model: Model, action: Action) => void;
    onExternalDrag?: (event: React.DragEvent<HTMLDivElement>) => undefined | {
        dragText: string;
        json: any;
        onDrop?: (node?: Node, event?: Event) => void;
    };
    classNameMapper?: (defaultClassName: string) => string;
    i18nMapper?: (id: I18nLabel, param?: string) => string | undefined;
    supportsPopout?: boolean | undefined;
    popoutURL?: string | undefined;
    realtimeResize?: boolean | undefined;
    onTabDrag?: (dragging: TabNode | IJsonTabNode, over: TabNode, x: number, y: number, location: DockLocation, refresh: () => void) => undefined | {
        x: number;
        y: number;
        width: number;
        height: number;
        callback: CustomDragCallback;
        invalidated?: () => void;
        cursor?: string | undefined;
    };
    onRenderDragRect?: DragRectRenderCallback;
    onRenderFloatingTabPlaceholder?: FloatingTabPlaceholderRenderCallback;
    onContextMenu?: NodeMouseEvent;
    onAuxMouseClick?: NodeMouseEvent;
    onShowOverflowMenu?: ShowOverflowMenuCallback;
    onTabSetPlaceHolder?: TabSetPlaceHolderCallback;
}
export interface IFontValues {
    size?: string;
    family?: string;
    style?: string;
    weight?: string;
}
export interface ITabSetRenderValues {
    headerContent?: React.ReactNode;
    centerContent?: React.ReactNode;
    stickyButtons: React.ReactNode[];
    buttons: React.ReactNode[];
    headerButtons: React.ReactNode[];
}
export interface ITabRenderValues {
    leading: React.ReactNode;
    content: React.ReactNode;
    name: string;
    buttons: React.ReactNode[];
}
export interface ITitleObject {
    titleContent: React.ReactNode;
    name: string;
}
export interface ILayoutState {
    rect: Rect;
    calculatedHeaderBarSize: number;
    calculatedTabBarSize: number;
    calculatedBorderBarSize: number;
    editingTab?: TabNode;
    showHiddenBorder: DockLocation;
    portal?: React.ReactPortal;
    showEdges?: boolean;
}
export interface IIcons {
    close?: React.ReactNode | ((tabNode: TabNode) => React.ReactNode);
    closeTabset?: React.ReactNode | ((tabSetNode: TabSetNode) => React.ReactNode);
    popout?: React.ReactNode | ((tabNode: TabNode) => React.ReactNode);
    maximize?: React.ReactNode | ((tabSetNode: TabSetNode) => React.ReactNode);
    restore?: React.ReactNode | ((tabSetNode: TabSetNode) => React.ReactNode);
    more?: React.ReactNode | ((tabSetNode: TabSetNode | BorderNode, hiddenTabs: {
        node: TabNode;
        index: number;
    }[]) => React.ReactNode);
}
export interface ICustomDropDestination {
    rect: Rect;
    callback: CustomDragCallback;
    invalidated: (() => void) | undefined;
    dragging: TabNode | IJsonTabNode;
    over: TabNode;
    x: number;
    y: number;
    location: DockLocation;
    cursor: string | undefined;
}
/**
 * A React component that hosts a multi-tabbed layout
 */
export declare class Layout extends React.Component<ILayoutProps, ILayoutState> {
    private _worker?;
    private draggingOutOfWindowBounds;
    private externalDragStarted;
    private id;
    constructor(props: ILayoutProps);
    /**
     * Create instance of Shared Worker
     */
    instantiateSharedWorkerInstance(): void;
    private listenerLayoutId?;
    /**
     * Initializes the drag operation.
     * This function prepares the drag node and sets up initial drag configurations.
     *
     * @param e The message event received from the worker.
     */
    initializeDrag(e: MessageEvent): void;
    /**
     * Handles the scenario when the drag operation goes outside window bounds.
     * This function sends a negative ping response and resets drag configurations.
     */
    cancelDragOutsideBounds(): void;
    /**
     * Determines whether a mouse event's coordinates are within desired window boundaries.
     *
     * This method checks:
     * 1. If the mouse's x-coordinate (clientX) is between the left and right boundaries of the window.
     * 2. If the mouse's y-coordinate (clientY) is either above the top boundary or below the bottom boundary of the window.
     *
     * @param clientX - The x-coordinate of the mouse event. Optional.
     * @param clientY - The y-coordinate of the mouse event. Optional.
     *
     * @returns A boolean indicating whether the mouse coordinates are within the desired bounds.
     */
    private isMouseEventWithinDesiredBounds;
    /**
     * Processes the message received from the worker and takes appropriate actions based on its content.
     *
     * This method orchestrates a series of tasks depending on the type of message received from the worker.
     * It checks:
     * 1. The validity of the message and its ID.
     * 2. Ignores messages that have the same ID as the current component.
     * 3. Handles responses from the worker based on the messageType.
     * 4. Determines if the mouse event is within the desired window bounds and processes accordingly.
     *
     * @param e - The MessageEvent received from the worker.
     */
    handleWorkerMessage(e: MessageEvent): void;
    /**
     * Adds a new tab to the given tabset
     * @param tabsetId the id of the tabset where the new tab will be added
     * @param json the json for the new tab node
     */
    addTabToTabSet(tabsetId: string, json: IJsonTabNode): void;
    /**
     * Adds a new tab to the active tabset (if there is one)
     * @param json the json for the new tab node
     */
    addTabToActiveTabSet(json: IJsonTabNode): void;
    /**
     * Adds a new tab by dragging a labeled panel to the drop location, dragging starts immediatelly
     * @param dragText the text to show on the drag panel
     * @param json the json for the new tab node
     * @param onDrop a callback to call when the drag is complete (node and event will be undefined if the drag was cancelled)
     */
    addTabWithDragAndDrop(dragText: string | undefined, json: IJsonTabNode, onDrop?: (node?: Node, event?: Event) => void): void;
    /**
     * Move a tab/tabset using drag and drop
     * @param node the tab or tabset to drag
     * @param dragText the text to show on the drag panel
     * @param event
     */
    moveTabWithDragAndDrop(node: TabNode | TabSetNode, dragText?: string, event?: Event): void;
    /**
     * Adds a new tab by dragging a labeled panel to the drop location, dragging starts when you
     * mouse down on the panel
     *
     * @param dragText the text to show on the drag panel
     * @param json the json for the new tab node
     * @param onDrop a callback to call when the drag is complete (node and event will be undefined if the drag was cancelled)
     */
    addTabWithDragAndDropIndirect(dragText: string | undefined, json: IJsonTabNode, onDrop?: (node?: Node, event?: Event) => void): void;
    /**
     * Checks if the mouse pointer is outside the left boundary of the given rectangle.
     * @param domRect
     * @param {number} x - The x-coordinate of the mouse pointer.
     * @returns {boolean} - Returns true if the mouse pointer is outside the left boundary.
     */
    isMouseOutsideLeft(domRect: DOMRect, x: number): boolean;
    /**
     * Checks if the mouse pointer is outside the right boundary of the given rectangle.
     * @param domRect
     * @param {number} x - The x-coordinate of the mouse pointer.
     * @returns {boolean} - Returns true if the mouse pointer is outside the right boundary.
     */
    isMouseOutsideRight(domRect: DOMRect, x: number): boolean;
    /**
     * Checks if the mouse pointer is above the top boundary of the given rectangle.
     * @param domRect
     * @param {number} y - The y-coordinate of the mouse pointer.
     * @returns {boolean} - Returns true if the mouse pointer is above the top boundary.
     */
    isMouseAbove(domRect: DOMRect, y: number): boolean;
    /**
     * Checks if the mouse pointer is below the bottom boundary of the given rectangle.
     * @param domRect
     * @param {number} y - The y-coordinate of the mouse pointer.
     * @returns {boolean} - Returns true if the mouse pointer is below the bottom boundary.
     */
    isMouseBelow(domRect: DOMRect, y: number): boolean;
    private dragInitialised?;
    /**
     * Prepares the message and sends it over shared worker based on event type and state.
     * @param event - The React mouse event.
     * @param isDropEvent - Specifies if the event is a drop event.
     */
    private prepareAndPostSharedWorkerMessage;
    /**
     * Utility method to send a message to the worker port.
     * @param data - The data to be sent to the worker.
     */
    private postWorkerMessage;
    /**
     * Clones the mouse event so it can be sent over shared worker instance
     * @param event
     * @returns
     */
    private cloneMouseEvent;
    private eventType;
    private eventData;
    private serializedEventTarget;
    private target?;
    /**
     * Deserialize a MouseEvent based on provided clientX, clientY, origin positions, and an optional serialized event.
     * @param clientX - The x-coordinate within the application's viewport.
     * @param clientY - The y-coordinate within the application's viewport.
     * @param originScreenX - The x-coordinate of the original screen.
     * @param originScreenY - The y-coordinate of the original screen.
     * @param originInnerWidth - The inner width of the original screen.
     * @param originInnerHeight - The inner height of the original screen.
     * @param serializedEvent - An optional serialized event.
     * @returns A MouseEvent based on the provided parameters or undefined if no valid target exists.
     */
    private deserializeMouseEvent;
    /**
     * Checks if Window A is to the left of Window B based on screen and inner dimensions.
     * @param originScreenX - The x-coordinate of the original screen.
     * @param originInnerWidth - The inner width of the original screen.
     * @param currentScreenX - The x-coordinate of the current screen.
     * @returns True if Window A is to the left of Window B, otherwise false.
     */
    isToLeft(originScreenX: number, originInnerWidth: number, currentScreenX: number): boolean;
    /**
     * Checks if Window A is to the right of Window B based on screen and inner dimensions.
     * @param originScreenX - The x-coordinate of the original screen.
     * @param currentInnerWidth - The inner width of the current screen.
     * @param currentScreenX - The x-coordinate of the current screen.
     * @returns True if Window A is to the right of Window B, otherwise false.
     */
    isToRight(originScreenX: number, currentInnerWidth: number, currentScreenX: number): boolean;
    /**
     * Checks if Window A is above Window B based on screen and inner dimensions.
     * @param originScreenY - The y-coordinate of the original screen.
     * @param originInnerHeight - The inner height of the original screen.
     * @param currentScreenY - The y-coordinate of the current screen.
     * @returns True if Window A is above Window B, otherwise false.
     */
    isAbove(originScreenY: number, originInnerHeight: number, currentScreenY: number): boolean;
    /**
     * Checks if Window A is below Window B based on screen and inner dimensions.
     * @param originScreenY - The y-coordinate of the original screen.
     * @param currentScreenY - The y-coordinate of the current screen.
     * @param currentInnerHeight - The inner height of the current screen.
     * @returns True if Window A is below Window B, otherwise false.
     */
    isBelow(originScreenY: number, currentScreenY: number, currentInnerHeight: number): boolean;
}
