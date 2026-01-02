/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, tt = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (s) => new bt(typeof s == "string" ? s : s + "", void 0, et), q = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[a + 1], s[0]);
  return new bt(e, s, et);
}, Tt = (s, t) => {
  if (tt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = F.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, nt = tt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return At(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ct, defineProperty: kt, getOwnPropertyDescriptor: Pt, getOwnPropertyNames: Ot, getOwnPropertySymbols: Mt, getPrototypeOf: Dt } = Object, x = globalThis, lt = x.trustedTypes, Lt = lt ? lt.emptyScript : "", J = x.reactiveElementPolyfillSupport, L = (s, t) => s, B = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Lt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, st = (s, t) => !Ct(s, t), ct = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: st };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && kt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: a } = Pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const n = r == null ? void 0 : r.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = Dt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, i = [...Ot(e), ...Mt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(nt(r));
    } else t !== void 0 && e.push(nt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Tt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var a;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : B).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : B;
      this._$Em = r;
      const c = l.fromAttribute(e, n.type);
      this[r] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, a) {
    var o;
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[t]), i ?? (i = n.getPropertyOptions(t)), !((i.hasChanged ?? st)(a, e) || i.useDefault && i.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: a }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [a, o] of r) {
        const { wrapped: n } = o, l = this[a];
        n !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var a;
        return (a = r.hostUpdate) == null ? void 0 : a.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[L("elementProperties")] = /* @__PURE__ */ new Map(), P[L("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: P }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, dt = (s) => s, W = N.trustedTypes, ht = W ? W.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, $t = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, wt = "?" + w, Nt = `<${wt}>`, k = document, U = () => k.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", it = Array.isArray, Ut = (s) => it(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, ut = />/g, A = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, mt = /"/g, xt = /^(?:script|style|textarea|title)$/i, Ht = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), d = Ht(1), O = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), T = k.createTreeWalker(k, 129);
function Et(s, t) {
  if (!it(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const zt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = D;
  for (let n = 0; n < e; n++) {
    const l = s[n];
    let c, u, p = -1, y = 0;
    for (; y < l.length && (o.lastIndex = y, u = o.exec(l), u !== null); ) y = o.lastIndex, o === D ? u[1] === "!--" ? o = pt : u[1] !== void 0 ? o = ut : u[2] !== void 0 ? (xt.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = A) : u[3] !== void 0 && (o = A) : o === A ? u[0] === ">" ? (o = r ?? D, p = -1) : u[1] === void 0 ? p = -2 : (p = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? A : u[3] === '"' ? mt : gt) : o === mt || o === gt ? o = A : o === pt || o === ut ? o = D : (o = A, r = void 0);
    const g = o === A && s[n + 1].startsWith("/>") ? " " : "";
    a += o === D ? l + Nt : p >= 0 ? (i.push(c), l.slice(0, p) + $t + l.slice(p) + w + g) : l + w + (p === -2 ? n : g);
  }
  return [Et(s, a + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class z {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let a = 0, o = 0;
    const n = t.length - 1, l = this.parts, [c, u] = zt(t, e);
    if (this.el = z.createElement(c, i), T.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = T.nextNode()) !== null && l.length < n; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith($t)) {
          const y = u[o++], g = r.getAttribute(p).split(w), $ = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: a, name: $[2], strings: g, ctor: $[1] === "." ? Rt : $[1] === "?" ? It : $[1] === "@" ? Vt : Y }), r.removeAttribute(p);
        } else p.startsWith(w) && (l.push({ type: 6, index: a }), r.removeAttribute(p));
        if (xt.test(r.tagName)) {
          const p = r.textContent.split(w), y = p.length - 1;
          if (y > 0) {
            r.textContent = W ? W.emptyScript : "";
            for (let g = 0; g < y; g++) r.append(p[g], U()), T.nextNode(), l.push({ type: 2, index: ++a });
            r.append(p[y], U());
          }
        }
      } else if (r.nodeType === 8) if (r.data === wt) l.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(w, p + 1)) !== -1; ) l.push({ type: 7, index: a }), p += w.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function M(s, t, e = s, i) {
  var o, n;
  if (t === O) return t;
  let r = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const a = H(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== a && ((n = r == null ? void 0 : r._$AO) == null || n.call(r, !1), a === void 0 ? r = void 0 : (r = new a(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = M(s, r._$AS(s, t.values), r, i)), t;
}
class jt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    T.currentNode = r;
    let a = T.nextNode(), o = 0, n = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new V(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new Ft(a, this, t)), this._$AV.push(c), l = i[++n];
      }
      o !== (l == null ? void 0 : l.index) && (a = T.nextNode(), o++);
    }
    return T.currentNode = k, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = M(this, t, e), H(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ut(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = z.createElement(Et(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === r) this._$AH.p(e);
    else {
      const o = new jt(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const a of t) r === e.length ? e.push(i = new V(this.O(U()), this.O(U()), this, this.options)) : i = e[r], i._$AI(a), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = dt(t).nextSibling;
      dt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, r) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = M(this, t, e, 0), o = !H(t) || t !== this._$AH && t !== O, o && (this._$AH = t);
    else {
      const n = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = M(this, n[i + l], e, l), c === O && (c = this._$AH[l]), o || (o = !H(c) || c !== this._$AH[l]), c === f ? t = f : t !== f && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class It extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Vt extends Y {
  constructor(t, e, i, r, a) {
    super(t, e, i, r, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = M(this, t, e, 0) ?? f) === O) return;
    const i = this._$AH, r = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== f && (i === f || r);
    r && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ft {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const X = N.litHtmlPolyfillSupport;
X == null || X(z, V), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const Bt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new V(t.insertBefore(U(), a), a, void 0, e ?? {});
  }
  return r._$AI(s), r;
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
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
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
const Z = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: st }, qt = (s = Wt, t, e) => {
  const { kind: i, metadata: r } = e;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), a.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(o, l, s, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, s, n), n;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(n) {
      const l = this[o];
      t.call(this, n), this.requestUpdate(o, l, s, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function S(s) {
  return (t, e) => typeof e == "object" ? qt(s, t, e) : ((i, r, a) => {
    const o = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(s) {
  return S({ ...s, state: !0, attribute: !1 });
}
const Yt = q`
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
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--lux-accent-gold);
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--lux-text-muted);
    text-transform: uppercase;
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
function h(s, t, e) {
  var a, o;
  const i = ((a = window.customCards) == null ? void 0 : a.activeLang) || "en";
  let r = ((o = _t[i]) == null ? void 0 : o[s]) || _t.en[s] || s;
  return t && e && (r = r.replace(t, e)), r;
}
var Zt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, G = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Gt(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && Zt(t, e, r), r;
};
let j = class extends E {
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
  render() {
    var o;
    if (this.samples.length < 2)
      return d``;
    const e = Math.max(...this.samples.map((n) => n.value), 0), i = Math.min(...this.samples.map((n) => n.value), 0), r = e - i || 1, a = this.samples.map((n, l) => {
      const c = l / (this.samples.length - 1) * 200, u = 40 - (n.value - i) / r * 40;
      return `${c},${u}`;
    }).join(" ");
    return d`
            <svg viewBox="0 0 ${200} ${40}">
                <polyline
                    fill="none"
                    stroke="${this.accentColor}"
                    stroke-width="${((o = this.config) == null ? void 0 : o.line_width) || 2}"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    points="${a}"
                    opacity="0.8"
                />
            </svg>
        `;
  }
};
G([
  S({ type: Array })
], j.prototype, "samples", 2);
G([
  S({ type: Object })
], j.prototype, "config", 2);
G([
  S({ type: String })
], j.prototype, "accentColor", 2);
j = G([
  Z("lux-sparkline")
], j);
var Jt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, rt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Kt(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && Jt(t, e, r), r;
};
let R = class extends E {
  constructor() {
    super(...arguments), this.active = !1, this.power = 0;
  }
  render() {
    const s = Math.max(0.2, 3 - this.power / 500);
    return d`
      <div class="flow-container ${this.active ? "active" : ""}" style="--flow-speed: ${s}s">
        <svg viewBox="0 0 200 60" preserveAspectRatio="xMidYMid meet">
          <!-- Bolt (Source) - Centered at Y=30 (Local Center Y=12, so translate Y=18) -->
          <g transform="translate(10, 18)">
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
R.styles = q`
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
  `;
rt([
  S({ type: Boolean })
], R.prototype, "active", 2);
rt([
  S({ type: Number })
], R.prototype, "power", 2);
R = rt([
  Z("lux-power-flow")
], R);
const vt = /* @__PURE__ */ new Set();
function St(s, t) {
  vt.has(s) || (vt.add(s), console.warn(`[Lux Switch Card] ${t}`));
}
function b(s, t, e, i) {
  return s < t || s > e ? (St(`clamp_${i}`, `${i} (${s}) out of range [${t}, ${e}]. Clamping.`), Math.max(t, Math.min(s, e))) : s;
}
function Xt(s) {
  if (!s.entity)
    throw new Error('Configuration Error: "entity" is required.');
  const t = s.theme || {}, e = s.sparkline || {}, i = s.timers || {}, r = {
    ...t,
    blur: t.blur !== void 0 ? b(t.blur, 0, 30, "theme.blur") : 14,
    opacity: t.opacity !== void 0 ? b(t.opacity, 0.02, 0.2, "theme.opacity") : 0.08,
    border_radius: t.border_radius !== void 0 ? b(t.border_radius, 12, 32, "theme.border_radius") : 24,
    glow_strength: t.glow_strength !== void 0 ? b(t.glow_strength, 0, 1, "theme.glow_strength") : 0.65,
    shadow_strength: t.shadow_strength !== void 0 ? b(t.shadow_strength, 0, 1, "theme.shadow_strength") : 0.35
  }, a = {
    ...e,
    samples: e.samples !== void 0 ? b(e.samples, 10, 240, "sparkline.samples") : 60,
    interval_sec: e.interval_sec !== void 0 ? b(e.interval_sec, 2, 60, "sparkline.interval_sec") : 10
  };
  let o = i.presets || [15, 30, 60];
  o.length > 10 && (St("timer_presets_max", "Too many timer presets. Limiting to first 10."), o = o.slice(0, 10)), o = o.map((u) => b(u, 1, 240, "timer_preset"));
  const n = {
    ...i,
    presets: o,
    default_minutes: i.default_minutes || 30
    // No hard clamp requested but good to have fallback
  }, l = s.stale_seconds !== void 0 ? b(s.stale_seconds, 10, 900, "stale_seconds") : 120, c = s.anomaly_watts !== void 0 ? b(s.anomaly_watts, 10, 1e4, "anomaly_watts") : 1200;
  return {
    ...s,
    theme: r,
    sparkline: a,
    timers: n,
    stale_seconds: l,
    anomaly_watts: c
  };
}
var Qt = Object.defineProperty, te = Object.getOwnPropertyDescriptor, at = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? te(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && Qt(t, e, r), r;
};
let I = class extends E {
  setConfig(s) {
    this._config = s;
  }
  _valueChanged(s) {
    if (!this._config || !this.hass)
      return;
    const t = s.target;
    if (!t) return;
    const e = t.configValue, i = t.checked !== void 0 ? t.checked : t.value;
    if (e)
      if (e.includes(".")) {
        const a = e.split("."), o = { ...this._config };
        let n = o;
        for (let l = 0; l < a.length - 1; l++)
          n[a[l]] = { ...n[a[l]] }, n = n[a[l]];
        n[a[a.length - 1]] = i, this._config = o;
      } else
        this._config = {
          ...this._config,
          [e]: i
        };
    const r = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(r);
  }
  render() {
    var s, t, e, i, r, a, o, n;
    return !this.hass || !this._config ? d`` : d`
            <div class="card-config">
                <div class="section">
                    <div class="label">Core Entities</div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity}
                        .configValue=${"entity"}
                        @value-changed=${this._valueChanged}
                        label="Switch Entity (Required)"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.power_entity}
                        .configValue=${"power_entity"}
                        @value-changed=${this._valueChanged}
                        label="Power Entity (Watts)"
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="section">
                    <div class="label">Visuals (Glassmorphism)</div>
                    <div class="row">
                        <ha-textfield
                            label="Card Name"
                            .value=${this._config.name || ""}
                            .configValue=${"name"}
                            @input=${this._valueChanged}
                        ></ha-textfield>
                    </div>
                    <div class="row">
                        <span>Blur (${((s = this._config.theme) == null ? void 0 : s.blur) || 14}px)</span>
                        <ha-slider
                            .value=${((t = this._config.theme) == null ? void 0 : t.blur) || 14}
                            .configValue=${"theme.blur"}
                            min="0"
                            max="30"
                            step="1"
                            pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                    </div>
                    <div class="row">
                        <span>Opacity (${((e = this._config.theme) == null ? void 0 : e.opacity) || 0.08})</span>
                        <ha-slider
                            .value=${((i = this._config.theme) == null ? void 0 : i.opacity) || 0.08}
                            .configValue=${"theme.opacity"}
                            min="0.02"
                            max="0.20"
                            step="0.01"
                            pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                    </div>
                </div>

                <div class="section">
                    <div class="label">Energy Monitoring</div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.energy_today_entity}
                        .configValue=${"energy_today_entity"}
                        @value-changed=${this._valueChanged}
                        label="Energy Today Entity (kWh)"
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="section">
                    <div class="label">Timers & Limits</div>
                    <div class="row">
                        <span>Enable Auto-Off Timers</span>
                        <ha-switch
                            .checked=${((r = this._config.timers) == null ? void 0 : r.enabled) !== !1}
                            .configValue=${"timers.enabled"}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </div>
                    <ha-textfield
                        label="Anomaly Watts Trigger"
                        type="number"
                        .value=${this._config.anomaly_watts || 1200}
                        .configValue=${"anomaly_watts"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>

                <div class="section">
                    <div class="label">Sparkline Chart</div>
                    <div class="row">
                        <span>Enable Sparkline</span>
                        <ha-switch
                            .checked=${((a = this._config.sparkline) == null ? void 0 : a.enabled) !== !1}
                            .configValue=${"sparkline.enabled"}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </div>
                    <div class="row">
                        <span>Line Width (${((o = this._config.sparkline) == null ? void 0 : o.line_width) || 2})</span>
                        <ha-slider
                            .value=${((n = this._config.sparkline) == null ? void 0 : n.line_width) || 2}
                            .configValue=${"sparkline.line_width"}
                            min="1"
                            max="5"
                            step="0.5"
                            pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                    </div>
                </div>
            </div>
        `;
  }
};
I.styles = q`
        .card-config {
            padding: 16px;
        }
        .section {
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .label {
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 4px;
            color: var(--secondary-text-color);
        }
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }
        ha-slider {
            flex: 1;
        }
        ha-textfield, ha-entity-picker {
            width: 100%;
        }
    `;
at([
  S({ attribute: !1 })
], I.prototype, "hass", 2);
at([
  v()
], I.prototype, "_config", 2);
I = at([
  Z("lux-switch-energy-card-editor")
], I);
var ee = Object.defineProperty, se = Object.getOwnPropertyDescriptor, _ = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? se(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && ee(t, e, r), r;
};
window.customCards = window.customCards || [];
window.customCards.push({
  type: "lux-switch-energy-card",
  name: "Lux Switch Energy Card",
  description: "A premium glassmorphic switch card with energy monitoring"
});
let m = class extends E {
  constructor() {
    super(...arguments), this._showModal = !1, this._sessionEnergy = 0, this._sessionStartTime = null, this._activeTimer = null, this._timerEndTime = null, this._showToast = !1, this._toastMessage = "", this._powerSamples = [], this._sampleInterval = null, this._autoOffDisabled = !1, this._lastOnTime = null, this._lastOffTime = null, this._historyFetched = !1;
  }
  static get styles() {
    return Yt;
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
  setConfig(s) {
    var e;
    const t = Xt(s);
    this._config = {
      ...m.getStubConfig(),
      ...t,
      // Normalized values take precedence
      // Ensure nested objects merge correctly if normalized returned partials (it returns full valid sub-objects)
      decimals: { ...m.getStubConfig().decimals, ...s.decimals },
      modes: { ...m.getStubConfig().modes, ...s.modes }
    }, this.updateThemeVariables(), (e = this._config.sparkline) != null && e.enabled && this._config.power_entity && this.startPowerSampling();
  }
  updateThemeVariables() {
    const s = this._config.theme, t = (e, i) => {
      i != null ? this.style.setProperty(e, String(i)) : this.style.removeProperty(e);
    };
    t("--glass-blur", `${(s == null ? void 0 : s.blur) || 14}px`), t("--glass-opacity", (s == null ? void 0 : s.opacity) || 0.08), s != null && s.panel_color ? this.style.setProperty("--lux-panel-color", s.panel_color) : this.style.setProperty("--lux-panel-color", "var(--ha-card-background, rgba(255, 255, 255, 0.06))"), t("--lux-accent-gold", (s == null ? void 0 : s.accent_gold) || "#d6b25e"), this.style.setProperty("--accent-gold-rgb", this.hexToRgb((s == null ? void 0 : s.accent_gold) || "#d6b25e")), t("--lux-accent-purple", (s == null ? void 0 : s.accent_purple) || "#6b21a8"), s != null && s.text_primary ? this.style.setProperty("--lux-text-primary", s.text_primary) : this.style.setProperty("--lux-text-primary", "var(--primary-text-color, rgba(255, 255, 255, 0.92))"), s != null && s.text_muted ? this.style.setProperty("--lux-text-muted", s.text_muted) : this.style.setProperty("--lux-text-muted", "var(--secondary-text-color, rgba(255, 255, 255, 0.62))"), t("--lux-shadow-strength", s == null ? void 0 : s.shadow_strength), t("--lux-glow-strength", s == null ? void 0 : s.glow_strength), t("--lux-border-radius", `${(s == null ? void 0 : s.border_radius) || 24}px`);
  }
  hexToRgb(s) {
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);
    return t ? `${parseInt(t[1], 16)}, ${parseInt(t[2], 16)}, ${parseInt(t[3], 16)}` : "214, 178, 94";
  }
  startPowerSampling() {
    var t;
    this._sampleInterval && clearInterval(this._sampleInterval);
    const s = ((t = this._config.sparkline) == null ? void 0 : t.interval_sec) || 10;
    this._sampleInterval = window.setInterval(() => {
      var i;
      const e = this.getPower();
      if (e !== null) {
        this._powerSamples.push({
          timestamp: Date.now(),
          value: e
        });
        const r = ((i = this._config.sparkline) == null ? void 0 : i.samples) || 60;
        this._powerSamples.length > r && this._powerSamples.shift();
      }
    }, s * 1e3);
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
  isOn() {
    const s = this.getSwitchEntity();
    return (s == null ? void 0 : s.state) === "on";
  }
  isUnavailable() {
    const s = this.getSwitchEntity();
    return !s || s.state === "unavailable" || s.state === "unknown";
  }
  getPower() {
    const s = this.getPowerEntity();
    if (!s || s.state === "unavailable" || s.state === "unknown")
      return null;
    const t = parseFloat(s.state);
    return isNaN(t) ? null : t;
  }
  formatNumber(s, t = 2) {
    return s === null || isNaN(s) ? "--" : s.toFixed(t);
  }
  formatCurrency(s, t = "£") {
    return s === null || isNaN(s) ? "--" : `${t}${s.toFixed(2)}`;
  }
  getTimeDisplay() {
    const s = this.getSwitchEntity();
    if (!s)
      return { primary: h("common.unavailable"), secondary: "" };
    const t = /* @__PURE__ */ new Date(), e = new Date(s.last_changed);
    if (this.isOn()) {
      this._sessionStartTime || (this._sessionStartTime = e.getTime());
      const i = t.getTime() - this._sessionStartTime, r = Math.floor(i / 6e4), a = Math.floor(i % 6e4 / 1e3);
      return {
        primary: h("card.on_since", "{time}", e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
        secondary: h("card.running_for", "{minutes}", String(r)).replace("{seconds}", String(a))
      };
    } else {
      if (this._lastOffTime) {
        const i = t.getTime() - this._lastOffTime, r = Math.floor(i / 6e4);
        return {
          primary: h("card.last_used", "{time}", e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
          secondary: r > 0 ? h("card.minutes_ago", "{minutes}", String(r)) : h("card.just_now")
        };
      }
      return {
        primary: h("card.last_used", "{time}", e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
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
  _handleAction(s) {
    if (this.hass)
      switch (this.fireHaptic("light"), s.action) {
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
          if (s.navigation_path) {
            window.history.pushState(null, "", s.navigation_path);
            const e = new CustomEvent("location-changed", {
              bubbles: !0,
              composed: !0
            });
            window.dispatchEvent(e);
          }
          break;
        case "url":
          s.url_path && window.open(s.url_path);
          break;
        case "call-service":
          if (s.service) {
            const [e, i] = s.service.split(".");
            this.hass.callService(e, i, s.service_data || {});
          }
          break;
      }
  }
  fireHaptic(s) {
    const t = new CustomEvent("haptic", {
      bubbles: !0,
      composed: !0,
      detail: s
    });
    this.dispatchEvent(t);
  }
  toggleSwitch() {
    if (this.isUnavailable()) return;
    this.fireHaptic("light"), this.getSwitchEntity();
    const s = this.isOn();
    this.hass.callService(
      "switch",
      s ? "turn_off" : "turn_on",
      { entity_id: this._config.entity }
    ), s ? (this.showToast(), this._lastOffTime = Date.now()) : (this._sessionStartTime = Date.now(), this._sessionEnergy = 0, this._lastOnTime = Date.now());
  }
  showToast() {
    var i;
    const s = this._sessionEnergy, t = this.getCostTodayEntity();
    let e = `${h("card.session")}: ${this.formatNumber(s, ((i = this._config.decimals) == null ? void 0 : i.energy) || 2)} Wh`;
    if (t && t.state !== "unavailable" && t.state !== "unknown") {
      const r = parseFloat(t.state);
      isNaN(r) || (e += ` • ${this.formatCurrency(r, this._config.currency_symbol)}`);
    }
    this._toastMessage = e, this._showToast = !0, setTimeout(() => {
      this._showToast = !1;
    }, 3e3);
  }
  startTimer(s) {
    this._timerEndTime = Date.now() + s * 6e4, this._autoOffDisabled = !1, this.fireHaptic("success"), this._activeTimer && clearTimeout(this._activeTimer), this._activeTimer = window.setTimeout(() => {
      !this._autoOffDisabled && this.isOn() && this.toggleSwitch(), this._activeTimer = null, this._timerEndTime = null;
    }, s * 6e4);
  }
  cancelTimer() {
    this._activeTimer && (clearTimeout(this._activeTimer), this._activeTimer = null), this._timerEndTime = null, this.fireHaptic("medium");
  }
  getTimerDisplay() {
    if (!this._timerEndTime) return "";
    const s = this._timerEndTime - Date.now();
    if (s <= 0) return "";
    const t = Math.floor(s / 6e4), e = Math.floor(s % 6e4 / 1e3);
    return `${t}:${e.toString().padStart(2, "0")}`;
  }
  renderModal() {
    var r, a, o, n, l;
    if (!this._showModal) return d``;
    const s = this.getPower(), t = this.getEnergyTodayEntity(), e = this.getCostTodayEntity(), i = this.getTimeDisplay();
    return d`
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
              <div class="stat-value">${this.formatNumber(s, ((r = this._config.decimals) == null ? void 0 : r.power) || 0)} W</div>
              <div class="stat-label">${h("modal.current_power")}</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${this.formatNumber(this._sessionEnergy, ((a = this._config.decimals) == null ? void 0 : a.energy) || 2)} Wh</div>
              <div class="stat-label">${h("modal.session_energy")}</div>
            </div>
            ${t && t.state !== "unavailable" ? d`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(parseFloat(t.state), ((o = this._config.decimals) == null ? void 0 : o.energy) || 2)} kWh</div>
                <div class="stat-label">${h("card.today")}</div>
              </div>
            ` : ""}
            ${e && e.state !== "unavailable" ? d`
              <div class="stat-item">
                <div class="stat-value">${this.formatCurrency(parseFloat(e.state), this._config.currency_symbol)}</div>
                <div class="stat-label">${h("card.cost_today")}</div>
              </div>
            ` : ""}
          </div>

          <div class="sparkline-container" style="height: 80px;">
            <lux-sparkline 
                .samples=${this._powerSamples} 
                .config=${this._config.sparkline}
                .accentColor=${"var(--lux-accent-gold)"}
            ></lux-sparkline>
          </div>

          <div style="margin: 16px 0; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
            <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 8px;">Time Info</div>
            <div style="font-size: 16px; color: var(--lux-text-primary);">${i.primary}</div>
            <div style="font-size: 14px; color: var(--lux-text-muted);">${i.secondary}</div>
          </div>

          ${this._timerEndTime ? d`
            <div class="timer-display">
              <div class="timer-text">${h("card.auto_off_in")}: ${this.getTimerDisplay()}</div>
              <button class="control-button" @click=${this.cancelTimer} style="margin-top: 8px;">
                ${h("modal.cancel_timer")}
              </button>
            </div>
          ` : ""}

          ${(n = this._config.modes) != null && n.enabled && ((l = this._config.modes.items) != null && l.length) ? d`
            <div style="margin-top: 24px;">
              <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 12px;">${h("modal.modes")}</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${this._config.modes.items.map((c) => d`
                  <button class="control-button" @click=${() => this.runMode(c)}>
                    ${c.icon ? d`<span style="margin-right: 4px;">${c.icon}</span>` : ""}
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
  runMode(s) {
    this.fireHaptic("medium"), s.actions && s.actions.forEach((t) => {
      this.hass.callService(t.domain, t.service, t.data);
    }), s.disable_auto_off && (this._autoOffDisabled = !0), s.start_timer_minutes && this.startTimer(s.start_timer_minutes), this._showModal = !1;
  }
  renderToast() {
    return this._showToast ? d`
      <div class="toast">
        ${this._toastMessage}
      </div>
    ` : d``;
  }
  _handleStart(s) {
    this._timer = Date.now(), this._holdTimer = window.setTimeout(() => {
      this._handleHold(), this._timer = void 0;
    }, 500);
  }
  _handleEnd(s) {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = void 0), this._timer && Date.now() - this._timer < 500 && this._handleTap();
  }
  firstUpdated(s) {
    var t;
    super.firstUpdated(s), (t = this._config.sparkline) != null && t.enabled && this._config.power_entity && !this._historyFetched && this.fetchHistory();
  }
  async fetchHistory() {
    if (!this.hass || !this._config.power_entity) return;
    const s = /* @__PURE__ */ new Date(), t = new Date(s.getTime() - 60 * 60 * 1e3);
    try {
      const e = await this.hass.callApi(
        "GET",
        `history/period/${t.toISOString()}?filter_entity_id=${this._config.power_entity}&end_time=${s.toISOString()}&minimal_response`
      );
      if (e && e[0] && e[0].length > 0) {
        const i = e[0].map((a) => ({
          timestamp: new Date(a.last_changed).getTime(),
          value: parseFloat(a.state)
        })).filter((a) => !isNaN(a.value)), r = /* @__PURE__ */ new Map();
        [...i, ...this._powerSamples].forEach((a) => r.set(a.timestamp, a)), this._powerSamples = Array.from(r.values()).sort((a, o) => a.timestamp - o.timestamp).filter((a) => a.timestamp > t.getTime()), this._historyFetched = !0;
      }
    } catch (e) {
      console.warn("Lux Card: Failed to fetch history", e);
    }
  }
  renderBudget() {
    var o;
    if (!((o = this._config.budget) != null && o.enabled) || !this._config.budget.limit) return d``;
    let s = 0, t = "";
    const e = this._config.budget.entity || this._config.cost_today_entity || this._config.energy_today_entity;
    if (e && this.hass.states[e]) {
      const n = this.hass.states[e];
      s = parseFloat(n.state), t = n.attributes.unit_of_measurement || "";
    }
    if (isNaN(s)) return d``;
    const i = this._config.budget.limit, r = Math.min(s / i * 100, 100), a = s > i;
    return d`
        <div style="margin-top: 16px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--lux-text-muted); margin-bottom: 4px;">
                <span>Daily Budget</span>
                <span>${s.toFixed(2)} / ${i.toFixed(2)} ${t}</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                <div style="
                    width: ${r}%; 
                    height: 100%; 
                    background: ${a ? "#ef4444" : "var(--lux-accent-gold)"};
                    transition: width 0.5s ease;
                "></div>
            </div>
        </div>
      `;
  }
  render() {
    var n, l, c, u, p, y;
    if (!this._config || !this.hass)
      return d``;
    const s = this.getSwitchEntity(), t = this.getPower(), e = this.getEnergyTodayEntity(), i = this.getCostTodayEntity(), r = this.getTimeDisplay(), a = this.isUnavailable(), o = this.isDataStale();
    if (this.isOn() && this._sessionStartTime && t !== null) {
      const $ = (Date.now() - this._sessionStartTime) / (1e3 * 60 * 60);
      this._sessionEnergy = t * $;
    }
    return d`
      <div 
        class="card ${this.isOn() ? "on" : "off"}"
        @mousedown=${this._handleStart}
        @touchstart=${this._handleStart}
        @mouseup=${this._handleEnd}
        @touchend=${this._handleEnd}
        @keydown=${(g) => {
      (g.key === "Enter" || g.key === " ") && (g.preventDefault(), this._handleTap());
    }}
        tabindex="0"
      >
        <div class="header">
          <div class="title-section">
            <div class="icon-container">
              <svg class="light-icon" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 11h-4v-1h4v1zm0-2h-4V8c0-1.1.9-2 2-2s2 .9 2 2v3z"/>
              </svg>
            </div>
            <h2 class="name">${this._config.name || ((n = s == null ? void 0 : s.attributes) == null ? void 0 : n.friendly_name) || "Kitchen Light"}</h2>
          </div>
          <div class="status-chip ${a ? "unavailable" : o ? "stale" : this.isOn() ? "on" : ""}">
            ${a ? h("common.unavailable") : o ? h("common.stale") : this.isOn() ? h("common.on") : h("common.off")}
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
              ${this.formatNumber(t !== null ? t : 0, ((l = this._config.decimals) == null ? void 0 : l.power) || 0)} W
            </div>
            <div class="energy-label">${h("card.live_power")}</div>
          </div>
          <div class="energy-item">
            <div class="energy-value">
              ${this.formatNumber(this._sessionEnergy, ((c = this._config.decimals) == null ? void 0 : c.energy) || 2)} Wh
            </div>
            <div class="energy-label">${h("card.session")}</div>
          </div>
          ${e && e.state !== "unavailable" ? d`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatNumber(parseFloat(e.state), ((u = this._config.decimals) == null ? void 0 : u.energy) || 2)} kWh</div>
              <div class="energy-label">${h("card.today")}</div>
            </div>
          ` : ""}
          ${i && i.state !== "unavailable" ? d`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatCurrency(parseFloat(i.state), this._config.currency_symbol)}
              </div>
              <div class="energy-label">${h("card.cost_today")}</div>
            </div>
          ` : ""}
        </div>

        ${this.renderBudget()}

        <div class="time-section">
          <div class="time-info">
            <strong>${r.primary}</strong>
            ${r.secondary ? d`<br>${r.secondary}` : ""}
          </div>
        </div>

        ${this._timerEndTime ? d`
          <div class="timer-display">
            <div class="timer-text">${h("card.auto_off_in")}: ${this.getTimerDisplay()}</div>
          </div>
        ` : ""}

        ${(p = this._config.timers) != null && p.enabled && this.isOn() ? d`
          <div class="controls-section">
            ${(y = this._config.timers.presets) == null ? void 0 : y.map((g) => d`
              <button class="control-button" @click=${($) => {
      $.stopPropagation(), this.startTimer(g);
    }}>
                ${g}m
              </button>
            `)}
            ${this._timerEndTime ? d`
              <button class="control-button" @click=${(g) => {
      g.stopPropagation(), this.cancelTimer();
    }}>
                ${h("card.cancel")}
              </button>
            ` : ""}
            ${this._autoOffDisabled ? d`
              <button class="control-button active" @click=${(g) => {
      g.stopPropagation(), this._autoOffDisabled = !1;
    }}>
                ${h("card.auto_off_disabled")}
              </button>
            ` : d`
              <button class="control-button" @click=${(g) => {
      g.stopPropagation(), this._autoOffDisabled = !0;
    }}>
                ${h("card.disable_auto_off")}
              </button>
            `}
          </div>
        ` : ""}

        ${t !== null && this._config.anomaly_watts && t > this._config.anomaly_watts ? d`
          <div class="status-chip anomaly" style="margin-top: 12px;">
            ${h("card.high_power")}
          </div>
        ` : ""}
      </div>

      ${this.renderModal()}
      ${this.renderToast()}
    `;
  }
  isDataStale() {
    const s = this.getPowerEntity() || this.getSwitchEntity();
    if (!s) return !1;
    const t = new Date(s.last_updated), e = /* @__PURE__ */ new Date(), i = this._config.stale_seconds || 120;
    return e.getTime() - t.getTime() > i * 1e3;
  }
  getCardSize() {
    return 3;
  }
};
_([
  S({ attribute: !1 })
], m.prototype, "hass", 2);
_([
  v()
], m.prototype, "_config", 2);
_([
  v()
], m.prototype, "_showModal", 2);
_([
  v()
], m.prototype, "_sessionEnergy", 2);
_([
  v()
], m.prototype, "_sessionStartTime", 2);
_([
  v()
], m.prototype, "_activeTimer", 2);
_([
  v()
], m.prototype, "_timerEndTime", 2);
_([
  v()
], m.prototype, "_showToast", 2);
_([
  v()
], m.prototype, "_toastMessage", 2);
_([
  v()
], m.prototype, "_powerSamples", 2);
_([
  v()
], m.prototype, "_sampleInterval", 2);
_([
  v()
], m.prototype, "_autoOffDisabled", 2);
_([
  v()
], m.prototype, "_lastOnTime", 2);
_([
  v()
], m.prototype, "_lastOffTime", 2);
_([
  v()
], m.prototype, "_historyFetched", 2);
m = _([
  Z("lux-switch-energy-card")
], m);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "lux-switch-energy-card",
  name: "Luxury Switch Energy Card",
  description: "A premium glassmorphic switch card with energy monitoring"
});
export {
  m as LuxSwitchEnergyCard
};
