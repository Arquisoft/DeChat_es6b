(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_popup_login_popup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login-popup/login-popup.component */ "./src/app/login-popup/login-popup.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./card/card.component */ "./src/app/card/card.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/solid.auth.service */ "./src/app/services/solid.auth.service.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/auth.guard.service */ "./src/app/services/auth.guard.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/chat/chat.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// Services








var routes = [
    {
        path: '',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"]
    },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"]
    },
    {
        path: 'login-popup',
        component: _login_popup_login_popup_component__WEBPACK_IMPORTED_MODULE_4__["LoginPopupComponent"]
    },
    {
        path: 'dashboard',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
        canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]],
    },
    {
        path: 'card',
        component: _card_card_component__WEBPACK_IMPORTED_MODULE_6__["CardComponent"],
        canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]],
    },
    {
        path: 'register',
        component: _register_register_component__WEBPACK_IMPORTED_MODULE_12__["RegisterComponent"]
    },
    {
        path: 'chat',
        component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _login_popup_login_popup_component__WEBPACK_IMPORTED_MODULE_4__["LoginPopupComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
                _card_card_component__WEBPACK_IMPORTED_MODULE_6__["CardComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_12__["RegisterComponent"],
                _chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes),
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_10__["NgSelectModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_13__["ToastrModule"].forRoot(),
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__["BrowserAnimationsModule"] //required for toastr
            ],
            providers: [_services_solid_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/card/card.component.css":
/*!*****************************************!*\
  !*** ./src/app/card/card.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".profile-container {\r\n  font-family: 'Roboto', sans-serif;\r\n}\r\n\r\n.profile-container h1 {\r\n  font-size: 24px;\r\n  color: #7C55FB;\r\n  font-weight: bold;\r\n  line-height: 32px;\r\n  letter-spacing: 1.2px;\r\n  text-align: center;\r\n  margin-top: 82px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.profile-fields-container {\r\n  max-width: 740px;\r\n  min-height: 500px;\r\n  margin: 0 auto;\r\n  border: 1px solid #ccc;\r\n  box-shadow: #ccc 1px 1px 4px;\r\n  position: relative;\r\n}\r\n\r\n.profile-fields-container .profile-image-container {\r\n  height: 200px;\r\n  width: 100%;\r\n  background-size: cover !important;\r\n  background: url('/assets/images/Solid_Pattern.png');\r\n}\r\n\r\n.profile-fields-container .profile-image-container img {\r\n  height: 128px;\r\n  border-radius: 50%;\r\n  margin-left: auto;\r\n  margin-right:auto;\r\n  position: relative;\r\n  top:40px;\r\n  display: block;\r\n}\r\n\r\n.profile-fields-container i {\r\n  font-size: 14px;\r\n  color: #89969F;\r\n  padding-left: 26px;\r\n  padding-right: 10px;\r\n  margin-top: 24px;\r\n}\r\n\r\n.profile-fields-container input[type=text].field-text {\r\n  height: 12px;\r\n  width: 280px;\r\n  border: 1px solid #89969F;\r\n  border-radius: 4px;\r\n  padding: 10px;\r\n}\r\n\r\n.profile-fields-container input[type=text].field-text::-webkit-input-placeholder {\r\n  color: rgba(102,102,102,0.2);\r\n}\r\n\r\n.profile-fields-container input[type=text].field-text:-ms-input-placeholder {\r\n  color: rgba(102,102,102,0.2);\r\n}\r\n\r\n.profile-fields-container input[type=text].field-text::-ms-input-placeholder {\r\n  color: rgba(102,102,102,0.2);\r\n}\r\n\r\n.profile-fields-container input[type=text].field-text::placeholder {\r\n  color: rgba(102,102,102,0.2);\r\n}\r\n\r\n.profile-save-button-container {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-bottom: auto;\r\n  height: 100px;\r\n  flex-direction: column;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.profile-save-button {\r\n  background-color: #7C55FB;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  width: 280px;\r\n}\r\n\r\n.profile-save-button:disabled {\r\n  background-color: #F0EEEB;\r\n  border-color: #F0EEEB;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.topnav {\r\n  position:absolute;\r\n  top:0;\r\n  left:0;\r\n  width: 100%;\r\n  background-color: #7C4DFF;\r\n  height: 50px;\r\n  color: #fff;\r\n}\r\n\r\n.topnav .logo {\r\n  display: inline-block;\r\n  font-family: 'Roboto Slab', serif;\r\n  font-size: 24px;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  line-height: 32px;\r\n  padding-right: 80px;\r\n  position: relative;\r\n  top: -8px;\r\n  left: 28px;\r\n}\r\n\r\n.topnav .menu-item {\r\n  display: inline-block;\r\n  font-size: 10px;\r\n  line-height: 13px;\r\n  width: 100px;\r\n  height: 100%;\r\n  text-align: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.topnav .menu-item i {\r\n  font-size: 24px;\r\n  margin-top:8px;\r\n  margin-bottom: 2px;\r\n}\r\n\r\n.topnav .profile-menu {\r\n  float: right;\r\n  display: inline-block;\r\n  width: 50px;\r\n  height: 50px;\r\n  background-color: rgba(0,0,0,0.25);\r\n}\r\n\r\n.topnav .profile-menu img {\r\n  display: block;\r\n  height: 30px;\r\n  width: 30px;\r\n  border-radius: 50%;\r\n  margin: 0 auto;\r\n  margin-top:10px;\r\n  cursor: pointer;\r\n}\r\n\r\n.loading-image {\r\n  text-align: center;\r\n  margin-top: 50px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2FyZC9jYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLDRCQUE0QjtFQUM1QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLGlDQUFpQztFQUNqQyxtREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRkE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRkE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRkE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLEtBQUs7RUFDTCxNQUFNO0VBQ04sV0FBVztFQUNYLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGlDQUFpQztFQUNqQyxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsVUFBVTtBQUNaOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsZUFBZTtFQUNmLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvY2FyZC9jYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZmlsZS1jb250YWluZXIge1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLnByb2ZpbGUtY29udGFpbmVyIGgxIHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgY29sb3I6ICM3QzU1RkI7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbGluZS1oZWlnaHQ6IDMycHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDEuMnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiA4MnB4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbn1cclxuXHJcbi5wcm9maWxlLWZpZWxkcy1jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogNzQwcHg7XHJcbiAgbWluLWhlaWdodDogNTAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3gtc2hhZG93OiAjY2NjIDFweCAxcHggNHB4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnByb2ZpbGUtZmllbGRzLWNvbnRhaW5lciAucHJvZmlsZS1pbWFnZS1jb250YWluZXIge1xyXG4gIGhlaWdodDogMjAwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlciAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQ6IHVybCgnL2Fzc2V0cy9pbWFnZXMvU29saWRfUGF0dGVybi5wbmcnKTtcclxufVxyXG5cclxuLnByb2ZpbGUtZmllbGRzLWNvbnRhaW5lciAucHJvZmlsZS1pbWFnZS1jb250YWluZXIgaW1nIHtcclxuICBoZWlnaHQ6IDEyOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6YXV0bztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOjQwcHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi5wcm9maWxlLWZpZWxkcy1jb250YWluZXIgaSB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGNvbG9yOiAjODk5NjlGO1xyXG4gIHBhZGRpbmctbGVmdDogMjZweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gIG1hcmdpbi10b3A6IDI0cHg7XHJcbn1cclxuXHJcbi5wcm9maWxlLWZpZWxkcy1jb250YWluZXIgaW5wdXRbdHlwZT10ZXh0XS5maWVsZC10ZXh0IHtcclxuICBoZWlnaHQ6IDEycHg7XHJcbiAgd2lkdGg6IDI4MHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICM4OTk2OUY7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbn1cclxuXHJcbi5wcm9maWxlLWZpZWxkcy1jb250YWluZXIgaW5wdXRbdHlwZT10ZXh0XS5maWVsZC10ZXh0OjpwbGFjZWhvbGRlciB7XHJcbiAgY29sb3I6IHJnYmEoMTAyLDEwMiwxMDIsMC4yKTtcclxufVxyXG5cclxuLnByb2ZpbGUtc2F2ZS1idXR0b24tY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogYXV0bztcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxufVxyXG5cclxuLnByb2ZpbGUtc2F2ZS1idXR0b24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM3QzU1RkI7XHJcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gIHdpZHRoOiAyODBweDtcclxufVxyXG5cclxuLnByb2ZpbGUtc2F2ZS1idXR0b246ZGlzYWJsZWQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNGMEVFRUI7XHJcbiAgYm9yZGVyLWNvbG9yOiAjRjBFRUVCO1xyXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbn1cclxuXHJcbi50b3BuYXYge1xyXG4gIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gIHRvcDowO1xyXG4gIGxlZnQ6MDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN0M0REZGO1xyXG4gIGhlaWdodDogNTBweDtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLnRvcG5hdiAubG9nbyB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIFNsYWInLCBzZXJpZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBsaW5lLWhlaWdodDogMzJweDtcclxuICBwYWRkaW5nLXJpZ2h0OiA4MHB4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IC04cHg7XHJcbiAgbGVmdDogMjhweDtcclxufVxyXG5cclxuLnRvcG5hdiAubWVudS1pdGVtIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxM3B4O1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnRvcG5hdiAubWVudS1pdGVtIGkge1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tdG9wOjhweDtcclxuICBtYXJnaW4tYm90dG9tOiAycHg7XHJcbn1cclxuXHJcbi50b3BuYXYgLnByb2ZpbGUtbWVudSB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB3aWR0aDogNTBweDtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwLjI1KTtcclxufVxyXG5cclxuLnRvcG5hdiAucHJvZmlsZS1tZW51IGltZyB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIHdpZHRoOiAzMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBtYXJnaW4tdG9wOjEwcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ubG9hZGluZy1pbWFnZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDUwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/card/card.component.html":
/*!******************************************!*\
  !*** ./src/app/card/card.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"profile-container\">\r\n  <!-- EXAMPLE TOP NAV -->\r\n  <div class=\"topnav\">\r\n    <div class=\"logo\">Solid</div>\r\n    <div class=\"menu-item\">\r\n      <div>\r\n        <i class=\"far fa-compass\"></i>\r\n      </div>\r\n      Explore\r\n    </div>\r\n    <div class=\"menu-item\" (click)=\"loadChat()\">\r\n      <div>\r\n        <i class=\"far fa-comment\"></i>\r\n      </div>\r\n      Chat\r\n    </div>\r\n    <div class=\"menu-item\">\r\n      <div>\r\n        <i class=\"fas fa-sliders-h\"></i>\r\n      </div>\r\n      Settings\r\n    </div>\r\n\r\n    <div class=\"profile-menu\" (click)=\"logout()\">\r\n      <img [src]=\"profileImage\" />\r\n    </div>\r\n  </div>\r\n  <h1>Profile</h1>\r\n\r\n  <!-- LOADING IMAGE -->\r\n  <div class=\"loading-image\" *ngIf=\"loadingProfile\">\r\n    <i class=\"fas fa-circle-notch fa-4x fa-spin\"></i>\r\n  </div>\r\n\r\n  <!-- MAIN PROFILE -->\r\n  <div class=\"profile-fields-container\" *ngIf=\"!loadingProfile\">\r\n    <div class=\"profile-image-container\">\r\n      <img [src]=\"profileImage\" />\r\n    </div>\r\n    <form style=\"padding-top: 26px;\" #f=\"ngForm\" (submit)=\"onSubmit()\">\r\n      <div class=\"fields pure-g\">\r\n        <!-- NAME -->\r\n        <div class=\"pure-u-1-1 pure-u-md-1-2 form-group\">\r\n          <i class=\"fas fa-user\"></i> <input type=\"text\" class=\"field-text form-control\" name=\"fn\" placeholder=\"NAME\" [(ngModel)]=\"profile.fn\" />\r\n        </div>\r\n\r\n        <!-- PHONE -->\r\n        <div class=\"pure-u-1-1 pure-u-md-1-2 form-group\">\r\n          <i class=\"fas fa-phone\"></i><input type=\"text\" class=\"field-text form-control\" name=\"phone\" placeholder=\"PHONE\" [(ngModel)]=\"profile.phone\" />\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"fields pure-g\">\r\n        <!-- ROLE -->\r\n        <div class=\"pure-u-1-1 pure-u-md-1-2 form-group\">\r\n          <i class=\"fas fa-user-astronaut\"></i> <input type=\"text\" class=\"field-text form-control\" name=\"role\" placeholder=\"ROLE\" [(ngModel)]=\"profile.role\" />\r\n        </div>\r\n\r\n        <!-- EMAIL -->\r\n        <div class=\"pure-u-1-1 pure-u-md-1-2 form-group\">\r\n          <i class=\"fas fa-envelope\"></i><input type=\"text\" class=\"field-text form-control\" name=\"email\" placeholder=\"EMAIL\" [(ngModel)]=\"profile.email\" />\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"fields pure-g\">\r\n        <!-- ORGANIZATION -->\r\n        <div class=\"pure-u-1-1 pure-u-md-1-2 form-group\">\r\n          <i class=\"fas fa-building\"></i> <input type=\"text\" class=\"field-text form-control\" name=\"company\" placeholder=\"ORGANIZATION\" [(ngModel)]=\"profile.company\" />\r\n        </div>\r\n\r\n        <!-- ADDRESS -->\r\n        <div class=\"pure-u-1-1 pure-u-md-1-2 form-group\">\r\n          <i class=\"fas fa-map-marker-alt\" style=\"width: 12px; margin-left: 2px;\"></i><input type=\"text\" class=\"field-text form-control\" name=\"address\" placeholder=\"ADDRESS\" [(ngModel)]=\"profile.address.street\" />\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"profile-save-button-container\">\r\n        <button type=\"submit\" class=\"wide-button profile-save-button\" [disabled]=\"!cardForm || cardForm.pristine\">Save</button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/card/card.component.ts":
/*!****************************************!*\
  !*** ./src/app/card/card.component.ts ***!
  \****************************************/
/*! exports provided: CardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return CardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_rdf_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/rdf.service */ "./src/app/services/rdf.service.ts");
/* harmony import */ var _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/solid.auth.service */ "./src/app/services/solid.auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var CardComponent = /** @class */ (function () {
    function CardComponent(rdf, route, auth, router) {
        this.rdf = rdf;
        this.route = route;
        this.auth = auth;
        this.router = router;
    }
    CardComponent.prototype.ngOnInit = function () {
        this.loadingProfile = true;
        this.loadProfile();
        // Clear cached profile data
        // TODO: Remove this code and find a better way to get the old data
        localStorage.removeItem('oldProfileData');
    };
    // Loads the profile from the rdf service and handles the response
    CardComponent.prototype.loadProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var profile, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.loadingProfile = true;
                        return [4 /*yield*/, this.rdf.getProfile()];
                    case 1:
                        profile = _a.sent();
                        if (profile) {
                            this.profile = profile;
                            this.auth.saveOldUserData(profile);
                        }
                        this.loadingProfile = false;
                        this.setupProfileData();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Error: " + error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Loads Solid chat from chat package
    CardComponent.prototype.loadChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.router.navigateByUrl('/chat');
                }
                catch (err) {
                    console.log("Error: " + err);
                }
                return [2 /*return*/];
            });
        });
    };
    CardComponent.prototype.loadFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list_friends, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.rdf.getFriends()];
                    case 1:
                        list_friends = _a.sent();
                        if (list_friends)
                            this.amigos = list_friends;
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log("Error: " + error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Submits the form, and saves the profile data using the auth/rdf service
    CardComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.cardForm.invalid) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.rdf.updateProfile(this.cardForm)];
                    case 2:
                        _a.sent();
                        localStorage.setItem('oldProfileData', JSON.stringify(this.profile));
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log("Error: " + err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Format data coming back from server. Intended purpose is to replace profile image with default if it's missing
    // and potentially format the address if we need to reformat it for this UI
    CardComponent.prototype.setupProfileData = function () {
        if (this.profile) {
            this.profileImage = this.profile.image ? this.profile.image : '/assets/images/profile.png';
        }
        else {
            this.profileImage = '/assets/images/profile.png';
        }
    };
    // Example of logout functionality. Normally wouldn't be triggered by clicking the profile picture.
    CardComponent.prototype.logout = function () {
        this.auth.solidSignOut();
        //deberia abrir un menu contextual con una opción de desconectar
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('f'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"])
    ], CardComponent.prototype, "cardForm", void 0);
    CardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-card',
            template: __webpack_require__(/*! ./card.component.html */ "./src/app/card/card.component.html"),
            styles: [__webpack_require__(/*! ./card.component.css */ "./src/app/card/card.component.css")]
        }),
        __metadata("design:paramtypes", [_services_rdf_service__WEBPACK_IMPORTED_MODULE_3__["RdfService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], CardComponent);
    return CardComponent;
}());



/***/ }),

/***/ "./src/app/chat/chat.component.css":
/*!*****************************************!*\
  !*** ./src/app/chat/chat.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\nh2[id=\"DeChatTitle\"] {\r\n  font-family: 'Roboto Slab', serif;\r\n  font-size: 24px;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  margin-top: 10px; \r\n  color: #7C4DFF;\r\n}\r\n.container{max-width:92%; height: 90vh; margin:auto;}\r\nimg { \r\n  max-width:100%;\r\n  border-radius: 150px;\r\n}\r\n.inbox_people {\r\n  background: #f8f8f8 none repeat scroll 0 0;\r\n  overflow: hidden;\r\n  width: 35%; \r\n  border-right:1px solid #c4c4c4;\r\n}\r\n.inbox_people, .mesgs {\r\n  height: 100%;\r\n  float: left;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n}\r\n.inbox_msg {\r\n  border: 1px solid #c4c4c4;\r\n  clear: both;\r\n  overflow: hidden;\r\n  height: 100%;\r\n}\r\n.top_spac{ margin: 20px 0 0;}\r\n.recent_heading {\r\n  float: left;\r\n  width:40%;\r\n}\r\n.srch_bar {\r\n  display: inline-block;\r\n  text-align: right;\r\n  width: 60%;\r\n}\r\n.headind_srch{ \r\n  padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;\r\n  min-height: 50px;\r\n  height: 6%;\r\n}\r\n.recent_heading h4 {\r\n  color: #7C4DFF;\r\n  font-family: 'Roboto Slab', serif;\r\n  font-size: 21px;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  margin: auto;\r\n}\r\n.search-bar:focus { outline:0 !important; }\r\n.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}\r\n.srch_bar .input-group-addon button {\r\n  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;\r\n  border: medium none;\r\n  padding: 0;\r\n  color: #707070;\r\n  font-size: 18px;\r\n}\r\n.srch_bar .input-group-addon { margin: 0 0 0 -27px;}\r\n.lens:active { box-shadow: 0px 1px 1px 0px black; }\r\n.lens:focus { outline:0 !important; }\r\n.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}\r\n.chat_ib h5 span{ font-size:13px; float:right;}\r\n.chat_ib p{ font-size:14px; color:#989898; margin:auto; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}\r\n.chat_img {\r\n  float: left;\r\n  width: 11%;\r\n}\r\n.chat_ib {\r\n  float: left;\r\n  padding: 0 0 0 15px;\r\n  width: 88%;\r\n}\r\n.chat_people{ overflow:hidden; clear:both; cursor: pointer;}\r\n.chat_people:hover{ background-color: rgb(186, 161, 255); }\r\n.chat_people:active { box-shadow: 0px 1px 1px 0px black; }\r\n.chat_list {\r\n  border-bottom: 1px solid #c4c4c4;\r\n  margin: 0;\r\n  padding: 18px 16px 10px;\r\n}\r\n.inbox_chat { flex: 1; overflow-y: scroll;}\r\n.active_chat{ background:#ebebeb;}\r\n.incoming_msg {\r\n  margin: 10px 0;\r\n}\r\n.incoming_msg_img {\r\n  display: inline-block;\r\n  width: 6%;\r\n}\r\n.received_msg {\r\n  display: inline-block;\r\n  padding: 0 0 0 10px;\r\n  vertical-align: top;\r\n  width: 92%;\r\n }\r\n.received_withd_msg p {\r\n  background: #ebebeb none repeat scroll 0 0;\r\n  border-radius: 3px;\r\n  color: #646464;\r\n  font-size: 14px;\r\n  margin: 0;\r\n  padding: 5px 10px 5px 12px;\r\n  width: 100%;\r\n  overflow-wrap: break-word;\r\n}\r\n.time_date {\r\n  color: #747474;\r\n  display: block;\r\n  font-size: 12px;\r\n  margin: 8px 0 0;\r\n}\r\n.received_withd_msg { width: 57%; }\r\n.mesgs {\r\n  padding: 30px 15px 0 25px;\r\n  width: 65%;\r\n}\r\n.sent_msg p {\r\n  background: #7C4DFF none repeat scroll 0 0;\r\n  border-radius: 3px;\r\n  font-size: 14px;\r\n  margin: 0; color:#fff;\r\n  padding: 5px 10px 5px 12px;\r\n  width:98%;\r\n  height: 100%;\r\n  overflow-wrap: break-word;\r\n}\r\n.outgoing_msg{overflow:hidden; margin: 10px 0;}\r\n.sent_msg {\r\n  float: right;\r\n  width: 46%;\r\n}\r\n.input_msg_write input {\r\n  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;\r\n  padding: 2px 0 4px 6px;\r\n  border: medium none;\r\n  color: #4c4c4c;\r\n  font-size: 15px;\r\n  min-height: 48px;\r\n  width: 100%;\r\n}\r\n.write_msg:focus { \r\n  outline:0 !important; \r\n}\r\n.type_msg {\r\n  border-top: 1px solid #c4c4c4;\r\n  position: relative;\r\n  min-height: 50px;\r\n  height: 7%;\r\n}\r\n.msg_send_btn {\r\n  background: #7C4DFF none repeat scroll 0 0;\r\n  border: medium none;\r\n  border-radius: 50%;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  font-size: 17px;\r\n  height: 33px;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 11px;\r\n  width: 33px;\r\n}\r\n.msg_send_btn:focus { \r\n  outline:0 !important; \r\n}\r\n.msg_send_btn:hover {\r\n\tbackground-color: rgb(67, 41, 138);\r\n}\r\n.msg_send_btn:active {\r\n  box-shadow: 0px 1px 1px 0px black;\r\n}\r\n.messaging { \r\n  padding: 0 0 50px 0;\r\n  height: 100%;\r\n}\r\n.msg_history {\r\n  height: 100%;\r\n  flex: 1;\r\n  overflow-y: auto;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hhdC9jaGF0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0VBQ0UsaUNBQWlDO0VBQ2pDLGVBQWU7RUFDZixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCO0FBQ0EsV0FBVyxhQUFhLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQztBQUNwRDtFQUNFLGNBQWM7RUFDZCxvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLDBDQUEwQztFQUMxQyxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsWUFBWTtBQUNkO0FBQ0EsV0FBVyxnQkFBZ0IsQ0FBQztBQUM1QjtFQUNFLFdBQVc7RUFDWCxTQUFTO0FBQ1g7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIsVUFBVTtBQUNaO0FBQ0E7RUFDRSwyQkFBMkIsRUFBRSxlQUFlLEVBQUUsK0JBQStCO0VBQzdFLGdCQUFnQjtFQUNoQixVQUFVO0FBQ1o7QUFDQTtFQUNFLGNBQWM7RUFDZCxpQ0FBaUM7RUFDakMsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQix5QkFBeUI7RUFDekIsWUFBWTtBQUNkO0FBQ0Esb0JBQW9CLG9CQUFvQixFQUFFO0FBQzFDLGlCQUFpQix3QkFBd0IsRUFBRSxzQkFBc0IsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxDQUFDO0FBQ3JIO0VBQ0UsbURBQW1EO0VBQ25ELG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsY0FBYztFQUNkLGVBQWU7QUFDakI7QUFDQSwrQkFBK0IsbUJBQW1CLENBQUM7QUFDbkQsZUFBZSxpQ0FBaUMsRUFBRTtBQUNsRCxjQUFjLG9CQUFvQixFQUFFO0FBRXBDLGFBQWEsY0FBYyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQztBQUM3RCxrQkFBa0IsY0FBYyxFQUFFLFdBQVcsQ0FBQztBQUM5QyxZQUFZLGNBQWMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDO0FBQ3ZIO0VBQ0UsV0FBVztFQUNYLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixVQUFVO0FBQ1o7QUFFQSxjQUFjLGVBQWUsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDO0FBQzNELG9CQUFvQixvQ0FBb0MsRUFBRTtBQUMxRCxzQkFBc0IsaUNBQWlDLEVBQUU7QUFDekQ7RUFDRSxnQ0FBZ0M7RUFDaEMsU0FBUztFQUNULHVCQUF1QjtBQUN6QjtBQUNBLGNBQWMsT0FBTyxFQUFFLGtCQUFrQixDQUFDO0FBRTFDLGNBQWMsa0JBQWtCLENBQUM7QUFFakM7RUFDRSxjQUFjO0FBQ2hCO0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsU0FBUztBQUNYO0FBQ0E7RUFDRSxxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixVQUFVO0NBQ1g7QUFDQTtFQUNDLDBDQUEwQztFQUMxQyxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGVBQWU7RUFDZixTQUFTO0VBQ1QsMEJBQTBCO0VBQzFCLFdBQVc7RUFDWCx5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLGNBQWM7RUFDZCxjQUFjO0VBQ2QsZUFBZTtFQUNmLGVBQWU7QUFDakI7QUFDQSxzQkFBc0IsVUFBVSxFQUFFO0FBQ2xDO0VBQ0UseUJBQXlCO0VBQ3pCLFVBQVU7QUFDWjtBQUNDO0VBQ0MsMENBQTBDO0VBQzFDLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsU0FBUyxFQUFFLFVBQVU7RUFDckIsMEJBQTBCO0VBQzFCLFNBQVM7RUFDVCxZQUFZO0VBQ1oseUJBQXlCO0FBQzNCO0FBQ0EsY0FBYyxlQUFlLEVBQUUsY0FBYyxDQUFDO0FBQzlDO0VBQ0UsWUFBWTtFQUNaLFVBQVU7QUFDWjtBQUNBO0VBQ0UsbURBQW1EO0VBQ25ELHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVztBQUNiO0FBQ0E7RUFDRSxvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLDZCQUE2QjtFQUM3QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFVBQVU7QUFDWjtBQUNBO0VBQ0UsMENBQTBDO0VBQzFDLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGVBQWU7RUFDZixlQUFlO0VBQ2YsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULFdBQVc7QUFDYjtBQUNBO0VBQ0Usb0JBQW9CO0FBQ3RCO0FBQ0E7Q0FDQyxrQ0FBa0M7QUFDbkM7QUFDQTtFQUNFLGlDQUFpQztBQUNuQztBQUNBO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDtBQUNBO0VBQ0UsWUFBWTtFQUNaLE9BQU87RUFDUCxnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9jaGF0L2NoYXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5oMltpZD1cIkRlQ2hhdFRpdGxlXCJdIHtcclxuICBmb250LWZhbWlseTogJ1JvYm90byBTbGFiJywgc2VyaWY7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgbWFyZ2luLXRvcDogMTBweDsgXHJcbiAgY29sb3I6ICM3QzRERkY7XHJcbn1cclxuLmNvbnRhaW5lcnttYXgtd2lkdGg6OTIlOyBoZWlnaHQ6IDkwdmg7IG1hcmdpbjphdXRvO31cclxuaW1nIHsgXHJcbiAgbWF4LXdpZHRoOjEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTUwcHg7XHJcbn1cclxuLmluYm94X3Blb3BsZSB7XHJcbiAgYmFja2dyb3VuZDogI2Y4ZjhmOCBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2lkdGg6IDM1JTsgXHJcbiAgYm9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjYzRjNGM0O1xyXG59XHJcbi5pbmJveF9wZW9wbGUsIC5tZXNncyB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4uaW5ib3hfbXNnIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjYzRjNGM0O1xyXG4gIGNsZWFyOiBib3RoO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi50b3Bfc3BhY3sgbWFyZ2luOiAyMHB4IDAgMDt9XHJcbi5yZWNlbnRfaGVhZGluZyB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgd2lkdGg6NDAlO1xyXG59XHJcbi5zcmNoX2JhciB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gIHdpZHRoOiA2MCU7XHJcbn1cclxuLmhlYWRpbmRfc3JjaHsgXHJcbiAgcGFkZGluZzoxMHB4IDI5cHggMTBweCAyMHB4OyBvdmVyZmxvdzpoaWRkZW47IGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNjNGM0YzQ7XHJcbiAgbWluLWhlaWdodDogNTBweDtcclxuICBoZWlnaHQ6IDYlO1xyXG59XHJcbi5yZWNlbnRfaGVhZGluZyBoNCB7XHJcbiAgY29sb3I6ICM3QzRERkY7XHJcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gU2xhYicsIHNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMjFweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG4uc2VhcmNoLWJhcjpmb2N1cyB7IG91dGxpbmU6MCAhaW1wb3J0YW50OyB9XHJcbi5zcmNoX2JhciBpbnB1dHsgYm9yZGVyOjFweCBzb2xpZCAjY2RjZGNkOyBib3JkZXItd2lkdGg6MCAwIDFweCAwOyB3aWR0aDo4MCU7IHBhZGRpbmc6MnB4IDAgNHB4IDZweDsgYmFja2dyb3VuZDpub25lO31cclxuLnNyY2hfYmFyIC5pbnB1dC1ncm91cC1hZGRvbiBidXR0b24ge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMCkgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcclxuICBib3JkZXI6IG1lZGl1bSBub25lO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgY29sb3I6ICM3MDcwNzA7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcbi5zcmNoX2JhciAuaW5wdXQtZ3JvdXAtYWRkb24geyBtYXJnaW46IDAgMCAwIC0yN3B4O31cclxuLmxlbnM6YWN0aXZlIHsgYm94LXNoYWRvdzogMHB4IDFweCAxcHggMHB4IGJsYWNrOyB9XHJcbi5sZW5zOmZvY3VzIHsgb3V0bGluZTowICFpbXBvcnRhbnQ7IH1cclxuXHJcbi5jaGF0X2liIGg1eyBmb250LXNpemU6MTVweDsgY29sb3I6IzQ2NDY0NjsgbWFyZ2luOjAgMCA4cHggMDt9XHJcbi5jaGF0X2liIGg1IHNwYW57IGZvbnQtc2l6ZToxM3B4OyBmbG9hdDpyaWdodDt9XHJcbi5jaGF0X2liIHB7IGZvbnQtc2l6ZToxNHB4OyBjb2xvcjojOTg5ODk4OyBtYXJnaW46YXV0bzsgb3ZlcmZsb3c6IGhpZGRlbjsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7fVxyXG4uY2hhdF9pbWcge1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG4gIHdpZHRoOiAxMSU7XHJcbn1cclxuLmNoYXRfaWIge1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG4gIHBhZGRpbmc6IDAgMCAwIDE1cHg7XHJcbiAgd2lkdGg6IDg4JTtcclxufVxyXG5cclxuLmNoYXRfcGVvcGxleyBvdmVyZmxvdzpoaWRkZW47IGNsZWFyOmJvdGg7IGN1cnNvcjogcG9pbnRlcjt9XHJcbi5jaGF0X3Blb3BsZTpob3ZlcnsgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NiwgMTYxLCAyNTUpOyB9XHJcbi5jaGF0X3Blb3BsZTphY3RpdmUgeyBib3gtc2hhZG93OiAwcHggMXB4IDFweCAwcHggYmxhY2s7IH1cclxuLmNoYXRfbGlzdCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjNGM0YzQ7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDE4cHggMTZweCAxMHB4O1xyXG59XHJcbi5pbmJveF9jaGF0IHsgZmxleDogMTsgb3ZlcmZsb3cteTogc2Nyb2xsO31cclxuXHJcbi5hY3RpdmVfY2hhdHsgYmFja2dyb3VuZDojZWJlYmViO31cclxuXHJcbi5pbmNvbWluZ19tc2cge1xyXG4gIG1hcmdpbjogMTBweCAwO1xyXG59XHJcblxyXG4uaW5jb21pbmdfbXNnX2ltZyB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdpZHRoOiA2JTtcclxufVxyXG4ucmVjZWl2ZWRfbXNnIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgcGFkZGluZzogMCAwIDAgMTBweDtcclxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gIHdpZHRoOiA5MiU7XHJcbiB9XHJcbiAucmVjZWl2ZWRfd2l0aGRfbXNnIHAge1xyXG4gIGJhY2tncm91bmQ6ICNlYmViZWIgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgY29sb3I6ICM2NDY0NjQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiA1cHggMTBweCA1cHggMTJweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xyXG59XHJcbi50aW1lX2RhdGUge1xyXG4gIGNvbG9yOiAjNzQ3NDc0O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBtYXJnaW46IDhweCAwIDA7XHJcbn1cclxuLnJlY2VpdmVkX3dpdGhkX21zZyB7IHdpZHRoOiA1NyU7IH1cclxuLm1lc2dzIHtcclxuICBwYWRkaW5nOiAzMHB4IDE1cHggMCAyNXB4O1xyXG4gIHdpZHRoOiA2NSU7XHJcbn1cclxuIC5zZW50X21zZyBwIHtcclxuICBiYWNrZ3JvdW5kOiAjN0M0REZGIG5vbmUgcmVwZWF0IHNjcm9sbCAwIDA7XHJcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtYXJnaW46IDA7IGNvbG9yOiNmZmY7XHJcbiAgcGFkZGluZzogNXB4IDEwcHggNXB4IDEycHg7XHJcbiAgd2lkdGg6OTglO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xyXG59XHJcbi5vdXRnb2luZ19tc2d7b3ZlcmZsb3c6aGlkZGVuOyBtYXJnaW46IDEwcHggMDt9XHJcbi5zZW50X21zZyB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIHdpZHRoOiA0NiU7XHJcbn1cclxuLmlucHV0X21zZ193cml0ZSBpbnB1dCB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwKSBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xyXG4gIHBhZGRpbmc6IDJweCAwIDRweCA2cHg7XHJcbiAgYm9yZGVyOiBtZWRpdW0gbm9uZTtcclxuICBjb2xvcjogIzRjNGM0YztcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgbWluLWhlaWdodDogNDhweDtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4ud3JpdGVfbXNnOmZvY3VzIHsgXHJcbiAgb3V0bGluZTowICFpbXBvcnRhbnQ7IFxyXG59XHJcbi50eXBlX21zZyB7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjNGM0YzQ7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG1pbi1oZWlnaHQ6IDUwcHg7XHJcbiAgaGVpZ2h0OiA3JTtcclxufVxyXG4ubXNnX3NlbmRfYnRuIHtcclxuICBiYWNrZ3JvdW5kOiAjN0M0REZGIG5vbmUgcmVwZWF0IHNjcm9sbCAwIDA7XHJcbiAgYm9yZGVyOiBtZWRpdW0gbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGZvbnQtc2l6ZTogMTdweDtcclxuICBoZWlnaHQ6IDMzcHg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHRvcDogMTFweDtcclxuICB3aWR0aDogMzNweDtcclxufVxyXG4ubXNnX3NlbmRfYnRuOmZvY3VzIHsgXHJcbiAgb3V0bGluZTowICFpbXBvcnRhbnQ7IFxyXG59XHJcbi5tc2dfc2VuZF9idG46aG92ZXIge1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHJnYig2NywgNDEsIDEzOCk7XHJcbn1cclxuLm1zZ19zZW5kX2J0bjphY3RpdmUge1xyXG4gIGJveC1zaGFkb3c6IDBweCAxcHggMXB4IDBweCBibGFjaztcclxufVxyXG4ubWVzc2FnaW5nIHsgXHJcbiAgcGFkZGluZzogMCAwIDUwcHggMDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuLm1zZ19oaXN0b3J5IHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZmxleDogMTtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/chat/chat.component.html":
/*!******************************************!*\
  !*** ./src/app/chat/chat.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link href=\"//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css\" rel=\"stylesheet\" id=\"bootstrap-css\">\r\n<script src=\"//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js\"></script>\r\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script>\r\n\r\n<html>\r\n<head>\r\n  <link href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css\" type=\"text/css\" rel=\"stylesheet\"/>\r\n</head>\r\n<body>\r\n<div class=\"container\">\r\n<h2 id=\"DeChatTitle\" class=\" text-center\">DeChat</h2>\r\n<div class=\"messaging\">\r\n      <div class=\"inbox_msg\">\r\n        <div class=\"inbox_people\">\r\n          <div class=\"headind_srch\">\r\n            <div class=\"recent_heading\">\r\n              <h4>Recent chats</h4>\r\n            </div>\r\n            <div class=\"srch_bar\">\r\n              <div class=\"stylish-input-group\">\r\n                <input id=input_search type=\"search\" class=\"search-bar\" placeholder=\"Search\" />\r\n                <span class=\"input-group-addon\">\r\n                  <button class=lens type=\"submit\" (click)=search()> <i class=\"fa fa-search\"></i> </button>\r\n                </span> \r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"inbox_chat\">\r\n            <div class=\"chat_list active_chat\" *ngFor=\"let channel of getChatChannels()\">\r\n              <div class=\"chat_people\" (click)=\"setSelectedChatChannel(channel)\">\r\n                <div class=\"chat_img\">\r\n                  <!-- <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIp3zzC4sZwW3OvXpOKxw2_dH3Zn0oNdxGz60tIDFNeEkjKcA8\" alt=\"sunil\"> </div> -->\r\n                  <img [src]=\"imagesChannels[channel.id]\" alt=\"sunil\"> \r\n                </div>\r\n                <div class=\"chat_ib\">\r\n                  <h5 *ngIf=\"!getLastMessage(channel)\"> {{ channel.title }} <span class=\"chat_date\"></span></h5>\r\n                  <h5 *ngIf=\"getLastMessage(channel)\"> {{ channel.title }} <span class=\"chat_date\">{{ getLastMessage(channel).sendTime | date:'LLL d' }}</span></h5>\r\n                  <p> {{ getLastMessageText(channel) }} </p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"type_msg\">\r\n            <div class=\"input_msg_write\">\r\n              <input type=\"text\" class=\"write_msg\" id =\"input_add_webid\" placeholder=\"Type a friend's webid\" />\r\n              <button class=\"msg_send_btn\" type=\"button\" (click)=\"addNewChatChannel()\"><i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"mesgs\">\r\n          <div class=\"msg_history\" #scrollMe [scrollTop]=\"scrollMe.scrollHeight\">\r\n            <div *ngFor=\"let msg of getMessagesSelectedChatChannel()\">\r\n\r\n              <div class=\"incoming_msg\" *ngIf=\"msg.makerWebId != getChatService().webid\">\r\n                <div class=\"incoming_msg_img\"> \r\n                  <!-- <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIp3zzC4sZwW3OvXpOKxw2_dH3Zn0oNdxGz60tIDFNeEkjKcA8\" alt=\"sunil\"> </div> -->\r\n                  <img [src]=\"imagesParticipants[msg.makerWebId]\" alt=\"sunil\"> </div>\r\n                <div class=\"received_msg\">\r\n                  <div class=\"received_withd_msg\">\r\n                    <p>{{ msg.message }}</p>\r\n                    <span class=\"time_date\">{{ msg.sendTime | date:'h:mm a z' }}</span></div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"outgoing_msg\" *ngIf=\"msg.makerWebId == getChatService().webid\">\r\n                <div class=\"sent_msg\" >\r\n                  <p>{{ msg.message }}</p>\r\n                  <span class=\"time_date\">{{ msg.sendTime | date:'h:mm a z' }}</span> </div>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"type_msg\">\r\n            <div class=\"input_msg_write\">\r\n              <input type=\"text\" class=\"write_msg\" id =\"input_text\" placeholder=\"Type a message\" #msgInput (keydown.enter)=\"sendMessage();emptyText();\"/>\r\n              <button class=\"msg_send_btn\" (click)=\"sendMessage()\" (click)=\"emptyText()\" type=\"button\"><i class=\"fa fa-paper-plane-o\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/chat/chat.component.ts":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_rdf_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/rdf.service */ "./src/app/services/rdf.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/solid.auth.service */ "./src/app/services/solid.auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ChatComponent = /** @class */ (function () {
    function ChatComponent(rdf, route, auth, chatService) {
        this.rdf = rdf;
        this.route = route;
        this.auth = auth;
        this.chatService = chatService;
        this.defaultImage = "assets/images/default.jpg";
        this.imagesChannels = {};
        this.imagesParticipants = {};
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.init();
    };
    ChatComponent.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatService.startChat()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setupImages()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatComponent.prototype.getChatService = function () {
        return this.chatService;
    };
    ChatComponent.prototype.messageTime = function (msg) {
        var messageTime = msg.sendTime;
        var h = messageTime.getHours();
        var m = messageTime.getMinutes();
        var s = messageTime.getSeconds();
        return h + ":" + m + ":" + s;
    };
    ChatComponent.prototype.sendMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputElement, msg;
            return __generator(this, function (_a) {
                inputElement = document.getElementById('input_text');
                msg = inputElement.value;
                this.chatService.sendMessage(this.selectedChatChannel, msg);
                return [2 /*return*/];
            });
        });
    };
    ChatComponent.prototype.emptyText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputElement, msg;
            return __generator(this, function (_a) {
                inputElement = document.getElementById('input_text');
                msg = inputElement.value;
                msg = "";
                inputElement.value = msg;
                return [2 /*return*/];
            });
        });
    };
    ChatComponent.prototype.setSelectedChatChannel = function (selectedChatChannel) {
        this.selectedChatChannel = selectedChatChannel;
    };
    ChatComponent.prototype.getMessagesSelectedChatChannel = function () {
        return (this.selectedChatChannel == undefined) ? new Array() : this.selectedChatChannel.messages;
    };
    ChatComponent.prototype.getLastMessage = function (channel) {
        return (channel.messages[channel.messages.length - 1] != undefined) ? (channel.messages[channel.messages.length - 1]) : null;
    };
    ChatComponent.prototype.getLastMessageText = function (channel) {
        return (this.getLastMessage(channel) != null) ? this.getLastMessage(channel).message : "";
    };
    /* getDayAndMonthLastMessage(channel: ChatChannel) {
      let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
      return (this.getLastMessage(channel) != null)? months[new Date(this.getLastMessage(channel).sendTime).getUTCMonth()]
        + " " + (new Date(this.getLastMessage(channel).sendTime).getUTCDay()+1) : "";
    } */
    ChatComponent.prototype.getChatChannels = function () {
        return this.chatService.chatChannels;
    };
    ChatComponent.prototype.addNewChatChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputElement, webid, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputElement = document.getElementById('input_add_webid');
                        webid = inputElement.value;
                        if (!(webid.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.chatService.createNewChatChannel(webid)];
                    case 1:
                        channel = _a.sent();
                        // Cargamos la imagen del nuevo canal
                        this.addImageToImages(channel);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ChatComponent.prototype.search = function () {
        var inputElement = document.getElementById('input_search');
        var name = inputElement.value;
        var newChatChannels = new Array();
        for (var _i = 0, _a = this.chatService.chatChannels; _i < _a.length; _i++) {
            var channel = _a[_i];
            if (channel.participants[0].toLowerCase() === name.toLowerCase() || channel.participants[0].includes(name))
                newChatChannels.push(channel);
        }
        this.chatService.setChatChannels(newChatChannels);
    };
    // Método que carga las imágenes de los canales al inicio y las guarda en un HashMap
    ChatComponent.prototype.setupImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, channel;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.chatService.chatChannels; _i < _a.length; _i++) {
                    channel = _a[_i];
                    this.addImageToImages(channel);
                }
                return [2 /*return*/];
            });
        });
    };
    // Método auxiliar para añadir las imágenes a los HashMap "imagesChannels" e "imagesParticipants"
    ChatComponent.prototype.addImageToImages = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var imageChannelURL, _i, _a, participant, imageParticipantURL;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!channel.participants[0]) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.rdf.getVCardImage(channel.participants[0])];
                    case 1:
                        imageChannelURL = _b.sent();
                        this.imagesChannels[channel.id] = (imageChannelURL.length > 0) ? imageChannelURL : this.defaultImage;
                        _i = 0, _a = channel.participants;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        participant = _a[_i];
                        return [4 /*yield*/, this.rdf.getVCardImage(participant)];
                    case 3:
                        imageParticipantURL = _b.sent();
                        this.imagesParticipants[participant] = (imageParticipantURL.length > 0) ? imageParticipantURL : this.defaultImage;
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! ./chat.component.html */ "./src/app/chat/chat.component.html"),
            styles: [__webpack_require__(/*! ./chat.component.css */ "./src/app/chat/chat.component.css")]
        }),
        __metadata("design:paramtypes", [_services_rdf_service__WEBPACK_IMPORTED_MODULE_2__["RdfService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_chat_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"dashboard\">\r\n  <p>Your webId is {{ session.webId }}</p>\r\n  <ul>\r\n    <li><a [routerLink]=\"['/card']\">Profile</a></li>\r\n    <li><a (click)=\"onSignOut()\">Signout</a></li>\r\n  </ul>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/solid.auth.service */ "./src/app/services/solid.auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// import { currentSession } from 'solid-auth-client';
// Services

var Session = /** @class */ (function () {
    function Session() {
    }
    return Session;
}());
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(auth, route) {
        var _this = this;
        this.auth = auth;
        this.route = route;
        this.session = new Session();
        this.loadSession = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        this.onSignOut = function () {
            _this.auth.solidSignOut();
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log('hello');
        this.loadSession();
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_services_solid_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/login-popup/login-popup.component.css":
/*!*******************************************************!*\
  !*** ./src/app/login-popup/login-popup.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luLXBvcHVwL2xvZ2luLXBvcHVwLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/login-popup/login-popup.component.html":
/*!********************************************************!*\
  !*** ./src/app/login-popup/login-popup.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"app-container\">Loading...</div>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/login-popup/login-popup.component.ts":
/*!******************************************************!*\
  !*** ./src/app/login-popup/login-popup.component.ts ***!
  \******************************************************/
/*! exports provided: LoginPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPopupComponent", function() { return LoginPopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginPopupComponent = /** @class */ (function () {
    function LoginPopupComponent(elementRef) {
        this.elementRef = elementRef;
    }
    LoginPopupComponent.prototype.ngOnInit = function () {
        this.runScript();
    };
    LoginPopupComponent.prototype.runScript = function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '/assets/js/libs/popup.js';
        this.elementRef.nativeElement.appendChild(s);
        // s.onload = () => this.triggerDuo();
    };
    LoginPopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login-popup',
            template: __webpack_require__(/*! ./login-popup.component.html */ "./src/app/login-popup/login-popup.component.html"),
            styles: [__webpack_require__(/*! ./login-popup.component.css */ "./src/app/login-popup/login-popup.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], LoginPopupComponent);
    return LoginPopupComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.login-page {\r\n  text-align: center;\r\n  font-family: 'Roboto', sans-serif;\r\n  color: #666;\r\n}\r\n\r\n.login-page h1 {\r\n  font-size: 38px;\r\n  text-transform: uppercase;\r\n  font-weight: bold;\r\n  line-height: 50px;\r\n  letter-spacing: 1.9px;\r\n  padding-top: 12px;\r\n  margin-top: 0px;\r\n}\r\n\r\n.login-page h2 {\r\n  color: #666;\r\n\r\n  font-size: 16px;\r\n  font-weight: 500;\r\n  letter-spacing: 1px;\r\n  line-height: 21px;\r\n  margin-top: 48px;\r\n}\r\n\r\n.login-page .small-link {\r\n  font-size: 12px;\r\n  color: #666;\r\n  letter-spacing: 0.75px;\r\n  line-height: 16px;\r\n}\r\n\r\n.login-page .registration-link {\r\n  margin-top: 38px;\r\n}\r\n\r\n.login-page .registration-link p {\r\n  font-size: 16px;\r\n  color: #666;\r\n  letter-spacing: 1px;\r\n}\r\n\r\n.login-page .item-divider {\r\n  box-sizing:border-box;\r\n  height: 1px;\r\n  width: 354px;\r\n  border-bottom: 1px solid #E0E0E0;\r\n  position: absolute;\r\n  bottom:-8px; left:-9px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsaUNBQWlDO0VBQ2pDLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXOztFQUVYLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLHNCQUFzQjtFQUN0QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGdDQUFnQztFQUNoQyxrQkFBa0I7RUFDbEIsV0FBVyxFQUFFLFNBQVM7QUFDeEIiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5sb2dpbi1wYWdlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ubG9naW4tcGFnZSBoMSB7XHJcbiAgZm9udC1zaXplOiAzOHB4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbGluZS1oZWlnaHQ6IDUwcHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDEuOXB4O1xyXG4gIHBhZGRpbmctdG9wOiAxMnB4O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxufVxyXG5cclxuLmxvZ2luLXBhZ2UgaDIge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG5cclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xyXG4gIG1hcmdpbi10b3A6IDQ4cHg7XHJcbn1cclxuXHJcbi5sb2dpbi1wYWdlIC5zbWFsbC1saW5rIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNzVweDtcclxuICBsaW5lLWhlaWdodDogMTZweDtcclxufVxyXG5cclxuLmxvZ2luLXBhZ2UgLnJlZ2lzdHJhdGlvbi1saW5rIHtcclxuICBtYXJnaW4tdG9wOiAzOHB4O1xyXG59XHJcblxyXG4ubG9naW4tcGFnZSAucmVnaXN0cmF0aW9uLWxpbmsgcCB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XHJcbn1cclxuXHJcbi5sb2dpbi1wYWdlIC5pdGVtLWRpdmlkZXIge1xyXG4gIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcclxuICBoZWlnaHQ6IDFweDtcclxuICB3aWR0aDogMzU0cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFMEUwRTA7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTotOHB4OyBsZWZ0Oi05cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-page\">\r\n\r\n  <!-- APP LOGO -->\r\n  <div style=\"margin-top:60px;\">\r\n    <i class=\"fab fa-optin-monster\" style=\"font-size: 90px; color:#0040ff;\"></i>\r\n  </div>\r\n\r\n  <!-- APP NAME -->\r\n  <h1 id=\"homeChatTitle\">\r\n    <style>\r\n      h1 { color: #0040ff; }\r\n      </style>\r\n    DECHAT_ES6B\r\n  </h1>\r\n\r\n  <!-- LOGIN TITLE -->\r\n  <h2>\r\n    Login with Solid Identity\r\n  </h2>\r\n\r\n  <!-- PROVIDER SELECTION -->\r\n  <div style=\"margin-top: 10px\">\r\n    <ng-select class=\"login-select\"\r\n               bindLabel=\"name\"\r\n               bindValue=\"loginUrl\"\r\n               placeholder=\"Select ID Provider\"\r\n               dropdownPosition=\"bottom\"\r\n               [items]=\"identityProviders\"\r\n               [(ngModel)]=\"selectedProviderUrl\"\r\n               style=\"width: 360px; height: 48px; margin-left: auto; margin-right: auto;\">\r\n\r\n      <!-- DROPDOWN TEMPLATE -->\r\n      <ng-template ng-option-tmp let-item=\"item\">\r\n        <div style=\"height:40px; padding-top:10px; position: relative;\">\r\n          <img [src]=\"item.image\" style=\"float: left; height: 32px; width: 32px; margin-top:-5px;\" />\r\n          <span style=\"float: left; margin-left: 10px;\">{{ item.name }}</span>\r\n          <div style=\"clear: both;\"></div>\r\n          <div class=\"item-divider\"></div>\r\n        </div>\r\n      </ng-template>\r\n\r\n    </ng-select>\r\n    <input type=\"text\"\r\n           class=\"wide-text\"\r\n           *ngIf=\"selectedProviderUrl===null\"\r\n           placeholder=\"Enter WebID\"\r\n           style=\"margin-top:10px; padding: 12px 10px; width: 340px; height: 16px; display: block; margin-left: auto; margin-right: auto;\"\r\n           [(ngModel)]=\"customProviderUrl\" />\r\n    <button class=\"wide-button\" (click)=\"onLogin()\" *ngIf=\"selectedProviderUrl !== undefined || customProviderUrl !== undefined\" [disabled]=\"selectedProviderUrl===null && !customProviderUrl\" style=\"margin-top:10px;\">Go</button>\r\n  </div>\r\n\r\n  <!-- REGISTRATION -->\r\n  <div class=\"registration-link\">\r\n    <p style=\"margin: 12px;\">Don't have a Solid Identity?</p>\r\n    <button class=\"wide-button\" (click)=\"goToRegistration()\">Register</button>\r\n  </div>\r\n\r\n  <!-- HELP -->\r\n  <div style=\"margin-top: 48px;\">\r\n    <a href=\"https://solid.mit.edu\" target=\"_blank\" class=\"small-link\">\r\n      <i class=\"fas fa-info-circle\"></i> What is a Solid Identity?\r\n    </a>\r\n  </div>\r\n\r\n</div>\r\n  \r\n\r\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/solid.auth.service */ "./src/app/services/solid.auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// Auth Service

var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router) {
        var _this = this;
        this.auth = auth;
        this.router = router;
        /*
        *  Alternate login-popup function for Solid. See service for more details.
        */
        this.onLoginPopup = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.auth.solidLoginPopup();
                return [2 /*return*/];
            });
        }); };
        this.onLogin = function () { return __awaiter(_this, void 0, void 0, function () {
            var idp;
            return __generator(this, function (_a) {
                idp = this.selectedProviderUrl ? this.selectedProviderUrl : this.customProviderUrl;
                if (idp) {
                    try {
                        this.auth.solidLogin(idp);
                    }
                    catch (err) {
                        console.log('An error has occurred logging in: ' + err);
                    }
                }
                return [2 /*return*/];
            });
        }); };
    }
    LoginComponent.prototype.ngOnInit = function () {
        // If we're authenticated, go to profile
        if (localStorage.getItem('solid-auth-client')) {
            this.router.navigateByUrl('/card');
        }
        this.identityProviders = this.auth.getIdentityProviders();
    };
    LoginComponent.prototype.goToRegistration = function () {
        this.router.navigateByUrl('/register');
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_services_solid_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/models/chat-channel.model.ts":
/*!**********************************************!*\
  !*** ./src/app/models/chat-channel.model.ts ***!
  \**********************************************/
/*! exports provided: ChatChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatChannel", function() { return ChatChannel; });
var ChatChannel = /** @class */ (function () {
    function ChatChannel(id, title, created, participants, messages) {
        if (created === void 0) { created = new Date(); }
        if (participants === void 0) { participants = new Array(); }
        if (messages === void 0) { messages = new Array(); }
        this.id = id;
        this.title = title;
        this.created = created;
        this.participants = participants;
        this.messages = messages;
    }
    return ChatChannel;
}());



/***/ }),

/***/ "./src/app/models/message.model.ts":
/*!*****************************************!*\
  !*** ./src/app/models/message.model.ts ***!
  \*****************************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
var Message = /** @class */ (function () {
    function Message(makerWebId, message, sendTime) {
        if (sendTime === void 0) { sendTime = new Date(); }
        // this.id = id;
        this.makerWebId = makerWebId;
        this.message = message;
        this.sendTime = sendTime;
    }
    Message.prototype.toString = function () {
        return this.message;
        // return this.makerWebId + ": " + this.message + ". Enviado: " + this.sendTime.toDateString;
    };
    return Message;
}());



/***/ }),

/***/ "./src/app/register/register.component.css":
/*!*************************************************!*\
  !*** ./src/app/register/register.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".registration {\r\n  text-align: center;\r\n  font-family: 'Roboto', sans-serif;\r\n}\r\n\r\n.registration .header-bar {\r\n  margin: 0px;\r\n  height: 44px;\r\n  width: calc(100% + 16px);\r\n  background-color: #3D6DEB;\r\n  color: #fff;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.registration .header-bar p {\r\n  text-align: center;\r\n  font-family: 'Roboto', sans-serif;\r\n  font-weight: bold;\r\n  font-size: 14px;\r\n  letter-spacing: 1px;\r\n  line-height: 15px;\r\n}\r\n\r\n.registration .header-text {\r\n  margin-top:92px;\r\n  width: 360px;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  font-size: 14px;\r\n  color: #666;\r\n}\r\n\r\n.registration .header-text a {\r\n  color: #666;\r\n  font-size: 12px;\r\n}\r\n\r\n.registration .provider-card-container {\r\n  margin-top: 28px;\r\n}\r\n\r\n.registration .provider-card {\r\n  height: 140px;\r\n  width: 320px;\r\n  border: 1px solid #DAE0E6;\r\n  border-radius: 2px;\r\n  background-color: #fff;\r\n  margin: 10px;\r\n  display: inline-block;\r\n  box-shadow: #DAE0E6 1px 1px 6px;\r\n}\r\n\r\n.registration .provider-card .provider-logo {\r\n  height: 44px;\r\n  width: 44px;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  margin-top: 16px;\r\n}\r\n\r\n.registration .provider-card h2 {\r\n  color: #656E75;\r\n  font-size: 18px;\r\n  margin-top: -2px;\r\n  letter-spacing: 0.9px;\r\n  line-height: 24px;\r\n}\r\n\r\n.registration .provider-card p {\r\n  color: #656E75;\r\n  font-size: 12px;\r\n  line-height: 16px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHdCQUF3QjtFQUN4Qix5QkFBeUI7RUFDekIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztBQUNUOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlDQUFpQztFQUNqQyxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixxQkFBcUI7RUFDckIsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixpQkFBaUI7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJlZ2lzdHJhdGlvbiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLnJlZ2lzdHJhdGlvbiAuaGVhZGVyLWJhciB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgaGVpZ2h0OiA0NHB4O1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgKyAxNnB4KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0Q2REVCO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxufVxyXG5cclxuLnJlZ2lzdHJhdGlvbiAuaGVhZGVyLWJhciBwIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNXB4O1xyXG59XHJcblxyXG4ucmVnaXN0cmF0aW9uIC5oZWFkZXItdGV4dCB7XHJcbiAgbWFyZ2luLXRvcDo5MnB4O1xyXG4gIHdpZHRoOiAzNjBweDtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ucmVnaXN0cmF0aW9uIC5oZWFkZXItdGV4dCBhIHtcclxuICBjb2xvcjogIzY2NjtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi5yZWdpc3RyYXRpb24gLnByb3ZpZGVyLWNhcmQtY29udGFpbmVyIHtcclxuICBtYXJnaW4tdG9wOiAyOHB4O1xyXG59XHJcblxyXG4ucmVnaXN0cmF0aW9uIC5wcm92aWRlci1jYXJkIHtcclxuICBoZWlnaHQ6IDE0MHB4O1xyXG4gIHdpZHRoOiAzMjBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjREFFMEU2O1xyXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIG1hcmdpbjogMTBweDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgYm94LXNoYWRvdzogI0RBRTBFNiAxcHggMXB4IDZweDtcclxufVxyXG5cclxuLnJlZ2lzdHJhdGlvbiAucHJvdmlkZXItY2FyZCAucHJvdmlkZXItbG9nbyB7XHJcbiAgaGVpZ2h0OiA0NHB4O1xyXG4gIHdpZHRoOiA0NHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG59XHJcblxyXG4ucmVnaXN0cmF0aW9uIC5wcm92aWRlci1jYXJkIGgyIHtcclxuICBjb2xvcjogIzY1NkU3NTtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgbWFyZ2luLXRvcDogLTJweDtcclxuICBsZXR0ZXItc3BhY2luZzogMC45cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XHJcbn1cclxuLnJlZ2lzdHJhdGlvbiAucHJvdmlkZXItY2FyZCBwIHtcclxuICBjb2xvcjogIzY1NkU3NTtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"registration\">\r\n  <!-- Header Bar -->\r\n  <div class=\"header-bar\">\r\n    <p>Select Solid Identity Provider</p>\r\n  </div>\r\n\r\n  <!-- Header Text -->\r\n  <div class=\"header-text\">\r\n    <p>\r\n      With a Solid Identity your personal data is stored securely in a POD. You control who has access to it.\r\n    </p>\r\n    <a href=\"https://solid.mit.edu\" target=\"_blank\">\r\n      Learn more about Solid IDs and PODs\r\n    </a>\r\n  </div>\r\n\r\n  <!-- Provider cards -->\r\n  <div class=\"provider-card-container\">\r\n    <div class=\"provider-card\" *ngFor=\"let provider of availableProviders\">\r\n      <img [src]=\"provider.image\" class=\"provider-logo\">\r\n      <h2>{{ provider.name }}</h2>\r\n      <p>{{ provider.desc }}</p>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/solid.auth.service */ "./src/app/services/solid.auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(auth) {
        this.auth = auth;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.availableProviders = this.auth.getIdentityProviders();
        this.availableProviders = this.availableProviders.filter(function (idp) { return idp.providerLoginUrl !== null; });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [_services_solid_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/services/auth.guard.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/auth.guard.service.ts ***!
  \************************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _solid_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solid.auth.service */ "./src/app/services/solid.auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var isLoggedIn = localStorage.getItem('solid-auth-client') ? true : false;
        if (!isLoggedIn) {
            this.router.navigateByUrl('/login');
        }
        return isLoggedIn; /* this.auth.session.pipe(
          take(1),
          map(session => !!session),
          tap(loggedIn => {
            if (!loggedIn) {
              return this.router.navigate(['/']);
            }
          })
        );*/
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_solid_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/services/chat.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/chat.service.ts ***!
  \******************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_rdf_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/rdf.service */ "./src/app/services/rdf.service.ts");
/* harmony import */ var _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/solid.auth.service */ "./src/app/services/solid.auth.service.ts");
/* harmony import */ var _models_chat_channel_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/chat-channel.model */ "./src/app/models/chat-channel.model.ts");
/* harmony import */ var _models_message_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/message.model */ "./src/app/models/message.model.ts");
/* harmony import */ var solid_file_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! solid-file-client */ "./node_modules/solid-file-client/dist/browser/solid-file-client.bundle.js");
/* harmony import */ var solid_file_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(solid_file_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var CHAT_CHANNEL_CONTENT_TYPE = 'application/ld+json';
var MESSAGE_CONTENT_TYPE = 'application/ld+json';
var PRIVATE_FOLDER = '/private';
var PRIVATE_CHAT_FOLDER = '/private/dechat_es6b';
var INBOX_FOLDER = '/inbox/';
var BASE_NAME_MESSAGES = 'dechat_msg';
var PROFILE_CARD_FOLDER = '/profile/card#me';
var MESSAGE_FILE_FORMAT = 'jsonld';
var ChatService = /** @class */ (function () {
    function ChatService(rdf, auth) {
        this.rdf = rdf;
        this.auth = auth;
        this.chatChannels = new Array();
        // this.startChat();
    }
    ChatService.prototype.setChatChannels = function (chatChannels) {
        this.chatChannels = chatChannels;
    };
    /**
     *
     */
    ChatService.prototype.startChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getWebId()];
                    case 1:
                        _a.webid = _b.sent();
                        this.uri = this.webid.replace(PROFILE_CARD_FOLDER, "");
                        return [4 /*yield*/, this.checkPrivateFolder()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.checkDeChatFolder()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.loadChatChannels()];
                    case 4:
                        _b.sent();
                        this.interval(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.checkInbox()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Crea la carpeta /private
     */
    ChatService.prototype.checkPrivateFolder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checkFolder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rdf.readFolder(this.uri + PRIVATE_FOLDER)];
                    case 1:
                        checkFolder = _a.sent();
                        if (checkFolder === undefined) {
                            this.rdf.createFolder(this.uri + PRIVATE_FOLDER);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Crea la carpeta para almacenar los canales de chat si no está creada
     */
    ChatService.prototype.checkDeChatFolder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checkFolder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rdf.readFolder(this.uri + PRIVATE_CHAT_FOLDER)];
                    case 1:
                        checkFolder = _a.sent();
                        if (checkFolder === undefined) {
                            this.rdf.createFolder(this.uri + PRIVATE_CHAT_FOLDER);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    ChatService.prototype.loadChatChannels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _i, _b, c;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("Loading chat channels...");
                        _a = this;
                        return [4 /*yield*/, this.rdf.loadChatChannels(this.uri + PRIVATE_CHAT_FOLDER)];
                    case 1:
                        _a.chatChannels = _c.sent();
                        // Ordenamos los mensajes de cada canal de chat
                        for (_i = 0, _b = this.chatChannels; _i < _b.length; _i++) {
                            c = _b[_i];
                            c.messages.sort(function (a, b) { return +new Date(a.sendTime) - +new Date(b.sendTime); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Example result: https://yourpod.solid.community
     */
    ChatService.prototype.getWebId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, solid_file_client__WEBPACK_IMPORTED_MODULE_5__["checkSession"]().then(function (session) { return (session.webId); }, function (err) { return console.log(err); })];
                    case 1:
                        s = _a.sent();
                        return [2 /*return*/, s];
                }
            });
        });
    };
    /**
     *
     * @param ms
     */
    ChatService.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    ChatService.prototype.getUri = function () {
        return this.uri;
    };
    /**
     * Guarda el mensaje en el objeto chat, actualiza el chat en el POD propio y envía el mensaje al Inbox de los participantes del chat
     *
     * @param chatChannel
     * @param msg
     */
    ChatService.prototype.sendMessage = function (chatChannel, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var channel, tmpMakerWebId, message, newMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = this.searchChatChannelById(chatChannel.id);
                        if (!(channel != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getWebId()];
                    case 1:
                        tmpMakerWebId = _a.sent();
                        message = new _models_message_model__WEBPACK_IMPORTED_MODULE_4__["Message"](tmpMakerWebId, msg);
                        chatChannel.messages.push(message);
                        // Actualizamos canal de chat en POD propio
                        return [4 /*yield*/, this.rdf.saveMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + chatChannel.id, message)];
                    case 2:
                        // Actualizamos canal de chat en POD propio
                        _a.sent();
                        newMsg_1 = JSON.stringify(message);
                        chatChannel.participants.forEach(function (participant) { return __awaiter(_this, void 0, void 0, function () {
                            var tmpParticipant;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        tmpParticipant = participant.replace(PROFILE_CARD_FOLDER, "");
                                        return [4 /*yield*/, this.rdf.createFile(tmpParticipant + INBOX_FOLDER + BASE_NAME_MESSAGES, newMsg_1, MESSAGE_CONTENT_TYPE)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Busca nuevas notificaciones de mensajes en el inbox propio
     */
    ChatService.prototype.checkInbox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var folderContent, _i, _a, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.rdf.readFolder(this.uri + INBOX_FOLDER)];
                    case 1:
                        folderContent = _b.sent();
                        console.log("Checking inbox...");
                        _i = 0, _a = folderContent.files;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        file = _a[_i];
                        if (!(file.type == MESSAGE_CONTENT_TYPE && file.label.includes(BASE_NAME_MESSAGES))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.processNewMessage(file.url)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.rdf.deleteFile(file.url)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * - Si ya existe canal de chat con el participante añade el nuevo mensaje al canal existente
     * - Si no existe canal de chat con el participante crea el canal correspondiente y lo añade al nuevo canal
     *
     * @param urlFile
     */
    ChatService.prototype.processNewMessage = function (urlFile) {
        return __awaiter(this, void 0, void 0, function () {
            var jsonld, newMessage, channel, newChannel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rdf.readFile(urlFile)];
                    case 1:
                        jsonld = _a.sent();
                        newMessage = JSON.parse(jsonld);
                        channel = this.searchChatChannelByParticipantWebid(newMessage.makerWebId);
                        if (!(channel != null)) return [3 /*break*/, 3];
                        channel.messages.push(newMessage);
                        channel.messages.sort(function (a, b) { return +new Date(a.sendTime) - +new Date(b.sendTime); });
                        // Guardamos el mensaje en el chat en el POD propio
                        return [4 /*yield*/, this.rdf.saveMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + channel.id, newMessage)];
                    case 2:
                        // Guardamos el mensaje en el chat en el POD propio
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.createNewChatChannel(newMessage.makerWebId)];
                    case 4:
                        newChannel = _a.sent();
                        newChannel.messages.push(newMessage);
                        // Guardamos el mensaje en el chat en el POD propio
                        return [4 /*yield*/, this.rdf.saveMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + newChannel.id, newMessage)];
                    case 5:
                        // Guardamos el mensaje en el chat en el POD propio
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param ChatChannel chat
     */
    ChatService.prototype.showChatMessages = function (chat) {
        return __awaiter(this, void 0, void 0, function () {
            var m;
            return __generator(this, function (_a) {
                for (m in chat.messages) {
                    console.log(m.toString);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Método para crear nuevos canales, el nuevo canal será creado en el POD propio y añadido a la
     * lista de canales de chat.
     *
     * @param webId WebId del contacto (Example: https://yourpod.solid.community/profile/card#me)
     * @param title
     */
    ChatService.prototype.createNewChatChannel = function (webId, title) {
        if (title === void 0) { title = "Canal de chat"; }
        return __awaiter(this, void 0, void 0, function () {
            var channel, nameParticipant, newChatChannel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = this.searchChatChannelByParticipantWebid(webId);
                        return [4 /*yield*/, this.rdf.getVCardName(webId)];
                    case 1:
                        nameParticipant = _a.sent();
                        if (!(channel == null)) return [3 /*break*/, 3];
                        title = (nameParticipant != undefined && nameParticipant.length > 0) ? nameParticipant : title;
                        newChatChannel = new _models_chat_channel_model__WEBPACK_IMPORTED_MODULE_3__["ChatChannel"](this.getUniqueChatChannelID(), title);
                        // Añadimos el chat a la lista de chats en memoria
                        newChatChannel.participants.push(webId);
                        this.chatChannels.push(newChatChannel);
                        // Guardamos el chat a nuestro POD
                        return [4 /*yield*/, this.rdf.saveNewChatChannel(this.uri + PRIVATE_CHAT_FOLDER + "/", newChatChannel)];
                    case 2:
                        // Guardamos el chat a nuestro POD
                        _a.sent();
                        return [2 /*return*/, newChatChannel];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * <<MÉTODO SOLO VÁLIDO PARA CHATS INDIVIDUALES - ADAPTAR PARA IMPLEMENTACIÓN DE CHATS GRUPALES>>
     *
     * @param webId
     */
    ChatService.prototype.searchChatChannelByParticipantWebid = function (webId) {
        for (var _i = 0, _a = this.chatChannels; _i < _a.length; _i++) {
            var channel = _a[_i];
            if (channel.participants.includes(webId)) {
                return channel;
            }
        }
        return null;
    };
    /**
     *
     * @param id
     */
    ChatService.prototype.searchChatChannelById = function (id) {
        for (var _i = 0, _a = this.chatChannels; _i < _a.length; _i++) {
            var channel = _a[_i];
            if (channel.id == id) {
                return channel;
            }
        }
        return null;
    };
    /**
     *
     */
    ChatService.prototype.getUniqueChatChannelID = function () {
        var isUnique = false;
        var id = uuid__WEBPACK_IMPORTED_MODULE_6__["v4"]();
        while (!isUnique) {
            isUnique = true;
            this.chatChannels.forEach(function (channel) {
                if (channel.id == id) {
                    isUnique = false;
                }
            });
        }
        return id;
    };
    // ---------------------- INTERVAL-PROMISE LIBRARY ---------------------- //
    /**
     * @param {function} func - function to execute
     * @param {number|function(number):number} intervalLength - length in ms to wait before executing again
     * @param {{iterations: Infinity|number, stopOnError: boolean}} [options]
     *
     * @returns {Promise} Promise object with no result
     */
    ChatService.prototype.interval = function (func, intervalLength, options) {
        if (options === void 0) { options = {}; }
        this.validateArgs(func, intervalLength, options);
        var defaults = {
            iterations: Infinity,
            stopOnError: true
        };
        var settings = Object.assign(defaults, options);
        return new Promise(function (rootPromiseResolve, rootPromiseReject) {
            var callFunction = function (currentIteration) {
                // Set up a way to track if a "stop" was requested by the user function
                var stopRequested = false;
                var stop = function () {
                    stopRequested = true;
                };
                // Set up a function to call the next iteration. This is abstracted so it can be called by .then(), or in .catch(), if options allow.
                var callNext = function () {
                    // If we've hit the desired number of iterations, or stop was called, resolve the root promise and return
                    if (currentIteration === settings.iterations || stopRequested) {
                        rootPromiseResolve();
                        return;
                    }
                    // Otherwise, call the next iteration
                    callFunction(currentIteration + 1);
                };
                // Calculate our interval length
                var calculatedIntervalLength = (typeof intervalLength === 'function') ? intervalLength(currentIteration) : intervalLength;
                // If the interval length was calculated, validate the result
                if (typeof intervalLength === 'function') {
                    if (!Number.isInteger(calculatedIntervalLength) || calculatedIntervalLength < 0) {
                        rootPromiseReject(new Error('Function for "intervalLength" argument must return a non-negative integer.'));
                        return;
                    }
                }
                // Call the user function after the desired interval length. After, call the next iteration (and/or handle error)
                setTimeout(function () {
                    var returnVal = func(currentIteration, stop);
                    if (!(returnVal instanceof Promise)) {
                        rootPromiseReject(new Error('Return value of "func" must be a Promise.'));
                        return;
                    }
                    returnVal.then(callNext).catch(function (err) {
                        if (!settings.stopOnError) {
                            callNext();
                            return;
                        }
                        rootPromiseReject(err);
                    });
                }, calculatedIntervalLength);
            };
            callFunction(1);
        });
    };
    /**
     * A helper function to validate the arguments passed to interval(...)
     *
     * @param {*} func
     * @param {*} intervalLength
     * @param {*} options
     */
    ChatService.prototype.validateArgs = function (func, intervalLength, options) {
        // Validate "func"
        if (typeof func !== 'function') {
            throw new TypeError('Argument 1, "func", must be a function.');
        }
        // Validate "intervalLength"
        if (typeof intervalLength === 'number') {
            if (!Number.isInteger(intervalLength) || intervalLength < 0) {
                throw new TypeError('Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.');
            }
        }
        else if (typeof intervalLength !== 'function') {
            throw new TypeError('Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.');
        }
        // Validate options...
        if (typeof options !== 'object') {
            throw new TypeError('Argument 3, "options", must be an object.');
        }
        // Validate passed keys
        var allowedKeys = ['iterations', 'stopOnError'];
        Object.keys(options).forEach(function (key) {
            if (!allowedKeys.includes(key)) {
                throw new TypeError('Option "' + key + '" is not a valid option.');
            }
        });
        // validate "iterations" option (if passed)
        if (options.hasOwnProperty('iterations')) {
            if (options.iterations !== Infinity && (!Number.isInteger(options.iterations) || options.iterations < 1)) {
                throw new TypeError('Option "iterations" must be Infinity or an integer greater than 0.');
            }
        }
        // validate "stopOnError" option (if passed)
        if (options.hasOwnProperty('stopOnError')) {
            if (typeof options.stopOnError !== 'boolean') {
                throw new TypeError('Option "stopOnError" must be a boolean.');
            }
        }
    };
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_rdf_service__WEBPACK_IMPORTED_MODULE_1__["RdfService"], _services_solid_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "./src/app/services/rdf.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/rdf.service.ts ***!
  \*****************************************/
/*! exports provided: RdfService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RdfService", function() { return RdfService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var solid_file_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! solid-file-client */ "./node_modules/solid-file-client/dist/browser/solid-file-client.bundle.js");
/* harmony import */ var solid_file_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(solid_file_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _models_message_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/message.model */ "./src/app/models/message.model.ts");
/* harmony import */ var _models_chat_channel_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/chat-channel.model */ "./src/app/models/chat-channel.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

//import * as $rdf from 'rdflib'
// TODO: Remove any UI interaction from this service





var VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
var FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
var SH = $rdf.Namespace('http://www.w3.org/ns/shacl#');
var XSD = $rdf.Namespace('http://www.w3.org/2001/XMLSchema#');
var SCHEMA = $rdf.Namespace('http://schema.org/');
var DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/');
var TERMS = $rdf.Namespace('http://purl.org/dc/terms/');
var FLOW = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
var ICAL = $rdf.Namespace('http://www.w3.org/2002/12/cal/ical#');
var MEE = $rdf.Namespace('http://www.w3.org/ns/pim/meeting#');
var SIOC = $rdf.Namespace('http://rdfs.org/sioc/ns#');
var SOLIDRDF = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
var UI = $rdf.Namespace('http://www.w3.org/ns/ui#');
var RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
var LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");
var DEFAULT_CONTENT_TYPE = 'application/ld+json';
var DEFAULT_ACCEPT = 'application/ld+json;q=0.9,text/turtle;q=0.8';
var INBOX_LINK_REL = 'http://www.w3.org/ns/ldp#inbox';
/**
 * A service layer for RDF data manipulation using rdflib.js
 * @see https://solid.inrupt.com/docs/manipulating-ld-with-rdflib
 */
var RdfService = /** @class */ (function () {
    function RdfService(toastr) {
        var _this = this;
        this.toastr = toastr;
        this.store = $rdf.graph();
        /**
         * A helper object that connects to the web, loads data, and saves it back. More powerful than using a simple
         * store object.
         * When you have a fetcher, then you also can ask the query engine to go fetch new linked data automatically
         * as your query makes its way across the web.
         * @see http://linkeddata.github.io/rdflib.js/doc/Fetcher.html
         */
        this.fetcher = $rdf.Fetcher;
        /**
         * The UpdateManager allows you to send small changes to the server to “patch” the data as your user changes data in
         * real time. It also allows you to subscribe to changes other people make to the same file, keeping track of
         * upstream and downstream changes, and signaling any conflict between them.
         * @see http://linkeddata.github.io/rdflib.js/doc/UpdateManager.html
         */
        this.updateManager = $rdf.UpdateManager;
        /**
         * Fetches the session from Solid, and store results in localStorage
         */
        this.getSession = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, solid.auth.currentSession(localStorage)];
                    case 1:
                        _a.session = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Gets a node that matches the specified pattern using the VCARD onthology
         *
         * any() can take a subject and a predicate to find Any one person identified by the webId
         * that matches against the node/predicated
         *
         * @param {string} node VCARD predicate to apply to the $rdf.any()
         * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
         * @return {string} The value of the fetched node or an emtpty string
         * @see https://github.com/solid/solid-tutorial-rdflib.js
         */
        this.getValueFromVcard = function (node, webId) {
            return _this.getValueFromNamespace(node, VCARD, webId);
        };
        /**
         * Gets a node that matches the specified pattern using the FOAF onthology
         * @param {string} node FOAF predicate to apply to the $rdf.any()
         * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
         * @return {string} The value of the fetched node or an emtpty string
         */
        this.getValueFromFoaf = function (node, webId) {
            return _this.getValueFromNamespace(node, FOAF, webId);
        };
        this.transformDataForm = function (form, me, doc) {
            var insertions = [];
            var deletions = [];
            var fields = Object.keys(form.value);
            var oldProfileData = JSON.parse(localStorage.getItem('oldProfileData')) || {};
            // We need to split out into three code paths here:
            // 1. There is an old value and a new value. This is the update path
            // 2. There is no old value and a new value. This is the insert path
            // 3. There is an old value and no new value. Ths is the delete path
            // These are separate codepaths because the system needs to know what to do in each case
            fields.map(function (field) {
                var predicate = VCARD(_this.getFieldName(field));
                var subject = _this.getUriForField(field, me);
                var why = doc;
                var fieldValue = _this.getFieldValue(form, field);
                var oldFieldValue = _this.getOldFieldValue(field, oldProfileData);
                // if there's no existing home phone number or email address, we need to add one, then add the link for hasTelephone or hasEmail
                if (!oldFieldValue && fieldValue && (field === 'phone' || field === 'email')) {
                    _this.addNewLinkedField(field, insertions, predicate, fieldValue, why, me);
                }
                else {
                    //Add a value to be updated
                    if (oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
                        deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
                        insertions.push($rdf.st(subject, predicate, fieldValue, why));
                    }
                    else if (oldProfileData[field] && !form.value[field] && !form.controls[field].pristine) {
                        deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
                    }
                    else if (!oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
                        insertions.push($rdf.st(subject, predicate, fieldValue, why));
                    }
                }
            });
            return {
                insertions: insertions,
                deletions: deletions
            };
        };
        this.updateProfile = function (form) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var me, doc, data;
            return __generator(this, function (_a) {
                me = $rdf.sym(this.session.webId);
                doc = $rdf.NamedNode.fromValue(this.session.webId.split('#')[0]);
                data = this.transformDataForm(form, me, doc);
                //Update existing values
                if (data.insertions.length > 0 || data.deletions.length > 0) {
                    this.updateManager.update(data.deletions, data.insertions, function (response, success, message) {
                        if (success) {
                            _this.toastr.success('Your Solid profile has been successfully updated', 'Success!');
                            form.form.markAsPristine();
                            form.form.markAsTouched();
                        }
                        else {
                            _this.toastr.error('Message: ' + message, 'An error has occurred');
                        }
                    });
                }
                return [2 /*return*/];
            });
        }); };
        this.getAddress = function () {
            var linkedUri = _this.getValueFromVcard('hasAddress');
            if (linkedUri) {
                return {
                    locality: _this.getValueFromVcard('locality', linkedUri),
                    country_name: _this.getValueFromVcard('country-name', linkedUri),
                    region: _this.getValueFromVcard('region', linkedUri),
                    street: _this.getValueFromVcard('street-address', linkedUri),
                };
            }
            return {};
        };
        //Function to get email. This returns only the first email, which is temporary
        this.getEmail = function () {
            var linkedUri = _this.getValueFromVcard('hasEmail');
            if (linkedUri) {
                return _this.getValueFromVcard('value', linkedUri).split('mailto:')[1];
            }
            return '';
        };
        //Function to get phone number. This returns only the first phone number, which is temporary. It also ignores the type.
        this.getPhone = function () {
            var linkedUri = _this.getValueFromVcard('hasTelephone');
            if (linkedUri) {
                return _this.getValueFromVcard('value', linkedUri).split('tel:+')[1];
            }
        };
        this.getProfile = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.session) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.fetcher.load(this.session.webId)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                fn: this.getValueFromVcard('fn'),
                                company: this.getValueFromVcard('organization-name'),
                                phone: this.getPhone(),
                                role: this.getValueFromVcard('role'),
                                image: this.getValueFromVcard('hasPhoto'),
                                address: this.getAddress(),
                                email: this.getEmail(),
                            }];
                    case 4:
                        error_1 = _a.sent();
                        console.log("Error fetching data: " + error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getFriends = function () {
            var user = _this.session.webId;
            var amigos = _this.store.each($rdf.sym(user), FOAF('knows'));
            var lista_amigos = [];
            try {
                var i = 0;
                for (i = 0; i < amigos.length; i++) {
                    lista_amigos.push(amigos[i].value);
                }
                return lista_amigos;
            }
            catch (error) {
                console.log("Error fetching data: " + error);
            }
        };
        var fetcherOptions = {};
        this.fetcher = new $rdf.Fetcher(this.store, fetcherOptions);
        this.updateManager = new $rdf.UpdateManager(this.store);
        this.getSession();
    }
    RdfService.prototype.addNewLinkedField = function (field, insertions, predicate, fieldValue, why, me) {
        //Generate a new ID. This id can be anything but needs to be unique.
        var newId = field + ':' + Date.now();
        //Get a new subject, using the new ID
        var newSubject = $rdf.sym(this.session.webId.split('#')[0] + '#' + newId);
        //Set new predicate, based on email or phone fields
        var newPredicate = field === 'phone' ? $rdf.sym(VCARD('hasTelephone')) : $rdf.sym(VCARD('hasEmail'));
        //Add new phone or email to the pod
        insertions.push($rdf.st(newSubject, predicate, fieldValue, why));
        //Set the type (defaults to Home/Personal for now) and insert it into the pod as well
        //Todo: Make this dynamic
        var type = field === 'phone' ? $rdf.literal('Home') : $rdf.literal('Personal');
        insertions.push($rdf.st(newSubject, VCARD('type'), type, why));
        //Add a link in #me to the email/phone number (by id)
        insertions.push($rdf.st(me, newPredicate, newSubject, why));
    };
    RdfService.prototype.getUriForField = function (field, me) {
        var uriString;
        var uri;
        switch (field) {
            case 'phone':
                uriString = this.getValueFromVcard('hasTelephone');
                if (uriString) {
                    uri = $rdf.sym(uriString);
                }
                break;
            case 'email':
                uriString = this.getValueFromVcard('hasEmail');
                if (uriString) {
                    uri = $rdf.sym(uriString);
                }
                break;
            default:
                uri = me;
                break;
        }
        return uri;
    };
    /**
     * Extracts the value of a field of a NgForm and converts it to a $rdf.NamedNode
     * @param {NgForm} form
     * @param {string} field The name of the field that is going to be extracted from the form
     * @return {RdfNamedNode}
     */
    RdfService.prototype.getFieldValue = function (form, field) {
        var fieldValue;
        if (!form.value[field]) {
            return;
        }
        switch (field) {
            case 'phone':
                fieldValue = $rdf.sym('tel:+' + form.value[field]);
                break;
            case 'email':
                fieldValue = $rdf.sym('mailto:' + form.value[field]);
                break;
            default:
                fieldValue = form.value[field];
                break;
        }
        return fieldValue;
    };
    RdfService.prototype.getOldFieldValue = function (field, oldProfile) {
        var oldValue;
        if (!oldProfile || !oldProfile[field]) {
            return;
        }
        switch (field) {
            case 'phone':
                oldValue = $rdf.sym('tel:+' + oldProfile[field]);
                break;
            case 'email':
                oldValue = $rdf.sym('mailto:' + oldProfile[field]);
                break;
            default:
                oldValue = oldProfile[field];
                break;
        }
        return oldValue;
    };
    RdfService.prototype.getFieldName = function (field) {
        switch (field) {
            case 'company':
                return 'organization-name';
            case 'phone':
            case 'email':
                return 'value';
            default:
                return field;
        }
    };
    /**
     * Gets any resource that matches the node, using the provided Namespace
     * @param {string} node The name of the predicate to be applied using the provided Namespace
     * @param {$rdf.namespace} namespace The RDF Namespace
     * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
     */
    RdfService.prototype.getValueFromNamespace = function (node, namespace, webId) {
        var store = this.store.any($rdf.sym(webId || this.session.webId), namespace(node));
        if (store) {
            return store.value;
        }
        return '';
    };
    /**
     * @param folderUri Example: https://yourpod.solid.community/private/
     * @param newChatChannel Chat a guardar en el POD (se usará el id del chat para la URL, por tanto, debe ser único)
     */
    RdfService.prototype.saveNewChatChannel = function (folderUri, newChatChannel) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chatUri, channel;
            return __generator(this, function (_a) {
                chatUri = folderUri + newChatChannel.id;
                channel = this.store.sym(chatUri);
                this.store.add(channel, DC("title"), newChatChannel.title, channel.doc());
                this.store.add(channel, DC("created"), newChatChannel.created, channel.doc());
                newChatChannel.participants.forEach(function (element) {
                    _this.store.add(channel, FLOW("participation"), element, channel.doc());
                });
                this.fetcher.putBack(channel);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param chatUri Example: https://yourpod.solid.community/private/aaaaa-bbbbb-ccccc
     * @param msg Mensaje a guardar en el POD
     */
    RdfService.prototype.saveMessage = function (chatUri, message) {
        return __awaiter(this, void 0, void 0, function () {
            var msgUri, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateUniqueUrlForResource(chatUri)];
                    case 1:
                        msgUri = _a.sent();
                        msg = this.store.sym(msgUri);
                        this.store.add(msg, TERMS("created"), message.sendTime, msg.doc());
                        this.store.add(msg, FOAF("maker"), message.makerWebId, msg.doc());
                        this.store.add(msg, SIOC("content"), message.message, msg.doc());
                        this.fetcher.putBack(msg);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param chatChannelsFolderUri Example: https://yourpod.solid.community/private/dechat_es6b
     */
    RdfService.prototype.loadChatChannels = function (chatChannelsFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var folderContent, chatChannels, _loop_1, this_1, _i, _a, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.readFolder(chatChannelsFolderUri)];
                    case 1:
                        folderContent = _b.sent();
                        chatChannels = new Array();
                        _loop_1 = function (file) {
                            var fileUri;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fileUri = this_1.store.sym(file.url);
                                        // Obtenemos los datos del chat
                                        return [4 /*yield*/, this_1.fetcher.load(fileUri.doc()).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                var id, title, created, participation, messages, listUrisMessages, _loop_2, this_2, _i, listUrisMessages_1, message, chatChannel;
                                                return __generator(this, function (_a) {
                                                    id = file.url.split('/').pop();
                                                    title = this.store.match(fileUri, DC("title"), null, fileUri.doc()).map(function (st) { return (st.object.value); });
                                                    created = this.store.match(fileUri, DC("created"), null, fileUri.doc()).map(function (st) { return (st.object.value); });
                                                    participation = this.store.match(fileUri, FLOW("participation"), null, fileUri.doc()).map(function (st) { return (st.object.value); });
                                                    messages = new Array();
                                                    listUrisMessages = this.store.match(null, SIOC("content"), null, fileUri.doc()).map(function (st) { return (st.subject.value); });
                                                    _loop_2 = function (message) {
                                                        var messageUri = this_2.store.sym(message);
                                                        // Obtenemos los datos de cada mensaje del chat
                                                        this_2.fetcher.load(messageUri.doc()).then(function (response) {
                                                            var msgCreated = _this.store.match(messageUri, TERMS("created"), null, messageUri.doc()).map(function (st) { return (st.object.value); });
                                                            var msgMaker = _this.store.match(messageUri, FOAF("maker"), null, messageUri.doc()).map(function (st) { return (st.object.value); });
                                                            var msgContent = _this.store.match(messageUri, SIOC("content"), null, messageUri.doc()).map(function (st) { return (st.object.value); });
                                                            messages.push(new _models_message_model__WEBPACK_IMPORTED_MODULE_4__["Message"](msgMaker, msgContent, new Date(msgCreated)));
                                                        });
                                                    };
                                                    this_2 = this;
                                                    for (_i = 0, listUrisMessages_1 = listUrisMessages; _i < listUrisMessages_1.length; _i++) {
                                                        message = listUrisMessages_1[_i];
                                                        _loop_2(message);
                                                    }
                                                    chatChannel = new _models_chat_channel_model__WEBPACK_IMPORTED_MODULE_5__["ChatChannel"](id, title, new Date(created), participation, messages);
                                                    chatChannels.push(chatChannel);
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 1:
                                        // Obtenemos los datos del chat
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = folderContent.files;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        file = _a[_i];
                        return [5 /*yield**/, _loop_1(file)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, chatChannels];
                }
            });
        });
    };
    RdfService.prototype.getVCardName = function (webid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var me, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this.store.sym(webid);
                        name = "";
                        return [4 /*yield*/, this.fetcher.load(me.doc()).then(function (response) {
                                _this.store.match(me, VCARD("fn"), null, me.doc()).map(function (st) { name = st.object.value; });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, name];
                }
            });
        });
    };
    RdfService.prototype.getVCardImage = function (webid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var me, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this.store.sym(webid);
                        image = "";
                        return [4 /*yield*/, this.fetcher.load(me.doc()).then(function (response) {
                                _this.store.match(me, VCARD("hasPhoto"), null, me.doc()).map(function (st) { image = st.object.value; });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, image];
                }
            });
        });
    };
    /***************************************************************/
    /**
     * Crea un fichero vacío
     *
     * @param newFile
     */
    RdfService.prototype.createFile = function (newFile, content, contentType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                solid_file_client__WEBPACK_IMPORTED_MODULE_2__["createFile"](newFile, content, contentType)
                    .then(function (fileCreated) { console.log("Created file " + fileCreated + "."); }, function (err) { return console.log(err); });
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param file
     */
    RdfService.prototype.readFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, solid_file_client__WEBPACK_IMPORTED_MODULE_2__["readFile"](file).then(function (body) { return (body); }, function (err) { return console.log(err); })];
            });
        });
    };
    /**
     *
     * @param url
     * @param newContent
     * @param contentType
     */
    RdfService.prototype.updateFile = function (url, newContent, contentType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, solid_file_client__WEBPACK_IMPORTED_MODULE_2__["updateFile"](url, newContent, contentType)
                            .then(function (success) { console.log("Updated " + url + "."); }, function (err) { return console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param url
     */
    RdfService.prototype.deleteFile = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, solid_file_client__WEBPACK_IMPORTED_MODULE_2__["deleteFile"](url)
                            .then(function (success) { console.log("Deleted " + url + "."); }, function (err) { return console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * URL FICHERO ORIGEN ---> URL FICHERO DESTINO
     *
     * @param oldFile
     * @param newFile
     */
    RdfService.prototype.copyFile = function (oldFile, newFile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                solid_file_client__WEBPACK_IMPORTED_MODULE_2__["readFile"](oldFile).then(function (content) {
                    solid_file_client__WEBPACK_IMPORTED_MODULE_2__["createFile"](newFile, content).then(function (res) {
                        return (res);
                    }, function (err) { throw new Error("copy upload error  " + err); });
                }, function (err) { throw new Error("copy download error  " + err); });
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param url
     */
    RdfService.prototype.createFolder = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, solid_file_client__WEBPACK_IMPORTED_MODULE_2__["createFolder"](url)
                            .then(function (success) { console.log("Created folder " + url + "."); }, function (err) { return console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * {
            type : "folder",
            name : // folder name (without path),
             url : // full URL of the resource,
        modified : // dcterms:modified date
           mtime : // stat:mtime
            size : // stat:size
          parent : // parentFolder or undef if none,
         content : // raw content of the folder's turtle representation,
           files : // an array of files in the folder
         folders : // an array of sub-folders in the folder,
        }
     *
     * @param url
     */
    RdfService.prototype.readFolder = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, solid_file_client__WEBPACK_IMPORTED_MODULE_2__["readFolder"](url).then(function (folder) { return (folder); }, function (err) { return console.log(err); })];
            });
        });
    };
    // ----------------------------------------------------------------
    // ----------------------------------------------------------------
    // ----------------------------------------------------------------
    // ----------------------------------------------------------------
    // Añadir
    RdfService.prototype.newMessage = function () {
        console.log("PROBANDO RDF");
        var link = 'http://www.w3.org/ns/ldp#Resource; rel=“type”';
        var filename = "chat_" + Math.round(Math.random() * 60000) + ".ttl";
        //const me = this.store.sym('https://dcarballob01.solid.community/inbox/chat_' + new Date().getTime() + '.ttl');
        var me = this.store.sym('https://dcarballob01.solid.community/private/testChat.ttl');
        var profile = me.doc();
        //let info = this.store.sym("https://dcarballob01.solid.community/private/testChat.ttl#info");
        var me1 = this.store.sym("https://dcarballob01.solid.community/private/testChat.ttl#dkfdjs3");
        var me2 = this.store.sym("https://dcarballob01.solid.community/private/testChat.ttl#dasdad2");
        var me3 = this.store.sym("https://dcarballob01.solid.community/private/testChat.ttl#dasdda4");
        this.store.add(me, SIOC("id"), uuid__WEBPACK_IMPORTED_MODULE_1__["v4"](), me.doc());
        this.store.add(me, SIOC("user"), "David", me.doc());
        this.store.add(me1, SIOC("msg"), "MENSAJE +¨^{", me1.doc());
        this.store.add(me2, SIOC("msg"), "MENSAJE... 2", me2.doc());
        this.store.add(me3, SIOC("msg"), "HOLA MUNDO", me3.doc());
        this.store.add(me3, SIOC("hora"), new Date(), me3.doc());
        this.fetcher.putBack(me);
        this.fetcher.putBack(me1);
        this.fetcher.putBack(me2);
        this.fetcher.putBack(me3);
    };
    // Cargar
    RdfService.prototype.loadMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var me, profile, folder, temp;
            return __generator(this, function (_a) {
                me = this.store.sym('https://dcarballob01.solid.community/private/testChat.ttl');
                profile = me.doc();
                folder = $rdf.sym('https://dcarballob01.solid.community/private/testChat.ttl');
                temp = new Array();
                this.fetcher.load(profile).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var msg, url;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                msg = this.store.match(null, SIOC("msg"), null, me.doc()).map(function (st) { return temp.push(st.subject.value); });
                                console.log(temp);
                                return [4 /*yield*/, this.generateUniqueUrlForResource("https://dcarballob01.solid.community/private/testChat.ttl")];
                            case 1:
                                url = _a.sent();
                                console.log("URL UNICA: " + url);
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) {
                    console.log("Load failed " + err);
                });
                return [2 /*return*/];
            });
        });
    };
    // Cargar Inbox
    RdfService.prototype.getMessagesFromOtherPOD = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // Actualizar
    RdfService.prototype.updateTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, doc, ins, del;
            return __generator(this, function (_a) {
                me = this.store.sym('https://dcarballob01.solid.community/public/chat_' + new Date().getTime() + '.ttl');
                doc = me.doc();
                ins = $rdf.st("PERSONA", FLOW("message"), "Mensaje_Nuevo", doc);
                del = [];
                this.updateManager.update(del, ins, function (uri, ok, message) {
                    if (ok)
                        console.log('Name changed to ' + "DAVID");
                    else
                        alert(message);
                });
                return [2 /*return*/];
            });
        });
    };
    // ----------------------------------------------------------------
    RdfService.prototype.test = function () {
        //solid.auth.fetch("https://dcarballob01.solid.community/public/",{headers: {accept: "image/*;q=0.9, */*;q=0.1, application/rdf+xml;q=0.9, application/xhtml+xml, text/xml;q=0.5, application/xml;q=0.5, text/html;q=0.9, text/plain;q=0.5, text/n3;q=1.0, text/turtle;q=1"}}).
        solid.auth.fetch("https://dcarballob01.solid.community/inbox/", { headers: { accept: DEFAULT_ACCEPT } }).
            then(function (response) { return response.text(); }).
            then(function (data) { console.log(data); });
    };
    RdfService.prototype.getAllInbox = function (inboxUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // ------------ FUNCIONES CASI VÁLIDAS ------------------
    // Busca nuevas notificaciones de mensajes
    RdfService.prototype.checkInbox = function (inboxUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, index, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllUrlsResourcesInInbox(inboxUrl)];
                    case 1:
                        urls = _a.sent();
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < urls.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getContentInboxNotification(urls[index])];
                    case 3:
                        content = _a.sent();
                        // Procesamos notificaciones de DeChat, una vez procesadas las borramos
                        if (content.includes('Prueba')) {
                            this.deleteFileForUser(urls[index]);
                            console.log(content);
                        }
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Devuelve las url de los documentos que hay en el inbox
    RdfService.prototype.getAllUrlsResourcesInInbox = function (inboxUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetcher.load(inboxUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.store.match(null, LDP('contains')).map(function (st) { return st.object.value; })];
                }
            });
        });
    };
    // Devuelve el contenido de una notificación
    // Devuelve Promise, por tanto ".then(data=>{console.log(data)});"
    RdfService.prototype.getContentInboxNotification = function (urlNotificationInbox) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, solid.auth.fetch(urlNotificationInbox).then(function (response) { return response.text(); })];
            });
        });
    };
    // ------------ FUNCIONES VÁLIDAS ------------------
    RdfService.prototype.uniqid = function () {
        return '#' + Math.random().toString(36).substr(2, 9);
    };
    /**
     * This method creates an empty file for the given url. It overwrites existing files.
     * @param url: the url of the empty file
     * @returns {Promise}: the promise from auth.fetch().
     */
    RdfService.prototype.createEmptyFileForUser = function (url) {
        var request = {
            method: 'PUT',
            body: ''
        };
        return solid.auth.fetch(url, request);
    };
    /**
     * This method sends a notification to an inbox.
     * @param url: the url of the inbox.
     * @param data: the RDF data representing the notification.
     * @returns {Promise}: the promise from auth.fetch().
     */
    RdfService.prototype.sendToUserInbox = function (urlInbox, data) {
        var request = {
            method: 'POST',
            body: data
        };
        return solid.auth.fetch(urlInbox, request);
    };
    /**
     * This method deletes a file.
     * @param url: the url of the file that needs to be deleted.
     * @returns {Promise}: the promise from auth.fetch().
     */
    RdfService.prototype.deleteFileForUser = function (urlFile) {
        var request = {
            method: 'DELETE'
        };
        return solid.auth.fetch(urlFile, request);
    };
    /**
     * This method executes an SPARQL update on a file.
     * @param url: the url of the file that needs to be updated.
     * @param query: the SPARQL update query that needs to be executed.
     * @returns {Promise}: the promise from auth.fetch().
     */
    RdfService.prototype.executeSPARQLUpdateForUser = function (url, query) {
        var request = {
            method: 'PATCH',
            body: query,
            headers: {
                'Content-Type': 'application/sparql-update'
            }
        };
        return solid.auth.fetch(url, request);
    };
    /**
     * This method checks if the current user has write access to a file.
     * @param url: the url of the file to check.
     * @returns {Promise<boolean>}: a promise that resolves with true if the user has write access, else false.
     */
    RdfService.prototype.writePermission = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executeSPARQLUpdateForUser(url, 'INSERT DATA {}')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.status === 200];
                }
            });
        });
    };
    // Genera una URL única para un recurso (POSIBLEMENTE NECESARIO CAMBIAR EL NAMESPACE)
    RdfService.prototype.generateUniqueUrlForResource = function (baseurl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var url, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.store.sym(baseurl + '#' + uuid__WEBPACK_IMPORTED_MODULE_1__["v4"]());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.fetcher.load(url.doc()).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var d;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            d = this.store.each(url);
                                            _a.label = 1;
                                        case 1:
                                            if (!(d.length != 0)) return [3 /*break*/, 3];
                                            url = baseurl + '#' + uuid__WEBPACK_IMPORTED_MODULE_1__["v4"]();
                                            return [4 /*yield*/, this.store.each(url)];
                                        case 2:
                                            //d = this.store.each(url, RDF('type'));
                                            d = _a.sent();
                                            return [3 /*break*/, 1];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, function (err) {
                                console.log("Load failed " + err);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, url];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RdfService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], RdfService);
    return RdfService;
}());



/***/ }),

/***/ "./src/app/services/solid.auth.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/solid.auth.service.ts ***!
  \************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _rdf_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rdf.service */ "./src/app/services/rdf.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var AuthService = /** @class */ (function () {
    function AuthService(router, rdf) {
        var _this = this;
        this.router = router;
        this.rdf = rdf;
        this.fechInit = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/sparql-update',
            },
            body: '',
        };
        /*
         * This will check if current session is active to avoid security problems
        */
        this.isSessionActive = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.session = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(solid.auth.currentSession());
                return [2 /*return*/];
            });
        }); };
        /**
         * Alternative login-popup function. This will open a popup that will allow you to choose an identity provider
         * without leaving the current page
         * This is recommended if you don't want to leave the current workflow.
         */
        this.solidLoginPopup = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, solid.auth.popupLogin({ popupUri: './login-popup' })];
                    case 1:
                        _a.sent();
                        // Check if session is valid to avoid redirect issues
                        return [4 /*yield*/, this.isSessionActive()];
                    case 2:
                        // Check if session is valid to avoid redirect issues
                        _a.sent();
                        // popupLogin success redirect to profile
                        this.router.navigate(['/card']);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("Error: " + error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /*
        * Signs out of Solid in this app, by calling the logout function and clearing the localStorage token
        */
        this.solidSignOut = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, solid.auth.logout()];
                    case 1:
                        _a.sent();
                        // Remove localStorage
                        localStorage.removeItem('solid-auth-client');
                        // Redirect to login page
                        this.router.navigate(['/']);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log("Error: " + error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.saveOldUserData = function (profile) {
            if (!localStorage.getItem('oldProfileData')) {
                localStorage.setItem('oldProfileData', JSON.stringify(profile));
            }
        };
        this.getOldUserData = function () {
            return JSON.parse(localStorage.getItem('oldProfileData'));
        };
        /*
        *  Make a call to the solid auth endpoint. It requires an identity provider url, which here is coming from the dropdown, which
        *  is populated by the getIdentityProviders() function call. It currently requires a callback url and a storage option or else
        *  the call will fail.
        */
        this.solidLogin = function (idp) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, solid.auth.login(idp, {
                            callbackUri: window.location.href + "card",
                            storage: localStorage,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.isSessionActive();
    }
    /**
     * Function to get providers. This is to mimic the future provider registry
     *
     * @return {SolidProvider[]} A list of SolidProviders
     */
    AuthService.prototype.getIdentityProviders = function () {
        var inruptProvider = {
            name: 'Inrupt',
            image: '/assets/images/Inrupt.png',
            loginUrl: 'https://inrupt.net/auth',
            desc: 'Inrupt Inc. provider'
        };
        var solidCommunityProvider = {
            name: 'Solid Community',
            image: '/assets/images/Solid.png',
            loginUrl: 'https://solid.community',
            desc: 'A provider maintained by the Solid Community'
        };
        var otherProvider = {
            name: 'Other (Enter WebID)',
            image: '/assets/images/Generic.png',
            loginUrl: null,
            desc: 'Generic provider'
        };
        return [
            inruptProvider,
            solidCommunityProvider,
            otherProvider
        ];
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _rdf_service__WEBPACK_IMPORTED_MODULE_3__["RdfService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\crist\Desktop\GitHub\DeChat_es6b\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map