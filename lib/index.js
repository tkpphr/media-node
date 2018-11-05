"use strict";
/*!
 *  media-node
 *  Copyright (c) 2018 tkpphr
 *  Released under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var MediaNode = (function () {
    function MediaNode(nodeName, parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
        this.nodeName = nodeName;
        this.nodes = [];
    }
    Object.defineProperty(MediaNode.prototype, "nodeName", {
        get: function () {
            return this._nodeName;
        },
        set: function (nodeName) {
            this._nodeName = nodeName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaNode.prototype, "imagePath", {
        get: function () {
            return this._imagePath;
        },
        set: function (imagePath) {
            this._imagePath = imagePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaNode.prototype, "soundPath", {
        get: function () {
            return this._soundPath;
        },
        set: function (soundPath) {
            this._soundPath = soundPath;
        },
        enumerable: true,
        configurable: true
    });
    MediaNode.prototype.getFullPath = function () {
        return this.createFullPath(this.parent, this.nodeName);
    };
    MediaNode.prototype.getChildCount = function () {
        return this.nodes.length;
    };
    MediaNode.prototype.getRoot = function () {
        return this.parent === null ? this : this.parent.getRoot();
    };
    MediaNode.prototype.getFirstChild = function () {
        return this.nodes[0];
    };
    MediaNode.prototype.getLastChild = function () {
        return this.nodes[this.getChildCount() - 1];
    };
    MediaNode.prototype.getChildren = function () {
        return this.nodes;
    };
    MediaNode.prototype.find = function (path) {
        if (this.getFullPath() === path) {
            return this;
        }
        else {
            for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                var node = _a[_i];
                if (path.indexOf(node.getFullPath()) === 0) {
                    if (path === node.getFullPath()) {
                        return node;
                    }
                    else {
                        var result = node.find(path);
                        if (result !== null) {
                            return node.find(path);
                        }
                    }
                }
            }
            return null;
        }
    };
    MediaNode.prototype.findAll = function (filter) {
        var foundList = [];
        this.findAllRecursive(this, foundList, filter);
        return foundList;
    };
    MediaNode.prototype.addChild = function (node) {
        this.nodes.push(node);
    };
    MediaNode.prototype.getChild = function (index) {
        return this.nodes[index];
    };
    MediaNode.prototype.insertChild = function (index, node) {
        this.nodes.splice(index, 0, node);
    };
    MediaNode.prototype.removeChild = function (node) {
        var index = this.nodes.indexOf(node);
        if (index > -1) {
            this.nodes.splice(index, 1);
        }
    };
    MediaNode.prototype.removeChildAt = function (index) {
        this.nodes.splice(index, 1);
    };
    MediaNode.prototype.clearChildren = function () {
        this.nodes.splice(0, this.nodes.length - 1);
    };
    MediaNode.prototype.findAllRecursive = function (parent, foundList, filter) {
        if (filter(parent)) {
            foundList.push(parent);
        }
        for (var _i = 0, _a = parent.nodes; _i < _a.length; _i++) {
            var child = _a[_i];
            this.findAllRecursive(child, foundList, filter);
        }
    };
    MediaNode.prototype.createFullPath = function (parent, path) {
        if (parent === null) {
            return path;
        }
        else {
            return this.createFullPath(parent.parent, parent.nodeName + "\\" + path);
        }
    };
    return MediaNode;
}());
exports.MediaNode = MediaNode;
