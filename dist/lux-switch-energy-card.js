/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, tt = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (tt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = ot.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ot.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ct = (e) => new bt(typeof e == "string" ? e : e + "", void 0, et), q = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, a, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[r + 1], e[0]);
  return new bt(s, e, et);
}, kt = (e, t) => {
  if (tt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), a = F.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = s.cssText, e.appendChild(i);
  }
}, nt = tt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Ct(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pt, defineProperty: Ot, getOwnPropertyDescriptor: Mt, getOwnPropertyNames: Dt, getOwnPropertySymbols: Nt, getPrototypeOf: Ut } = Object, w = globalThis, lt = w.trustedTypes, Lt = lt ? lt.emptyScript : "", J = w.reactiveElementPolyfillSupport, N = (e, t) => e, B = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Lt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, st = (e, t) => !Pt(e, t), ct = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: st };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = ct) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), a = this.getPropertyDescriptor(t, i, s);
      a !== void 0 && Ot(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: a, set: r } = Mt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: a, set(o) {
      const l = a == null ? void 0 : a.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const s = this.properties, i = [...Dt(s), ...Nt(s)];
      for (const a of i) this.createProperty(a, s[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, a] of s) this.elementProperties.set(i, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const a = this._$Eu(s, i);
      a !== void 0 && this._$Eh.set(a, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const a of i) s.unshift(nt(a));
    } else t !== void 0 && s.push(nt(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((s) => s(this));
  }
  addController(t) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var s;
    (s = this._$EO) == null || s.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return kt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    var r;
    const i = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, i);
    if (a !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : B).toAttribute(s, i.type);
      this._$Em = t, o == null ? this.removeAttribute(a) : this.setAttribute(a, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var r, o;
    const i = this.constructor, a = i._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const l = i.getPropertyOptions(a), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : B;
      this._$Em = a;
      const d = n.fromAttribute(s, l.type);
      this[a] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(a)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, a = !1, r) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (a === !1 && (r = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? st)(r, s) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: a, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), a === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [r, o] of a) {
        const { wrapped: l } = o, n = this[r];
        l !== !0 || this._$AL.has(r) || n === void 0 || this.C(r, void 0, o, n);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((a) => {
        var r;
        return (r = a.hostUpdate) == null ? void 0 : r.call(a);
      }), this.update(s)) : this._$EM();
    } catch (a) {
      throw t = !1, this._$EM(), a;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var a;
      return (a = i.hostUpdated) == null ? void 0 : a.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[N("elementProperties")] = /* @__PURE__ */ new Map(), P[N("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: P }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, dt = (e) => e, W = U.trustedTypes, ht = W ? W.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $t = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + x, zt = `<${xt}>`, k = document, L = () => k.createComment(""), z = (e) => e === null || typeof e != "object" && typeof e != "function", it = Array.isArray, Ht = (e) => it(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, ut = />/g, A = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, mt = /"/g, wt = /^(?:script|style|textarea|title)$/i, Rt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), h = Rt(1), O = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), T = k.createTreeWalker(k, 129);
function Et(e, t) {
  if (!it(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const jt = (e, t) => {
  const s = e.length - 1, i = [];
  let a, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = D;
  for (let l = 0; l < s; l++) {
    const n = e[l];
    let d, u, c = -1, v = 0;
    for (; v < n.length && (o.lastIndex = v, u = o.exec(n), u !== null); ) v = o.lastIndex, o === D ? u[1] === "!--" ? o = pt : u[1] !== void 0 ? o = ut : u[2] !== void 0 ? (wt.test(u[2]) && (a = RegExp("</" + u[2], "g")), o = A) : u[3] !== void 0 && (o = A) : o === A ? u[0] === ">" ? (o = a ?? D, c = -1) : u[1] === void 0 ? c = -2 : (c = o.lastIndex - u[2].length, d = u[1], o = u[3] === void 0 ? A : u[3] === '"' ? mt : gt) : o === mt || o === gt ? o = A : o === pt || o === ut ? o = D : (o = A, a = void 0);
    const p = o === A && e[l + 1].startsWith("/>") ? " " : "";
    r += o === D ? n + zt : c >= 0 ? (i.push(d), n.slice(0, c) + $t + n.slice(c) + x + p) : n + x + (c === -2 ? l : p);
  }
  return [Et(e, r + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: s }, i) {
    let a;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, n = this.parts, [d, u] = jt(t, s);
    if (this.el = H.createElement(d, i), T.currentNode = this.el.content, s === 2 || s === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (a = T.nextNode()) !== null && n.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const c of a.getAttributeNames()) if (c.endsWith($t)) {
          const v = u[o++], p = a.getAttribute(c).split(x), b = /([.?@])?(.*)/.exec(v);
          n.push({ type: 1, index: r, name: b[2], strings: p, ctor: b[1] === "." ? Vt : b[1] === "?" ? Ft : b[1] === "@" ? Bt : Y }), a.removeAttribute(c);
        } else c.startsWith(x) && (n.push({ type: 6, index: r }), a.removeAttribute(c));
        if (wt.test(a.tagName)) {
          const c = a.textContent.split(x), v = c.length - 1;
          if (v > 0) {
            a.textContent = W ? W.emptyScript : "";
            for (let p = 0; p < v; p++) a.append(c[p], L()), T.nextNode(), n.push({ type: 2, index: ++r });
            a.append(c[v], L());
          }
        }
      } else if (a.nodeType === 8) if (a.data === xt) n.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = a.data.indexOf(x, c + 1)) !== -1; ) n.push({ type: 7, index: r }), c += x.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function M(e, t, s = e, i) {
  var o, l;
  if (t === O) return t;
  let a = i !== void 0 ? (o = s._$Co) == null ? void 0 : o[i] : s._$Cl;
  const r = z(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== r && ((l = a == null ? void 0 : a._$AO) == null || l.call(a, !1), r === void 0 ? a = void 0 : (a = new r(e), a._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = a : s._$Cl = a), a !== void 0 && (t = M(e, a._$AS(e, t.values), a, i)), t;
}
class It {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, a = ((t == null ? void 0 : t.creationScope) ?? k).importNode(s, !0);
    T.currentNode = a;
    let r = T.nextNode(), o = 0, l = 0, n = i[0];
    for (; n !== void 0; ) {
      if (o === n.index) {
        let d;
        n.type === 2 ? d = new V(r, r.nextSibling, this, t) : n.type === 1 ? d = new n.ctor(r, n.name, n.strings, this, t) : n.type === 6 && (d = new Wt(r, this, t)), this._$AV.push(d), n = i[++l];
      }
      o !== (n == null ? void 0 : n.index) && (r = T.nextNode(), o++);
    }
    return T.currentNode = k, a;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class V {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, a) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = M(this, t, s), z(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: s, _$litType$: i } = t, a = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(Et(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === a) this._$AH.p(s);
    else {
      const o = new It(a, this), l = o.u(this.options);
      o.p(s), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = ft.get(t.strings);
    return s === void 0 && ft.set(t.strings, s = new H(t)), s;
  }
  k(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, a = 0;
    for (const r of t) a === s.length ? s.push(i = new V(this.O(L()), this.O(L()), this, this.options)) : i = s[a], i._$AI(r), a++;
    a < s.length && (this._$AR(i && i._$AB.nextSibling, a), s.length = a);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const a = dt(t).nextSibling;
      dt(t).remove(), t = a;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, a, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = s, this._$AM = a, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, s = this, i, a) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = M(this, t, s, 0), o = !z(t) || t !== this._$AH && t !== O, o && (this._$AH = t);
    else {
      const l = t;
      let n, d;
      for (t = r[0], n = 0; n < r.length - 1; n++) d = M(this, l[i + n], s, n), d === O && (d = this._$AH[n]), o || (o = !z(d) || d !== this._$AH[n]), d === f ? t = f : t !== f && (t += (d ?? "") + r[n + 1]), this._$AH[n] = d;
    }
    o && !a && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Ft extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Bt extends Y {
  constructor(t, s, i, a, r) {
    super(t, s, i, a, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = M(this, t, s, 0) ?? f) === O) return;
    const i = this._$AH, a = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== f && (i === f || a);
    a && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Wt {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const X = U.litHtmlPolyfillSupport;
X == null || X(H, V), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.2");
const qt = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let a = i._$litPart$;
  if (a === void 0) {
    const r = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = a = new V(t.insertBefore(L(), r), r, void 0, s ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
class E extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const t = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return O;
  }
}
var yt;
E._$litElement$ = !0, E.finalized = !0, (yt = C.litElementHydrateSupport) == null || yt.call(C, { LitElement: E });
const Q = C.litElementPolyfillSupport;
Q == null || Q({ LitElement: E });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: st }, Gt = (e = Yt, t, s) => {
  const { kind: i, metadata: a } = s;
  let r = globalThis.litPropertyMetadata.get(a);
  if (r === void 0 && globalThis.litPropertyMetadata.set(a, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(l) {
      const n = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, n, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, e, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(l) {
      const n = this[o];
      t.call(this, l), this.requestUpdate(o, n, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function S(e) {
  return (t, s) => typeof s == "object" ? Gt(e, t, s) : ((i, a, r) => {
    const o = a.hasOwnProperty(r);
    return a.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(a, r) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(e) {
  return S({ ...e, state: !0, attribute: !1 });
}
const Zt = q`
  :host {
    display: block;
    --glass-blur: 14px;
    --glass-opacity: 0.08;
    /* Default theme variables if not overridden */
    --ha-card-background: rgba(255, 255, 255, 0.06); 
    --primary-text-color: rgba(255, 255, 255, 0.92);
    --secondary-text-color: rgba(255, 255, 255, 0.62);
    
    --lux-panel-color: var(--ha-card-background);
    --lux-accent-gold: #d6b25e;
    --lux-accent-purple: #6b21a8;
    --lux-text-primary: var(--primary-text-color);
    --lux-text-muted: var(--secondary-text-color);
    --lux-shadow-strength: 0.35;
    --lux-glow-strength: 0.65;
    --lux-border-radius: 24px;
  }

  .card {
    position: relative;
    background: var(--lux-panel-color);
    border-radius: var(--lux-border-radius);
    padding: 24px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, calc(var(--lux-shadow-strength) * 0.5)),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .card:focus {
    outline: none;
    border-color: var(--lux-accent-gold);
    box-shadow: 0 0 0 2px rgba(214, 178, 94, 0.3);
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, calc(var(--lux-shadow-strength) * 0.6)),
      0 0 30px rgba(var(--accent-gold-rgb), calc(var(--lux-glow-strength) * 0.3)),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .card.on {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, calc(var(--lux-shadow-strength) * 0.5)),
      0 0 40px rgba(var(--accent-gold-rgb), calc(var(--lux-glow-strength) * 0.4)),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .card.off {
    opacity: 0.8;
    transform: scale(0.98);
    box-shadow: none;
    filter: grayscale(0.4);
  }

  .card.off:hover {
    opacity: 0.9;
    transform: scale(0.99);
    filter: grayscale(0.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .title-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-container {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .card.on .icon-container {
    background: rgba(var(--accent-gold-rgb), 0.15);
  }

  .light-icon {
    width: 28px;
    height: 28px;
    fill: var(--lux-text-muted);
    transition: all 0.3s ease;
  }

  .card.on .light-icon {
    fill: var(--lux-accent-gold);
    filter: drop-shadow(0 0 8px rgba(214, 178, 94, 0.8));
    animation: breathe 3s infinite ease-in-out;
  }

  .card.on.warming .light-icon {
    filter: drop-shadow(0 0 25px rgba(214, 178, 94, 1)) brightness(1.8);
    transition: filter 1s ease-out, brightness 1s ease-out;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(214, 178, 94, 0.8)); }
    50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(214, 178, 94, 1)); }
  }

  .name {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--lux-text-primary);
  }

  .status-chip {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(255, 255, 255, 0.05);
    color: var(--lux-text-muted);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .status-chip.on {
    background: rgba(var(--accent-gold-rgb), 0.15);
    color: var(--lux-accent-gold);
    border-color: rgba(var(--accent-gold-rgb), 0.3);
  }

  .status-chip.unavailable {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.2);
  }

  .status-chip.stale {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }

  .status-chip.anomaly {
    background: rgba(255, 255, 255, 0.1);
    color: var(--lux-accent-gold);
    border: 1px dashed var(--lux-accent-gold);
    animation: pulseGlow 2s infinite;
  }

  @keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(214, 178, 94, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(214, 178, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(214, 178, 94, 0); }
  }

  .sparkline-container {
    height: 60px;
    margin: 16px 0;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .card:hover .sparkline-container {
    opacity: 1;
  }

  .energy-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 8px;
  }

  .energy-item {
    display: flex;
    flex-direction: column;
  }

  .energy-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lux-text-primary);
  }

  .energy-label {
    font-size: 0.75rem;
    color: var(--lux-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .time-section {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .time-info {
    font-size: 0.85rem;
    color: var(--lux-text-muted);
    line-height: 1.4;
  }

  .time-info strong {
    color: var(--lux-text-primary);
    font-weight: 600;
  }

  .timer-display {
    margin-top: 12px;
    padding: 8px 12px;
    background: rgba(var(--accent-gold-rgb), 0.1);
    border-radius: 8px;
    border: 1px solid rgba(var(--accent-gold-rgb), 0.2);
  }

  .timer-text {
    font-size: 0.85rem;
    color: var(--lux-accent-gold);
    font-weight: 600;
  }

  .controls-section {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .control-button {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--lux-text-primary);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .control-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .control-button.active {
    background: rgba(214, 178, 94, 0.15);
    border-color: var(--lux-accent-gold);
    color: var(--lux-accent-gold);
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .modal-content {
    background: #1a1a1a;
    background-image: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%);
    border-radius: var(--lux-border-radius);
    padding: 32px;
    max-width: 500px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
    animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes modalIn {
    from { transform: scale(0.9) translateY(20px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .modal-title {
    margin: 0;
    font-size: 1.5rem;
    color: var(--lux-text-primary);
  }

  .close-button {
    background: none;
    border: none;
    color: var(--lux-text-muted);
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
  }

  .expanded-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }

  .stat-item {
    padding: 16px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--lux-accent-gold);
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .stat-value .unit {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.7;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--lux-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 0.9rem;
    z-index: 2000;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    .card:hover {
      transform: none;
    }
    
    .card.on .light-icon {
        animation: none;
    }
    lux-power-flow {
        --flow-speed: 0s;
    }
  }
`, _t = {
  en: {
    "common.loading": "Loading...",
    "common.unavailable": "Unavailable",
    "common.stale": "Stale Data",
    "common.on": "ON",
    "common.off": "OFF",
    "card.live_power": "Live Power",
    "card.session": "Session",
    "card.today": "Today",
    "card.cost_today": "Cost Today",
    "card.auto_off_in": "Auto-off in",
    "card.cancel": "Cancel",
    "card.auto_off_disabled": "Auto-off Disabled",
    "card.disable_auto_off": "Disable Auto-off",
    "card.high_power": "High Power Usage",
    "card.on_since": "On since {time}",
    "card.running_for": "Running for {minutes}m {seconds}s",
    "card.last_used": "Last used today at {time}",
    "card.just_now": "Just now",
    "card.minutes_ago": "{minutes} minutes ago",
    "modal.current_power": "Current Power",
    "modal.session_energy": "Session Energy",
    "modal.modes": "Modes",
    "modal.cancel_timer": "Cancel Timer"
  }
};
function g(e, t, s) {
  var r, o;
  const i = ((r = window.customCards) == null ? void 0 : r.activeLang) || "en";
  let a = ((o = _t[i]) == null ? void 0 : o[e]) || _t.en[e] || e;
  return t && s && (a = a.replace(t, s)), a;
}
var Jt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, Z = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? Kt(t, s) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (a = (i ? o(t, s, a) : o(a)) || a);
  return i && a && Jt(t, s, a), a;
};
let R = class extends E {
  constructor() {
    super(...arguments), this.samples = [], this.accentColor = "#d6b25e";
  }
  static get styles() {
    return q`
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
            svg {
                width: 100%;
                height: 100%;
                display: block;
            }
        `;
  }
  // Catmull-Rom spline to SVG cubic bezier
  catmullRomToBezier(e, t = 0.5) {
    if (e.length < 2) return "";
    let s = `M ${e[0].x} ${e[0].y}`;
    for (let i = 0; i < e.length - 1; i++) {
      const a = e[i - 1] || e[0], r = e[i], o = e[i + 1], l = e[i + 2] || o, n = r.x + (o.x - a.x) / 6 * t, d = r.y + (o.y - a.y) / 6 * t, u = o.x - (l.x - r.x) / 6 * t, c = o.y - (l.y - r.y) / 6 * t;
      s += ` C ${n} ${d}, ${u} ${c}, ${o.x} ${o.y}`;
    }
    return s;
  }
  render() {
    var d, u;
    if (this.samples.length < 2)
      return h``;
    const s = Math.max(...this.samples.map((c) => c.value), 0), i = Math.min(...this.samples.map((c) => c.value), 0), a = s - i || 1, r = this.samples.map((c, v) => {
      const p = v / (this.samples.length - 1) * 200, b = 40 - (c.value - i) / a * 40;
      return { x: p, y: b };
    }), o = ((d = this.config) == null ? void 0 : d.smoothing) !== !1 ? this.catmullRomToBezier(r) : r.map((c, v) => `${v === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" "), l = `${o} L 200 40 L 0 40 Z`, n = `grad-${Math.random().toString(36).substr(2, 9)}`;
    return h`
            <svg viewBox="0 0 ${200} ${40}" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="${n}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${this.accentColor};stop-opacity:0.25" />
                        <stop offset="100%" style="stop-color:${this.accentColor};stop-opacity:0" />
                    </linearGradient>
                </defs>
                <path
                    d="${l}"
                    fill="url(#${n})"
                />
                <path
                    d="${o}"
                    fill="none"
                    stroke="${this.accentColor}"
                    stroke-width="${((u = this.config) == null ? void 0 : u.line_width) || 2}"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    opacity="0.9"
                />
            </svg>
        `;
  }
};
Z([
  S({ type: Array })
], R.prototype, "samples", 2);
Z([
  S({ type: Object })
], R.prototype, "config", 2);
Z([
  S({ type: String })
], R.prototype, "accentColor", 2);
R = Z([
  G("lux-sparkline")
], R);
var Xt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, at = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? Qt(t, s) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (a = (i ? o(t, s, a) : o(a)) || a);
  return i && a && Xt(t, s, a), a;
};
let j = class extends E {
  constructor() {
    super(...arguments), this.active = !1, this.power = 0;
  }
  render() {
    const e = Math.max(0.2, 3 - this.power / 500);
    return h`
      <div class="flow-container ${this.active ? "active" : ""}" style="--flow-speed: ${e}s">
        <svg viewBox="0 0 200 60" preserveAspectRatio="xMidYMid meet">
          <!-- Bolt (Source) - Centered at Y=30 (Local Center Y=12, so translate Y=18) -->
          <g transform="translate(10, 18)" class="${this.active && this.power > 1e3 ? "vibrate" : ""}">
            <path class="source" d="M7,2v11h3v9l7-12h-4l4-8H7z"/>
          </g>

          <!-- Path -->
          <path class="path-base" d="M35 30 L165 30" />
          <path class="flow-path" d="M35 30 L165 30" />

          <!-- Table Lamp (Destination) - Centered at Y=30 (Local Center Y=12, so translate Y=18) -->
          <g transform="translate(170, 18)">
             <path class="destination" d="M8,2 L16,2 L18,14 L6,14 L8,2 Z M5,15 L19,15 L19,17 L5,17 L5,15 Z M11,17 L11,20 L8,20 L8,22 L16,22 L16,20 L13,20 L13,17 L11,17 Z"/>
          </g>
        </svg>
      </div>
    `;
  }
};
j.styles = q`
    :host {
      display: block;
      width: 100%;
      height: 60px;
      margin: 10px 0;
    }

    .flow-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      height: 100%;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .source, .destination {
      fill: var(--lux-text-muted, #727272);
      transition: fill 0.5s ease, filter 0.5s ease;
      transform-box: fill-box;
      transform-origin: center;
    }

    .active .source {
      fill: var(--lux-accent-gold, #d6b25e);
      filter: drop-shadow(0 0 5px var(--lux-accent-gold));
      animation: pulse 2s infinite ease-in-out;
    }

    .active .destination {
      fill: var(--lux-accent-gold, #d6b25e);
      filter: drop-shadow(0 0 8px var(--lux-accent-gold));
    }

    .path-base {
      stroke: rgba(255, 255, 255, 0.1);
      stroke-width: 2;
      fill: none;
    }

    .flow-path {
      stroke: var(--lux-accent-gold, #d6b25e);
      stroke-width: 3;
      fill: none;
      stroke-dasharray: 4, 12;
      stroke-linecap: round;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .active .flow-path {
      opacity: 1;
      animation: flow var(--flow-speed, 2s) linear infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }

    @keyframes flow {
      from { stroke-dashoffset: 16; }
      to { stroke-dashoffset: 0; }
    }

    .vibrate {
      animation: vibrate 0.15s linear infinite !important;
    }

    @keyframes vibrate {
      0% { transform: translate(10px, 18px) rotate(0deg); }
      25% { transform: translate(9px, 17px) rotate(-1deg); }
      50% { transform: translate(10px, 19px) rotate(0deg); }
      75% { transform: translate(11px, 17px) rotate(1deg); }
      100% { transform: translate(10px, 18px) rotate(0deg); }
    }
  `;
at([
  S({ type: Boolean })
], j.prototype, "active", 2);
at([
  S({ type: Number })
], j.prototype, "power", 2);
j = at([
  G("lux-power-flow")
], j);
const vt = /* @__PURE__ */ new Set();
function St(e, t) {
  vt.has(e) || (vt.add(e), console.warn(`[Lux Switch Card] ${t}`));
}
function $(e, t, s, i) {
  return e < t || e > s ? (St(`clamp_${i}`, `${i} (${e}) out of range [${t}, ${s}]. Clamping.`), Math.max(t, Math.min(e, s))) : e;
}
function te(e) {
  if (!e.entity)
    throw new Error('Configuration Error: "entity" is required.');
  const t = e.theme || {}, s = e.sparkline || {}, i = e.timers || {}, a = {
    ...t,
    blur: t.blur !== void 0 ? $(t.blur, 0, 30, "theme.blur") : 14,
    opacity: t.opacity !== void 0 ? $(t.opacity, 0.02, 0.2, "theme.opacity") : 0.08,
    border_radius: t.border_radius !== void 0 ? $(t.border_radius, 12, 32, "theme.border_radius") : 24,
    glow_strength: t.glow_strength !== void 0 ? $(t.glow_strength, 0, 1, "theme.glow_strength") : 0.65,
    shadow_strength: t.shadow_strength !== void 0 ? $(t.shadow_strength, 0, 1, "theme.shadow_strength") : 0.35
  }, r = {
    ...s,
    samples: s.samples !== void 0 ? $(s.samples, 10, 240, "sparkline.samples") : 60,
    interval_sec: s.interval_sec !== void 0 ? $(s.interval_sec, 2, 60, "sparkline.interval_sec") : 10
  };
  let o = i.presets || [15, 30, 60];
  o.length > 10 && (St("timer_presets_max", "Too many timer presets. Limiting to first 10."), o = o.slice(0, 10)), o = o.map((u) => $(u, 1, 240, "timer_preset"));
  const l = {
    ...i,
    presets: o,
    default_minutes: i.default_minutes || 30
    // No hard clamp requested but good to have fallback
  }, n = e.stale_seconds !== void 0 ? $(e.stale_seconds, 10, 900, "stale_seconds") : 120, d = e.anomaly_watts !== void 0 ? $(e.anomaly_watts, 10, 1e4, "anomaly_watts") : 1200;
  return {
    ...e,
    theme: a,
    sparkline: r,
    timers: l,
    stale_seconds: n,
    anomaly_watts: d
  };
}
var ee = Object.defineProperty, se = Object.getOwnPropertyDescriptor, rt = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? se(t, s) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (a = (i ? o(t, s, a) : o(a)) || a);
  return i && a && ee(t, s, a), a;
};
let I = class extends E {
  setConfig(e) {
    this._config = e;
  }
  _valueChanged(e) {
    if (!this._config || !this.hass)
      return;
    const t = e.target;
    if (!t) return;
    const s = t.configValue, i = t.checked !== void 0 ? t.checked : t.value;
    if (s)
      if (s.includes(".")) {
        const r = s.split("."), o = { ...this._config };
        let l = o;
        for (let n = 0; n < r.length - 1; n++)
          l[r[n]] = { ...l[r[n]] }, l = l[r[n]];
        l[r[r.length - 1]] = i, this._config = o;
      } else
        this._config = {
          ...this._config,
          [s]: i
        };
    const a = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(a);
  }
  render() {
    var e, t, s, i, a, r;
    return !this.hass || !this._config ? h`` : h`
            <div class="card-config">
                <div class="section">
                    <div class="header-row">
                        <ha-icon icon="mdi:form-select"></ha-icon>
                        <div class="label">Core Entities</div>
                    </div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity}
                        .configValue=${"entity"}
                        @value-changed=${this._valueChanged}
                        label="Primary Switch (Required)"
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="section">
                    <div class="header-row">
                        <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
                        <div class="label">Monitoring Sensors</div>
                    </div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.power_entity}
                        .configValue=${"power_entity"}
                        @value-changed=${this._valueChanged}
                        label="Power Sensor (W)"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.energy_today_entity}
                        .configValue=${"energy_today_entity"}
                        @value-changed=${this._valueChanged}
                        label="Energy Today (kWh)"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <div class="grid-2">
                        <ha-entity-picker
                            .hass=${this.hass}
                            .value=${this._config.voltage_entity}
                            .configValue=${"voltage_entity"}
                            @value-changed=${this._valueChanged}
                            label="Voltage Sensor (V)"
                            allow-custom-entity
                        ></ha-entity-picker>
                        <ha-entity-picker
                            .hass=${this.hass}
                            .value=${this._config.current_entity}
                            .configValue=${"current_entity"}
                            @value-changed=${this._valueChanged}
                            label="Current Sensor (A)"
                            allow-custom-entity
                        ></ha-entity-picker>
                    </div>
                </div>

                <div class="section">
                    <div class="header-row">
                        <ha-icon icon="mdi:palette"></ha-icon>
                        <div class="label">Visuals & Glassmorphism</div>
                    </div>
                    <ha-textfield
                        label="Display Name"
                        .value=${this._config.name || ""}
                        .configValue=${"name"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <div class="grid-2">
                        <ha-icon-picker
                            .hass=${this.hass}
                            .value=${this._config.icon || "mdi:lightbulb"}
                            .configValue=${"icon"}
                            @value-changed=${this._valueChanged}
                            label="Card Icon"
                        ></ha-icon-picker>
                        <ha-textfield
                            label="Accent Color"
                            .value=${((e = this._config.theme) == null ? void 0 : e.accent_gold) || "#d6b25e"}
                            .configValue=${"theme.accent_gold"}
                            @input=${this._valueChanged}
                            type="text"
                        ></ha-textfield>
                    </div>
                    <div class="slider-row">
                        <div class="slider-label">Glass Blur</div>
                        <ha-slider
                            .value=${((t = this._config.theme) == null ? void 0 : t.blur) || 14}
                            .configValue=${"theme.blur"}
                            min="0" max="40" step="1" pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                        <span class="value-tag">${((s = this._config.theme) == null ? void 0 : s.blur) || 14}px</span>
                    </div>
                    <div class="slider-row">
                        <div class="slider-label">Glass Opacity</div>
                        <ha-slider
                            .value=${((i = this._config.theme) == null ? void 0 : i.opacity) || 0.08}
                            .configValue=${"theme.opacity"}
                            min="0" max="0.3" step="0.01" pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                        <span class="value-tag">${((a = this._config.theme) == null ? void 0 : a.opacity) || 0.08}</span>
                    </div>
                </div>

                <div class="section">
                    <div class="header-row">
                        <ha-icon icon="mdi:flash"></ha-icon>
                        <div class="label">Sparkline Chart</div>
                    </div>
                    <div class="toggle-row">
                        <span>Enable Statistics Graph</span>
                        <ha-switch
                            .checked=${((r = this._config.sparkline) == null ? void 0 : r.enabled) !== !1}
                            .configValue=${"sparkline.enabled"}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </div>
                    <ha-textfield
                        label="Anomaly Warning (Watts)"
                        type="number"
                        .value=${this._config.anomaly_watts || 1200}
                        .configValue=${"anomaly_watts"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
            </div>
        `;
  }
};
I.styles = q`
        .card-config {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .section {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            background: rgba(var(--rgb-primary-text-color), 0.03);
            border-radius: 8px;
            border: 1px solid rgba(var(--rgb-primary-text-color), 0.05);
        }
        .header-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--secondary-text-color);
            margin-bottom: 4px;
        }
        .label {
            font-weight: 500;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .slider-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .slider-label {
            flex: 0 0 100px;
            font-size: 0.9em;
            color: var(--secondary-text-color);
        }
        .value-tag {
            flex: 0 0 45px;
            text-align: right;
            font-size: 0.85em;
            font-family: monospace;
            background: rgba(var(--rgb-primary-text-color), 0.05);
            padding: 2px 4px;
            border-radius: 4px;
        }
        .toggle-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9em;
        }
        ha-slider {
            flex: 1;
            --paper-slider-container-color: rgba(var(--rgb-primary-text-color), 0.1);
        }
        ha-textfield, ha-entity-picker {
            width: 100%;
        }
    `;
rt([
  S({ attribute: !1 })
], I.prototype, "hass", 2);
rt([
  y()
], I.prototype, "_config", 2);
I = rt([
  G("lux-switch-energy-card-editor")
], I);
var ie = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, _ = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? ae(t, s) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (a = (i ? o(t, s, a) : o(a)) || a);
  return i && a && ie(t, s, a), a;
};
window.customCards = window.customCards || [];
window.customCards.push({
  type: "lux-switch-energy-card",
  name: "Lux Switch Energy Card",
  description: "Monitor power, voltage, and current with real-time graphs and auto-off timers."
});
let m = class extends E {
  constructor() {
    super(...arguments), this._showModal = !1, this._sessionEnergy = 0, this._sessionStartTime = null, this._activeTimer = null, this._timerEndTime = null, this._showToast = !1, this._toastMessage = "", this._powerSamples = [], this._sampleInterval = null, this._autoOffDisabled = !1, this._lastOnTime = null, this._lastOffTime = null, this._warmingUp = !1, this._historyFetched = !1;
  }
  static get styles() {
    return Zt;
  }
  static getConfigElement() {
    return document.createElement("lux-switch-energy-card-editor");
  }
  static getStubConfig() {
    return {
      entity: "",
      power_entity: "",
      currency_symbol: "£",
      decimals: {
        power: 0,
        energy: 2,
        cost: 2
      },
      anomaly_watts: 1200,
      stale_seconds: 120,
      timers: {
        enabled: !0,
        presets: [15, 30, 60],
        default_minutes: 30
      },
      sparkline: {
        enabled: !0,
        samples: 60,
        interval_sec: 10,
        smoothing: !0,
        line_width: 2
      },
      modes: {
        enabled: !1,
        items: []
      },
      theme: {
        glass: !0,
        blur: 14,
        opacity: 0.08,
        panel_color: void 0,
        accent_gold: "#d6b25e",
        accent_purple: "#6b21a8",
        text_primary: void 0,
        text_muted: void 0,
        shadow_strength: 0.35,
        glow_strength: 0.65,
        border_radius: 24
      },
      high_contrast: !1
    };
  }
  // ... logic ...
  setConfig(e) {
    var s;
    const t = te(e);
    this._config = {
      ...m.getStubConfig(),
      ...t,
      // Normalized values take precedence
      // Ensure nested objects merge correctly if normalized returned partials (it returns full valid sub-objects)
      decimals: { ...m.getStubConfig().decimals, ...e.decimals },
      modes: { ...m.getStubConfig().modes, ...e.modes }
    }, this.updateThemeVariables(), (s = this._config.sparkline) != null && s.enabled && this._config.power_entity && this.startPowerSampling();
  }
  updated(e) {
    var t, s;
    if (super.updated(e), e.has("hass")) {
      const i = e.get("hass"), a = i ? (t = i.states[this._config.entity]) == null ? void 0 : t.state : void 0, r = (s = this.hass.states[this._config.entity]) == null ? void 0 : s.state;
      a === "off" && r === "on" && (this._warmingUp = !0, setTimeout(() => {
        this._warmingUp = !1;
      }, 1e3));
    }
  }
  updateThemeVariables() {
    const e = this._config.theme, t = (s, i) => {
      i != null ? this.style.setProperty(s, String(i)) : this.style.removeProperty(s);
    };
    t("--glass-blur", `${(e == null ? void 0 : e.blur) || 14}px`), t("--glass-opacity", (e == null ? void 0 : e.opacity) || 0.08), e != null && e.panel_color ? this.style.setProperty("--lux-panel-color", e.panel_color) : this.style.setProperty("--lux-panel-color", "var(--ha-card-background, rgba(255, 255, 255, 0.06))"), t("--lux-accent-gold", (e == null ? void 0 : e.accent_gold) || "#d6b25e"), this.style.setProperty("--accent-gold-rgb", this.hexToRgb((e == null ? void 0 : e.accent_gold) || "#d6b25e")), t("--lux-accent-purple", (e == null ? void 0 : e.accent_purple) || "#6b21a8"), e != null && e.text_primary ? this.style.setProperty("--lux-text-primary", e.text_primary) : this.style.setProperty("--lux-text-primary", "var(--primary-text-color, rgba(255, 255, 255, 0.92))"), e != null && e.text_muted ? this.style.setProperty("--lux-text-muted", e.text_muted) : this.style.setProperty("--lux-text-muted", "var(--secondary-text-color, rgba(255, 255, 255, 0.62))"), t("--lux-shadow-strength", e == null ? void 0 : e.shadow_strength), t("--lux-glow-strength", e == null ? void 0 : e.glow_strength), t("--lux-border-radius", `${(e == null ? void 0 : e.border_radius) || 24}px`);
  }
  hexToRgb(e) {
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? `${parseInt(t[1], 16)}, ${parseInt(t[2], 16)}, ${parseInt(t[3], 16)}` : "214, 178, 94";
  }
  startPowerSampling() {
    var t;
    this._sampleInterval && clearInterval(this._sampleInterval);
    const e = ((t = this._config.sparkline) == null ? void 0 : t.interval_sec) || 10;
    this._sampleInterval = window.setInterval(() => {
      var i;
      const s = this.getPower();
      if (s !== null) {
        this._powerSamples.push({
          timestamp: Date.now(),
          value: s
        });
        const a = ((i = this._config.sparkline) == null ? void 0 : i.samples) || 60;
        this._powerSamples.length > a && this._powerSamples.shift();
      }
    }, e * 1e3);
  }
  getSwitchEntity() {
    return this.hass.states[this._config.entity];
  }
  getPowerEntity() {
    return this._config.power_entity ? this.hass.states[this._config.power_entity] : null;
  }
  getEnergyTodayEntity() {
    return this._config.energy_today_entity ? this.hass.states[this._config.energy_today_entity] : null;
  }
  getCostTodayEntity() {
    return this._config.cost_today_entity ? this.hass.states[this._config.cost_today_entity] : null;
  }
  getVoltageEntity() {
    return this._config.voltage_entity ? this.hass.states[this._config.voltage_entity] : null;
  }
  getCurrentEntity() {
    return this._config.current_entity ? this.hass.states[this._config.current_entity] : null;
  }
  isOn() {
    const e = this.getSwitchEntity();
    return (e == null ? void 0 : e.state) === "on";
  }
  isUnavailable() {
    const e = this.getSwitchEntity();
    return !e || e.state === "unavailable" || e.state === "unknown";
  }
  getPower() {
    const e = this.getPowerEntity();
    if (!e || e.state === "unavailable" || e.state === "unknown")
      return null;
    const t = parseFloat(e.state);
    return isNaN(t) ? null : t;
  }
  getVoltage() {
    const e = this.getVoltageEntity();
    if (!e || e.state === "unavailable" || e.state === "unknown")
      return null;
    const t = parseFloat(e.state);
    return isNaN(t) ? null : t;
  }
  getCurrent() {
    const e = this.getCurrentEntity();
    if (!e || e.state === "unavailable" || e.state === "unknown")
      return null;
    const t = parseFloat(e.state);
    return isNaN(t) ? null : t;
  }
  formatNumber(e, t = 2) {
    return e === null || isNaN(e) ? "--" : e.toFixed(t);
  }
  formatCurrency(e, t = "£") {
    return e === null || isNaN(e) ? "--" : `${t}${e.toFixed(2)}`;
  }
  getTimeDisplay() {
    const e = this.getSwitchEntity();
    if (!e)
      return { primary: g("common.unavailable"), secondary: "" };
    const t = /* @__PURE__ */ new Date(), s = new Date(e.last_changed);
    if (this.isOn()) {
      this._sessionStartTime || (this._sessionStartTime = s.getTime());
      const i = t.getTime() - this._sessionStartTime, a = Math.floor(i / 6e4), r = Math.floor(i % 6e4 / 1e3);
      return {
        primary: g("card.on_since", "{time}", s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
        secondary: g("card.running_for", "{minutes}", String(a)).replace("{seconds}", String(r))
      };
    } else {
      if (this._lastOffTime) {
        const i = t.getTime() - this._lastOffTime, a = Math.floor(i / 6e4);
        return {
          primary: g("card.last_used", "{time}", s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
          secondary: a > 0 ? g("card.minutes_ago", "{minutes}", String(a)) : g("card.just_now")
        };
      }
      return {
        primary: g("card.last_used", "{time}", s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
        secondary: ""
      };
    }
  }
  _handleTap() {
    this._config.tap_action ? this._handleAction(this._config.tap_action) : this.toggleSwitch();
  }
  _handleHold() {
    this._config.hold_action ? this._handleAction(this._config.hold_action) : (this._showModal = !0, this.fireHaptic("medium"));
  }
  _handleAction(e) {
    if (this.hass)
      switch (this.fireHaptic("light"), e.action) {
        case "toggle":
          this.toggleSwitch();
          break;
        case "more-info":
          const t = new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: this._config.entity }
          });
          this.dispatchEvent(t);
          break;
        case "navigate":
          if (e.navigation_path) {
            window.history.pushState(null, "", e.navigation_path);
            const s = new CustomEvent("location-changed", {
              bubbles: !0,
              composed: !0
            });
            window.dispatchEvent(s);
          }
          break;
        case "url":
          e.url_path && window.open(e.url_path);
          break;
        case "call-service":
          if (e.service) {
            const [s, i] = e.service.split(".");
            this.hass.callService(s, i, e.service_data || {});
          }
          break;
      }
  }
  fireHaptic(e) {
    const t = new CustomEvent("haptic", {
      bubbles: !0,
      composed: !0,
      detail: e
    });
    this.dispatchEvent(t);
  }
  toggleSwitch() {
    if (this.isUnavailable()) return;
    this.fireHaptic("light"), this.getSwitchEntity();
    const e = this.isOn();
    this.hass.callService(
      "switch",
      e ? "turn_off" : "turn_on",
      { entity_id: this._config.entity }
    ), e ? (this.showToast(), this._lastOffTime = Date.now()) : (this._sessionStartTime = Date.now(), this._sessionEnergy = 0, this._lastOnTime = Date.now());
  }
  showToast() {
    var i;
    const e = this._sessionEnergy, t = this.getCostTodayEntity();
    let s = `${g("card.session")}: ${this.formatNumber(e, ((i = this._config.decimals) == null ? void 0 : i.energy) || 2)} Wh`;
    if (t && t.state !== "unavailable" && t.state !== "unknown") {
      const a = parseFloat(t.state);
      isNaN(a) || (s += ` • ${this.formatCurrency(a, this._config.currency_symbol)}`);
    }
    this._toastMessage = s, this._showToast = !0, setTimeout(() => {
      this._showToast = !1;
    }, 3e3);
  }
  startTimer(e) {
    this._timerEndTime = Date.now() + e * 6e4, this._autoOffDisabled = !1, this.fireHaptic("success"), this._activeTimer && clearTimeout(this._activeTimer), this._activeTimer = window.setTimeout(() => {
      !this._autoOffDisabled && this.isOn() && this.toggleSwitch(), this._activeTimer = null, this._timerEndTime = null;
    }, e * 6e4);
  }
  cancelTimer() {
    this._activeTimer && (clearTimeout(this._activeTimer), this._activeTimer = null), this._timerEndTime = null, this.fireHaptic("medium");
  }
  getTimerDisplay() {
    if (!this._timerEndTime) return "";
    const e = this._timerEndTime - Date.now();
    if (e <= 0) return "";
    const t = Math.floor(e / 6e4), s = Math.floor(e % 6e4 / 1e3);
    return `${t}:${s.toString().padStart(2, "0")}`;
  }
  renderModal() {
    var o, l, n, d, u;
    if (!this._showModal) return h``;
    const e = this.getPower(), t = this.getVoltage(), s = this.getCurrent(), i = this.getEnergyTodayEntity(), a = this.getCostTodayEntity(), r = this.getTimeDisplay();
    return h`
    <div class="modal" @click=${(c) => {
      c.target === c.currentTarget && (this._showModal = !1);
    }}>
    <div class="modal-content">
        <div class="modal-header">
            <h3 class="modal-title">${this._config.name || "Light Details"}</h3>
                <button class="close-button" @click=${() => this._showModal = !1}>×</button>
                    </div>

                    <div class="expanded-stats">
                        <div class="stat-item">
                            <div class="stat-value">${this.formatNumber(e, ((o = this._config.decimals) == null ? void 0 : o.power) || 0)} W</div>
                                <div class="stat-label">${g("modal.current_power")}</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${this.formatNumber(this._sessionEnergy, ((l = this._config.decimals) == null ? void 0 : l.energy) || 2)} Wh</div>
                                            <div class="stat-label">${g("modal.session_energy")}</div>
                                                </div>
            ${t !== null ? h`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(t, 1)} V</div>
                <div class="stat-label">Voltage</div>
              </div>
            ` : ""}
            ${s !== null ? h`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(s, 2)} A</div>
                <div class="stat-label">Current</div>
              </div>
            ` : ""}
            ${i && i.state !== "unavailable" ? h`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(parseFloat(i.state), ((n = this._config.decimals) == null ? void 0 : n.energy) || 2)} kWh</div>
                <div class="stat-label">${g("card.today")}</div>
              </div>
            ` : ""}
            ${a && a.state !== "unavailable" ? h`
              <div class="stat-item">
                <div class="stat-value">${this.formatCurrency(parseFloat(a.state), this._config.currency_symbol)}</div>
                <div class="stat-label">${g("card.cost_today")}</div>
              </div>
            ` : ""}
</div>

    <div class="sparkline-container" style="height: 80px;">
        ${this._powerSamples.length > 0 ? h`
        <lux-sparkline
            .samples=${this._powerSamples} 
                .config=${this._config.sparkline}
                .accentColor=${"var(--lux-accent-gold)"}
            ></lux-sparkline>
        ` : this.renderModalEmptyState(e)}
    </div>

    <div style="margin: 16px 0; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
        <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 8px;">Time Info</div>
            <div style="font-size: 16px; color: var(--lux-text-primary);">${r.primary}</div>
                <div style="font-size: 14px; color: var(--lux-text-muted);">${r.secondary}</div>
                    </div>

          ${this._timerEndTime ? h`
            <div class="timer-display">
              <div class="timer-text">${g("card.auto_off_in")}: ${this.getTimerDisplay()}</div>
              <button class="control-button" @click=${this.cancelTimer} style="margin-top: 8px;">
                ${g("modal.cancel_timer")}
              </button>
            </div>
          ` : ""}

          ${(d = this._config.modes) != null && d.enabled && ((u = this._config.modes.items) != null && u.length) ? h`
            <div style="margin-top: 24px;">
              <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 12px;">${g("modal.modes")}</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${this._config.modes.items.map((c) => h`
                  <button class="control-button" @click=${() => this.runMode(c)}>
                    ${c.icon ? h`<span style="margin-right: 4px;">${c.icon}</span>` : ""}
                    ${c.label}
                  </button>
                `)}
              </div>
            </div>
          ` : ""}
</div>
    </div>
        `;
  }
  runMode(e) {
    this.fireHaptic("medium"), e.actions && e.actions.forEach((t) => {
      this.hass.callService(t.domain, t.service, t.data);
    }), e.disable_auto_off && (this._autoOffDisabled = !0), e.start_timer_minutes && this.startTimer(e.start_timer_minutes), this._showModal = !1;
  }
  renderToast() {
    return this._showToast ? h`
    <div class="toast">
        ${this._toastMessage}
</div>
    ` : h``;
  }
  _handleStart(e) {
    this.isUnavailable() || (this._timer = Date.now(), this._holdTimer = window.setTimeout(() => {
      this._handleHold(), this._timer = void 0;
    }, 500));
  }
  _handleEnd(e) {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = void 0), this._timer = void 0;
  }
  firstUpdated(e) {
    var t;
    super.firstUpdated(e), (t = this._config.sparkline) != null && t.enabled && this._config.power_entity && !this._historyFetched && this.fetchHistory();
  }
  async fetchHistory() {
    if (!this.hass || !this._config.power_entity) return;
    const e = /* @__PURE__ */ new Date(), t = new Date(e.getTime() - 60 * 60 * 1e3);
    try {
      const s = await this.hass.callApi(
        "GET",
        `history/period/${t.toISOString()}?filter_entity_id=${this._config.power_entity}&end_time=${e.toISOString()}&minimal_response`
      );
      if (s && s[0] && s[0].length > 0) {
        const i = s[0].map((r) => ({
          timestamp: new Date(r.last_changed).getTime(),
          value: parseFloat(r.state)
        })).filter((r) => !isNaN(r.value)), a = /* @__PURE__ */ new Map();
        [...i, ...this._powerSamples].forEach((r) => a.set(r.timestamp, r)), this._powerSamples = Array.from(a.values()).sort((r, o) => r.timestamp - o.timestamp).filter((r) => r.timestamp > t.getTime()), this._historyFetched = !0;
      }
    } catch (s) {
      console.warn("Lux Card: Failed to fetch history", s);
    }
  }
  renderModalEmptyState(e) {
    const t = e || 0, s = this._config.anomaly_watts || 1200, i = Math.min(t / s * 100, 100);
    return h`
        <div class="empty-state-power" style="display: flex; flex-direction: column; justify-content: center; height: 100%; padding: 0 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12px; color: var(--lux-text-muted);">
                <span>Real-time Usage</span>
                <span>${Math.round(i)}% Load</span>
            </div>
            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                <div style="width: ${i}%; height: 100%; background: var(--lux-accent-gold); transition: width 0.3s ease;"></div>
            </div>
            <div style="text-align: center; margin-top: 8px; font-size: 10px; color: var(--lux-text-muted); opacity: 0.6;">
                Collecting history data...
            </div>
        </div>
        `;
  }
  renderBudget() {
    var o;
    if (!((o = this._config.budget) != null && o.enabled) || !this._config.budget.limit) return h``;
    let e = 0, t = "";
    const s = this._config.budget.entity || this._config.cost_today_entity || this._config.energy_today_entity;
    if (s && this.hass.states[s]) {
      const l = this.hass.states[s];
      e = parseFloat(l.state), t = l.attributes.unit_of_measurement || "";
    }
    if (isNaN(e)) return h``;
    const i = this._config.budget.limit, a = Math.min(e / i * 100, 100), r = e > i;
    return h`
    <div style="margin-top: 16px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--lux-text-muted); margin-bottom: 4px;">
            <span>Daily Budget</span>
                <span>${e.toFixed(2)} / ${i.toFixed(2)} ${t}</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                        <div style="
width: ${a}%;
height: 100%;
background: ${r ? "#ef4444" : "var(--lux-accent-gold)"};
transition: width 0.5s ease;
"></div>
    </div>
    </div>
        `;
  }
  render() {
    var l, n, d, u, c, v;
    if (!this._config || !this.hass)
      return h``;
    const e = this.getSwitchEntity(), t = this.getPower(), s = this.getEnergyTodayEntity(), i = this.getCostTodayEntity(), a = this.getTimeDisplay(), r = this.isUnavailable();
    if (this.isOn() && this._sessionStartTime && t !== null) {
      const b = (Date.now() - this._sessionStartTime) / (1e3 * 60 * 60);
      this._sessionEnergy = t * b;
    }
    let o = "";
    if (this.isOn() && t !== null) {
      const p = this._config.anomaly_watts || 1200, b = Math.min(t / p, 1), At = 15 + b * 35, Tt = 0.4 + b * 0.4;
      o = `filter: drop-shadow(0 0 ${At}px rgba(var(--accent-gold-rgb), ${Tt})); transition: filter 0.5s ease-out;`;
    } else this.isOn() && (o = "filter: drop-shadow(0 0 15px rgba(var(--accent-gold-rgb), 0.4)); transition: filter 0.5s ease-out;");
    return h`
    <div
class="card ${this.isOn() ? "on" : "off"} ${this._warmingUp ? "warming" : ""}"
@mousedown=${this._handleStart}
@touchstart=${this._handleStart}
@mouseup=${this._handleEnd}
@touchend=${this._handleEnd}
@keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), this._handleTap());
    }}
tabindex="0"
    >
    <div class="header">
        <div class="title-section">
            <div class="icon-container" style="${o}" 
                @click=${(p) => {
      p.stopPropagation(), this._handleTap();
    }}
                @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), this._handleTap());
    }}
                tabindex="0"
            >
                <ha-icon icon="${this._config.icon || "mdi:lightbulb"}" class="light-icon"></ha-icon>
                        </div>
                        <h2 class="name">${this._config.name || ((l = e == null ? void 0 : e.attributes) == null ? void 0 : l.friendly_name) || "Kitchen Light"}</h2>
                            </div>
                            <div class="status-chip ${r ? "unavailable" : this.isOn() ? "on" : ""}">
                                ${r ? g("common.unavailable") : this.isOn() ? g("common.on") : g("common.off")}
</div>
    </div>

    <lux-power-flow
        .active=${this.isOn()} 
          .power=${t || 0}
        ></lux-power-flow>

    <div class="sparkline-container">
        <lux-sparkline
            .samples=${this._powerSamples} 
                .config=${this._config.sparkline}
                .accentColor=${"var(--lux-accent-gold)"}
            ></lux-sparkline>
    </div>

    <div class="energy-section">
        <div class="energy-item">
            <div class="energy-value">
                ${this.formatNumber(t !== null ? t : 0, ((n = this._config.decimals) == null ? void 0 : n.power) || 0)} W
                    </div>
                    <div class="energy-label">${g("card.live_power")}</div>
                        </div>
                        <div class="energy-item">
                            <div class="energy-value">
                                ${this.formatNumber(this._sessionEnergy, ((d = this._config.decimals) == null ? void 0 : d.energy) || 2)} Wh
                                    </div>
                                    <div class="energy-label">${g("card.session")}</div>
                                        </div>
          ${s && s.state !== "unavailable" ? h`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatNumber(parseFloat(s.state), ((u = this._config.decimals) == null ? void 0 : u.energy) || 2)} kWh</div>
              <div class="energy-label">${g("card.today")}</div>
            </div>
          ` : ""}
          ${i && i.state !== "unavailable" ? h`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatCurrency(parseFloat(i.state), this._config.currency_symbol)}
              </div>
              <div class="energy-label">${g("card.cost_today")}</div>
            </div>
          ` : ""}
</div>

        ${this.renderBudget()}

<div class="time-section">
    <div class="time-info">
        <strong>${a.primary}</strong>
            ${a.secondary ? h`<br>${a.secondary}` : ""}
</div>
    </div>

        ${this._timerEndTime ? h`
          <div class="timer-display">
            <div class="timer-text">${g("card.auto_off_in")}: ${this.getTimerDisplay()}</div>
          </div>
        ` : ""}

        ${(c = this._config.timers) != null && c.enabled && this.isOn() ? h`
          <div class="controls-section">
            ${(v = this._config.timers.presets) == null ? void 0 : v.map((p) => h`
              <button class="control-button" @click=${(b) => {
      b.stopPropagation(), this.startTimer(p);
    }}>
                ${p}m
              </button>
            `)}
            ${this._timerEndTime ? h`
              <button class="control-button" @click=${(p) => {
      p.stopPropagation(), this.cancelTimer();
    }}>
                ${g("card.cancel")}
              </button>
            ` : ""}
            ${this._autoOffDisabled ? h`
              <button class="control-button active" @click=${(p) => {
      p.stopPropagation(), this._autoOffDisabled = !1;
    }}>
                ${g("card.auto_off_disabled")}
              </button>
            ` : h`
              <button class="control-button" @click=${(p) => {
      p.stopPropagation(), this._autoOffDisabled = !0;
    }}>
                ${g("card.disable_auto_off")}
              </button>
            `}
          </div>
        ` : ""}

        ${t !== null && this._config.anomaly_watts && t > this._config.anomaly_watts ? h`
          <div class="status-chip anomaly" style="margin-top: 12px;">
            ${g("card.high_power")}
          </div>
        ` : ""}
</div>

      ${this.renderModal()}
      ${this.renderToast()}
`;
  }
  isDataStale() {
    return !1;
  }
  getCardSize() {
    return 3;
  }
};
_([
  S({ attribute: !1 })
], m.prototype, "hass", 2);
_([
  y()
], m.prototype, "_config", 2);
_([
  y()
], m.prototype, "_showModal", 2);
_([
  y()
], m.prototype, "_sessionEnergy", 2);
_([
  y()
], m.prototype, "_sessionStartTime", 2);
_([
  y()
], m.prototype, "_activeTimer", 2);
_([
  y()
], m.prototype, "_timerEndTime", 2);
_([
  y()
], m.prototype, "_showToast", 2);
_([
  y()
], m.prototype, "_toastMessage", 2);
_([
  y()
], m.prototype, "_powerSamples", 2);
_([
  y()
], m.prototype, "_sampleInterval", 2);
_([
  y()
], m.prototype, "_autoOffDisabled", 2);
_([
  y()
], m.prototype, "_lastOnTime", 2);
_([
  y()
], m.prototype, "_lastOffTime", 2);
_([
  y()
], m.prototype, "_warmingUp", 2);
_([
  y()
], m.prototype, "_historyFetched", 2);
m = _([
  G("lux-switch-energy-card")
], m);
export {
  m as LuxSwitchEnergyCard
};
