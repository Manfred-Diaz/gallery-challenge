var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gallery = (function () {
    function Gallery(node, config) {
        this.node = node;
        this.config = config;
        this.init();
    }
    Gallery.prototype.init = function () {
        if (this.config.mode == 'filmstrip') {
            this.mode = new ThumbnailMode(this.node);
        }
        else if (this.config.mode == 'simple') {
            this.mode = new SimpleMode(this.node);
        }
        else
            throw 'Unsupported mode';
    };
    return Gallery;
})();
var SimpleMode = (function () {
    function SimpleMode(element) {
        this.selectedIndex = -1;
        this.element = element;
        this.init();
        this.initNavigation();
    }
    SimpleMode.prototype.init = function () {
        this.initContainer();
    };
    SimpleMode.prototype.initContainer = function () {
        var container = this.element.querySelector('.gallery-container');
        this.items = container.querySelectorAll('.item');
        this.next();
    };
    SimpleMode.prototype.initNavigationByImageClick = function () {
        var _this = this;
        var item;
        for (var i = 0; i < this.items.length; i++) {
            item = this.items.item(i);
            if (item) {
                item.onclick = function () { _this.next(); };
            }
        }
    };
    SimpleMode.prototype.initNavigationByButtons = function () {
        var _this = this;
        var navigator = this.element.querySelector('.navigator');
        if (navigator) {
            var nextButton = navigator.querySelector('.next');
            var prevButton = navigator.querySelector('.prev');
            if (nextButton)
                nextButton.onclick = function () { _this.next(); };
            if (prevButton)
                prevButton.onclick = function () { _this.prev(); };
        }
    };
    SimpleMode.prototype.initNavigation = function () {
        this.initNavigationByImageClick();
        this.initNavigationByButtons();
    };
    SimpleMode.prototype.next = function () {
        this.toggleItem();
        this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
        this.toggleItem();
    };
    SimpleMode.prototype.prev = function () {
        this.toggleItem();
        if (this.selectedIndex == 0)
            this.selectedIndex = this.items.length - 1;
        else
            this.selectedIndex = this.selectedIndex - 1;
        this.toggleItem();
    };
    SimpleMode.prototype.toggleItem = function () {
        var currentItem = this.items.item(this.selectedIndex);
        if (currentItem) {
            currentItem.classList.toggle('active');
        }
    };
    return SimpleMode;
})();
var ThumbnailMode = (function (_super) {
    __extends(ThumbnailMode, _super);
    function ThumbnailMode(node) {
        this.stripThumbnails = [];
        _super.call(this, node);
    }
    ThumbnailMode.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initStrip();
    };
    ThumbnailMode.prototype.initStrip = function () {
        this.createStripThumbnails();
    };
    ThumbnailMode.prototype.createStripThumbnails = function () {
        var strip = this.element.querySelector('.strip');
        if (!strip) {
            strip = document.createElement('div');
            strip.classList.add('strip');
            this.element.appendChild(strip);
        }
        var stripNode;
        for (var i = 0; i < this.items.length; i++) {
            stripNode = this.items.item(i).cloneNode(true);
            stripNode.setAttribute('data-slide', i.toString());
            strip.appendChild(stripNode);
            this.stripThumbnails.push(stripNode);
        }
    };
    ThumbnailMode.prototype.initNavigation = function () {
        _super.prototype.initNavigation.call(this);
        this.initNavigationByStripClick();
    };
    ThumbnailMode.prototype.initNavigationByStripClick = function () {
        var _this = this;
        for (var i = 0; i < this.stripThumbnails.length; i++) {
            this.stripThumbnails[i].onclick = function (event) {
                var index = parseInt(event.currentTarget.getAttribute('data-slide'));
                _this.selectThumbnailImage(index);
            };
        }
    };
    ThumbnailMode.prototype.selectThumbnailImage = function (index) {
        this.toggleItem();
        this.selectedIndex = index;
        this.toggleItem();
    };
    ThumbnailMode.prototype.toggleItem = function () {
        var currentItem = this.stripThumbnails[this.selectedIndex];
        if (currentItem) {
            currentItem.classList.toggle('active');
        }
        _super.prototype.toggleItem.call(this);
    };
    return ThumbnailMode;
})(SimpleMode);
!(function () {
    var galleries = document.querySelectorAll('.gallery');
    var gallery;
    for (var i = 0; i < galleries.length; i++) {
        gallery = galleries.item(i);
        new Gallery(gallery, {
            mode: gallery.getAttribute('data-mode')
        });
    }
})();
