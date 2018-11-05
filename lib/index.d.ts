/*!
 *  media-node
 *  Copyright (c) 2018 tkpphr
 *  Released under the MIT License.
 */
export interface IMediaNode<T extends IMediaNode<T>> {
    readonly parent: T | null;
    readonly nodes: T[];
    nodeName: string;
    imagePath: string;
    soundPath: string;
    getFullPath(): string;
    getRoot(): T;
    getFirstChild(): T | undefined;
    getLastChild(): T | undefined;
    getChildCount(): number;
    find(path: string): T | null;
    findAll(filter: (node: T) => boolean): T[];
    addChild(node: T): void;
    getChild(index: number): T;
    insertChild(index: number, node: T): void;
    removeChild(node: T): void;
    removeChildAt(index: number): void;
    clearChildren(): void;
    getImage(): Promise<ArrayBuffer>;
    getSound(): Promise<ArrayBuffer>;
}
export declare abstract class MediaNode<T extends IMediaNode<T>> implements IMediaNode<T> {
    readonly parent: T | null;
    readonly nodes: T[];
    private _nodeName;
    private _imagePath;
    private _soundPath;
    nodeName: string;
    imagePath: string;
    soundPath: string;
    constructor(nodeName: string, parent?: T | null);
    getFullPath(): string;
    getChildCount(): number;
    getRoot(): T;
    getFirstChild(): T | undefined;
    getLastChild(): T | undefined;
    getChildren(): T[];
    find(path: string): T | null;
    findAll(filter: (node: T) => boolean): T[];
    addChild(node: T): void;
    getChild(index: number): T;
    insertChild(index: number, node: T): void;
    removeChild(node: T): void;
    removeChildAt(index: number): void;
    clearChildren(): void;
    abstract getImage(): Promise<ArrayBuffer>;
    abstract getSound(): Promise<ArrayBuffer>;
    private findAllRecursive;
    private createFullPath;
}
