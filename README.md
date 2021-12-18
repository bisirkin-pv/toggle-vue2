# toggles_vue2

MVP интерфейс для [Feature Toggles server](https://github.com/ezhov-da/feature-toggles)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Build Docker
```
export VUE_APP_BACKEND_URL=http://localhost:8080
docker build --build-arg VUE_APP_BACKEND_URL=$VUE_APP_BACKEND_URL -t paveldriver0/toggle-vue2:0.2.1 .
```

### Run Docker
```
docker run --rm -d -p 8081:8080 paveldriver0/toggle-vue2:0.2.1
```
