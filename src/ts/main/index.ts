/*!
 *  media-node
 *  Copyright (c) 2018 tkpphr
 *  Released under the MIT License.
 */

export interface IMediaNode<T extends IMediaNode<T>> {
    readonly parent: T | null;
    readonly nodes: T[];
    nodeName: string;
    imagePath:string;
    soundPath:string;
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
    getImage():Promise<ArrayBuffer>;
    getSound():Promise<ArrayBuffer>;
}

export abstract class MediaNode<T extends IMediaNode<T>> implements IMediaNode<T> {
    public readonly parent: T | null;
    public readonly nodes: T[];
    private _nodeName: string;
    private _imagePath:string;
    private _soundPath:string;

    public get nodeName(){
        return this._nodeName;
    }

    public set nodeName(nodeName:string){
        this._nodeName=nodeName;
    }

    public get imagePath(){
        return this._imagePath;
    }

    public set imagePath(imagePath:string){
        this._imagePath=imagePath;
    }

    public get soundPath(){
        return this._soundPath;
    }

    public set soundPath(soundPath:string){
        this._soundPath=soundPath;
    }

    public constructor(nodeName: string, parent: T|null = null) {
        this.parent = parent;
        this.nodeName = nodeName;
        this.nodes = [];
    }

    public getFullPath(): string {
        return this.createFullPath(this.parent, this.nodeName);
    }

    public getChildCount(): number {
        return this.nodes.length;
    }

    public getRoot(): T {
        return this.parent === null ? this as any : this.parent.getRoot();
    }

    public getFirstChild(): T | undefined {
        return this.nodes[0];
    }

    public getLastChild(): T | undefined {
        return this.nodes[this.getChildCount() - 1];
    }

    public getChildren(): T[] {
        return this.nodes;
    }

    public find(path: string): T | null {
        if (this.getFullPath() === path) {
            return this as any;
        } else {
            for (const node of this.nodes) {
                if (path.indexOf(node.getFullPath()) === 0) {
                    if (path === node.getFullPath()) {
                        return node;
                    } else {
                        const result: T | null = node.find(path);
                        if (result !== null) {
                            return node.find(path);
                        }
                    }
                }
            }
            return null;
        }
    }

    public findAll(filter: (node: T) => boolean): T[] {
        const foundList: T[] = [];
        this.findAllRecursive(this as any, foundList, filter);
        return foundList;
    }

    public addChild(node: T): void {
        this.nodes.push(node);
    }

    public getChild(index: number): T {
        return this.nodes[index];
    }

    public insertChild(index: number, node: T): void {
        this.nodes.splice(index, 0, node);
    }

    public removeChild(node: T): void {
        const index: number = this.nodes.indexOf(node);
        if (index > -1) {
            this.nodes.splice(index, 1);
        }
    }

    public removeChildAt(index: number): void {
        this.nodes.splice(index, 1);
    }

    public clearChildren(): void {
        this.nodes.splice(0, this.nodes.length - 1);
    }

    public abstract async getImage():Promise<ArrayBuffer>;
    public abstract async getSound():Promise<ArrayBuffer>;

    private findAllRecursive(parent: T, foundList: T[], filter: (node: T) => boolean) {
        if (filter(parent)) {
            foundList.push(parent);
        }
        for (const child of parent.nodes) {
            this.findAllRecursive(child, foundList, filter);
        }
    }

    private createFullPath(parent: T | null, path: string): string {
        if (parent === null) {
            return path;
        } else {
            return this.createFullPath(parent.parent, parent.nodeName + "\\" + path);
        }
    }

}