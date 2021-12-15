# toggles_vue2

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
export NUXT_ENV_API_URL=http://localhost:8088
docker build --build-arg NUXT_ENV_API_URL=$NUXT_ENV_API_URL -t toggle-vue2:0.1.0 .
```

### Run Docker
```
docker run --rm -d -p 8080:8080 toggle-vue2:0.1.0
```
