function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };

    return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }

    return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;

        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);

            _cache.set(Class, Wrapper);
        }

        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
}

function addPrefetch(kind, url, as) {
    if (as === void 0) {
        as = null;
    }

    var linkElem = document.createElement('link');
    linkElem.rel = kind;
    linkElem.href = url;

    if (as) {
        linkElem.as = as;
    }

    linkElem.crossOrigin = 'true';
    document.head.append(linkElem);
} // Forked from https://github.com/paulirish/lite-youtube-embed/


var css = "\nlite-iframe {\n  background-color: var(--lite-iframe-bg, #1f1e1e);\n  position: relative;\n  display: block;\n  contain: content;\n  background-position: center center;\n  background-size: cover;\n  cursor: pointer;\n  border-radius: 4px;\n}\n\nlite-iframe::before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: 0;\n  background-image: url(\"data:image/gif;base64,R0lGODlhAQABAIABAEdJRgAAACwAAAAAAQABAAACAkQBAA==\");\n  background-position: top;\n  background-repeat: repeat-x;\n  height: 60px;\n  padding-bottom: 50px;\n  width: 100%;\n  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);\n}\n\n/* responsive iframe with a 16:9 aspect ratio\n    thanks https://css-tricks.com/responsive-iframes/\n*/\nlite-iframe::after {\n  content: \"\";\n  display: block;\n  padding-bottom: calc(100% / (16 / 9));\n}\n\nlite-iframe .root {\n  color: #a2a2a2;\n  font-size: 14px;\n  line-height: 1.5;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nlite-iframe iframe {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\nlite-iframe > .lty-playbtn {\n  width: 68px;\n  height: 48px;\n  position: absolute;\n  transform: translate3d(-50%, -50%, 0);\n  top: 50%;\n  left: 50%;\n  z-index: 1;\n  /* YT's actual play button svg */\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 68 48\"><path fill=\"%23f00\" fill-opacity=\"0.8\" d=\"M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z\"></path><path d=\"M 45,24 27,14 27,34\" fill=\"%23fff\"></path></svg>');\n  filter: grayscale(100%);\n  transition: filter 0.1s cubic-bezier(0, 0, 0.2, 1);\n}\n\nlite-iframe:hover > .lty-playbtn {\n  filter: none;\n}\n\n/* Post-click styles */\nlite-iframe.lyt-activated {\n  cursor: unset;\n}\n\nlite-iframe.lyt-activated > .lty-playbtn,\nlite-iframe.lyt-activated::before {\n  opacity: 0;\n  pointer-events: none;\n}\n";

var Unknown =
    /*#__PURE__*/
    function() {
        function Unknown(instance, src) {
            this.io = null;
            this.instance = instance;
            this.src = src;
            this.preconnected = false;
            this.warmUp = this.warmUp.bind(this);
            this.addIframe = this.addIframe.bind(this);
            this.handleIntersection = this.handleIntersection.bind(this);

            if ('IntersectionObserver' in window) {
                this.io = new IntersectionObserver(this.handleIntersection);
            } else {
                this.handleIframe();
            }
        }

        var _proto = Unknown.prototype;

        _proto.connectedCallback = function connectedCallback() {
            if (this.io) {
                this.io.observe(this.instance);
            }
        };

        _proto.handleIntersection = function handleIntersection(data) {
            if (data[0].isIntersecting) {
                this.handleIframe();
                this.cleanup();
            }
        };

        _proto.handleIframe = function handleIframe() {
            this.addIframe();
        };

        _proto.cleanup = function cleanup() {
            if (this.io) {
                this.io.disconnect();
            }
        };

        _proto.warmUp = function warmUp() {
            if (this.src) addPrefetch('preload', this.src, 'iframe');
        };

        _proto.addIframe = function addIframe() {
            var attributes = this.instance.elementIframeAttributes;
            var attributesString = attributes.map(function(attribute) {
                return attribute.name + "=\"" + attribute.value + "\"";
            }).join('\n');
            var iframeHTML = "\n      <iframe \n        " + attributesString + "\n      </iframe>";
            this.instance.querySelector('.root').innerHTML = iframeHTML;
        };

        return Unknown;
    }(); // Forked from https://github.com/paulirish/lite-youtube-embed/


var Youtube =
    /*#__PURE__*/
    function() {
        function Youtube(instance, src) {
            this.preconnected = false;
            this.instance = instance;
            this.src = src;
            this.warmUp = this.warmUp.bind(this);
            this.addIframe = this.addIframe.bind(this);
            this.posterUrl = "https://i.ytimg.com/vi/" + this.videoId + "/hqdefault.jpg";
            addPrefetch('preload', this.posterUrl, 'image');
        }

        var _proto2 = Youtube.prototype;

        _proto2.connectedCallback = function connectedCallback() {
            var _this = this;

            this.instance.style.backgroundImage = "url(\"" + this.posterUrl + "\")";
            var playBtn = document.createElement('div');
            playBtn.classList.add('lty-playbtn');
            this.instance.append(playBtn);
            this.instance.addEventListener('pointerover', this.warmUp, {
                once: true
            });
            this.instance.addEventListener('click', function() {
                return _this.addIframe();
            });
        };

        _proto2.warmUp = function warmUp() {
            addPrefetch('preconnect', 'https://www.youtube-nocookie.com');
            addPrefetch('preconnect', 'https://www.google.com');
        };

        _proto2.addIframe = function addIframe() {
            var attributes = this.instance.elementIframeAttributes.slice(); // Force autoplay

            attributes.find(function(attribute) {
                if (attribute.name == 'src') {
                    attribute.value += '?autoplay=1';
                }
            });
            var attributesString = attributes.map(function(attribute) {
                return attribute.name + "=\"" + attribute.value + "\"";
            }).join('\n');
            var iframeHTML = "\n        <iframe \n          " + attributesString + "\n        </iframe>";
            this.instance.querySelector('.root').innerHTML = iframeHTML;
            this.instance.classList.add('lyt-activated');
        };

        _createClass(Youtube, [{
            key: "videoId",
            get: function get() {
                if (this.src) {
                    var youtTubeIDRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                    var matchers = this.src.match(youtTubeIDRegex);
                    return matchers && matchers[1] ? matchers[1] : null;
                }

                return null;
            }
        }]);

        return Youtube;
    }();

var adapters = {
    youtube: Youtube,
    unknown: Unknown
};

var LiteIframe =
    /*#__PURE__*/
    function(_HTMLElement) {
        _inheritsLoose(LiteIframe, _HTMLElement);

        function LiteIframe() {
            var _this2;

            _this2 = _HTMLElement.call(this) || this;
            _this2.src = _this2.getAttribute('src');
            _this2.type = _this2.getAttribute('type') || 'unknown';
            var adapter = adapters[_this2.type];
            _this2.controller = new adapter(_assertThisInitialized(_this2), _this2.src || '');
            return _this2;
        }

        var _proto3 = LiteIframe.prototype;

        _proto3.connectedCallback = function connectedCallback() {
            this.insertAdjacentHTML('afterbegin', "<style>" + css + "</style><div class=\"root\">Loading</div>");
            this.controller.connectedCallback();
        };

        _proto3.warmConnections = function warmConnections() {
            if (this.controller.preconnected) return;
            this.controller.warmUp();
            this.controller.preconnected = true;
        };

        _createClass(LiteIframe, [{
            key: "elementIframeAttributes",
            get: function get() {
                var attributes = Array.from(this.attributes);
                var BLACKLIST = ['style', 'width', 'height']; // Force loading attribute to be lazy

                var loading = document.createAttribute('loading');
                loading.value = 'lazy';
                attributes.push(loading);
                attributes = attributes.filter(function(attribute) {
                    return !BLACKLIST.includes(attribute.name);
                });
                return attributes;
            }
        }]);

        return LiteIframe;
    }(
        /*#__PURE__*/
        _wrapNativeSuper(HTMLElement));

customElements.define('lite-iframe', LiteIframe);