(function (e) {
    function t(t) {
        for (var s, o, i = t[0], c = t[1], l = t[2], u = 0, m = []; u < i.length; u++) o = i[u], Object.prototype.hasOwnProperty.call(r, o) && r[o] && m.push(r[o][0]), r[o] = 0;
        for (s in c) Object.prototype.hasOwnProperty.call(c, s) && (e[s] = c[s]);
        d && d(t);
        while (m.length) m.shift()();
        return a.push.apply(a, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], s = !0, o = 1; o < n.length; o++) {
                var c = n[o];
                0 !== r[c] && (s = !1)
            }
            s && (a.splice(t--, 1), e = i(i.s = n[0]))
        }
        return e
    }

    var s = {}, r = {app: 0}, a = [];

    function o(e) {
        return i.p + "js/" + ({}[e] || e) + "." + {"chunk-2d0bce02": "8703cdec"}[e] + ".js"
    }

    function i(t) {
        if (s[t]) return s[t].exports;
        var n = s[t] = {i: t, l: !1, exports: {}};
        return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }

    i.e = function (e) {
        var t = [], n = r[e];
        if (0 !== n) if (n) t.push(n[2]); else {
            var s = new Promise((function (t, s) {
                n = r[e] = [t, s]
            }));
            t.push(n[2] = s);
            var a, c = document.createElement("script");
            c.charset = "utf-8", c.timeout = 120, i.nc && c.setAttribute("nonce", i.nc), c.src = o(e);
            var l = new Error;
            a = function (t) {
                c.onerror = c.onload = null, clearTimeout(u);
                var n = r[e];
                if (0 !== n) {
                    if (n) {
                        var s = t && ("load" === t.type ? "missing" : t.type), a = t && t.target && t.target.src;
                        l.message = "Loading chunk " + e + " failed.\n(" + s + ": " + a + ")", l.name = "ChunkLoadError", l.type = s, l.request = a, n[1](l)
                    }
                    r[e] = void 0
                }
            };
            var u = setTimeout((function () {
                a({type: "timeout", target: c})
            }), 12e4);
            c.onerror = c.onload = a, document.head.appendChild(c)
        }
        return Promise.all(t)
    }, i.m = e, i.c = s, i.d = function (e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, i.r = function (e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, i.t = function (e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" === typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var s in e) i.d(n, s, function (t) {
            return e[t]
        }.bind(null, s));
        return n
    }, i.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e["default"]
        } : function () {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "/", i.oe = function (e) {
        throw console.error(e), e
    };
    var c = window["webpackJsonp"] = window["webpackJsonp"] || [], l = c.push.bind(c);
    c.push = t, c = c.slice();
    for (var u = 0; u < c.length; u++) t(c[u]);
    var d = l;
    a.push([0, "chunk-vendors"]), n()
})({
    0: function (e, t, n) {
        e.exports = n("56d7")
    }, "034f": function (e, t, n) {
        "use strict";
        n("85ec")
    }, "09bc": function (e, t, n) {
        "use strict";
        n("dc4e")
    }, "0ea0": function (e, t, n) {
    }, "22ce": function (e, t, n) {
    }, 2900: function (e, t, n) {
        "use strict";
        n("ec16")
    }, "2b1c": function (e, t, n) {
        "use strict";
        n("fa24")
    }, 3162: function (e, t, n) {
    }, 3533: function (e, t, n) {
    }, "3e3f": function (e, t, n) {
        "use strict";
        n("a837")
    }, 4067: function (e, t, n) {
    }, 4081: function (e, t, n) {
        "use strict";
        n("54a7")
    }, 4191: function (e, t, n) {
        "use strict";
        n("afd5")
    }, "4ced": function (e, t, n) {
    }, "52e5": function (e, t, n) {
        "use strict";
        n("3533")
    }, "54a7": function (e, t, n) {
    }, "56d7": function (e, t, n) {
        "use strict";
        n.r(t);
        n("e260"), n("e6cf"), n("cca6"), n("a79d");
        var s = n("2b0e"), r = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "app"}}, [n("div", {attrs: {id: "nav"}}, [n("custom-router-link", {
                    staticClass: "left hide",
                    attrs: {icon: ["fas", "university"], label: "БРУ", route_name: "index", size: "3x"}
                }), e.role | e.is_superuser ? n("custom-router-link", {
                    staticClass: "hide",
                    style: {"padding-left": "100px"},
                    attrs: {icon: ["fas", "book"], label: "Дисциплины", route_name: "subjects"}
                }) : e._e(), e.role | e.is_superuser ? n("custom-router-link", {
                    staticClass: "hide",
                    attrs: {icon: ["fas", "bookmark"], label: "Результаты", route_name: "tests-results", withLine: ""}
                }) : e._e(), e.role | e.is_superuser ? n("custom-router-link", {
                    staticClass: "hide",
                    attrs: {icon: ["fas", "bookmark"], label: "Отчеты", route_name: "reports", withLine: ""}
                }) : e._e(), "2" == e.role | e.is_superuser ? n("custom-router-link", {
                    staticClass: "hide",
                    attrs: {icon: ["fas", "bookmark"], label: "Администрирование", route_name: "admin", withLine: ""}
                }) : e._e(), e.is_superuser ? n("custom-router-link", {
                    staticClass: "hide",
                    attrs: {
                        icon: ["fas", "users"],
                        label: "Добавить преподавателя",
                        route_name: "teacher-register",
                        withLine: ""
                    }
                }) : e._e(), n("b-dropdown", {
                    staticClass: "right-us",
                    attrs: {id: "dropdown", variant: "primary", text: "Dropdown Button"},
                    scopedSlots: e._u([{
                        key: "button-content", fn: function () {
                            return [n("font-awesome-icon", {
                                attrs: {
                                    click: e.logout,
                                    icon: ["fas", "user"],
                                    size: "lg"
                                }
                            }), e._v(" " + e._s(e.username) + " ")]
                        }, proxy: !0
                    }])
                }, [e.authorized ? n("b-dropdown-item", [e._v("Профиль")]) : n("b-dropdown-item", {
                    on: {
                        click: function (t) {
                            return e.redirect("login")
                        }
                    }
                }, [e._v("Войти")]), e.authorized ? n("b-dropdown-item", {on: {click: e.logout}}, [e._v("Выйти")]) : e._e()], 1), n("b-dropdown", {
                    staticClass: "left-us is_showed",
                    attrs: {id: "dropdown-1", variant: "primary", text: "Dropdown Button"},
                    scopedSlots: e._u([{
                        key: "button-content", fn: function () {
                            return [n("font-awesome-icon", {attrs: {icon: ["fas", "align-justify"], size: "lg"}})]
                        }, proxy: !0
                    }])
                }, [e.role | e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed", on: {
                        click: function (t) {
                            return e.redirect("subjects")
                        }
                    }
                }, [e._v("Дисциплина")]) : e._e(), e.role | e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed",
                    on: {
                        click: function (t) {
                            return e.redirect("commands")
                        }
                    }
                }, [e._v("Команды")]) : e._e(), e.role | e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed",
                    on: {
                        click: function (t) {
                            return e.redirect("tests")
                        }
                    }
                }, [e._v("Практика")]) : e._e(), e.role | e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed",
                    on: {
                        click: function (t) {
                            return e.redirect("devices")
                        }
                    }
                }, [e._v("Устройства")]) : e._e(), e.role | e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed",
                    on: {
                        click: function (t) {
                            return e.redirect("tests-results")
                        }
                    }
                }, [e._v("Результы")]) : e._e(), "2" == e.role | e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed",
                    on: {
                        click: function (t) {
                            return e.redirect("groups")
                        }
                    }
                }, [e._v("Группы")]) : e._e(), "2" == e.role | e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed",
                    on: {
                        click: function (t) {
                            return e.redirect("reports")
                        }
                    }
                }, [e._v("Отчеты")]) : e._e(), e.is_superuser ? n("b-dropdown-item", {
                    staticClass: "is_showed",
                    on: {
                        click: function (t) {
                            return e.redirect("teacher-register")
                        }
                    }
                }, [e._v("Добавить")]) : e._e()], 1)], 1), n("div", {attrs: {id: "container"}}, [n("router-view")], 1), n("div", {attrs: {id: "footer"}}, [n("custom-router-link", {
                    attrs: {
                        icon: ["fab", "vk"],
                        label: "",
                        route_name: "index",
                        size: "2x"
                    }
                }), n("custom-router-link", {
                    attrs: {
                        icon: ["fab", "facebook"],
                        label: "",
                        route_name: "index",
                        size: "2x"
                    }
                }), n("custom-router-link", {
                    attrs: {
                        icon: ["fab", "instagram"],
                        label: "",
                        route_name: "index",
                        size: "2x"
                    }
                })], 1)])
            }, a = [], o = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("router-link", {
                    class: {link: e.withLine},
                    attrs: {to: {name: e.route_name}}
                }, [n("font-awesome-icon", {attrs: {icon: e.icon, size: e.size}}), e._v(" " + e._s(e.label) + " ")], 1)
            }, i = [], c = {
                name: "CustomRouterLink",
                props: {
                    route_name: String,
                    icon: Array,
                    label: String,
                    withLine: Boolean,
                    size: {type: String, default: "lg"}
                },
                methods: {}
            }, l = c, u = (n("52e5"), n("2877")), d = Object(u["a"])(l, o, i, !1, null, "6b4a88d4", null), m = d.exports,
            f = {
                name: "App", components: {CustomRouterLink: m}, data: function () {
                    return {username: "User", authorized: !1, is_superuser: !1, role: null}
                }, mounted: function () {
                    localStorage.username && (this.username = localStorage.username), localStorage.token && (this.authorized = !0), localStorage.is_superuser && (this.is_superuser = "true" == localStorage.is_superuser), localStorage.role && (this.role = localStorage.role)
                }, methods: {
                    logout: function (e) {
                        e.preventDefault(), localStorage.removeItem("username"), localStorage.removeItem("token"), localStorage.removeItem("role"), localStorage.removeItem("is_superuser"), window.location.pathname = "/login"
                    }, getToken: function () {
                        return console.log(Boolean(localStorage.token)), Boolean(localStorage.token)
                    }, redirect: function (e) {
                        this.$router.push({name: e})
                    }
                }
            }, p = f, b = (n("034f"), Object(u["a"])(p, r, a, !1, null, null, null)), h = b.exports, v = n("8c4f"),
            _ = n("b079"), g = n.n(_), w = (n("d3b7"), n("3ca3"), n("ddb0"), function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "subjects"}}, [n("square-templates", {
                    attrs: {
                        router_name: "subjectDetail",
                        items: e.subjectList,
                        title: "Дисциплины",
                        icon: ["fas", "bookmark"]
                    }
                })], 1)
            }), x = [], S = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", [n("h1", [e._v(e._s(e.title))]), e._t("default"), n("div", {attrs: {id: "subj-list"}}, e._l(e.items, (function (t) {
                    return n("div", {
                        key: t.id,
                        staticClass: "sqLink",
                        class: {sqLink2: !!t.completion_date},
                        on: {
                            click: function (n) {
                                return e.redirect(t.id)
                            }
                        }
                    }, [n("b-container", [t.completion_date ? n("b-row", {staticClass: "rem1"}, [n("b-col", [e._v(" " + e._s(t.group) + " ")]), n("b-col", [e._v(e._s(e.formatDate(new Date(t.completion_date))))])], 1) : e._e(), t.completion_date ? n("b-row", [n("b-col", [n("font-awesome-icon", {
                        staticClass: "sm-icon",
                        attrs: {icon: e.icon, size: "2x"}
                    }), e._v(e._s(" ") + " " + e._s(t.name))], 1)], 1) : e._e(), t.completion_date ? n("b-row", {staticClass: "rem1"}, [n("b-col", [e._v(" " + e._s(t.student) + " ")])], 1) : n("div", [n("font-awesome-icon", {
                        staticClass: "sm-icon",
                        attrs: {icon: e.icon, size: "2x"}
                    }), e._v(e._s(" ") + " " + e._s(t.name))], 1)], 1)], 1)
                })), 0)], 2)
            }, k = [], C = {
                name: "SquareTemplates",
                props: {title: String, items: Array, icon: Array, router_name: String, click: Function},
                data: function () {
                    return {}
                },
                methods: {
                    redirect: function (e) {
                        this.click ? this.click() : this.$router.push({name: this.router_name, params: {id: e}})
                    }, formatDate: function (e) {
                        var t = e.getDate();
                        t < 10 && (t = "0" + t);
                        var n = e.getMonth() + 1;
                        n < 10 && (n = "0" + n);
                        var s = e.getFullYear() % 100;
                        return s < 10 && (s = "0" + s), t + "." + n + "." + s
                    }
                }
            }, T = C, y = (n("cd7d"), n("4081"), Object(u["a"])(T, S, k, !1, null, "684e1917", null)), R = y.exports,
            O = n("bc3a"), L = n.n(O), j = L.a.create({
                baseURL: "/api/",
                headers: {"Content-Type": "application/json", Authorization: "Token ".concat(localStorage.token)}
            }), E = {
                name: "Subjects", components: {SquareTemplates: R}, data: function () {
                    return {subjectList: []}
                }, mounted: function () {
                    var e = this;
                    j.get(this.$getConst("SUBJECT_URL")()).then((function (t) {
                        e.subjectList = t.data
                    }))
                }
            }, $ = E, D = (n("09bc"), Object(u["a"])($, w, x, !1, null, null, null)), U = D.exports, q = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "as"}}, [e.show ? n("b-form", {
                    on: {
                        submit: e.onSubmit,
                        reset: e.onReset
                    }
                }, [n("h1", [e._v("Войдите в систему")]), n("br"), n("b-form-group", {
                    attrs: {
                        id: "input-group-1",
                        label: "Имя пользователя:",
                        "label-for": "input-1"
                    }
                }, [n("b-form-input", {
                    attrs: {id: "input-1", placeholder: "Введите имя пользователя", required: ""},
                    model: {
                        value: e.form.username, callback: function (t) {
                            e.$set(e.form, "username", t)
                        }, expression: "form.username"
                    }
                })], 1), n("b-form-group", {
                    attrs: {
                        id: "input-group-2",
                        label: "Пароль:",
                        "label-for": "input-2"
                    }
                }, [n("b-form-input", {
                    attrs: {
                        id: "input-2",
                        placeholder: "Введите пароль",
                        type: "password",
                        required: ""
                    }, model: {
                        value: e.form.password, callback: function (t) {
                            e.$set(e.form, "password", t)
                        }, expression: "form.password"
                    }
                })], 1), n("b-button", {
                    attrs: {
                        type: "submit",
                        variant: "primary"
                    }
                }, [e._v("Войти")]), n("br"), n("b-button", {
                    attrs: {
                        type: "reset",
                        variant: "link"
                    }
                }, [e._v("Зарегистрироваться")])], 1) : e._e()], 1)
            }, A = [], N = n("1da1"), I = (n("96cf"), {
                data: function () {
                    return {form: {username: "", password: ""}, show: !0}
                }, methods: {
                    onSubmit: function (e) {
                        var t = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function n() {
                            return regeneratorRuntime.wrap((function (n) {
                                while (1) switch (n.prev = n.next) {
                                    case 0:
                                        e.preventDefault(), L.a.post(t.$getConst("LOGIN_URL")(), t.form).then((function (e) {
                                            localStorage.setItem("token", e.data.token), localStorage.setItem("username", e.data.email), localStorage.setItem("role", e.data.role), localStorage.setItem("is_superuser", e.data.is_superuser), t.$root.username = e.data.email, t.$emit.username = e.data.email, t.$root.is_superuser = e.data.is_superuser, t.$emit.is_superuser = e.data.is_superuser, t.$root.role = e.data.role, t.$emit.role = e.data.role, window.location.pathname = "/subjects"
                                        }), (function (e) {
                                            return s["default"].$toast.error("Логин или пароль введены неверно")
                                        }));
                                    case 2:
                                    case"end":
                                        return n.stop()
                                }
                            }), n)
                        })))()
                    }, onReset: function (e) {
                        e.preventDefault(), this.$router.push({name: "register"})
                    }
                }
            }), G = I, P = (n("cbc6"), Object(u["a"])(G, q, A, !1, null, "680e3921", null)), M = P.exports,
            z = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {staticClass: "s2"}, [n("h1", [e._v('Дисциплина "' + e._s(e.subjectName) + '"')]), n("div", {attrs: {id: "filters"}}, [n("b-form-select", {
                    attrs: {options: e.semesterOption},
                    model: {
                        value: e.selectedSemestr, callback: function (t) {
                            e.selectedSemestr = t
                        }, expression: "selectedSemestr"
                    }
                }), n("b-form-select", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.selectedSemestr,
                        expression: "selectedSemestr"
                    }], attrs: {options: e.folderOption}, model: {
                        value: e.selectedFolder, callback: function (t) {
                            e.selectedFolder = t
                        }, expression: "selectedFolder"
                    }
                })], 1), n("div", {attrs: {id: "cont"}}, [n("b-button", {
                    directives: [{
                        name: "b-toggle",
                        rawName: "v-b-toggle",
                        value: "collapse-lecture",
                        expression: "'collapse-lecture'"
                    }], staticClass: "mb-1 mt-1", attrs: {block: ""}
                }, [e._v("Лекции")]), n("b-collapse", {
                    staticClass: "mt-2 col",
                    attrs: {id: "collapse-lecture"}
                }, [e._l(e.lectures, (function (t) {
                    return n("b-card", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.selectedSemestr,
                            expression: "selectedSemestr"
                        }], key: t.id
                    }, [n("b-link", {
                        attrs: {
                            href: t.file,
                            target: "_blank"
                        }
                    }, [e._v(e._s(t.name))]), e._v(" | "), n("b-link", {
                        on: {
                            click: function (n) {
                                return e.selectLecture(t.id)
                            }
                        }
                    }, [e._v("Практика")])], 1)
                })), e.selectedSemestr ? e._e() : n("b-card", [e._v("Выберите семестр")])], 2), n("b-button", {
                    directives: [{
                        name: "b-toggle",
                        rawName: "v-b-toggle",
                        value: "collapse-labs",
                        expression: "'collapse-labs'"
                    }], staticClass: "mb-1 mt-1", attrs: {block: ""}
                }, [e._v("Лабораторные работы")]), n("b-collapse", {
                    staticClass: "mt-2 col",
                    attrs: {id: "collapse-labs"}
                }, [e._l(e.labs, (function (t) {
                    return n("b-card", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.selectedSemestr,
                            expression: "selectedSemestr"
                        }], key: t.id
                    }, [n("b-link", {
                        attrs: {
                            href: t.file,
                            target: "_blank"
                        }
                    }, [e._v(e._s(t.name))]), e._v(" | "), n("b-link", {
                        on: {
                            click: function (n) {
                                return e.selectLab(t.id)
                            }
                        }
                    }, [e._v("Практика")])], 1)
                })), e.selectedSemestr ? e._e() : n("b-card", [e._v("Выберите семестр")])], 2), n("b-button", {
                    directives: [{
                        name: "b-toggle",
                        rawName: "v-b-toggle",
                        value: "collapse-files",
                        expression: "'collapse-files'"
                    }], staticClass: "mb-1 mt-1", attrs: {block: ""}
                }, [e._v("Файлы " + e._s(e.folderName))]), n("b-collapse", {
                    staticClass: "mt-2 col",
                    attrs: {id: "collapse-files"}
                }, [e._l(e.files, (function (t) {
                    return n("b-card", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.selectedFolder,
                            expression: "selectedFolder"
                        }], key: t.id
                    }, [n("b-link", {attrs: {href: t.file, target: "_blank"}}, [e._v(e._s(t.name))])], 1)
                })), e.selectedSemestr ? e._e() : n("b-card", [e._v("Выберите семестр")]), e.selectedFolder ? e._e() : n("b-card", [e._v("Выберите папку")])], 2),
                ], 1), n("b-modal", {
                    staticClass: "modal-12",
                    attrs: {size: "xl", id: "modal-12", title: "Практические задания"}
                }, [n("tests", {attrs: {lectureId: e.selectedLecture, labId: e.selectedLab, hideTitle: ""}})], 1)], 1)
            }, F = [], B = (n("b0c0"), n("d81d"), n("4de4"), n("25f0"), function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "subjects"}}, [n("square-templates", {
                    attrs: {
                        router_name: "testDetail",
                        items: e.subjectList,
                        title: e.getDefaultTitle(),
                        icon: ["fa", "check-circle"]
                    }
                })], 1)
            }), J = [], V = {
                name: "Tests",
                components: {SquareTemplates: R},
                props: {
                    lectureId: {type: String, default: ""},
                    labId: {type: String, default: ""},
                    hideTitle: {type: Boolean, default: !1}
                },
                data: function () {
                    return {subjectList: []}
                },
                mounted: function () {
                    var e = this;
                    j.get(this.$getConst("TESTS_URL")(this.lectureId, this.labId)).then((function (t) {
                        e.subjectList = t.data
                    }))
                },
                methods: {
                    getDefaultTitle: function () {
                        return this.hideTitle ? "" : "Практика"
                    }
                }
            }, H = V, W = Object(u["a"])(H, B, J, !1, null, null, null), X = W.exports, Y = {
                name: "SubjectDetail", components: {Tests: X, CustomRouterLink: m}, data: function () {
                    return {
                        subjectList: [],
                        selectedSemestr: null,
                        selectedFolder: null,
                        folderName: "",
                        semesterOption: [{value: null, text: "Выберите семестр"}],
                        folderOption: [{value: null, text: "Выберите папку"}],
                        subjectName: "",
                        files: [],
                        lectures: [],
                        labs: [],
                        selectedLab: "",
                        selectedLecture: "",
                        allowConsole: !1
                    }
                }, methods: {
                    getSubjectInfo: function (e) {
                        var t = this;
                        j.get(this.$getConst("SUBJECT_DETAIL_URL")(e)).then((function (e) {
                            t.subjectName = e.data.name, t.allowConsole = e.data.allow_console
                        }))
                    }, getSemesters: function (e) {
                        var t = this;
                        j.get(this.$getConst("SEMESTERS_URL")(e)).then((function (e) {
                            e.data.map((function (e) {
                                t.semesterOption.push({value: e.id, text: e.name})
                            }))
                        }))
                    }, getFiles: function (e) {
                        var t = this;
                        j.get(this.$getConst("FILES_URL")(e)).then((function (e) {
                            t.files = e.data
                        }))
                    }, getLabs: function (e) {
                        var t = this;
                        j.get(this.$getConst("LABS_URL")(e)).then((function (e) {
                            t.labs = e.data
                        }))
                    }, getLecture: function (e) {
                        var t = this;
                        j.get(this.$getConst("LECTURES_URL")(e)).then((function (e) {
                            t.lectures = e.data
                        }))
                    }, getFolders: function (e) {
                        var t = this;
                        j.get(this.$getConst("FOLDERS_URL")(e)).then((function (e) {
                            e.data.map((function (e) {
                                t.folderOption.push({value: e.id, text: e.name})
                            }))
                        }))
                    }, getFolderName: function (e) {
                        return this.folderOption.filter((function (t) {
                            return t.value == e
                        }))[0].text
                    }, selectLab: function (e) {
                        this.selectedLecture = "", this.selectedLab = e.toString(), this.$bvModal.show("modal-12")
                    }, selectLecture: function (e) {
                        this.selectedLecture = e.toString(), this.selectedLab = "", this.$bvModal.show("modal-12")
                    }
                }, mounted: function () {
                    var e = this.$route.params.id;
                    this.getSubjectInfo(e), this.getSemesters(e)
                }, watch: {
                    selectedSemestr: function (e) {
                        this.folderOption = [{
                            value: null,
                            text: "Выберите папку"
                        }], this.lectures = [], this.selectedFolder = null, e && (this.getFolders(e), this.getLabs(e), this.getLecture(e))
                    }, selectedFolder: function (e) {
                        this.files = [], this.folderName = "", e && (this.getFiles(e), this.folderName = "в папке ".concat(this.getFolderName(e)))
                    }
                }
            }, K = Y, Q = (n("2b1c"), Object(u["a"])(K, z, F, !1, null, null, null)), Z = Q.exports, ee = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "as"}}, [e.show ? n("b-form", {on: {submit: e.onSubmit}}, [n("h1", [e._v("Регистрация")]), n("br"), n("b-container", {attrs: {fluid: ""}}, [n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Username:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", placeholder: "Введите имя пользователя"},
                    model: {
                        value: e.form.username, callback: function (t) {
                            e.$set(e.form, "username", t)
                        }, expression: "form.username"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Пароль:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", type: "password", placeholder: "Введите пароль"},
                    model: {
                        value: e.form.password, callback: function (t) {
                            e.$set(e.form, "password", t)
                        }, expression: "form.password"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Имя:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", placeholder: "Введите имя"},
                    model: {
                        value: e.form.first_name, callback: function (t) {
                            e.$set(e.form, "first_name", t)
                        }, expression: "form.first_name"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Фамилия:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", placeholder: "Введите фамилю"},
                    model: {
                        value: e.form.last_name, callback: function (t) {
                            e.$set(e.form, "last_name", t)
                        }, expression: "form.last_name"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Email:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", type: "email", placeholder: "Введите email"},
                    model: {
                        value: e.form.email, callback: function (t) {
                            e.$set(e.form, "email", t)
                        }, expression: "form.email"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Группа:")])]), n("b-col", {attrs: {sm: "10"}}, [n("model-select", {
                    staticClass: "ml-5",
                    attrs: {
                        required: "",
                        options: e.groups,
                        isError: null === e.form.group,
                        placeholder: "Выберите группу"
                    },
                    model: {
                        value: e.form.group, callback: function (t) {
                            e.$set(e.form, "group", t)
                        }, expression: "form.group"
                    }
                })], 1)], 1)], 1), n("br"), n("b-button", {
                    attrs: {
                        type: "submit",
                        variant: "primary"
                    }
                }, [e._v("Зарегистрироваться")]), n("br"), n("br")], 1) : e._e()], 1)
            }, te = [], ne = (n("99af"), n("b410")), se = {
                name: "Register", components: {ModelSelect: ne["ModelSelect"]}, data: function () {
                    return {
                        form: {
                            username: null,
                            password: null,
                            group: null,
                            email: null,
                            first_name: null,
                            last_name: null
                        }, fields: ["name"], groups: [{value: null, text: "Выберите группу"}], show: !0
                    }
                }, mounted: function () {
                    this.getGroups()
                }, methods: {
                    onSubmit: function (e) {
                        var t = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function n() {
                            var r;
                            return regeneratorRuntime.wrap((function (n) {
                                while (1) switch (n.prev = n.next) {
                                    case 0:
                                        if (e.preventDefault(), null !== t.form.group) {
                                            n.next = 4;
                                            break
                                        }
                                        return alert("Заполните группу"), n.abrupt("return");
                                    case 4:
                                        return n.prev = 4, n.next = 7, L.a.post("/api/" + t.$getConst("REGISTER_URL")(), t.form);
                                    case 7:
                                        n.sent, t.$router.push({name: "login"}), n.next = 14;
                                        break;
                                    case 11:
                                        for (r in n.prev = 11, n.t0 = n["catch"](4), n.t0.response.data) s["default"].$toast.error("".concat(r, " ").concat(n.t0.response.data[r]));
                                    case 14:
                                    case"end":
                                        return n.stop()
                                }
                            }), n, null, [[4, 11]])
                        })))()
                    }, getGroups: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, L.a.get("/api/" + e.$getConst("GROUPS_URL")());
                                    case 3:
                                        n = t.sent, n.data.map((function (t) {
                                            return e.groups.push({value: t.id, text: t.name})
                                        })), t.next = 10;
                                        break;
                                    case 7:
                                        t.prev = 7, t.t0 = t["catch"](0), alert("Oops... Smt going wrong with groups");
                                    case 10:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, null, [[0, 7]])
                        })))()
                    }
                }
            }, re = se, ae = (n("f30e"), Object(u["a"])(re, ee, te, !1, null, null, null)), oe = ae.exports,
            ie = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "as"}}, [e.show ? n("b-form", {on: {submit: e.onSubmit}}, [n("h1", [e._v("Добавить преподавателя")]), n("br"), n("b-container", {attrs: {fluid: ""}}, [n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Username:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", placeholder: "Введите имя пользователя"},
                    model: {
                        value: e.form.username, callback: function (t) {
                            e.$set(e.form, "username", t)
                        }, expression: "form.username"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Пароль:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", type: "password", placeholder: "Введите пароль"},
                    model: {
                        value: e.form.password, callback: function (t) {
                            e.$set(e.form, "password", t)
                        }, expression: "form.password"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Имя:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", placeholder: "Введите имя"},
                    model: {
                        value: e.form.first_name, callback: function (t) {
                            e.$set(e.form, "first_name", t)
                        }, expression: "form.first_name"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Фамилия:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", placeholder: "Введите фамилю"},
                    model: {
                        value: e.form.last_name, callback: function (t) {
                            e.$set(e.form, "last_name", t)
                        }, expression: "form.last_name"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Email:")])]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    staticClass: "ml-5",
                    attrs: {required: "", id: "input-default", type: "email", placeholder: "Введите email"},
                    model: {
                        value: e.form.email, callback: function (t) {
                            e.$set(e.form, "email", t)
                        }, expression: "form.email"
                    }
                })], 1)], 1), n("b-row", {staticClass: "my-1"}, [n("b-col", {attrs: {sm: "2"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [e._v("Дисциплина:")])]), n("b-col", {attrs: {sm: "10"}}, [n("multi-select", {
                    staticClass: "ml-5",
                    attrs: {
                        options: e.subjects,
                        "selected-options": e.items,
                        placeholder: "выберите предмет",
                        required: ""
                    },
                    on: {select: e.onSelect}
                })], 1)], 1)], 1), n("br"), n("b-button", {
                    attrs: {
                        type: "submit",
                        variant: "primary"
                    }
                }, [e._v("Зарегистрироваться")]), n("br"), n("br")], 1) : e._e()], 1)
            }, ce = [], le = {
                name: "TeacherRegister", components: {MultiSelect: ne["MultiSelect"]}, data: function () {
                    return {
                        searchText: "",
                        items: [],
                        lastSelectItem: {},
                        form: {
                            username: null,
                            password: null,
                            teacher_subjects: null,
                            email: null,
                            first_name: null,
                            last_name: null
                        },
                        subjects: [],
                        show: !0
                    }
                }, mounted: function () {
                    this.getSubjects()
                }, methods: {
                    onSelect: function (e, t) {
                        this.items = e, this.lastSelectItem = t, this.form.teacher_subjects = e.map((function (e) {
                            return e.value
                        }))
                    }, onSubmit: function (e) {
                        var t = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function n() {
                            return regeneratorRuntime.wrap((function (n) {
                                while (1) switch (n.prev = n.next) {
                                    case 0:
                                        if (e.preventDefault(), console.log(t.items), null !== t.form.group) {
                                            n.next = 5;
                                            break
                                        }
                                        return alert("Заполните группу"), n.abrupt("return");
                                    case 5:
                                        return n.prev = 5, n.next = 8, j.post(t.$getConst("CREATE_TEACHER")(), t.form);
                                    case 8:
                                        n.sent, t.$router.push({name: "subjects"}), n.next = 15;
                                        break;
                                    case 12:
                                        n.prev = 12, n.t0 = n["catch"](5);
                                        for (var key in n.t0.response.data) {
                                            var messages = n.t0.response.data[key].join(", ");
                                            s["default"].$toast.error(`${key}: ${messages}`);
                                        }
                                    case 15:
                                    case"end":
                                        return n.stop()
                                }
                            }), n, null, [[5, 12]])
                        })))()
                    }, getSubjects: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, j.get(e.$getConst("SUBJECT_URL")());
                                    case 3:
                                        n = t.sent, n.data.map((function (t) {
                                            return e.subjects.push({value: t.id, text: t.name})
                                        })), t.next = 10;
                                        break;
                                    case 7:
                                        t.prev = 7, t.t0 = t["catch"](0), alert("Oops... Smt going wrong with groups");
                                    case 10:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, null, [[0, 7]])
                        })))()
                    }
                }
            }, ue = le, de = (n("2900"), Object(u["a"])(ue, ie, ce, !1, null, null, null)), me = de.exports,
            fe = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {staticClass: "s2"}, [n("h1", [e._v("Команды")]), n("div", {
                    staticClass: "right",
                    attrs: {id: "filters"}
                }, [n("b-container", {attrs: {fluid: ""}}, [n("b-row", {
                    staticClass: "my-1 mb-3",
                    style: {width: "170%"}
                }, [n("b-col", {attrs: {sm: "1"}}, [n("label", {
                    staticClass: "font",
                    attrs: {for: "input-default"}
                }, [n("font-awesome-icon", {attrs: {icon: ["fas", "search"]}})], 1)]), n("b-col", {attrs: {sm: "10"}}, [n("b-form-input", {
                    attrs: {
                        id: "input-default",
                        placeholder: "Поиск"
                    }, model: {
                        value: e.search, callback: function (t) {
                            e.search = t
                        }, expression: "search"
                    }
                })], 1)], 1)], 1)], 1), e._l(e.commands, (function (t) {
                    return n("div", {key: t.id, staticClass: "s2"}, [n("b-button", {
                        directives: [{
                            name: "b-toggle",
                            rawName: "v-b-toggle",
                            value: "com" + t.id.toString(),
                            expression: "'com' + command.id.toString()"
                        }], staticClass: "mb-1 mt-1", attrs: {block: ""}
                    }, [e._v(e._s(t.command_name))]), n("b-collapse", {
                        staticClass: "mt-2 col",
                        attrs: {id: "com" + t.id.toString()}
                    }, [n("b-card", [e._v("Описание: " + e._s(t.description))]), t.subcommands[0] ? n("h2", [e._v("Подкоманды")]) : e._e(), e._l(t.subcommands, (function (t) {
                        return n("div", {
                            key: t.subcommand_name,
                            staticClass: "s2"
                        }, [n("b-button", {
                            directives: [{
                                name: "b-toggle",
                                rawName: "v-b-toggle",
                                value: "subcom" + t.subcommand_name,
                                expression: "'subcom' + subcommand.subcommand_name"
                            }], staticClass: "mb-1 mt-1 subcom", attrs: {block: ""}
                        }, [e._v(e._s(t.subcommand_name))]), n("b-collapse", {
                            staticClass: "mt-2 col",
                            attrs: {id: "subcom" + t.subcommand_name}
                        }, [n("b-card", [e._v("Описание: " + e._s(t.description))])], 1)], 1)
                    }))], 2)], 1)
                }))], 2)
            }, pe = [], be = (n("ac1f"), n("841c"), {
                name: "Commands", components: {}, data: function () {
                    return {commands: [], search: ""}
                }, methods: {
                    getCommads: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, j.get(e.$getConst("COMMANDS_URL")(e.search));
                                    case 2:
                                        n = t.sent, e.commands = n.data;
                                    case 4:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }
                }, mounted: function () {
                    this.getCommads()
                }, watch: {
                    search: function (e) {
                        this.getCommads()
                    }
                }
            }), he = be, ve = (n("5dbf"), Object(u["a"])(he, fe, pe, !1, null, null, null)), _e = ve.exports,
            ge = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "subjects"}}, [n("div", [n("h1", [e._v("Устройства")]), n("div", {attrs: {id: "subj-list"}}, e._l(e.devicesList, (function (t) {
                    return n("div", {
                        key: t.id, staticClass: "sqLink", on: {
                            click: function (n) {
                                return e.showModal(t)
                            }
                        }
                    }, [n("font-awesome-icon", {
                        staticClass: "sm-icon",
                        attrs: {icon: ["fas", "tablet"], size: "2x"}
                    }), e._v(e._s(" ") + " " + e._s(t.name) + " ")], 1)
                })), 0)]), n("b-modal", {
                    staticClass: "modal-1",
                    attrs: {size: "xl", id: "modal-1", title: "Консоль " + e.getTitle()}
                }, [n("vue-terminal", {
                    staticStyle: {color: "white !important"},
                    attrs: {
                        intro: "Нажмите Enter для начала работы",
                        "console-sign": e.getTitle() + ">",
                        height: "500px",
                        "allow-arbitrary": ""
                    },
                    on: {command: e.onCliCommand}
                })], 1)], 1)
            }, we = [], xe = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {staticClass: "vue-terminal-wrapper"}, [this.waiting ? n("div", {staticClass: "lds-css"}, [e._m(0)]) : e._e(), n("div", {
                    staticClass: "boring",
                    class: {"default-height": !e.fullScreen, "fullscreen-height": e.fullScreen},
                    style: {maxHeight: this.height},
                    attrs: {id: "terminal", "data-theme": "boring"}
                })])
            }, Se = [function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {staticClass: "lds-rolling", staticStyle: {width: "100%", height: "100%"}}, [n("div")])
            }], ke = n("53ca"),
            Ce = (n("7db0"), n("1276"), n("498a"), n("fb6a"), n("5319"), n("466d"), n("a15b"), n("1157")), Te = n.n(Ce);
        (function (e) {
            e.fn.Ptty = function (t) {
                var n = "0.0.5 beta", s = function () {
                    return {
                        ajax_options: {url: window.location.pathname, type: "POST"},
                        allowArbitrary: !1,
                        passCommand: null,
                        param: "cmd",
                        ps: "$",
                        caret: "▮",
                        caret_blink: 800,
                        theme: "boring",
                        native_cmds: !1,
                        autocomplete: !0,
                        history_max: 800,
                        autofocus: !0,
                        before_cmd: !1,
                        after_cmd: !1,
                        i18n: {
                            welcome: "Ptty (" + n + ").<br> Type <b>help</b> to list the available commands.",
                            error_not_found: "Command not found.",
                            error_bad_method: "Invalid command method.",
                            error_ajax: "Server error."
                        }
                    }
                }, r = {};
                return this.each((function () {
                    var n = e(this), a = {}, o = {}, i = {}, c = {}, l = [],
                        u = {ps: null, in: null, out: null, last: null, next: null, data: null},
                        d = e.extend(!0, s(), t);
                    r.get_terminal = function (e) {
                        return e ? n.find(e) : n
                    }, r.native_commands = function () {
                        r.register("command", {
                            name: "clear", method: function (e) {
                                return e.last = "", e.out = "", e
                            }, options: [], help: "Cleans the screen leaving a new command prompt ready."
                        }), r.register("callback", {
                            name: "clear", method: function (e) {
                                return n.find(".content").html(""), e
                            }
                        })
                    }, r.native_responses = function (e) {
                        for (var t in e) e.hasOwnProperty(t) && r.register("response", {
                            name: t, method: function (n) {
                                return e[t] = n[t], n
                            }
                        })
                    }, r.run_command = function (e, t) {
                        x = t, S(e)
                    }, r.echo = function (e, t) {
                        e && n.find(".content").append('<div><div class="cmd_out">' + e + "</div></div>"), t || O()
                    }, r.change_settings = function (t) {
                        e.extend(!0, d, t)
                    }, r.unregister = function (e, t) {
                        var n = !1;
                        return "object" == Object(ke["a"])(t) && t.hasOwnProperty("name") && (t = t.name), "callbefore" == e && c.hasOwnProperty(t) ? (n = !0, delete c[t]) : "command" == e && a.hasOwnProperty(t) ? (n = !0, delete a[t]) : "response" == e && o.hasOwnProperty(t) ? (n = !0, delete o[t]) : "callback" == e && i.hasOwnProperty(t) && (n = !0, delete i[t]), n
                    }, r.register = function (e, t) {
                        var n = !1;
                        return t && ("callbefore" == e && "function" === typeof method_exe ? (c[method_name] = method_exe, n = !0) : "command" != e || "string" !== typeof method_exe && "function" !== typeof method_exe ? "response" == e && "function" === typeof method_exe ? (o[method_name] = method_exe, n = !0) : "callback" == e && "function" === typeof method_exe && (i[method_name] = method_exe, n = !0) : n = !0), n
                    }, r.set_command_option = function (t) {
                        return e.extend(!0, u, t)
                    }, r.get_command_option = function (e) {
                        var t;
                        if ("string" === typeof e) t = !!u.hasOwnProperty(e) && u[e]; else if ("object" === Object(ke["a"])(e)) {
                            t = {};
                            for (var n = e.length - 1; n >= 0; n--) "undefined" !== typeof u[e[n]] && (t[e[n]] = u[e[n]])
                        } else t = u;
                        return t
                    }, r.tokenize = function (t, n) {
                        var s = {}, r = e.trim(t).split(/\s+/);
                        if ("undefined" === typeof r[0] || "" === r[0]) s = !1; else if ("undefined" !== typeof n) {
                            var a = !1, o = !1, i = !1, c = !1, l = !1, u = !1, d = !1, m = n.filter((function (e) {
                                if ("number" === typeof e && e > 0 && "undefined" !== typeof r[e]) return s[e] = r[e], e
                            }));
                            n = e(n).not(m).get();
                            for (var f = 0; f < r.length; f++) l = r[f].charAt(0), u = r[f].slice(-1), d = r[f].charAt(r[f].length - 2), e.inArray(r[f], n) >= 0 ? (a = r[f], o = !1) : '"' == l && !1 === c && '"' !== u ? (i = '"', c = !0, o = r[f]) : "'" == l && !1 === c && "'" !== u ? (i = "'", c = !0, o = r[f]) : u == i && !0 === c && d + u !== "\\" + i ? (c = !1, o += " " + r[f], o = e.trim(o.substring(1).slice(0, -1).replace(/\\(.)/gm, "$1"))) : !0 === c ? o += " " + r[f] : o = "'" == l && "'" == u || '"' == l && '"' == u ? e.trim(r[f].substring(1).slice(0, -1)) : r[f], a && !1 === c && (s[a] = o)
                        } else s[r[0]] = r;
                        return s
                    }, n.html("");
                    var m = null, f = null, p = {};
                    n.append('<div class="content"><div>' + d.i18n.welcome + '</div></div><div class="prompt"><div class="input" contenteditable spellcheck="false" data-caret="' + d.caret + '" data-ps="' + d.ps + '"></div></div>');
                    var b = n.find(".prompt .input"), h = n.find(".content"), v = n.find(".loading");
                    n.attr("data-theme", d.theme).addClass(d.theme);
                    var _ = d.autofocus, g = d.autocomplete, w = d.history_max;
                    d.autofocus && b.focus(), n.bind("focus click", (function () {
                        var e = "";
                        "undefined" != typeof window.getSelection ? e = window.getSelection().toString() : "undefined" != typeof document.selection && "Text" == document.selection.type && (e = document.selection.createRange().text), "" == e && L()
                    })), b.click((function () {
                        L()
                    })), b.bind("blur", (function () {
                        _ = !1
                    })), d.caret_blink > 0 && setInterval((function () {
                        d.caret_blink > 0 && !0 === _ && b.toggleClass("blink")
                    }), d.caret_blink);
                    var x = null, S = function (t) {
                        var n;
                        if (n = "undefined" !== typeof t ? t : b.text(), g = d.autocomplete, w = d.history_max, u.last = n, "string" == typeof u.next && (n = u.next.replace(/%cmd%/i, n), u.next = null, w = 0), !n || "" == n) return T();
                        if (f = n.split(/\s+/)[0], "undefined" === typeof a[f]) return d.allowArbitrary ? (R(n), d.passCommand(p.last).then((function (e) {
                            return p.out = e, T()
                        })).catch((function (e) {
                            return p.out = e, T()
                        }))) : (x || (u.out = f + " : " + d.i18n.error_not_found), T());
                        if (p = r.tokenize(n, a[f].options), "function" == typeof d.before_cmd && (p = k(d.before_cmd(p)), !p)) return T();
                        if ("function" == typeof c[f] && (p = k(c[f](p)), !p)) return T();
                        if (x || R(u.last), "function" === typeof a[f].exe) return k(a[f].exe(p)), T();
                        if ("string" !== typeof a[f].exe) return u.out = d.i18n.error_bad_method, T();
                        var s = {};
                        if (!d.ajax_options.data) {
                            var o = {};
                            o[d.param] = null !== u.in ? u.in : f, o[d.param + "_data"] = null !== u.data ? u.data : p, s.data = o
                        }
                        var i = e.extend(!0, s, d.ajax_options);
                        a[f].exe && (i.url = a[f].exe);
                        var l = e.ajax(i);
                        l.done((function (e) {
                            p = k(e)
                        })), l.fail((function () {
                            u.out = d.i18n.error_ajax
                        })), l.always((function () {
                            return T()
                        }))
                    }, k = function (t) {
                        if ("object" === Object(ke["a"])(t)) for (var n in t) o.hasOwnProperty(n) && e.extend(!0, u, o[n](t));
                        return t
                    }, C = function () {
                        p && (i.hasOwnProperty(f) && k(i[f](p)), "function" == typeof d.after_cmd && k(d.after_cmd(p)))
                    }, T = function () {
                        g = d.autocomplete, w = d.history_max;
                        var e = u.ps ? u.ps : d.ps, t = u.out ? u.out : "", s = u.in ? u.in : "",
                            r = u.last ? u.last : "", a = u.next ? u.next : null;
                        x ? h.append('<div><div class="cmd_out">' + t + "</div></div>") : h.append('<div><div class="cmd_in"><span class="cmd_ps">' + b.attr("data-ps") + "</span>" + r + '</div><div class="cmd_out">' + t + "</div></div>"), C(), b.attr("data-caret", d.caret).attr("data-ps", e).text(s), 0 === d.caret_blink && b.removeClass("blink"), b.hasClass("show-caret") && b.removeClass("show-caret"), n.hasClass(d.theme) || n.removeClass(n.attr("data-theme")).addClass(d.theme).attr("data-theme", d.theme), a && (g = !1, w = 0), x = null, u = {
                            ps: null,
                            in: null,
                            out: null,
                            last: null,
                            next: a,
                            data: null
                        }, p = u, y()
                    }, y = function () {
                        O(), L(), v.removeClass("working")
                    }, R = function (n) {
                        var s = "undefined" !== typeof a[f] && "" !== n && w > 0;
                        (s || t.allowArbitrary) && (l.length > d.history_entries && l.shift(), l.push(e.trim(n))), m = 0
                    }, O = function () {
                        n.scrollTop(n.height() + 1e17)
                    }, L = function () {
                        if (b.focus(), _ = !0, "undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
                            var e = document.createRange();
                            e.selectNodeContents(b.get(0)), e.collapse(!1);
                            var t = window.getSelection();
                            t.removeAllRanges(), t.addRange(e)
                        } else if ("undefined" != typeof document.body.createTextRange) {
                            var n = document.body.createTextRange();
                            n.moveToElementText(b.get(0)), n.collapse(!1), n.select()
                        }
                    }, j = function (e) {
                        var t = [];
                        if (e.match(/^[^\s]{0,}$/)) {
                            for (var n in a) ("" == e || 0 == n.indexOf(e)) && t.push(n);
                            t.length > 1 ? (u.out = "<ul><li>" + t.join("</li><li>") + "</li></ul>", u.in = e, T()) : 1 == t.length && b.text(t.pop() + " ")
                        }
                    };
                    b.keydown((function (t) {
                        var n = t.keyCode;
                        switch (n) {
                            case 9:
                                t.preventDefault(), g && (j(e.trim(b.text())), y());
                                break;
                            case 37:
                            case 39:
                                d.caret_blink > 0 && (_ = !1, b.addClass("blink show-caret"));
                                break;
                            case 38:
                                t.preventDefault(), w > 0 && (m = null === m || 0 == m ? l.length - 1 : m - 1, b.text(l[m]), y());
                                break;
                            case 40:
                                if (t.preventDefault(), w > 0) {
                                    if (null === m || m == l.length - 1) {
                                        b.html("");
                                        break
                                    }
                                    m++, b.text(l[m]), y()
                                }
                                break;
                            case 46:
                            case 8:
                                1 !== b.text().length && window.getSelection().toString() != b.text() || b.html("");
                                break;
                            case 13:
                                t.preventDefault(), document.execCommand("insertHTML", !1, ""), S();
                                break;
                            case 27:
                                u = {
                                    ps: null,
                                    in: null,
                                    out: null,
                                    last: null,
                                    next: null,
                                    data: null
                                }, b.text(""), S();
                                break
                        }
                    }))
                })), r
            }
        })(Te.a);
        var ye = {
                name: "VueTerminal",
                data: function () {
                    return {waiting: !1}
                },
                props: {
                    height: {type: String, default: "100%"},
                    intro: {type: String, default: ""},
                    allowArbitrary: {type: Boolean, default: !1},
                    fullScreen: {type: Boolean, default: !1},
                    consoleSign: {type: String, default: "$"}
                },
                methods: {
                    toggleWaiting: function () {
                        this.waiting = !this.waiting
                    }
                },
                mounted: function () {
                    var e = this, t = function (t) {
                        var n = new Promise((function (n, s) {
                            var r = {text: t};
                            e.$emit("command", r, n, s), e.toggleWaiting()
                        }));
                        return n.finally(e.toggleWaiting), n
                    };
                    Te()("#terminal", ".vue-terminal-wrapper").Ptty({
                        i18n: {welcome: this.intro},
                        ps: this.consoleSign,
                        allowArbitrary: this.allowArbitrary,
                        passCommand: this.allowArbitrary ? t : null,
                        native_cmds: !1
                    })
                }
            }, Re = ye, Oe = (n("3e3f"), Object(u["a"])(Re, xe, Se, !1, null, null, null)), Le = Oe.exports, je = {
                name: "Devices", components: {VueTerminal: Le}, data: function () {
                    return {
                        isModalVisible: !1,
                        devicesList: [],
                        selectedDevice: null,
                        isConnected: !1,
                        show: !1,
                        url: "",
                        data: {command: null}
                    }
                }, methods: {
                    showModal: function (e) {
                        this.show = !0, this.selectedDevice = e, this.$bvModal.show("modal-1")
                    }, getTitle: function () {
                        return this.selectedDevice ? this.selectedDevice.name : "Имя устройства"
                    }, onCliCommand: function (e, t, n) {
                        var s = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function r() {
                            return regeneratorRuntime.wrap((function (r) {
                                while (1) switch (r.prev = r.next) {
                                    case 0:
                                        e.text ? (s.data.command = e.text, s.sendCommand(e.text).then((function (e) {
                                            setTimeout((function () {
                                                t("<pre>".concat(e.data["result"], "</pre>"))
                                            }), 300)
                                        })).catch((function (e) {
                                            return n(e)
                                        }))) : t("result");
                                    case 1:
                                    case"end":
                                        return r.stop()
                                }
                            }), r)
                        })))()
                    }, sendCommand: function (e) {
                        var t = j.post(this.$getConst("EXEC_COMMAND")(this.selectedDevice.id), this.data);
                        return t
                    }
                }, mounted: function () {
                    var e = this;
                    return Object(N["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function (t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, j.get(e.$getConst("DEVICES_URL")()).then((function (t) {
                                        e.devicesList = t.data
                                    }));
                                case 2:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }
            }, Ee = je, $e = (n("ecf3"), Object(u["a"])(Ee, ge, we, !1, null, null, null)), De = $e.exports,
            Ue = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return e.isStarted ? e.isEnded ? n("div", {staticClass: "s2"}, [n("h2", [e._v("Задание закончено")]), e._v(" "), n("h3", [e._v("Ваша оценка за задание: " + (e.mark != -1 ? e._s(e.mark) : "Будет определена преподавателем"))])]) : n("div", {staticClass: "s3"}, [n("h1", [e._v('Задание "' + e._s(e.testName) + '"')]), n("b-form", [n("div", {
                    staticClass: "circle timer",
                    class: {"with-hours": e.estimatedTime > 3600}
                }, [n("vue-countdown-timer", {
                    attrs: {
                        "start-time": e.startTime,
                        "end-time": e.endTime,
                        interval: 1e3,
                        "seconds-txt": "",
                        "label-position": "begin"
                    }, on: {
                        start_callback: function (t) {
                            return e.startCallBack("Задание начато")
                        }, end_callback: function (t) {
                            return e.endCallBack("Время вышло!")
                        }
                    }, scopedSlots: e._u([{
                        key: "countdown", fn: function (t) {
                            return [e.estimatedTime > 3600 ? n("span", [e._v(e._s(t.props.hours))]) : e._e(), e.estimatedTime > 3600 ? n("i", [e._v(":")]) : e._e(), n("span", [e._v(e._s(t.props.minutes))]), n("i", [e._v(e._s(t.props.minutesTxt))]), n("span", [e._v(e._s(t.props.seconds))]), n("i", [e._v(e._s(t.props.secondsTxt))])]
                        }
                    }])
                })], 1), n("b-container", {attrs: {fuid: ""}}, e._l(e.test.questions, (function (t, s) {
                    return n("b-form-group", {
                        key: t.id,
                        staticClass: "mb-5",
                        attrs: {
                            "label-size": "lg",
                            id: "input-group-1",
                            label: s + 1 + ". " + t.question,
                            "label-for": "input-1"
                        }
                    }, [t.image ? n("div", [n("b-img", {
                        staticClass: "mb-2",
                        attrs: {src: "/api" + t.image, fluid: ""}
                    })], 1) : e._e(), n("b-form-checkbox-group", {
                        staticClass: "mb-3 inline mt-2",
                        attrs: {options: t.answers, "value-field": "answer", "text-field": "answer"},
                        on: {input: e.saveToState},
                        model: {
                            value: e.form["question_" + t.id], callback: function (n) {
                                e.$set(e.form, "question_" + t.id, n)
                            }, expression: "form[`question_${q.id}`]"
                        }
                    }), n("hr")], 1)
                })), 1), n("b-button", {
                    attrs: {type: "submit", variant: "primary"},
                    on: {click: e.subm}
                }, [e._v("Завершить задание")]), n("br")], 1)], 1) : n("div", {staticClass: "s2"}, [n("b-button", {
                    staticClass: "mt-2",
                    attrs: {type: "submit", variant: "primary"},
                    on: {click: e.getTestInfo}
                }, [e._v("Начать задание!")]), n("br")], 1)
            }, qe = [], Ae = n("2909"), Ne = (n("159b"), n("07ac"), n("a434"), {
                name: "TestDetail", components: {}, props: {}, data: function () {
                    return {
                        testName: "",
                        files: [],
                        lectures: [],
                        labs: [],
                        status: null,
                        test: {questions: []},
                        form: {},
                        isStarted: !1,
                        isEnded: !1,
                        mark: "",
                        startTime: (new Date).getTime() + 1e11,
                        endTime: (new Date).getTime() + 1e11,
                        estimatedTime: 0
                    }
                }, mounted: function () {
                    var e = this;
                    return Object(N["a"])(regeneratorRuntime.mark((function t() {
                        var n;
                        return regeneratorRuntime.wrap((function (t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    if (n = e.$route.params.id, !localStorage["isStartedTest_".concat(n)]) {
                                        t.next = 5;
                                        break
                                    }
                                    return e.isStarted = !0, t.next = 5, e.getTestInfo();
                                case 5:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }, methods: {
                    getTestInfo: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n, r, a;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return e.form = {}, n = e.$route.params.id, t.prev = 2, t.next = 5, j.get(e.$getConst("TEST_DETAIL_URL")(n));
                                    case 5:
                                        r = t.sent, e.test = r.data, e.testName = r.data.name;

                                        if (e.test.is_outer) {
                                            var authHeader = r.config.headers.Authorization;
                                            if (authHeader) {
                                                var authToken = authHeader.split(" ")[1];
                                                window.open(`${e.test.outer_url}/?auth=${encodeURIComponent(authToken)}&_=${new Date().getTime()}`, '_blank');
                                            }
                                        }

                                        a = localStorage["isStartedTest_".concat(n)] ? JSON.parse(localStorage["isStartedTest_".concat(n)]) : [], r.data.questions.forEach((function (t) {
                                            localStorage["isStartedTest_".concat(n)] ? e.form["question_".concat(t.id)] = Object(Ae["a"])(Object.values(a["question_".concat(t.id)])) : e.form["question_".concat(t.id)] = []
                                        })), e.estimatedTime = parseInt(r.data.estimated_time), e.endTime = (new Date).getTime() + 1e3 * e.estimatedTime, e.startTime = (new Date).getTime(), localStorage.setItem("isStartedTest_".concat(n), JSON.stringify(e.form)), e.isStarted = !0, t.next = 20;
                                        break;
                                    case 17:
                                        t.prev = 17, t.t0 = t["catch"](2);
                                        if (t.t0.response) {
                                            if (t.t0.response.data && typeof t.t0.response.data === 'object') {
                                                Object.keys(t.t0.response.data).forEach(key => {
                                                    var messages = Array.isArray(t.t0.response.data[key]) ? t.t0.response.data[key].join(", ") : t.t0.response.data[key];
                                                    s["default"].$toast.error(`${key}: ${messages}`);
                                                });
                                            } else {
                                                s["default"].$toast.error(`Произошла ошибка: ${t.t0.response.statusText || t.t0.message}`);
                                            }
                                        } else if (t.t0.request) {
                                            s["default"].$toast.error("Запрос не удался: сервер не доступен.");
                                        } else {
                                            s["default"].$toast.error(`Ошибка: ${t.t0.message}`);
                                        }
                                        break;
                                    case 20:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, null, [[2, 17]])
                        })))()
                    }, startCallBack: function (e) {
                        console.log(e)
                    }, endCallBack: function (e) {
                        this.subm()
                    }, subm: function () {
                        var e = arguments, t = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function n() {
                            var r, a, o;
                            return regeneratorRuntime.wrap((function (n) {
                                while (1) switch (n.prev = n.next) {
                                    case 0:
                                        return r = e.length > 0 && void 0 !== e[0] && e[0], r && r.preventDefault(), a = t.$route.params.id, n.prev = 3, n.next = 6, j.put(t.$getConst("TEST_DETAIL_URL")(a) + "/", t.form);
                                    case 6:
                                        o = n.sent, t.mark = o.data["mark"], localStorage.removeItem("isStartedTest_".concat(a)), t.isEnded = !0, n.next = 15;
                                        break;
                                    case 12:
                                        n.prev = 12, n.t0 = n["catch"](3), s["default"].$toast.error(n.t0);
                                    case 15:
                                    case"end":
                                        return n.stop()
                                }
                            }), n, null, [[3, 12]])
                        })))()
                    }, selectAnswer: function (e, t) {
                        var n = this.form["question_".concat(e.id)].indexOf(t.id);
                        -1 !== n ? this.form["question_".concat(e.id)].splice(n, 1) : this.form["question_".concat(e.id)].push(t.id)
                    }, saveToState: function () {
                        var e = this.$route.params.id;
                        localStorage.setItem("isStartedTest_".concat(e), JSON.stringify(this.form)), localStorage["isStartedTest_".concat(e)]
                    }
                }
            }), Ie = Ne, Ge = (n("6751"), Object(u["a"])(Ie, Ue, qe, !1, null, null, null)), Pe = Ge.exports,
            Me = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {attrs: {id: "subjects"}}, [n("square-templates", {
                    attrs: {
                        router_name: "tests-results-detail",
                        items: e.testsResults,
                        title: "Результаты",
                        icon: ["fas", "bookmark"]
                    }
                }, [n("div", {attrs: {id: "filters"}}, [n("b-form-select", {
                    attrs: {options: e.testsOptions},
                    model: {
                        value: e.selectedTest, callback: function (t) {
                            e.selectedTest = t
                        }, expression: "selectedTest"
                    }
                }), n("b-form-select", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.notStudent,
                        expression: "notStudent"
                    }], attrs: {options: e.groupsOptions}, model: {
                        value: e.selectedGroup, callback: function (t) {
                            e.selectedGroup = t
                        }, expression: "selectedGroup"
                    }
                }), n("b-form-select", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.notStudent,
                        expression: "notStudent"
                    }], attrs: {options: e.studentsOptions}, model: {
                        value: e.selectedStudent, callback: function (t) {
                            e.selectedStudent = t
                        }, expression: "selectedStudent"
                    }
                }), n("br"), n("br"), n("br")], 1)])], 1)
            }, ze = [], Fe = {
                name: "TestsResults", components: {SquareTemplates: R}, data: function () {
                    return {
                        testsResults: [],
                        selectedTest: null,
                        selectedStudent: null,
                        selectedGroup: null,
                        testsOptions: [],
                        studentsOptions: [],
                        groupsOptions: [],
                        notStudent: !1
                    }
                }, methods: {
                    getStudents: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n, s;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.selectedGroup ? e.selectedGroup : "", t.next = 3, j.get(e.$getConst("STUDENTS_URL")(n));
                                    case 3:
                                        s = t.sent, e.studentsOptions = [{
                                            value: null,
                                            text: "Выберите студента"
                                        }], s.data.map((function (t) {
                                            e.studentsOptions.push({
                                                value: t.id,
                                                text: "".concat(t.first_name, " ").concat(t.last_name)
                                            })
                                        }));
                                    case 6:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }, getGroups: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, j.get(e.$getConst("GROUPS_URL")());
                                    case 2:
                                        n = t.sent, e.groupsOptions = [{
                                            value: null,
                                            text: "Выберите группу"
                                        }], n.data.map((function (t) {
                                            e.groupsOptions.push({value: t.id, text: t.name})
                                        }));
                                    case 5:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }, getTests: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, j.get(e.$getConst("TESTS_URL")());
                                    case 2:
                                        n = t.sent, e.testsOptions = [{
                                            value: null,
                                            text: "Выберите задание"
                                        }], n.data.map((function (t) {
                                            e.testsOptions.push({value: t.id, text: t.name})
                                        }));
                                    case 5:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }, getTestResults: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n, s, r, a;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.selectedGroup ? e.selectedStudent ? "" : e.selectedGroup : "", s = e.selectedTest ? e.selectedTest : "", r = e.selectedStudent ? e.selectedStudent : "", t.next = 5, j.get(e.$getConst("TEST_RESULTS_URL")(s, n, r));
                                    case 5:
                                        a = t.sent, e.testsResults = a.data;
                                    case 7:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }
                }, mounted: function () {
                    var e = this;
                    return Object(N["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function (t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, e.getTests();
                                case 2:
                                    return t.next = 4, e.getTestResults();
                                case 4:
                                    if (!("1" != localStorage.role | "true" == localStorage.is_superuser)) {
                                        t.next = 10;
                                        break
                                    }
                                    return e.notStudent = !0, t.next = 8, e.getStudents();
                                case 8:
                                    return t.next = 10, e.getGroups();
                                case 10:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }, watch: {
                    selectedGroup: function (e) {
                        this.getStudents(), this.getTestResults()
                    }, selectedTest: function (e) {
                        this.getTestResults()
                    }, selectedStudent: function (e) {
                        this.getTestResults()
                    }
                }
            }, Be = Fe, Je = (n("4191"), Object(u["a"])(Be, Me, ze, !1, null, null, null)), Ve = Je.exports,
            He = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {staticClass: "s3"}, [n("h1", [e._v('Результат задания "' + e._s(e.test.name) + '" ')]), n("h3", [e._v("Ваша оценка за задание: " + (e.mark != -1 ? e._s(e.mark) : "Будет определена преподавателем"))]), e._v(" "), n("br"), n("p", {staticClass: "right-a mr-2"}, [e._v("Ответ выбран верно")]), n("p", {staticClass: "inc-a mr-2"}, [e._v(" Ответ выбран не верно")]), n("p", {staticClass: "cor-a"}, [e._v(" Верный ответ")]), n("b-form", [n("b-container", {attrs: {fuid: ""}}, e._l(e.test.questions, (function (t, s) {
                    return n("b-form-group", {
                        key: t.id,
                        staticClass: "mb-5",
                        attrs: {
                            "label-size": "lg",
                            id: "input-group-1",
                            label: s + 1 + ". " + t.question,
                            "label-for": "input-1"
                        }
                    }, [t.image ? n("div", [n("b-img", {
                        staticClass: "mb-2",
                        attrs: {src: "/api" + t.image, fluid: ""}
                    })], 1) : e._e(), n("b-row", e._l(t.answers_res, (function (t) {
                        return n("b-col", {
                            key: t.id,
                            class: {
                                "right-a": t.is_checked & t.is_right,
                                "cor-a": !t.is_checked & t.is_right,
                                "inc-a": t.is_checked & !t.is_right
                            }
                        }, [n("input", {
                            attrs: {type: "checkbox", disabled: ""},
                            domProps: {checked: t.is_checked}
                        }), e._v(e._s(t.answer) + " ")])
                    })), 1), n("hr")], 1)
                })), 1)], 1)], 1)
            }, We = [], Xe = {
                name: "TestResultDetail", components: {}, props: {}, data: function () {
                    return {
                        testName: "",
                        files: [],
                        lectures: [],
                        labs: [],
                        status: null,
                        test: {questions: []},
                        form: {},
                        isStarted: !1,
                        isEnded: !1,
                        mark: "",
                        startTime: (new Date).getTime() + 1e11,
                        endTime: (new Date).getTime() + 1e11,
                        estimatedTime: 0,
                        rightAnswers: []
                    }
                }, mounted: function () {
                    var e = this;
                    return Object(N["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function (t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, e.getTestResultInfo();
                                case 2:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }, methods: {
                    getTestResultInfo: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n, r;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return e.form = {}, n = e.$route.params.id, t.prev = 2, t.next = 5, j.get(e.$getConst("TEST_RESULT_URL")(n));
                                    case 5:
                                        r = t.sent, console.log(r.data.test.questions), e.test = r.data.test, e.testName = r.data.name, e.mark = r.data.mark, r.data.test.questions.forEach((function (t) {
                                            e.form["question_".concat(t.id)] = Object(Ae["a"])(t.answers_res.map((function (e) {
                                                if (e.is_checked) return e.answer
                                            })))
                                        })), t.next = 16;

                                        if (r.data.mark == -1) {
                                            var authHeader = r.config.headers.Authorization;
                                            if (authHeader) {
                                                var authToken = authHeader.split(" ")[1];
                                                window.open(`${r.data.test.outer_url}/?auth=${encodeURIComponent(authToken)}&_=${new Date().getTime()}`, '_blank');
                                            }
                                        }

                                        break;
                                    case 13:
                                        t.prev = 13, t.t0 = t["catch"](2), s["default"].$toast.error(t.t0);
                                    case 16:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, null, [[2, 13]])
                        })))()
                    }
                }
            }, Ye = Xe, Ke = (n("cd74"), Object(u["a"])(Ye, He, We, !1, null, null, null)), Qe = Ke.exports,
            Ze = function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", {staticClass: "s2"}, [n("b-tabs", {
                    attrs: {
                        "content-class": "mt-3",
                        justified: ""
                    }
                }, [n("b-tab", {
                    attrs: {
                        title: "Результаты практических заданий",
                        active: ""
                    }
                }, [n("div", {attrs: {id: "filters"}}, [n("b-form-select", {
                    attrs: {options: e.testsOptions},
                    model: {
                        value: e.selectedTest, callback: function (t) {
                            e.selectedTest = t
                        }, expression: "selectedTest"
                    }
                }), n("b-form-select", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.notStudent,
                        expression: "notStudent"
                    }], attrs: {options: e.groupsOptions}, model: {
                        value: e.selectedGroup, callback: function (t) {
                            e.selectedGroup = t
                        }, expression: "selectedGroup"
                    }
                }), n("b-form-select", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.notStudent,
                        expression: "notStudent"
                    }], attrs: {options: e.studentsOptions}, model: {
                        value: e.selectedStudent, callback: function (t) {
                            e.selectedStudent = t
                        }, expression: "selectedStudent"
                    }
                }), n("br"), n("br"), n("br")], 1), n("b-table", {
                    attrs: {
                        striped: "",
                        hover: "",
                        items: e.testsToDisplay
                    }
                })], 1), e.notStudent ? n("b-tab", {
                    attrs: {
                        title: "Посещения на текущий момент",
                        active: ""
                    }
                }, [n("div", {attrs: {id: "filters"}}, [n("b-form-select", {
                    attrs: {options: e.groupsOptions},
                    model: {
                        value: e.selectedGroup, callback: function (t) {
                            e.selectedGroup = t
                        }, expression: "selectedGroup"
                    }
                }), n("br"), n("br"), n("br")], 1), n("b-table", {
                    attrs: {
                        striped: "",
                        hover: "",
                        items: e.studentsToDisplay
                    }
                })], 1) : e._e()], 1)], 1)
            }, et = [], tt = {
                name: "Reports", components: {}, data: function () {
                    return {
                        studentsToDisplay: [],
                        testsToDisplay: [],
                        testsResults: [],
                        selectedTest: null,
                        selectedStudent: null,
                        selectedGroup: null,
                        testsOptions: [],
                        studentsOptions: [],
                        groupsOptions: [],
                        notStudent: !1
                    }
                }, methods: {
                    getStudents: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n, s;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return n = e.selectedGroup ? e.selectedGroup : "", t.next = 3, j.get(e.$getConst("STUDENTS_URL")(n));
                                    case 3:
                                        s = t.sent, e.studentsOptions = [{
                                            value: null,
                                            text: "Выберите студента"
                                        }], s.data.map((function (t) {
                                            e.studentsOptions.push({
                                                value: t.id,
                                                text: "".concat(t.first_name, " ").concat(t.last_name)
                                            })
                                        }));
                                    case 6:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }, getGroups: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, j.get(e.$getConst("GROUPS_URL")());
                                    case 2:
                                        n = t.sent, e.groupsOptions = [{
                                            value: null,
                                            text: "Выберите группу"
                                        }], n.data.map((function (t) {
                                            e.groupsOptions.push({value: t.id, text: t.name})
                                        }));
                                    case 5:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }, getTests: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, j.get(e.$getConst("TESTS_URL")());
                                    case 2:
                                        n = t.sent, e.testsOptions = [{
                                            value: null,
                                            text: "Выберите задание"
                                        }], n.data.map((function (t) {
                                            e.testsOptions.push({value: t.id, text: t.name})
                                        }));
                                    case 5:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }, getTestResults: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n, s, r, a;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return e.testsToDisplay = [], n = e.selectedGroup ? e.selectedStudent ? "" : e.selectedGroup : "", s = e.selectedTest ? e.selectedTest : "", r = e.selectedStudent ? e.selectedStudent : "", t.next = 6, j.get(e.$getConst("TEST_RESULTS_URL")(s, n, r));
                                    case 6:
                                        a = t.sent, a.data.map((function (t, n) {
                                            var s = e.testsOptions.filter((function (e) {
                                                return e.value == t.test
                                            }))[0].text;
                                            e.testsToDisplay.push({
                                                "#": n + 1,
                                                "Студент": t.student,
                                                "Задание": s,
                                                "Оценка": t.mark != -1 ? t.mark : "Будет определена преподавателем",
                                                "Дата выполнения": "".concat(new Date(t.completion_date).toLocaleDateString(), " ").concat(new Date(t.completion_date).toLocaleTimeString(), " ")
                                            })
                                        }));
                                    case 8:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }, getStidentsToDisplay: function () {
                        var e = this;
                        return Object(N["a"])(regeneratorRuntime.mark((function t() {
                            var n, s;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return e.studentsToDisplay = [], n = e.selectedGroup ? e.selectedGroup : "", t.next = 4, j.get(e.$getConst("STUDENTS_URL")(n));
                                    case 4:
                                        s = t.sent, s.data.map((function (t, n) {
                                            var s = e.groupsOptions.filter((function (e) {
                                                return e.value == t.group
                                            }))[0].text;
                                            e.studentsToDisplay.push({
                                                "#": n + 1,
                                                "Имя": "".concat(t.first_name, " ").concat(t.last_name),
                                                "Группа": s || "",
                                                "Последний вход": "".concat(new Date(t.last_seen).toLocaleDateString(), " ").concat(new Date(t.last_seen).toLocaleTimeString(), " "),
                                                "Онлайн": t.is_online ? "Да" : "Нет",
                                                _cellVariants: {"Онлайн": t.is_online ? "" : "danger"}
                                            })
                                        }));
                                    case 6:
                                    case"end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    }
                }, mounted: function () {
                    var e = this;
                    return Object(N["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function (t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, e.getTests();
                                case 2:
                                    return t.next = 4, e.getTestResults();
                                case 4:
                                    if (!("1" != localStorage.role | "true" == localStorage.is_superuser)) {
                                        t.next = 12;
                                        break
                                    }
                                    return e.notStudent = !0, t.next = 8, e.getStudents();
                                case 8:
                                    return t.next = 10, e.getGroups();
                                case 10:
                                    return t.next = 12, e.getStidentsToDisplay();
                                case 12:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }, watch: {
                    selectedGroup: function (e) {
                        this.getStidentsToDisplay(), this.getTestResults()
                    }, selectedTest: function (e) {
                        this.getTestResults()
                    }, selectedStudent: function (e) {
                        this.getTestResults()
                    }
                }
            }, nt = tt, st = Object(u["a"])(nt, Ze, et, !1, null, null, null), rt = st.exports, at = function () {
                return n.e("chunk-2d0bce02").then(n.bind(null, "2a30"))
            }, ot = new v["a"]({
                mode: "history",
                routes: [{path: "/", name: "index", component: U, meta: {requiresAuth: !0}}, {
                    path: "/subjects",
                    name: "subjects",
                    component: U,
                    meta: {requiresAuth: !0}
                }, {
                    path: "/subjecs/:id",
                    name: "subjectDetail",
                    props: !0,
                    component: Z,
                    meta: {requiresAuth: !0}
                }, {path: "/login", name: "login", component: M}, {
                    path: "/register",
                    name: "register",
                    component: oe
                }, {
                    path: "/teacher-register",
                    name: "teacher-register",
                    component: me,
                    meta: {requiresAuth: !0}
                }, {path: "/tests", name: "tests", component: X, meta: {requiresAuth: !0}}, {
                    path: "/tests/:id",
                    name: "testDetail",
                    component: Pe,
                    meta: {requiresAuth: !0}
                }, {path: "/commands", name: "commands", component: _e, meta: {requiresAuth: !0}}, {
                    path: "/devices",
                    name: "devices",
                    component: De,
                    meta: {requiresAuth: !0}
                }, {path: "/groups", name: "groups", component: U, meta: {requiresAuth: !0}}, {
                    path: "/profile",
                    name: "profile",
                    component: U,
                    meta: {requiresAuth: !0}
                }, {
                    path: "/tests-results",
                    name: "tests-results",
                    component: Ve,
                    meta: {requiresAuth: !0}
                }, {
                    path: "/tests-results/:id",
                    name: "tests-results-detail",
                    component: Qe,
                    meta: {requiresAuth: !0}
                }, {path: "/reports", name: "reports", component: rt, meta: {requiresAuth: !0}}, {
                    path: "/admin",
                    name: "admin",
                    components: {default: at},
                    meta: {requiresAuth: !0}
                }]
            }), it = n("ecee"), ct = n("c074"), lt = n("f2d1"), ut = n("ad3d"), dt = n("5f5b"), mt = n("b1e0"),
            ft = (n("41e9"), n("f9e3"), n("2dd8"), n("4238"), n("50d1")), pt = n.n(ft), bt = {
                REGISTER_URL: function () {
                    return "register/"
                }, LOGIN_URL: function () {
                    return "token-auth/"
                }, GROUPS_URL: function () {
                    return "groups/"
                }, SUBJECT_URL: function () {
                    return "subjects/"
                }, TESTS_URL: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                    return "tests/?lab=".concat(t, "&lecture=").concat(e)
                }, TEST_DETAIL_URL: function (e) {
                    return "tests/".concat(e)
                }, CONNECT_URL: function () {
                    return "connect/"
                }, DISCONNECT_URL: function () {
                    return "disconnect/"
                }, EXEC_COMMAND: function (e) {
                    return "exec-command/?id=".concat(e)
                }, DEVICES_URL: function () {
                    return "devices/"
                }, COMMANDS_URL: function (e) {
                    return "commands/?search=".concat(e)
                }, CREATE_TEACHER: function () {
                    return "create-teacher/"
                }, SUBJECT_DETAIL_URL: function (e) {
                    return "subjects/".concat(e, "/")
                }, FOLDERS_URL: function (e) {
                    return "folders/?semester=".concat(e)
                }, FILES_URL: function (e) {
                    return "files/?folder=".concat(e)
                }, LECTURES_URL: function (e) {
                    return "lectures/?semester=".concat(e)
                }, LABS_URL: function (e) {
                    return "labs/?semester=".concat(e)
                }, TEST_RESULTS_URL: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                    return "tests-results/?test=".concat(e, "&student__group=").concat(t, "&student=").concat(n)
                }, TEST_RESULT_URL: function (e) {
                    return "tests-results/".concat(e)
                }, STUDENTS_URL: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    return "users/?group=".concat(e, "&role=1")
                }, WEB_URL: function () {
                    return "web-gns/"
                }, SEMESTERS_URL: function (e) {
                    return "semesters/?subject=".concat(e)
                }, install: function (e) {
                    e.prototype.$getConst = function (e) {
                        return bt[e]
                    }
                }
            }, ht = bt;
        it["c"].add(lt["c"], ct["b"], lt["a"], ct["i"], ct["k"], ct["g"], ct["f"], ct["n"], ct["m"], ct["l"], lt["b"], ct["c"], ct["h"], ct["j"], ct["e"], ct["d"], ct["a"]), s["default"].use(dt["a"]), s["default"].use(mt["a"]), s["default"].use(g.a, {position: "top-right"}), s["default"].use(pt.a), s["default"].use(ht), ot.beforeEach((function (e, t, n) {
            e.matched.some((function (e) {
                return e.meta.requiresAuth
            })) ? localStorage.token ? n() : n({name: "login"}) : n()
        })), s["default"].component("font-awesome-icon", ut["a"]), s["default"].use(v["a"]), s["default"].config.productionTip = !1, new s["default"]({
            render: function (e) {
                return e(h)
            }, router: ot
        }).$mount("#app")
    }, "58e4": function (e, t, n) {
    }, "5dbf": function (e, t, n) {
        "use strict";
        n("4ced")
    }, 6751: function (e, t, n) {
        "use strict";
        n("b494")
    }, "85ec": function (e, t, n) {
    }, a837: function (e, t, n) {
    }, afd5: function (e, t, n) {
    }, b494: function (e, t, n) {
    }, cbc6: function (e, t, n) {
        "use strict";
        n("3162")
    }, cd74: function (e, t, n) {
        "use strict";
        n("58e4")
    }, cd7d: function (e, t, n) {
        "use strict";
        n("22ce")
    }, dc4e: function (e, t, n) {
    }, ec16: function (e, t, n) {
    }, ecf3: function (e, t, n) {
        "use strict";
        n("4067")
    }, f30e: function (e, t, n) {
        "use strict";
        n("0ea0")
    }, fa24: function (e, t, n) {
    }
});
//# sourceMappingURL=app.3081b92d.js.map
