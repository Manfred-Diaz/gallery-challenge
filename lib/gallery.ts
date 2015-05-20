class Gallery {

  private node: Element;
  private config: GalleryConfig;
  private mode: SimpleMode;

  constructor(node: Element, config: GalleryConfig) {
    this.node = node;
    this.config = config;
    this.init();
  }

  private init() {
    if(this.config.mode == 'filmstrip') {
      this.mode = new ThumbnailMode(this.node);
    }
    else
    if(this.config.mode == 'simple') {
      this.mode = new SimpleMode(this.node);
    }
    else
      throw 'Unsupported mode';
  }
}

interface GalleryConfig {
  mode: string;

}

class SimpleMode  {
   protected element: Element;
   protected items: NodeList;
   protected selectedIndex: number = -1;
   private nextButton: HTMLElement;
   private prevButton: HTMLElement;

   private container: Element;

   constructor(element: Element) {
     this.element = element;
     this.init();
     this.initNavigation();
   }

   protected init() {
      this.initContainer();
   }
   protected initContainer() {
     var container = this.element.querySelector('.gallery-container')
     this.items = container.querySelectorAll('.item');
     this.next();
   }
   private initNavigationByImageClick() {
     var item;
     for(var i = 0; i < this.items.length; i++) {
       item = <Element>this.items.item(i);
       if(item) {
         item.onclick = () => { this.next(); }
       }
     }
   }
   private initNavigationByButtons() {
     var navigator = this.element.querySelector('.navigator');

     if(navigator) {
       var nextButton = <HTMLElement> navigator.querySelector('.next');
       var prevButton = <HTMLElement> navigator.querySelector('.prev');

       if(nextButton)
        nextButton.onclick = () => { this.next(); }
       if(prevButton)
        prevButton.onclick = () => { this.prev(); }
     }

   }
   protected initNavigation() {
     this.initNavigationByImageClick();
     this.initNavigationByButtons();
   }
   protected next() {
     this.toggleItem();

     this.selectedIndex = (this.selectedIndex + 1) % this.items.length;

     this.toggleItem();
   }
   protected prev() {
     this.toggleItem();

     if(this.selectedIndex == 0)
        this.selectedIndex = this.items.length - 1;
     else
        this.selectedIndex = this.selectedIndex - 1;

     this.toggleItem();
   }
   protected toggleItem() {
     var currentItem = <Element>this.items.item(this.selectedIndex)

     if(currentItem) {
       currentItem.classList.toggle('active')
     }
   }

}
class ThumbnailMode extends SimpleMode {

  private stripThumbnails: HTMLElement[]

  constructor(node: Element) {
    this.stripThumbnails = []
    super(node);
  }

  protected init() {
    super.init();
    this.initStrip();
  }
  private initStrip() {
    this.createStripThumbnails()

  }
  private createStripThumbnails() {
    var strip = <Element>this.element.querySelector('.strip');

    if(!strip) {
      strip = document.createElement('div')
      strip.classList.add('strip');
      this.element.appendChild(strip)
    }
    var stripNode: HTMLElement;

    for (let i = 0; i < this.items.length; i++) {
        stripNode = <HTMLElement>this.items.item(i).cloneNode(true);
        stripNode.setAttribute('data-slide', i.toString());
        strip.appendChild(stripNode);
        this.stripThumbnails.push(stripNode);
    }
  }
  protected initNavigation() {
    super.initNavigation();
    this.initNavigationByStripClick();
  }
  private initNavigationByStripClick() {

    for(let i = 0; i < this.stripThumbnails.length; i++) {
      this.stripThumbnails[i].onclick = (event: MouseEvent) => {
        var index = parseInt((<HTMLElement>event.currentTarget).getAttribute('data-slide'))
        this.selectThumbnailImage(index)
      }
    }
  }
  private selectThumbnailImage(index: number) {
    this.toggleItem();
    this.selectedIndex = index;
    this.toggleItem();
  }
  protected toggleItem() {
    var currentItem = <Element>this.stripThumbnails[this.selectedIndex]

    if(currentItem) {
      currentItem.classList.toggle('active')
    }

    super.toggleItem();
  }
}

!(() => {
  var galleries = document.querySelectorAll('.gallery');

  var gallery: HTMLElement;

  for(let i = 0; i < galleries.length; i++) {

    gallery = <HTMLElement>galleries.item(i);

    new Gallery(gallery, {
      mode: gallery.getAttribute('data-mode')

    });

  }
})();
