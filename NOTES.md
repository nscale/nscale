Create namespace

```
$ emmu setup acme
$ cd acme
```

Create a service

```
$ emmu spawn edge
$ cd ./edge
```

## Dependancies roadmap

- `fuge-config` - currently used by context parser. For now we will be compatible and leverage the fuge system spec. The plan is to move off of this when we can.
