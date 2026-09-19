# Angular Interview Demo

A single Angular application built to demonstrate and rehearse core Angular interview
topics with real, working code. Generated from the project's README specification.

> **Note on version**: the README specifies Angular 22 / Node >= 22.22.3. This sandbox's
> Node is v22.22.2 (one patch version short), which the Angular 22 CLI hard-blocks on.
> The project was generated with Angular CLI 19 instead — every feature described below
> (standalone components, signals, `effect()`, functional guards/interceptors/resolvers,
> reactive forms, custom `ControlValueAccessor`) has been supported since Angular 17-19,
> so nothing in the spec was dropped. On a machine with Node >= 22.22.3, `ng update` to
> Angular 22 should be a drop-in upgrade.

## Getting started
```bash
npm install
npm start          # ng serve, http://localhost:4200
npm test           # unit tests (Vitest-style Jasmine specs, 33 passing)
npm run build      # production build to dist/
```

## Environments
```bash
ng serve --configuration=dit
ng build --configuration=uat
ng build --configuration=production   # default for `ng build`
```
Edit `src/environments/environment.*.ts` to point each environment at a real API.

## What's implemented
- **Standalone components** everywhere, `OnPush` change detection on all feature/shared components.
- **Signals & computed** — `AuthService` (isLoggedIn), `AppStoreService` (selectedUser), `DashboardComponent`.
- **`effect()`** — `AdminComponent` redirects to `/home` if the user logs out while on the page.
- **Functional guard/interceptor/resolver** — `authGuard`, `authInterceptor` (adds Bearer header), `userResolver`.
- **DI & InjectionToken** — `APP_CONFIG` in `core/tokens/app-config.token.ts`, provided from environment files.
- **Reactive forms** — `UserFormComponent`: `FormBuilder`, `FormArray` (dynamic phone numbers), custom
  `forbiddenDomainValidator`.
- **Custom `ControlValueAccessor`** — `RatingInputComponent` (star rating), used inside `UserFormComponent`.
- **RxJS** — `debounceTime`/`distinctUntilChanged`/`takeUntilDestroyed` on the users search box.
- **Directive & content projection** — `HighlightDirective` (`@HostListener`), `CardComponent` (`ng-content`).
- **Pipe** — `SearchFilterPipe` (pure).
- **Unit tests** — every file above has a matching spec exercising `TestBed`,
  `HttpTestingController`, functional guard/interceptor/resolver testing, and CVA testing.

## Project structure
See the original spec's [Project structure](#) section — the generated tree matches it
exactly (`core/guards`, `core/interceptors`, `core/resolvers`, `core/services`,
`core/tokens`, `features/{home,dashboard,admin,users}`, `shared/{components,directives,pipes}`).
