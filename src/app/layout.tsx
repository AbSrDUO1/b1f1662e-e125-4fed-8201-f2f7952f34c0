import type { Metadata } from "next";
import {
  Inter_Tight,
  Playfair_Display,
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Poppins,
  Raleway,
  Ubuntu,
  Nunito
} from "next/font/google";
import "./globals.css";
import {PostHogWrapper} from "@/components/PostHogWrapper";
import AuroraBackground from "@/components/background/AuroraBackground";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Coffee Shop – A Passion for Coffee",
  description: "Discover the finest coffee and a warm atmosphere. Visit our coffee shop today!",
  keywords: [],
  metadataBase: new URL("https://yourwebsite.com"),
  openGraph: {
    title: "Coffee Shop – A Passion for Coffee",
    description: "Discover the finest coffee and a warm atmosphere. Visit our coffee shop today!",
    url: "https://yourwebsite.com",
    siteName: "Coffee Shop",
    images: [{ url: "https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/coffee-shop-interior-1760910347227-cddddf1d.jpg", alt: "Coffee shop interior" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee Shop – A Passion for Coffee",
    description: "Discover the finest coffee and a warm atmosphere.",
    images: []
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <PostHogWrapper>
      <body
          className={`${interTight.variable} ${playfairDisplay.variable} ${roboto.variable} ${openSans.variable} ${lato.variable} ${montserrat.variable} ${poppins.variable} ${raleway.variable} ${ubuntu.variable} ${nunito.variable} antialiased`}
      >
      <AuroraBackground />
      {children}
      
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  // Only run in iframe, not in parent window
  if (window.self === window.top) return;

  // Only initialize once
  if (window.__webildEditorInitialized) return;
  window.__webildEditorInitialized = true;

  console.log('[Webild Visual Editor] Initializing...');

  // State variables
  let isActive = false;
  let hoveredElement = null;
  let selectedElement = null;
  let originalContent = null;
  let isEditing = false;
  let elementTypeLabel = null;
  let selectedCategoryLabel = null;
  let hoverOverlay = null;
  let scrollTimeout = null;
  let isScrolling = false;

  // Constants - Enhanced element detection
  const textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'li', 'label', 'div'];
  const buttonElements = ['button', 'a', 'div', 'span'];
  const invalidElements = ['html', 'body', 'script', 'style', 'meta', 'link', 'head', 'noscript', 'title'];
  const hoverClass = 'webild-hover';
  const selectedClass = 'webild-selected';

  // Styles - Updated to blue colors
  const style = document.createElement('style');
  style.id = 'webild-inspector-styles';
  style.textContent = \`
    .webild-hover {
      outline: 2px dashed rgba(59, 130, 246, 0.7) !important;
      outline-offset: 2px !important;
      cursor: pointer !important;
      transition: outline 0.15s ease !important;
    }
    .webild-selected {
      outline: 2px solid rgba(59, 130, 246, 1) !important;
      outline-offset: 2px !important;
      transition: outline 0.15s ease !important;
    }
    [contenteditable="true"].webild-selected {
      outline: 2px solid rgba(59, 130, 246, 1) !important;
      background-color: rgba(59, 130, 246, 0.05) !important;
    }
    .webild-element-type-label {
      position: fixed;
      z-index: 999999;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(37, 99, 235, 0.95));
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      letter-spacing: 0.3px;
    }
    .webild-selected-category-label {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999998;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(37, 99, 235, 0.95));
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .webild-hover-overlay {
      position: fixed !important;
      background-color: rgba(59, 130, 246, 0.15) !important;
      border-radius: 4px !important;
      pointer-events: none !important;
      z-index: 999998 !important;
      transition: all 0.15s ease !important;
    }
  \`;
  document.head.appendChild(style);
  
  // Get unique CSS selector for an element
  const getUniqueSelector = (element) => {
    const path = [];
    let current = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.id) {
        selector = \`#\${current.id}\`;
        path.unshift(selector);
        break;
      }
      
      // Add class information for more stable selectors
      try {
        let classNameStr = '';
        if (current.className) {
          if (typeof current.className === 'string') {
            classNameStr = current.className;
          } else if (current.className.baseVal !== undefined) {
            classNameStr = current.className.baseVal;
          }
        }
        
        if (classNameStr) {
          const classes = classNameStr.trim().split(/\s+/).filter(cls =>
            cls && !cls.startsWith('webild-')
          );
          if (classes.length > 0) {
            selector += '.' + classes.slice(0, 2).join('.');
          }
        }
      } catch (e) {}
      
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(el => el.tagName === current.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1;
          selector += \`:nth-of-type(\${index})\`;
        }
      }
      
      path.unshift(selector);
      current = parent;
      
      if (path.length >= 3) break;
    }
    
    return path.join(' > ');
  };
  
  // Get section ID from data-section attribute
  const getSectionId = (element) => {
    let current = element;
    while (current && current !== document.body) {
      const sectionId = current.getAttribute('data-section');
      if (sectionId) {
        return sectionId;
      }
      current = current.parentElement;
    }
    return 'hero';
  };
  
  // Enhanced element type detection with better button recognition
  const getElementType = (element) => {
    const tagName = element.tagName.toLowerCase();
    const computedStyle = window.getComputedStyle(element);

    // Check for section first (highest priority)
    const sectionId = element.getAttribute('data-section');
    if (sectionId) {
      return sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    }

    // Image elements
    if (tagName === 'img') return 'Image';

    // Check for background images
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none') {
      const urlMatch = backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (urlMatch) {
        return 'Image';
      }
    }

    // Enhanced Button detection
    if (tagName === 'button' || element.getAttribute('role') === 'button') {
      return 'Button';
    }

    // Check for button-like elements with enhanced detection
    const hasClickHandler = element.getAttribute('onclick') ||
                           element.addEventListener ||
                           element.style.cursor === 'pointer' ||
                           computedStyle.cursor === 'pointer';

    const hasButtonStyling = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                            computedStyle.backgroundColor !== 'transparent' &&
                            (computedStyle.borderRadius !== '0px' ||
                             computedStyle.border !== 'none' ||
                             computedStyle.padding !== '0px');

    const hasButtonText = element.textContent &&
                         element.textContent.trim().length > 0 &&
                         element.textContent.trim().length < 50;

    if (buttonElements.includes(tagName) && (hasClickHandler || hasButtonStyling) && hasButtonText) {
      // Special case for links - if it has href, it's still a button if it looks like one
      if (tagName === 'a' && element.getAttribute('href') && !hasButtonStyling) {
        return 'Text';
      }
      return 'Button';
    }

    // Text elements
    const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'a', 'li'];
    if (textTags.includes(tagName)) return 'Text';

    // Div elements with only text content
    if (tagName === 'div' && element.children.length === 0 && element.textContent.trim()) {
      return 'Text';
    }

    return null;
  };
  
  // Get element info
  const getElementInfo = (element) => {
    const rect = element.getBoundingClientRect();
    const tagName = element.tagName.toLowerCase();
    const selector = getUniqueSelector(element);
    const sectionId = getSectionId(element);
    
    let className = undefined;
    try {
      if (element.className) {
        if (typeof element.className === 'string') {
          className = element.className;
        } else if (element.className.baseVal !== undefined) {
          className = element.className.baseVal;
        }
      }
    } catch (e) {}
    
    const info = {
      tagName: tagName,
      id: element.id || undefined,
      className: className,
      selector: selector,
      elementType: null,
      sectionId: sectionId,
      boundingBox: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    };
    
    // Check for images
    if (tagName === 'img') {
      info.imageData = {
        src: element.src,
        alt: element.alt || undefined,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
        isBackground: false
      };
    }
    
    // Check for background images
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none') {
      const urlMatch = backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (urlMatch) {
        if (tagName !== 'img') {
          info.imageData = {
            src: urlMatch[1],
            isBackground: true
          };
        } else {
          if (!info.imageData) info.imageData = {};
          info.imageData.backgroundImageSrc = urlMatch[1];
        }
      }
    }
    
    // Set element type
    const elementType = getElementType(element);
    info.elementType = elementType;
    
    // Add button-specific data with enhanced extraction
    if (elementType === 'Button') {
      const buttonText = element.textContent?.trim() || element.value || element.getAttribute('aria-label') || '';
      const buttonHref = element.getAttribute('href') ||
                        element.getAttribute('data-href') ||
                        element.getAttribute('onclick') ||
                        element.dataset?.link ||
                        undefined;

      info.buttonData = {
        text: buttonText,
        href: buttonHref
      };
    }

    // Add text content for Text elements
    if (elementType === 'Text') {
      info.textContent = element.textContent || '';
    }
    
    return info;
  };
  
  // Check if element is valid for editing
  const isValidElement = (element) => {
    if (!isActive) return false;
    const tagName = element.tagName?.toLowerCase();
    return !invalidElements.includes(tagName);
  };
  
  // Check if element is text editable
  const isTextElement = (element) => {
    const elementType = getElementType(element);
    return elementType === 'Text';
  };

  // Check if element is a button
  const isButtonElement = (element) => {
    const elementType = getElementType(element);
    return elementType === 'Button';
  };
  
  // Make element editable
  const makeEditable = (element, clickEvent) => {
    if (!isTextElement(element)) return;
    
    originalContent = element.textContent;
    element.contentEditable = 'true';
    element.focus();
    isEditing = true;
    
    window.parent.postMessage({
      type: 'webild-text-editing-started',
      data: { selector: getElementInfo(element).selector }
    }, '*');
    
    const handleInput = () => {
      if (element.textContent !== originalContent) {
        window.parent.postMessage({
          type: 'webild-text-changed',
          data: { 
            selector: getElementInfo(element).selector,
            hasChanges: true
          }
        }, '*');
      }
    };
    
    element.addEventListener('input', handleInput);
    element.dataset.inputHandler = 'true';
    
    if (clickEvent && element.childNodes.length > 0) {
      const range = document.caretRangeFromPoint(clickEvent.clientX, clickEvent.clientY);
      if (range) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  
  // Make element uneditable
  const makeUneditable = (element, save = false) => {
    if (!element || element.contentEditable !== 'true') return;
    
    element.contentEditable = 'false';
    isEditing = false;
    
    if (element.dataset.inputHandler === 'true') {
      element.removeEventListener('input', () => {});
      delete element.dataset.inputHandler;
    }
    
    window.parent.postMessage({
      type: 'webild-text-editing-ended',
      data: { selector: getElementInfo(element).selector }
    }, '*');
    
    if (save && originalContent !== element.textContent) {
      const elementInfo = getElementInfo(element);
      const change = {
        type: 'updateText',
        selector: elementInfo.selector,
        oldValue: originalContent,
        newValue: element.textContent,
        elementType: elementInfo.elementType,
        sectionId: elementInfo.sectionId,
        timestamp: Date.now()
      };

      // Save to localStorage for instant tracking
      saveChangeToStorage(change);

      // Also send to parent for immediate UI updates
      window.parent.postMessage({
        type: 'webild-element-changed',
        data: change
      }, '*');
    } else if (!save && originalContent !== null) {
      element.textContent = originalContent;
    }
    
    originalContent = null;
  };
  
  // Create hover overlay
  const createHoverOverlay = (element) => {
    const rect = element.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'webild-hover-overlay';
    overlay.style.cssText = \`
      position: fixed !important;
      top: \${rect.top - 2}px !important;
      left: \${rect.left - 2}px !important;
      width: \${rect.width + 4}px !important;
      height: \${rect.height + 4}px !important;
      background-color: rgba(90, 113, 230, 0.15) !important;
      border-radius: 4px !important;
      pointer-events: none !important;
      z-index: 999998 !important;
      transition: all 0.15s ease !important;
    \`;
    document.body.appendChild(overlay);
    return overlay;
  };
  
  // Remove hover overlay
  const removeHoverOverlay = () => {
    if (hoverOverlay) {
      hoverOverlay.remove();
      hoverOverlay = null;
    }
  };
  
  // Show element type label
  const showElementTypeLabel = (element, elementType) => {
    if (!elementType) return;
    
    removeElementTypeLabel();
    
    const rect = element.getBoundingClientRect();
    elementTypeLabel = document.createElement('div');
    elementTypeLabel.className = 'webild-element-type-label';
    elementTypeLabel.textContent = elementType;
    elementTypeLabel.style.cssText = \`
      left: \${rect.left}px;
      top: \${rect.top - 32}px;
    \`;
    
    // Adjust if off-screen
    if (rect.top < 40) {
      elementTypeLabel.style.top = \`\${rect.bottom + 4}px\`;
    }
    
    document.body.appendChild(elementTypeLabel);
  };
  
  // Remove element type label
  const removeElementTypeLabel = () => {
    if (elementTypeLabel) {
      elementTypeLabel.remove();
      elementTypeLabel = null;
    }
  };
  
  // Show selected category label
  const showSelectedCategoryLabel = (elementType) => {
    removeSelectedCategoryLabel();
    if (!elementType) return;
    
    selectedCategoryLabel = document.createElement('div');
    selectedCategoryLabel.className = 'webild-selected-category-label';
    selectedCategoryLabel.textContent = \`Editing: \${elementType}\`;
    document.body.appendChild(selectedCategoryLabel);
  };
  
  // Remove selected category label
  const removeSelectedCategoryLabel = () => {
    if (selectedCategoryLabel) {
      selectedCategoryLabel.remove();
      selectedCategoryLabel = null;
    }
  };
  
  // Mouse over handler
  const handleMouseOver = (e) => {
    if (!isActive) return;
    
    const target = e.target;
    if (!isValidElement(target) || target === hoveredElement || target === selectedElement) {
      return;
    }
    
    if (hoveredElement && hoveredElement !== selectedElement) {
      hoveredElement.classList.remove(hoverClass);
      if (hoveredElement.dataset.webildOriginalPosition) {
        hoveredElement.style.position = hoveredElement.dataset.webildOriginalPosition === 'none' ? '' : hoveredElement.dataset.webildOriginalPosition;
        delete hoveredElement.dataset.webildOriginalPosition;
      }
      removeHoverOverlay();
      removeElementTypeLabel();
    }
    
    hoveredElement = target;
    
    const computedStyle = window.getComputedStyle(target);
    const currentPosition = computedStyle.position;
    
    if (currentPosition === 'static' || currentPosition === '') {
      hoveredElement.dataset.webildOriginalPosition = currentPosition || 'none';
      hoveredElement.style.position = 'relative';
    }
    
    hoveredElement.classList.add(hoverClass);
    
    if ((!selectedElement || selectedElement !== target) && !isScrolling) {
      hoverOverlay = createHoverOverlay(target);
    }
    
    const elementType = getElementType(target);
    showElementTypeLabel(target, elementType);
    
    window.parent.postMessage({
      type: 'webild-element-hover',
      data: getElementInfo(target)
    }, '*');
  };
  
  // Mouse out handler
  const handleMouseOut = (e) => {
    if (!isActive) return;
    
    if (hoveredElement && hoveredElement !== selectedElement) {
      hoveredElement.classList.remove(hoverClass);
      
      if (hoveredElement.dataset.webildOriginalPosition) {
        hoveredElement.style.position = hoveredElement.dataset.webildOriginalPosition === 'none' ? '' : hoveredElement.dataset.webildOriginalPosition;
        delete hoveredElement.dataset.webildOriginalPosition;
      }
      
      removeHoverOverlay();
      removeElementTypeLabel();
      
      hoveredElement = null;
      
      window.parent.postMessage({
        type: 'webild-element-hover',
        data: null
      }, '*');
    }
  };
  
  // Click handler
  const handleClick = (e) => {
    if (!isActive) return;
    
    if (isEditing) {
      e.stopPropagation();
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target;
    if (!isValidElement(target)) return;
    
    if (selectedElement && selectedElement !== target) {
      makeUneditable(selectedElement, false);
      selectedElement.classList.remove(selectedClass);
      selectedElement.classList.remove(hoverClass);
      
      if (selectedElement.dataset.webildOriginalPosition) {
        selectedElement.style.position = selectedElement.dataset.webildOriginalPosition === 'none' ? '' : selectedElement.dataset.webildOriginalPosition;
        delete selectedElement.dataset.webildOriginalPosition;
      }
      
      removeHoverOverlay();
      removeSelectedCategoryLabel();
    }
    
    if (selectedElement === target) {
      if (target.dataset.webildOriginalPosition) {
        target.style.position = target.dataset.webildOriginalPosition === 'none' ? '' : target.dataset.webildOriginalPosition;
        delete target.dataset.webildOriginalPosition;
      }
      
      removeHoverOverlay();
      removeSelectedCategoryLabel();
      
      selectedElement = null;
      window.parent.postMessage({
        type: 'webild-element-selected',
        data: null
      }, '*');
      return;
    }
    
    selectedElement = target;
    selectedElement.classList.add(selectedClass);
    
    removeHoverOverlay();
    removeElementTypeLabel();
    
    if (hoveredElement === target) {
      hoveredElement.classList.remove(hoverClass);
      hoveredElement = null;
    }
    
    const elementInfo = getElementInfo(target);
    showSelectedCategoryLabel(elementInfo.elementType);
    
    window.parent.postMessage({
      type: 'webild-element-selected',
      data: elementInfo
    }, '*');
    
    if (isTextElement(target)) {
      setTimeout(() => makeEditable(target, e), 50);
    }
  };
  
  // Key down handler
  const handleKeyDown = (e) => {
    if (!isActive) return;
    if (!isEditing || !selectedElement) return;
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      makeUneditable(selectedElement, true);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      makeUneditable(selectedElement, false);
    }
  };
  
  // Blur handler
  const handleBlur = (e) => {
    if (!isActive) return;
    if (isEditing && selectedElement && e.target === selectedElement) {
      makeUneditable(selectedElement, true);
    }
  };
  
  // Scroll handler
  const handleScroll = () => {
    if (!isActive) return;
    
    removeHoverOverlay();
    isScrolling = true;
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      if (hoveredElement && (!selectedElement || selectedElement !== hoveredElement)) {
        hoverOverlay = createHoverOverlay(hoveredElement);
      }
    }, 150);
    
    window.parent.postMessage({
      type: 'webild-iframe-scroll'
    }, '*');
  };
  
  // localStorage utilities for instant change tracking
  const getStorageKey = () => {
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/').filter(Boolean);
    return \`webild-changes-\${pathParts.join('-')}\`;
  };

  const saveChangeToStorage = (change) => {
    try {
      const storageKey = getStorageKey();
      const existingChanges = JSON.parse(localStorage.getItem(storageKey) || '[]');

      // Remove any existing change for the same selector
      const filteredChanges = existingChanges.filter(c => c.selector !== change.selector);
      filteredChanges.push(change);

      localStorage.setItem(storageKey, JSON.stringify(filteredChanges));

      // Notify parent about the change
      window.parent.postMessage({
        type: 'webild-change-saved-locally',
        data: { change, allChanges: filteredChanges }
      }, '*');
    } catch (error) {
      console.error('Failed to save change to localStorage:', error);
    }
  };

  const clearLocalChanges = () => {
    try {
      const storageKey = getStorageKey();
      localStorage.removeItem(storageKey);
      window.parent.postMessage({
        type: 'webild-local-changes-cleared',
        data: {}
      }, '*');
    } catch (error) {
      console.error('Failed to clear local changes:', error);
    }
  };

  // Message handler
  const handleMessage = (e) => {
    if (!e.data || !e.data.type) return;

    if (e.data.type === 'webild-activate-editor') {
      if (!isActive) {
        isActive = true;
        console.log('[Webild Visual Editor] Activated');
        window.parent.postMessage({ type: 'webild-editor-activated' }, '*');
      }
      return;
    }

    if (e.data.type === 'webild-deactivate-editor') {
      if (isActive) {
        isActive = false;

        // Clean up
        if (selectedElement) {
          makeUneditable(selectedElement, false);
          selectedElement.classList.remove(selectedClass);
          selectedElement = null;
        }
        if (hoveredElement) {
          hoveredElement.classList.remove(hoverClass);
          hoveredElement = null;
        }

        removeHoverOverlay();
        removeElementTypeLabel();
        removeSelectedCategoryLabel();

        console.log('[Webild Visual Editor] Deactivated');
        window.parent.postMessage({ type: 'webild-editor-deactivated' }, '*');
      }
      return;
    }

    if (e.data.type === 'webild-clear-local-changes') {
      clearLocalChanges();
      return;
    }

    if (!isActive) return;
    
    if (e.data.type === 'webild-update-text') {
      const { selector, newValue } = e.data.data;
      const element = document.querySelector(selector);

      if (element && isTextElement(element)) {
        element.textContent = newValue;
        // Don't save to localStorage here as this is a real-time update
      }
      return;
    }

    if (e.data.type === 'webild-update-button') {
      const { selector, text, href } = e.data.data;
      const element = document.querySelector(selector);

      if (element && isButtonElement(element)) {
        if (text !== undefined) {
          element.textContent = text;
        }
        if (href !== undefined) {
          if (element.tagName.toLowerCase() === 'a') {
            element.href = href;
          } else {
            element.setAttribute('data-href', href);
          }
        }
        // Don't save to localStorage here as this is a real-time update
      }
      return;
    }

    if (e.data.type === 'webild-replace-image') {
      const { selector, newSrc, isBackground } = e.data.data;
      const element = document.querySelector(selector);

      if (!element) {
        window.parent.postMessage({
          type: 'webild-image-replacement-error',
          data: { selector, message: 'Element not found', success: false }
        }, '*');
        return;
      }

      try {
        let replaced = false;
        let oldValue = '';

        if (isBackground) {
          oldValue = window.getComputedStyle(element).backgroundImage;
          element.style.backgroundImage = \`url('\${newSrc}')\`;
          replaced = true;
        } else if (element.tagName.toLowerCase() === 'img') {
          oldValue = element.src;
          element.src = newSrc;
          replaced = true;
        } else {
          const hasBackgroundImage = window.getComputedStyle(element).backgroundImage !== 'none';
          if (hasBackgroundImage) {
            oldValue = window.getComputedStyle(element).backgroundImage;
            element.style.backgroundImage = \`url('\${newSrc}')\`;
            replaced = true;
          }
        }

        if (replaced) {
          const elementInfo = getElementInfo(element);
          const change = {
            type: 'replaceImage',
            selector: selector,
            oldValue: oldValue,
            newValue: newSrc,
            elementType: elementInfo.elementType,
            sectionId: elementInfo.sectionId,
            timestamp: Date.now()
          };

          // Save to localStorage for instant tracking
          saveChangeToStorage(change);

          window.parent.postMessage({
            type: 'webild-element-changed',
            data: change
          }, '*');

          window.parent.postMessage({
            type: 'webild-image-replaced',
            data: { selector, newSrc, success: true }
          }, '*');
        } else {
          window.parent.postMessage({
            type: 'webild-image-replacement-error',
            data: { selector, message: 'Could not determine how to replace image', success: false }
          }, '*');
        }
      } catch (error) {
        window.parent.postMessage({
          type: 'webild-image-replacement-error',
          data: { selector, message: error.message || 'Failed to replace image', success: false }
        }, '*');
      }
    }
  };
  
  // Attach event listeners
  document.addEventListener('mouseover', handleMouseOver, true);
  document.addEventListener('mouseout', handleMouseOut, true);
  document.addEventListener('click', handleClick, true);
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('blur', handleBlur, true);
  window.addEventListener('scroll', handleScroll, true);
  window.addEventListener('message', handleMessage, true);
  
  // Cleanup function
  window.webildCleanup = () => {
    isActive = false;
    
    if (selectedElement) {
      makeUneditable(selectedElement, false);
    }
    
    removeHoverOverlay();
    removeElementTypeLabel();
    removeSelectedCategoryLabel();
    
    document.removeEventListener('mouseover', handleMouseOver, true);
    document.removeEventListener('mouseout', handleMouseOut, true);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('blur', handleBlur, true);
    window.removeEventListener('scroll', handleScroll, true);
    window.removeEventListener('message', handleMessage, true);
    
    document.querySelectorAll('.' + hoverClass).forEach(el => {
      el.classList.remove(hoverClass);
    });
    document.querySelectorAll('.' + selectedClass).forEach(el => {
      el.classList.remove(selectedClass);
    });
    
    const styleEl = document.getElementById('webild-inspector-styles');
    if (styleEl) styleEl.remove();
    
    hoveredElement = null;
    selectedElement = null;
  };
  
  // Send ready signal
  window.parent.postMessage({ type: 'webild-editor-ready' }, '*');
  console.log('[Webild Visual Editor] Ready and waiting for activation');
})();
`
          }}
        />
      </body>
    </PostHogWrapper>
    </html>
  );
}