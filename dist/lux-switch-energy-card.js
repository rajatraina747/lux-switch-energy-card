/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, it = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, at = Symbol(), ct = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== at) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (it && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = ct.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ct.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ot = (e) => new wt(typeof e == "string" ? e : e + "", void 0, at), J = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, a, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[o + 1], e[0]);
  return new wt(s, e, at);
}, Mt = (e, t) => {
  if (it) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), a = q.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = s.cssText, e.appendChild(i);
  }
}, dt = it ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Ot(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Dt, defineProperty: Nt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Lt, getOwnPropertySymbols: Ht, getPrototypeOf: zt } = Object, A = globalThis, ht = A.trustedTypes, Rt = ht ? ht.emptyScript : "", Q = A.reactiveElementPolyfillSupport, z = (e, t) => e, Z = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Rt : null;
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
} }, rt = (e, t) => !Dt(e, t), pt = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = pt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), a = this.getPropertyDescriptor(t, i, s);
      a !== void 0 && Nt(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: a, set: o } = Ut(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: a, set(r) {
      const n = a == null ? void 0 : a.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const s = this.properties, i = [...Lt(s), ...Ht(s)];
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
      for (const a of i) s.unshift(dt(a));
    } else t !== void 0 && s.push(dt(t));
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
    return Mt(t, this.constructor.elementStyles), t;
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
    var o;
    const i = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, i);
    if (a !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Z).toAttribute(s, i.type);
      this._$Em = t, r == null ? this.removeAttribute(a) : this.setAttribute(a, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var o, r;
    const i = this.constructor, a = i._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const n = i.getPropertyOptions(a), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : Z;
      this._$Em = a;
      const d = l.fromAttribute(s, n.type);
      this[a] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(a)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, a = !1, o) {
    var r;
    if (t !== void 0) {
      const n = this.constructor;
      if (a === !1 && (o = this[t]), i ?? (i = n.getPropertyOptions(t)), !((i.hasChanged ?? rt)(o, s) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: a, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), a === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, r] of a) {
        const { wrapped: n } = r, l = this[o];
        n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((a) => {
        var o;
        return (o = a.hostUpdate) == null ? void 0 : o.call(a);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[z("elementProperties")] = /* @__PURE__ */ new Map(), D[z("finalized")] = /* @__PURE__ */ new Map(), Q == null || Q({ ReactiveElement: D }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, ut = (e) => e, Y = R.trustedTypes, gt = Y ? Y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Et = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, St = "?" + S, jt = `<${St}>`, O = document, j = () => O.createComment(""), V = (e) => e === null || typeof e != "object" && typeof e != "function", ot = Array.isArray, Vt = (e) => ot(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", tt = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, ft = />/g, k = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, vt = /"/g, At = /^(?:script|style|textarea|title)$/i, It = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), c = It(1), N = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), _t = /* @__PURE__ */ new WeakMap(), C = O.createTreeWalker(O, 129);
function Tt(e, t) {
  if (!ot(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gt !== void 0 ? gt.createHTML(t) : t;
}
const Ft = (e, t) => {
  const s = e.length - 1, i = [];
  let a, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = H;
  for (let n = 0; n < s; n++) {
    const l = e[n];
    let d, p, h = -1, y = 0;
    for (; y < l.length && (r.lastIndex = y, p = r.exec(l), p !== null); ) y = r.lastIndex, r === H ? p[1] === "!--" ? r = mt : p[1] !== void 0 ? r = ft : p[2] !== void 0 ? (At.test(p[2]) && (a = RegExp("</" + p[2], "g")), r = k) : p[3] !== void 0 && (r = k) : r === k ? p[0] === ">" ? (r = a ?? H, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? k : p[3] === '"' ? vt : yt) : r === vt || r === yt ? r = k : r === mt || r === ft ? r = H : (r = k, a = void 0);
    const g = r === k && e[n + 1].startsWith("/>") ? " " : "";
    o += r === H ? l + jt : h >= 0 ? (i.push(d), l.slice(0, h) + Et + l.slice(h) + S + g) : l + S + (h === -2 ? n : g);
  }
  return [Tt(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: t, _$litType$: s }, i) {
    let a;
    this.parts = [];
    let o = 0, r = 0;
    const n = t.length - 1, l = this.parts, [d, p] = Ft(t, s);
    if (this.el = I.createElement(d, i), C.currentNode = this.el.content, s === 2 || s === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (a = C.nextNode()) !== null && l.length < n; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const h of a.getAttributeNames()) if (h.endsWith(Et)) {
          const y = p[r++], g = a.getAttribute(h).split(S), $ = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: o, name: $[2], strings: g, ctor: $[1] === "." ? Wt : $[1] === "?" ? Gt : $[1] === "@" ? qt : K }), a.removeAttribute(h);
        } else h.startsWith(S) && (l.push({ type: 6, index: o }), a.removeAttribute(h));
        if (At.test(a.tagName)) {
          const h = a.textContent.split(S), y = h.length - 1;
          if (y > 0) {
            a.textContent = Y ? Y.emptyScript : "";
            for (let g = 0; g < y; g++) a.append(h[g], j()), C.nextNode(), l.push({ type: 2, index: ++o });
            a.append(h[y], j());
          }
        }
      } else if (a.nodeType === 8) if (a.data === St) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = a.data.indexOf(S, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += S.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const i = O.createElement("template");
    return i.innerHTML = t, i;
  }
}
function U(e, t, s = e, i) {
  var r, n;
  if (t === N) return t;
  let a = i !== void 0 ? (r = s._$Co) == null ? void 0 : r[i] : s._$Cl;
  const o = V(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== o && ((n = a == null ? void 0 : a._$AO) == null || n.call(a, !1), o === void 0 ? a = void 0 : (a = new o(e), a._$AT(e, s, i)), i !== void 0 ? (s._$Co ?? (s._$Co = []))[i] = a : s._$Cl = a), a !== void 0 && (t = U(e, a._$AS(e, t.values), a, i)), t;
}
class Bt {
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
    const { el: { content: s }, parts: i } = this._$AD, a = ((t == null ? void 0 : t.creationScope) ?? O).importNode(s, !0);
    C.currentNode = a;
    let o = C.nextNode(), r = 0, n = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new W(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new Zt(o, this, t)), this._$AV.push(d), l = i[++n];
      }
      r !== (l == null ? void 0 : l.index) && (o = C.nextNode(), r++);
    }
    return C.currentNode = O, a;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class W {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, i, a) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
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
    t = U(this, t, s), V(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: s, _$litType$: i } = t, a = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = I.createElement(Tt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === a) this._$AH.p(s);
    else {
      const r = new Bt(a, this), n = r.u(this.options);
      r.p(s), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = _t.get(t.strings);
    return s === void 0 && _t.set(t.strings, s = new I(t)), s;
  }
  k(t) {
    ot(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, a = 0;
    for (const o of t) a === s.length ? s.push(i = new W(this.O(j()), this.O(j()), this, this.options)) : i = s[a], i._$AI(o), a++;
    a < s.length && (this._$AR(i && i._$AB.nextSibling, a), s.length = a);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, s); t !== this._$AB; ) {
      const a = ut(t).nextSibling;
      ut(t).remove(), t = a;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, a, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = s, this._$AM = a, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, s = this, i, a) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = U(this, t, s, 0), r = !V(t) || t !== this._$AH && t !== N, r && (this._$AH = t);
    else {
      const n = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = U(this, n[i + l], s, l), d === N && (d = this._$AH[l]), r || (r = !V(d) || d !== this._$AH[l]), d === v ? t = v : t !== v && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !a && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Wt extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class Gt extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class qt extends K {
  constructor(t, s, i, a, o) {
    super(t, s, i, a, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = U(this, t, s, 0) ?? v) === N) return;
    const i = this._$AH, a = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== v && (i === v || a);
    a && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zt {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const et = R.litHtmlPolyfillSupport;
et == null || et(I, W), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.2");
const Yt = (e, t, s) => {
  const i = (s == null ? void 0 : s.renderBefore) ?? t;
  let a = i._$litPart$;
  if (a === void 0) {
    const o = (s == null ? void 0 : s.renderBefore) ?? null;
    i._$litPart$ = a = new W(t.insertBefore(j(), o), o, void 0, s ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class T extends D {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Yt(s, this.renderRoot, this.renderOptions);
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
    return N;
  }
}
var xt;
T._$litElement$ = !0, T.finalized = !0, (xt = P.litElementHydrateSupport) == null || xt.call(P, { LitElement: T });
const st = P.litElementPolyfillSupport;
st == null || st({ LitElement: T });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: rt }, Kt = (e = Jt, t, s) => {
  const { kind: i, metadata: a } = s;
  let o = globalThis.litPropertyMetadata.get(a);
  if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(s.name, e), i === "accessor") {
    const { name: r } = s;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(r, l, e, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(r, void 0, e, n), n;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(n) {
      const l = this[r];
      t.call(this, n), this.requestUpdate(r, l, e, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function w(e) {
  return (t, s) => typeof s == "object" ? Kt(e, t, s) : ((i, a, o) => {
    const r = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(e) {
  return w({ ...e, state: !0, attribute: !1 });
}
const Xt = J`
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
    filter: drop-shadow(0 0 8px rgba(var(--accent-gold-rgb), var(--glow-intensity)));
    animation: breathe var(--breathe-speed) infinite ease-in-out;
  }

  .card.on.warming .light-icon {
    filter: drop-shadow(0 0 25px rgba(var(--accent-gold-rgb), 1)) brightness(1.8);
    transition: filter 1s ease-out, brightness 1s ease-out;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(var(--accent-gold-rgb), var(--glow-intensity))); }
    50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(var(--accent-gold-rgb), calc(var(--glow-intensity) * 1.5))); }
  }

  .name {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--lux-text-primary);
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .secondary-info {
    font-size: 0.8rem;
    color: var(--lux-text-muted);
    font-weight: 500;
    white-space: nowrap;
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

  .range-selector {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .range-chip {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--lux-text-muted);
    padding: 4px 16px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .range-chip:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--lux-text-primary);
  }

  .range-chip.active {
    background: rgba(var(--accent-gold-rgb), 0.15);
    color: var(--lux-accent-gold);
    border-color: rgba(var(--accent-gold-rgb), 0.3);
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
`, bt = {
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
function u(e, t, s) {
  var o, r;
  const i = ((o = window.customCards) == null ? void 0 : o.activeLang) || "en";
  let a = ((r = bt[i]) == null ? void 0 : r[e]) || bt.en[e] || e;
  return t && s && (a = a.replace(t, s)), a;
}
var Qt = Object.defineProperty, te = Object.getOwnPropertyDescriptor, G = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? te(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (a = (i ? r(t, s, a) : r(a)) || a);
  return i && a && Qt(t, s, a), a;
};
let L = class extends T {
  constructor() {
    super(...arguments), this.samples = [], this.accentColor = "#d6b25e", this.faded = !1;
  }
  static get styles() {
    return J`
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
            svg {
                width: 100%;
                height: 100%;
                display: block;
                transition: opacity 0.3s ease;
            }
            svg.faded {
                opacity: 0.3;
            }
        `;
  }
  // Moving average to smooth out sharp oscillations
  movingAverage(e, t = 3) {
    return e.length < t ? e : e.map((s, i) => {
      const a = Math.max(0, i - Math.floor(t / 2)), o = Math.min(e.length, i + Math.ceil(t / 2)), r = e.slice(a, o), n = r.reduce((l, d) => l + d.value, 0) / r.length;
      return { ...s, value: n };
    });
  }
  // Catmull-Rom spline to SVG cubic bezier
  catmullRomToBezier(e, t = 1.5) {
    if (e.length < 2) return "";
    let s = `M ${e[0].x} ${e[0].y}`;
    for (let i = 0; i < e.length - 1; i++) {
      const a = e[i - 1] || e[0], o = e[i], r = e[i + 1], n = e[i + 2] || r, l = o.x + (r.x - a.x) / 6 * t, d = o.y + (r.y - a.y) / 6 * t, p = r.x - (n.x - o.x) / 6 * t, h = r.y - (n.y - o.y) / 6 * t;
      s += ` C ${l} ${d}, ${p} ${h}, ${r.x} ${r.y}`;
    }
    return s;
  }
  render() {
    var h, y, g;
    if (this.samples.length < 2)
      return c``;
    const s = ((h = this.config) == null ? void 0 : h.smoothing) !== !1 ? this.movingAverage(this.samples, 3) : this.samples;
    let i = Math.max(...s.map(($) => $.value), 0.1), a = Math.min(...s.map(($) => $.value), 0);
    const o = (i - a) * 0.1 || 0.1;
    i += o, a = Math.max(0, a - o);
    const r = i - a || 1, n = s.map(($, M) => {
      const m = M / (s.length - 1) * 200, E = 40 - ($.value - a) / r * 40;
      return { x: m, y: E };
    }), l = ((y = this.config) == null ? void 0 : y.smoothing) !== !1 ? this.catmullRomToBezier(n, 1) : n.map(($, M) => `${M === 0 ? "M" : "L"} ${$.x} ${$.y}`).join(" "), d = `${l} L 200 40 L 0 40 Z`, p = `grad-${Math.random().toString(36).substr(2, 9)}`;
    return c`
            <svg viewBox="0 0 ${200} ${40}" preserveAspectRatio="none" class="${this.faded ? "faded" : ""}">
                <defs>
                    <linearGradient id="${p}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${this.accentColor};stop-opacity:0.25" />
                        <stop offset="100%" style="stop-color:${this.accentColor};stop-opacity:0" />
                    </linearGradient>
                </defs>
                <path
                    d="${d}"
                    fill="url(#${p})"
                />
                <path
                    d="${l}"
                    fill="none"
                    stroke="${this.accentColor}"
                    stroke-width="${((g = this.config) == null ? void 0 : g.line_width) || 2}"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    opacity="0.9"
                />
            </svg>
        `;
  }
};
G([
  w({ type: Array })
], L.prototype, "samples", 2);
G([
  w({ type: Object })
], L.prototype, "config", 2);
G([
  w({ type: String })
], L.prototype, "accentColor", 2);
G([
  w({ type: Boolean })
], L.prototype, "faded", 2);
L = G([
  X("lux-sparkline")
], L);
var ee = Object.defineProperty, se = Object.getOwnPropertyDescriptor, nt = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? se(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (a = (i ? r(t, s, a) : r(a)) || a);
  return i && a && ee(t, s, a), a;
};
let F = class extends T {
  constructor() {
    super(...arguments), this.active = !1, this.power = 0;
  }
  render() {
    const e = Math.max(0.1, 4 - Math.min(this.power, 2e3) / 2e3 * 3.8);
    let t = "var(--lux-accent-gold, #d6b25e)";
    return this.power < 50 ? t = "var(--lux-accent-gold, #d6b25e)" : this.power >= 1e3 ? t = "#ef4444" : t = "#d6b25e", c`
      <div class="flow-container ${this.active ? "active" : ""}" 
           style="--flow-speed: ${e.toFixed(2)}s; --lux-accent-gold: ${t};">
        <svg viewBox="0 0 200 60" preserveAspectRatio="xMidYMid meet">
          <!-- Bolt (Source) -->
          <g transform="translate(10, 18)" class="${this.active && this.power > 1e3 ? "vibrate" : ""}">
            <path class="source" d="M7,2v11h3v9l7-12h-4l4-8H7z"/>
          </g>

          <!-- Path -->
          <path class="path-base" d="M35 30 L165 30" />
          <path class="flow-path" d="M35 30 L165 30" />

          <!-- Table Lamp (Destination) -->
          <g transform="translate(170, 18)">
             <path class="destination" d="M8,2 L16,2 L18,14 L6,14 L8,2 Z M5,15 L19,15 L19,17 L5,17 L5,15 Z M11,17 L11,20 L8,20 L8,22 L16,22 L16,20 L13,20 L13,17 L11,17 Z"/>
          </g>
        </svg>
      </div>
    `;
  }
};
F.styles = J`
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
nt([
  w({ type: Boolean })
], F.prototype, "active", 2);
nt([
  w({ type: Number })
], F.prototype, "power", 2);
F = nt([
  X("lux-power-flow")
], F);
const $t = /* @__PURE__ */ new Set();
function kt(e, t) {
  $t.has(e) || ($t.add(e), console.warn(`[Lux Switch Card] ${t}`));
}
function x(e, t, s, i) {
  return e < t || e > s ? (kt(`clamp_${i}`, `${i} (${e}) out of range [${t}, ${s}]. Clamping.`), Math.max(t, Math.min(e, s))) : e;
}
function ie(e) {
  if (!e.entity)
    throw new Error('Configuration Error: "entity" is required.');
  const t = e.theme || {}, s = e.sparkline || {}, i = e.timers || {}, a = {
    ...t,
    blur: t.blur !== void 0 ? x(t.blur, 0, 30, "theme.blur") : 14,
    opacity: t.opacity !== void 0 ? x(t.opacity, 0.02, 0.2, "theme.opacity") : 0.08,
    border_radius: t.border_radius !== void 0 ? x(t.border_radius, 12, 32, "theme.border_radius") : 24,
    glow_strength: t.glow_strength !== void 0 ? x(t.glow_strength, 0, 1, "theme.glow_strength") : 0.65,
    shadow_strength: t.shadow_strength !== void 0 ? x(t.shadow_strength, 0, 1, "theme.shadow_strength") : 0.35
  }, o = {
    ...s,
    samples: s.samples !== void 0 ? x(s.samples, 10, 240, "sparkline.samples") : 60,
    interval_sec: s.interval_sec !== void 0 ? x(s.interval_sec, 2, 60, "sparkline.interval_sec") : 10
  };
  let r = i.presets || [15, 30, 60];
  r.length > 10 && (kt("timer_presets_max", "Too many timer presets. Limiting to first 10."), r = r.slice(0, 10)), r = r.map((p) => x(p, 1, 240, "timer_preset"));
  const n = {
    ...i,
    presets: r,
    default_minutes: i.default_minutes || 30
    // No hard clamp requested but good to have fallback
  }, l = e.stale_seconds !== void 0 ? x(e.stale_seconds, 10, 900, "stale_seconds") : 120, d = e.anomaly_watts !== void 0 ? x(e.anomaly_watts, 10, 1e4, "anomaly_watts") : 1200;
  return {
    ...e,
    theme: a,
    sparkline: o,
    timers: n,
    stale_seconds: l,
    anomaly_watts: d
  };
}
var ae = Object.defineProperty, re = Object.getOwnPropertyDescriptor, lt = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? re(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (a = (i ? r(t, s, a) : r(a)) || a);
  return i && a && ae(t, s, a), a;
};
let B = class extends T {
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
        const o = s.split("."), r = { ...this._config };
        let n = r;
        for (let l = 0; l < o.length - 1; l++)
          n[o[l]] = { ...n[o[l]] }, n = n[o[l]];
        n[o[o.length - 1]] = i, this._config = r;
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
    var e, t, s, i, a, o, r;
    return !this.hass || !this._config ? c`` : c`
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
                        .value=${this._config.secondary_info_entity}
                        .configValue=${"secondary_info_entity"}
                        @value-changed=${this._valueChanged}
                        label="Secondary Info Sensor (Optional)"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.energy_today_entity}
                        .configValue=${"energy_today_entity"}
                        @value-changed=${this._valueChanged}
                        label="Energy Today (kWh) - Calculated"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.total_energy_entity}
                        .configValue=${"total_energy_entity"}
                        @value-changed=${this._valueChanged}
                        label="Today's Energy (kWh) - From Sensor"
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
                        <ha-select
                            label="Theme Preset"
                            .value=${((e = this._config.theme) == null ? void 0 : e.preset) || "noir"}
                            .configValue=${"theme.preset"}
                            @selected=${this._valueChanged}
                            @closed=${(n) => n.stopPropagation()}
                        >
                            <mwc-list-item value="noir">noir - Gold Noir</mwc-list-item>
                            <mwc-list-item value="emerald">emerald - Sea Emerald</mwc-list-item>
                            <mwc-list-item value="cyberpunk">cyberpunk - Neon Pink</mwc-list-item>
                            <mwc-list-item value="slate">slate - Muted Slate</mwc-list-item>
                        </ha-select>
                        <ha-icon-picker
                            .hass=${this.hass}
                            .value=${this._config.icon || "mdi:lightbulb"}
                            .configValue=${"icon"}
                            @value-changed=${this._valueChanged}
                            label="Card Icon"
                        ></ha-icon-picker>
                    </div>
                        <ha-textfield
                            label="Accent Color"
                            .value=${((t = this._config.theme) == null ? void 0 : t.accent_gold) || "#d6b25e"}
                            .configValue=${"theme.accent_gold"}
                            @input=${this._valueChanged}
                            type="text"
                        ></ha-textfield>
                    </div>
                    <div class="slider-row">
                        <div class="slider-label">Glass Blur</div>
                        <ha-slider
                            .value=${((s = this._config.theme) == null ? void 0 : s.blur) || 14}
                            .configValue=${"theme.blur"}
                            min="0" max="40" step="1" pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                        <span class="value-tag">${((i = this._config.theme) == null ? void 0 : i.blur) || 14}px</span>
                    </div>
                    <div class="slider-row">
                        <div class="slider-label">Glass Opacity</div>
                        <ha-slider
                            .value=${((a = this._config.theme) == null ? void 0 : a.opacity) || 0.08}
                            .configValue=${"theme.opacity"}
                            min="0" max="0.3" step="0.01" pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                        <span class="value-tag">${((o = this._config.theme) == null ? void 0 : o.opacity) || 0.08}</span>
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
B.styles = J`
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
lt([
  w({ attribute: !1 })
], B.prototype, "hass", 2);
lt([
  b()
], B.prototype, "_config", 2);
B = lt([
  X("lux-switch-energy-card-editor")
], B);
var oe = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, _ = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? ne(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (a = (i ? r(t, s, a) : r(a)) || a);
  return i && a && oe(t, s, a), a;
};
window.customCards = window.customCards || [];
window.customCards.push({
  type: "lux-switch-energy-card",
  name: "Lux Switch Energy Card",
  description: "Monitor power, voltage, and current with real-time graphs and auto-off timers."
});
let f = class extends T {
  constructor() {
    super(...arguments), this._showModal = !1, this._sessionEnergy = 0, this._sessionStartTime = null, this._activeTimer = null, this._timerEndTime = null, this._showToast = !1, this._toastMessage = "", this._powerSamples = [], this._sampleInterval = null, this._autoOffDisabled = !1, this._lastOnTime = null, this._lastOffTime = null, this._warmingUp = !1, this._historyRange = "1h", this._historyFetched = !1;
  }
  static get styles() {
    return Xt;
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
    const t = ie(e);
    this._config = {
      ...f.getStubConfig(),
      ...t,
      // Normalized values take precedence
      // Ensure nested objects merge correctly if normalized returned partials (it returns full valid sub-objects)
      decimals: { ...f.getStubConfig().decimals, ...e.decimals },
      modes: { ...f.getStubConfig().modes, ...e.modes }
    }, this.updateThemeVariables(), (s = this._config.sparkline) != null && s.enabled && this._config.power_entity && this.startPowerSampling();
  }
  updated(e) {
    var t, s;
    if (super.updated(e), e.has("hass")) {
      const i = e.get("hass"), a = i ? (t = i.states[this._config.entity]) == null ? void 0 : t.state : void 0, o = (s = this.hass.states[this._config.entity]) == null ? void 0 : s.state;
      a === "off" && o === "on" && (this._warmingUp = !0, setTimeout(() => {
        this._warmingUp = !1;
      }, 1e3));
    }
  }
  updateThemeVariables() {
    const e = this._config.theme;
    let t = (e == null ? void 0 : e.preset) || "noir";
    const s = {
      noir: { accent: "#d6b25e", purple: "#6b21a8", blur: 14, opacity: 0.08, radius: 24 },
      emerald: { accent: "#10b981", purple: "#064e3b", blur: 20, opacity: 0.12, radius: 28 },
      cyberpunk: { accent: "#f472b6", purple: "#7e22ce", blur: 10, opacity: 0.15, radius: 12 },
      slate: { accent: "#38bdf8", purple: "#1e293b", blur: 25, opacity: 0.05, radius: 32 }
    }, i = s[t] || s.noir, a = (r, n) => {
      n != null ? this.style.setProperty(r, String(n)) : this.style.removeProperty(r);
    };
    a("--glass-blur", `${(e == null ? void 0 : e.blur) ?? i.blur}px`), a("--glass-opacity", (e == null ? void 0 : e.opacity) ?? i.opacity), e != null && e.panel_color ? this.style.setProperty("--lux-panel-color", e.panel_color) : this.style.setProperty("--lux-panel-color", "var(--ha-card-background, rgba(255, 255, 255, 0.06))");
    const o = (e == null ? void 0 : e.accent_gold) || i.accent;
    a("--lux-accent-gold", o), this.style.setProperty("--accent-gold-rgb", this.hexToRgb(o)), a("--lux-accent-purple", (e == null ? void 0 : e.accent_purple) || i.purple), e != null && e.text_primary ? this.style.setProperty("--lux-text-primary", e.text_primary) : this.style.setProperty("--lux-text-primary", "var(--primary-text-color, rgba(255, 255, 255, 0.92))"), e != null && e.text_muted ? this.style.setProperty("--lux-text-muted", e.text_muted) : this.style.setProperty("--lux-text-muted", "var(--secondary-text-color, rgba(255, 255, 255, 0.62))"), a("--lux-shadow-strength", (e == null ? void 0 : e.shadow_strength) ?? 0.35), a("--lux-glow-strength", (e == null ? void 0 : e.glow_strength) ?? 0.65), a("--lux-border-radius", `${(e == null ? void 0 : e.border_radius) ?? i.radius}px`), this.updateDynamicVisuals();
  }
  updateDynamicVisuals() {
    if (!this.isOn()) {
      this.style.setProperty("--breathe-speed", "3s"), this.style.setProperty("--glow-intensity", "0.4");
      return;
    }
    const e = this.getPower() || 0, t = this._config.anomaly_watts || 1200, s = Math.min(e / t, 1), i = 3 - s * 2.5;
    this.style.setProperty("--breathe-speed", `${i.toFixed(2)}s`);
    const a = 0.4 + s * 0.8;
    this.style.setProperty("--glow-intensity", a.toFixed(2));
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
  getTotalEnergyEntity() {
    return this._config.total_energy_entity ? this.hass.states[this._config.total_energy_entity] : null;
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
      return { primary: u("common.unavailable"), secondary: "" };
    const t = /* @__PURE__ */ new Date(), s = new Date(e.last_changed);
    if (this.isOn()) {
      this._sessionStartTime || (this._sessionStartTime = s.getTime());
      const i = t.getTime() - this._sessionStartTime, a = Math.floor(i / 6e4), o = Math.floor(i % 6e4 / 1e3);
      return {
        primary: u("card.on_since", "{time}", s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
        secondary: u("card.running_for", "{minutes}", String(a)).replace("{seconds}", String(o))
      };
    } else {
      if (this._lastOffTime) {
        const i = t.getTime() - this._lastOffTime, a = Math.floor(i / 6e4);
        return {
          primary: u("card.last_used", "{time}", s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
          secondary: a > 0 ? u("card.minutes_ago", "{minutes}", String(a)) : u("card.just_now")
        };
      }
      return {
        primary: u("card.last_used", "{time}", s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
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
    let s = `${u("card.session")}: ${this.formatNumber(e, ((i = this._config.decimals) == null ? void 0 : i.energy) || 2)} Wh`;
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
    var n, l, d, p, h, y;
    if (!this._showModal) return c``;
    const e = this.getPower(), t = this.getVoltage(), s = this.getCurrent(), i = this.getEnergyTodayEntity(), a = this.getTotalEnergyEntity(), o = this.getCostTodayEntity(), r = this.getTimeDisplay();
    return c`
    <div class="modal" @click=${(g) => {
      g.target === g.currentTarget && (this._showModal = !1);
    }}>
    <div class="modal-content">
        <div class="modal-header">
            <h3 class="modal-title">${this._config.name || "Light Details"}</h3>
                <button class="close-button" @click=${() => this._showModal = !1}>×</button>
                    </div>

                    <div class="expanded-stats">
                        <div class="stat-item">
                            <div class="stat-value">${this.formatNumber(e, ((n = this._config.decimals) == null ? void 0 : n.power) || 0)} W</div>
                                <div class="stat-label">${u("modal.current_power")}</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${this.formatNumber(this._sessionEnergy, ((l = this._config.decimals) == null ? void 0 : l.energy) || 2)} Wh</div>
                                            <div class="stat-label">${u("modal.session_energy")}</div>
                                                </div>
            ${t !== null ? c`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(t, 1)} V</div>
                <div class="stat-label">Voltage</div>
              </div>
            ` : ""}
            ${s !== null ? c`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(s, 2)} A</div>
                <div class="stat-label">Current</div>
              </div>
            ` : ""}
            ${i && i.state !== "unavailable" ? c`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(parseFloat(i.state), ((d = this._config.decimals) == null ? void 0 : d.energy) || 2)} kWh</div>
                <div class="stat-label">${u("card.today")}</div>
              </div>
            ` : a && a.state !== "unavailable" ? c`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(parseFloat(a.state), ((p = this._config.decimals) == null ? void 0 : p.energy) || 2)} kWh</div>
                <div class="stat-label">${u("card.today")}</div>
              </div>
            ` : ""}
            ${o && o.state !== "unavailable" ? c`
              <div class="stat-item">
                <div class="stat-value">${this.formatCurrency(parseFloat(o.state), this._config.currency_symbol)}</div>
                <div class="stat-label">${u("card.cost_today")}</div>
              </div>
            ` : ""}
</div>

    <div class="range-selector">
        ${["1h", "6h", "24h", "7d"].map((g) => c`
            <button 
                class="range-chip ${this._historyRange === g ? "active" : ""}"
                @click=${() => {
      this._historyRange = g, this.fetchHistory();
    }}
            >
                ${g}
            </button>
        `)}
    </div>

    <div class="sparkline-container" style="height: 100px; margin: 24px 0;">
        ${this._powerSamples.length > 0 ? c`
        <lux-sparkline
            .samples=${this._powerSamples} 
                .config=${this._config.sparkline}
                .accentColor=${"var(--lux-accent-gold)"}
                .faded=${!this.isOn()}
            ></lux-sparkline>
        ` : this.renderModalEmptyState(e)}
    </div>

    <div style="margin: 16px 0; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
        <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 8px;">Time Info</div>
            <div style="font-size: 16px; color: var(--lux-text-primary);">${r.primary}</div>
                <div style="font-size: 14px; color: var(--lux-text-muted);">${r.secondary}</div>
                    </div>

          ${this._timerEndTime ? c`
            <div class="timer-display">
              <div class="timer-text">${u("card.auto_off_in")}: ${this.getTimerDisplay()}</div>
              <button class="control-button" @click=${this.cancelTimer} style="margin-top: 8px;">
                ${u("modal.cancel_timer")}
              </button>
            </div>
          ` : ""}

          ${(h = this._config.modes) != null && h.enabled && ((y = this._config.modes.items) != null && y.length) ? c`
            <div style="margin-top: 24px;">
              <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 12px;">${u("modal.modes")}</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${this._config.modes.items.map((g) => c`
                  <button class="control-button" @click=${() => this.runMode(g)}>
                    ${g.icon ? c`<span style="margin-right: 4px;">${g.icon}</span>` : ""}
                    ${g.label}
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
    return this._showToast ? c`
    <div class="toast">
        ${this._toastMessage}
</div>
    ` : c``;
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
    const e = {
      "1h": 1 * 60 * 60 * 1e3,
      "6h": 6 * 60 * 60 * 1e3,
      "24h": 24 * 60 * 60 * 1e3,
      "7d": 7 * 24 * 60 * 60 * 1e3
    }, t = e[this._historyRange] || e["1h"], s = /* @__PURE__ */ new Date(), i = new Date(s.getTime() - t);
    try {
      const a = await this.hass.callApi(
        "GET",
        `history/period/${i.toISOString()}?filter_entity_id=${this._config.power_entity}&end_time=${s.toISOString()}&minimal_response`
      );
      if (a && a[0] && a[0].length > 0) {
        const o = a[0].map((r) => ({
          timestamp: new Date(r.last_changed).getTime(),
          value: parseFloat(r.state)
        })).filter((r) => !isNaN(r.value));
        this._powerSamples = o.sort((r, n) => r.timestamp - n.timestamp).filter((r) => r.timestamp > i.getTime());
      }
      this._historyFetched = !0;
    } catch (a) {
      console.error("Error fetching history:", a);
    }
  }
  renderModalEmptyState(e) {
    const t = e || 0, s = this._config.anomaly_watts || 1200, i = Math.min(t / s * 100, 100);
    return c`
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
    var r;
    if (!((r = this._config.budget) != null && r.enabled) || !this._config.budget.limit) return c``;
    let e = 0, t = "";
    const s = this._config.budget.entity || this._config.cost_today_entity || this._config.energy_today_entity;
    if (s && this.hass.states[s]) {
      const n = this.hass.states[s];
      e = parseFloat(n.state), t = n.attributes.unit_of_measurement || "";
    }
    if (isNaN(e)) return c``;
    const i = this._config.budget.limit, a = Math.min(e / i * 100, 100), o = e > i;
    return c`
    <div style="margin-top: 16px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--lux-text-muted); margin-bottom: 4px;">
            <span>Daily Budget</span>
                <span>${e.toFixed(2)} / ${i.toFixed(2)} ${t}</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                        <div style="
width: ${a}%;
height: 100%;
background: ${o ? "#ef4444" : "var(--lux-accent-gold)"};
transition: width 0.5s ease;
"></div>
    </div>
    </div>
        `;
  }
  render() {
    var n, l, d, p, h, y, g, $, M;
    if (!this._config || !this.hass)
      return c``;
    const e = this.getSwitchEntity(), t = this.getPower(), s = this.getEnergyTodayEntity(), i = this.getCostTodayEntity(), a = this.getTimeDisplay(), o = this.isUnavailable();
    if (this.isOn() && this._sessionStartTime && t !== null) {
      const E = (Date.now() - this._sessionStartTime) / (1e3 * 60 * 60);
      this._sessionEnergy = t * E;
    }
    let r = "";
    if (this.isOn() && t !== null) {
      const m = this._config.anomaly_watts || 1200, E = Math.min(t / m, 1), Ct = 15 + E * 35, Pt = 0.4 + E * 0.4;
      r = `filter: drop-shadow(0 0 ${Ct}px rgba(var(--accent-gold-rgb), ${Pt})); transition: filter 0.5s ease-out;`;
    } else this.isOn() && (r = "filter: drop-shadow(0 0 15px rgba(var(--accent-gold-rgb), 0.4)); transition: filter 0.5s ease-out;");
    return c`
    <div
class="card ${this.isOn() ? "on" : "off"} ${this._warmingUp ? "warming" : ""}"
@mousedown=${this._handleStart}
@touchstart=${this._handleStart}
@mouseup=${this._handleEnd}
@touchend=${this._handleEnd}
@keydown=${(m) => {
      (m.key === "Enter" || m.key === " ") && (m.preventDefault(), this._handleTap());
    }}
tabindex="0"
    >
    <div class="header">
        <div class="title-section">
            <div class="icon-container" style="${r}" 
                @click=${(m) => {
      m.stopPropagation(), this._handleTap();
    }}
                @keydown=${(m) => {
      (m.key === "Enter" || m.key === " ") && (m.preventDefault(), m.stopPropagation(), this._handleTap());
    }}
                tabindex="0"
            >
                <ha-icon icon="${this._config.icon || "mdi:lightbulb"}" class="light-icon"></ha-icon>
                        </div>
                        <h2 class="name">${this._config.name || ((n = e == null ? void 0 : e.attributes) == null ? void 0 : n.friendly_name) || "Kitchen Light"}</h2>
                            </div>
                            <div class="header-right">
                                ${this._config.secondary_info_entity ? c`
                                    <div class="secondary-info">
                                        ${(l = this.hass.states[this._config.secondary_info_entity]) == null ? void 0 : l.state}
                                        ${((p = (d = this.hass.states[this._config.secondary_info_entity]) == null ? void 0 : d.attributes) == null ? void 0 : p.unit_of_measurement) || ""}
                                    </div>
                                ` : ""}
                                <div class="status-chip ${o ? "unavailable" : this.isOn() ? "on" : ""}">
                                    ${o ? u("common.unavailable") : this.isOn() ? u("common.on") : u("common.off")}
                                </div>
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
                .faded=${!this.isOn()}
            ></lux-sparkline>
    </div>

    <div class="energy-section">
        <div class="energy-item">
            <div class="energy-value">
                ${this.formatNumber(t !== null ? t : 0, ((h = this._config.decimals) == null ? void 0 : h.power) || 0)} W
                    </div>
                    <div class="energy-label">${u("card.live_power")}</div>
                        </div>
                        <div class="energy-item">
                            <div class="energy-value">
                                ${this.formatNumber(this._sessionEnergy, ((y = this._config.decimals) == null ? void 0 : y.energy) || 2)} Wh
                                    </div>
                                    <div class="energy-label">${u("card.session")}</div>
                                        </div>
          ${s && s.state !== "unavailable" ? c`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatNumber(parseFloat(s.state), ((g = this._config.decimals) == null ? void 0 : g.energy) || 2)} kWh</div>
              <div class="energy-label">${u("card.today")}</div>
            </div>
          ` : ""}
          ${i && i.state !== "unavailable" ? c`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatCurrency(parseFloat(i.state), this._config.currency_symbol)}
              </div>
              <div class="energy-label">${u("card.cost_today")}</div>
            </div>
          ` : ""}
</div>

        ${this.renderBudget()}

<div class="time-section">
    <div class="time-info">
        <strong>${a.primary}</strong>
            ${a.secondary ? c`<br>${a.secondary}` : ""}
</div>
    </div>

        ${this._timerEndTime ? c`
          <div class="timer-display">
            <div class="timer-text">${u("card.auto_off_in")}: ${this.getTimerDisplay()}</div>
          </div>
        ` : ""}

        ${($ = this._config.timers) != null && $.enabled && this.isOn() ? c`
          <div class="controls-section">
            ${(M = this._config.timers.presets) == null ? void 0 : M.map((m) => c`
              <button class="control-button" @click=${(E) => {
      E.stopPropagation(), this.startTimer(m);
    }}>
                ${m}m
              </button>
            `)}
            ${this._timerEndTime ? c`
              <button class="control-button" @click=${(m) => {
      m.stopPropagation(), this.cancelTimer();
    }}>
                ${u("card.cancel")}
              </button>
            ` : ""}
            ${this._autoOffDisabled ? c`
              <button class="control-button active" @click=${(m) => {
      m.stopPropagation(), this._autoOffDisabled = !1;
    }}>
                ${u("card.auto_off_disabled")}
              </button>
            ` : c`
              <button class="control-button" @click=${(m) => {
      m.stopPropagation(), this._autoOffDisabled = !0;
    }}>
                ${u("card.disable_auto_off")}
              </button>
            `}
          </div>
        ` : ""}

        ${t !== null && this._config.anomaly_watts && t > this._config.anomaly_watts ? c`
          <div class="status-chip anomaly" style="margin-top: 12px;">
            ${u("card.high_power")}
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
  w({ attribute: !1 })
], f.prototype, "hass", 2);
_([
  b()
], f.prototype, "_config", 2);
_([
  b()
], f.prototype, "_showModal", 2);
_([
  b()
], f.prototype, "_sessionEnergy", 2);
_([
  b()
], f.prototype, "_sessionStartTime", 2);
_([
  b()
], f.prototype, "_activeTimer", 2);
_([
  b()
], f.prototype, "_timerEndTime", 2);
_([
  b()
], f.prototype, "_showToast", 2);
_([
  b()
], f.prototype, "_toastMessage", 2);
_([
  b()
], f.prototype, "_powerSamples", 2);
_([
  b()
], f.prototype, "_sampleInterval", 2);
_([
  b()
], f.prototype, "_autoOffDisabled", 2);
_([
  b()
], f.prototype, "_lastOnTime", 2);
_([
  b()
], f.prototype, "_lastOffTime", 2);
_([
  b()
], f.prototype, "_warmingUp", 2);
_([
  b()
], f.prototype, "_historyRange", 2);
_([
  b()
], f.prototype, "_historyFetched", 2);
f = _([
  X("lux-switch-energy-card")
], f);
export {
  f as LuxSwitchEnergyCard
};
